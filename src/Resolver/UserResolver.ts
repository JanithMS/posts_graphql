import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../entity/Users";
import { NewUserInput, UserInput } from "./InputTypes/UserInput";
import jwtToken from "../Utils/jwt";
import { MyContext } from "../Types/Context";

@Resolver()
export class UserResolver{

    // @Query(() => String, {nullable: true})
    // async users() : Promise<String | undefined> {
    //     return JSON.stringify(await User.query(' SELECT * FROM "user" ') );
    // }

    @Mutation(() => User)
    async addUser(@Arg("data") newUser: NewUserInput, @Ctx() {res} : MyContext) : Promise<User> {

        newUser.password = await bcrypt.hash(newUser.password, 16)
        const user = await User.create(newUser).save()

        const jwt = jwtToken(user._id, newUser.password)
        res.cookie("token", jwt, {httpOnly:true, maxAge:1000*60*60*24*3 })

        return user;
    }

    @Mutation(() => User)
    async loginUser(@Arg("data") {email, password}: UserInput, @Ctx() {res} : MyContext) : Promise<User> {

        const user = await User.findOne({ where: { email} })
        if(!user) throw new Error("Account Not Found");

        const checkPass = await bcrypt.compare(password, user?.password)
        if(!checkPass) throw new Error("Invalid Credential");

        const jwt = jwtToken(user._id, password)
        res.cookie("token", jwt, {httpOnly:true, maxAge:1000*60*60*24*3 })

        return user;
    }

    @Mutation(() => Boolean)
    async logoutUser(@Ctx() {res} : MyContext ) : Promise<Boolean> {
        res.cookie("token", "", {httpOnly:true, maxAge:1 })

        return true;
    }
}
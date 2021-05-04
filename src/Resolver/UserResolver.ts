import { User } from "../entity/Users";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AddUserInput } from "./InputTypes/UserInput";

@Resolver()
export class UserResolver{

    @Query(() => String, {nullable: true})
    async users() : Promise<String | undefined> {
        return JSON.stringify(await User.query(' SELECT * FROM "user" ') );
    }

    @Mutation(() => User)
    async addUser(@Arg("data") newUser: AddUserInput) : Promise<User> {
        const user = await User.create(newUser).save()
        return user;
    }
}
import { MyContext } from "../Types/Context";
import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "../entity/Users";

export const isAuth: MiddlewareFn<MyContext> = async ( {context}, next) => {

    if (context.req.cookies.token) {

        const jwtToken = context.req.cookies.token;
        const decoded = jwt.verify(jwtToken, ""+process.env.JWT_SECRET) as any

        const user = await User.findOne({ where: { _id: decoded._id, password: decoded._password } })
        if (user) {
            context.req.headers.userID = (user._id).toString()
            return next();
        } else throw new Error("Invalid Credentials");
    } else throw new Error("Login/Register to Continue")
};

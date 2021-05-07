import jwt from "jsonwebtoken";

export default function jwtToken(user_id: number, user_password: String) {
    return jwt.sign({_id: user_id, _password: user_password}, ""+process.env.JWT_SECRET, { expiresIn: '30days'})
}

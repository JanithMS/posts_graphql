import { Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator"
import { User } from "../../entity/Users";

@InputType({ description: "New User" })
export class NewUserInput implements Partial<User> {

  @Field()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@InputType({ description: "User" })
export class UserInput implements Partial<User> {

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

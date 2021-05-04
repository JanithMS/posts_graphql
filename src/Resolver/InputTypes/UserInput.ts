import { User } from "../../entity/Users";
import { Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator"

@InputType({ description: "New User" })
export class AddUserInput implements Partial<User> {

  @Field()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

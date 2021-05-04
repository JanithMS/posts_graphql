import { Posts } from "../../entity/Posts";
import { Field, InputType } from "type-graphql";

@InputType({ description: "New Post" })
export class AddPostInput implements Partial<Posts> {

  @Field()
  title: string;
}
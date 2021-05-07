import { Post } from "../../entity/Posts";
import { Field, InputType } from "type-graphql";

@InputType({ description: "New Post" })
export class AddPostInput implements Partial<Post> {

  @Field()
  title: string;
}
import { Posts } from "../entity/Posts";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AddPostInput } from "./InputTypes/PostInput";

@Resolver()
export class PostResolver{

    @Query(() => String, {nullable: true})
    async posts() : Promise<String | undefined> {
        return JSON.stringify(await Posts.query(' SELECT * FROM "posts" ') );
    }

    @Mutation(() => Posts)
    async addPost(@Arg("data") newPost: AddPostInput) : Promise<Posts> {
        const post = await Posts.create(newPost).save()
        return post;
    }
}
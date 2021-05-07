import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entity/Users";
import { Post } from "../entity/Posts";
import { MyContext } from "../Types/Context";
import { isAuth } from "../Middleware/Auth";
import { AddPostInput } from "./InputTypes/PostInput";

@Resolver()
export class PostResolver{

    // @Query(() => String, {nullable: true})
    // async posts() : Promise<String | undefined> {
    //     return JSON.stringify(await Post.query(' SELECT * FROM "posts" ') );
    // }

    // @Query(() => String, {nullable: true})
    // @UseMiddleware(isAuth)
    // hello(): string {
    //     return "hello user";
    // }

    @Mutation(() => Post )
    @UseMiddleware(isAuth)
    async addPost( @Arg("Post") newPost: AddPostInput, @Ctx() {req} : MyContext) : Promise<Post> {

        const user = await User.findOne({where: {_id: req.headers.userID}});

        const post = await Post.create({...newPost, by: user}).save();
        return post;
    }

    @Query(() => [Post], {nullable: true})
    @UseMiddleware(isAuth)
    async fetchAllPost( @Ctx() {req} : MyContext) : Promise<Post[] | undefined> {

        const posts = await Post.find({where: {by: req.headers.userID}});
        if(posts) return posts; 
        else throw new Error("Posts not found")  
    }

    @Query(() => Post, {nullable: true})
    @UseMiddleware(isAuth)
    async getPost( @Arg('PostID') _id: number, @Ctx() {req} : MyContext ) : Promise<Post | undefined> {
        
        const post = await Post.findOne({where: {_id, by: req.headers.userID}});
        if(post) return post;
        else throw new Error("Post not found")
    }

    @Mutation(() => Post, {nullable: true})
    @UseMiddleware(isAuth)
    async updatePost( @Arg("PostID") _id: number, @Arg("Post") newPost: AddPostInput, @Ctx() {req} : MyContext ) : Promise<Post | undefined> {

        const user = await User.findOne({where: {_id: req.headers.userID}});
        const post = await Post.findOne({where: {_id, by: req.headers.userID}});

        if(post) {
            await Post.update(post, {...newPost, by:user});
            return Post.findOne({where: {_id, by: req.headers.userID}});
        } else throw new Error("Post not found")
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost( @Arg("PostID") _id: number, @Ctx() {req} : MyContext ) : Promise<Boolean> {

        const user_id = await Post.findOne({where: {_id, by: req.headers.userID}});

        if(user_id) {
            await Post.remove(user_id);
            return true;
        } else throw new Error("Post not found");
    }
}
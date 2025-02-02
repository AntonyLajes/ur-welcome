import { Q } from "@nozbe/watermelondb";
import { database, postDatabase } from "../config";
import { Post } from "../models/post-model";
import { PostDTO } from "./dto/PostDTO";
import { PostRepositoryUseCase } from "./post-repository-use-case";

export class PostRepository implements PostRepositoryUseCase{

    async insert(post: PostDTO): Promise<void> {
        try {
            await database.write(async () => {
                await postDatabase.create(_ => {
                    _.authorId = post.user.id 
                    _.content = post.content
                    _.img = post.img
                    _.createdAt = new Date()
                })
            })
        } catch (error) {
            throw error
        }
    }

    async selectAll(): Promise<Post[]> {
        try {
            const posts = await postDatabase.query(Q.sortBy('created_at', Q.desc)).fetch()
            return posts
        } catch (error) {
            throw error
        }
    }

}
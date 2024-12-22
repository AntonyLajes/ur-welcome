import { Q } from "@nozbe/watermelondb";
import { commentDatabase, database } from "../config";
import { Comment } from "../models/comment-model";
import { CommentRepositoryUseCase } from "./comment-repository-use-case";
import { CommentDTO } from "./dto/CommentDTO";

export class CommentRepository implements CommentRepositoryUseCase{
    async insert(comment: CommentDTO): Promise<void> {
        try {
            await database.write(async () => {
                await commentDatabase.create((_) => {
                    _.postId = comment.postId
                    _.authorId = comment.authorId
                    _.content = comment.content
                    _.createdAt = new Date()
                })
            })
        } catch (error) {
            throw error
        }
    }

    async selectByPostId(postId: string): Promise<Comment[]> {
        try {
            const comments = await commentDatabase.query(Q.where('post_id', postId)).fetch()
            return comments
        } catch (error) {
            throw error
        }
    }
}
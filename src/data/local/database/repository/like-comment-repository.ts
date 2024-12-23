import { Q } from "@nozbe/watermelondb";
import { database, likeCommentDatabase } from "../config";
import { LikeComment } from "../models/like-comment";
import LikeCommentDTO from "./dto/LikeCommentDTO";
import { LikeCommentRepositoryUseCase } from "./like-comment-repository-use-case";

export class LikeCommentRepository implements LikeCommentRepositoryUseCase {
    async insert(likeComment: LikeCommentDTO): Promise<void> {
        try {
            await database.write(async () => {
                await likeCommentDatabase.create(_ => {
                    _.commentId = likeComment.commentId,
                    _.userId = likeComment.userId
                })
            })
        } catch (error) {
            throw error
        }
    }

    async remove(likeComment: LikeCommentDTO): Promise<void> {
        try {
            const like = await this.selectById(likeComment)
            if(!like) return

            await database.write(async () => {
                await like.markAsDeleted()
            })
        } catch (error) {
            throw error
        }
    }

    async selectById(likeComment: LikeCommentDTO): Promise<LikeComment> {
        try {
            const likes = await likeCommentDatabase.query(Q.where('user_id', likeComment.userId), Q.where('comment_id', likeComment.commentId)).fetch()
            return likes[0]
        } catch (error) {
            throw error
        }
    }
}
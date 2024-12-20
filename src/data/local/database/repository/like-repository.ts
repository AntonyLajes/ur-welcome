import { Q } from "@nozbe/watermelondb";
import { database, likeDatabase } from "../config";
import { Like } from "../models/like-model";
import { LikeRepositoryUseCase } from "./like-repository-use-case";

export class LikeRepository implements LikeRepositoryUseCase{

    async insert(userId: string, postId: string): Promise<void> {
        try {
            await database.write(async () => {
                await likeDatabase.create((like) => {
                    like.userId = userId,
                    like.postId = postId
                })
            })
        } catch (error) {
            throw error
        }
    }

    async remove(userId: string, postId: string): Promise<void> {
        try {
            const like = await this.selectById(userId, postId)
            if(!like) return

            await database.write(async () => {
                await like.markAsDeleted()
            })
        } catch (error) {
            throw error
        }
    }

    async selectAll(): Promise<Like[] | void> {
        try {
            const likes = await likeDatabase.query().fetch()
            return likes
        } catch (error) {
            throw error
        }
    }

    async selectById(userId: string, postId: string): Promise<Like | void> {
        try {
            const likes = await likeDatabase.query(Q.where('user_id', userId), Q.where('post_id', postId)).fetch()
            return likes[0]
        } catch (error) {
            throw error
        }
    }

}
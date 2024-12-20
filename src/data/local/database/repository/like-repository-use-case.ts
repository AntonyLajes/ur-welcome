import { Like } from "../models/like-model"

export interface LikeRepositoryUseCase{

    insert(userId: string, postId: string, isLiked: boolean): Promise<void>
    remove(userId: string, postId: string): Promise<void>
    selectAll(): Promise<Like[] | void>
    selectById(userId: string, postId: string): Promise<Like | void>
}
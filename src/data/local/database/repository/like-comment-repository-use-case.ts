import { LikeComment } from "../models/like-comment";
import LikeCommentDTO from "./dto/LikeCommentDTO";

export interface LikeCommentRepositoryUseCase {
    insert(likeComment: LikeCommentDTO): Promise<void>
    remove(likeComment: LikeCommentDTO): Promise<void>
    selectById(likeComment: LikeCommentDTO): Promise<LikeComment>
}
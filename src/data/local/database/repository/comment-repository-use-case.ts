import { Comment } from "../models/comment-model";
import { CommentDTO } from "./dto/CommentDTO";

export interface CommentRepositoryUseCase {
    insert(comment: CommentDTO): Promise<void>
    selectByPostId(postId: string): Promise<Comment[]>
}
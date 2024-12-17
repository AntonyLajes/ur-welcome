import { Post } from "../models/post-model";
import { PostDTO } from "./dto/PostDTO";

export interface PostRepositoryUseCase{

    insert(post: PostDTO): Promise<void>
    selectAll(): Promise<Post[]>
}
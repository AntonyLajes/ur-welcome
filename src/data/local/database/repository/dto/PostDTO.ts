import { User } from "../../models/user-model";

export interface PostDTO {
    content: string
    user: User
}
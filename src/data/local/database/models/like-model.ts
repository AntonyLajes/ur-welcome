import { Model } from "@nozbe/watermelondb";
import { immutableRelation, text } from "@nozbe/watermelondb/decorators";
import { Post } from "./post-model";
import { User } from "./user-model";

export class Like extends Model{

    static table = 'likes'

    @text('user_id') userId!: string
    @text('post_id') postId!: string
    
    @immutableRelation('users', 'user_id') user!: User
    @immutableRelation('posts', 'post_id') post!: Post

}
import { Model } from "@nozbe/watermelondb";
import { immutableRelation, text } from "@nozbe/watermelondb/decorators";
import { Post } from "./post-model";
import { User } from "./user-model";
import { Associations } from "@nozbe/watermelondb/Model";

export class Like extends Model{

    static table = 'likes'
    static associations: Associations = {
        users: { type: 'belongs_to', key: 'user_id'},
        posts: { type: 'belongs_to', key: 'post_id' }
    }

    @text('user_id') userId!: string
    @text('post_id') postId!: string
    
    @immutableRelation('users', 'user_id') user!: User
    @immutableRelation('posts', 'post_id') post!: Post

}
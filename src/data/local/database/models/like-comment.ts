import { Model } from "@nozbe/watermelondb";
import { immutableRelation, text } from "@nozbe/watermelondb/decorators";
import { Comment } from "./comment-model";
import { User } from "./user-model";
import { Associations } from "@nozbe/watermelondb/Model";

export class LikeComment extends Model{

    static table = 'like_comment'
    static associations: Associations = {
        comments: { type: 'belongs_to', key: 'comment_id' },
        users: { type: 'belongs_to', key: 'user_id' }
    }

    @text('comment_id')
    commentId!: string
    @text('user_id')
    userId!: string

    @immutableRelation('comments', 'comment_id')
    comment!: Comment
    @immutableRelation('users', 'user_id')
    user!: User
    
}
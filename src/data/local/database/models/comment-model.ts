import { children, date, immutableRelation, text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

import { Post } from "./post-model";
import { User } from "./user-model";
import { Associations } from "@nozbe/watermelondb/Model";
import { LikeComment } from "./like-comment";

export class Comment extends Model {

    static table = 'comments'
    static associations: Associations = {
        posts: { type: 'belongs_to', key: 'post_id' },
        users: { type: 'belongs_to', key: 'author_id' },
        like_comment: { type: 'has_many', foreignKey: 'comment_id' }
    }

    @text('content')
    content!: string
    @text('post_id')
    postId!: string
    @text('author_id')
    authorId!: string
    @date('created_at')
    createdAt!: Date

    @immutableRelation('posts', 'post_id')
    post!: Post
    @immutableRelation('users', 'author_id')
    author!: User

    @children('like_comment')
    likeComment!: LikeComment[]
}
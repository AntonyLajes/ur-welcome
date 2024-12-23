import { Model } from "@nozbe/watermelondb";
import { children, relation, text } from "@nozbe/watermelondb/decorators";
import { Post } from "./post-model";
import { Associations } from "@nozbe/watermelondb/Model";
import { Like } from "./like-model";
import { Comment } from "./comment-model";
import { LikeComment } from "./like-comment";

export class User extends Model {

    static table = 'users'
    static associations: Associations = {
        posts: { type: 'has_many', foreignKey: 'author_id' },
        likes: { type: 'has_many', foreignKey: 'user_id' },
        comments: { type: 'has_many', foreignKey: 'author_id' },
        like_comment: { type: 'has_many', foreignKey: 'user_id' }
    }

    @text('name')
    name!: string

    @text('email')
    email!: string

    @text('password')
    password!: string

    @text('pic')
    picUri: string | undefined

    @children('posts')
    posts!: Post[]

    @children('likes')
    likes!: Like[]
    
    @children('comments')
    comments!: Comment[]

    @children('like_comment')
    likeComment!: LikeComment[]
} 
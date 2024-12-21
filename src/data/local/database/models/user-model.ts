import { Model } from "@nozbe/watermelondb";
import { children, relation, text } from "@nozbe/watermelondb/decorators";
import { Post } from "./post-model";
import { Associations } from "@nozbe/watermelondb/Model";
import { Like } from "./like-model";
import { Comment } from "./comment-model";

export class User extends Model {

    static table = 'users'
    static associations: Associations = {
        posts: { type: 'has_many', foreignKey: 'author_id' },
        likes: { type: 'has_many', foreignKey: 'user_id' },
        comments: { type: 'has_many', foreignKey: 'author_id' }
    }

    @text('name')
    name!: string

    @text('email')
    email!: string

    @text('password')
    password!: string

    @children('posts')
    posts!: Post[]

    @children('likes')
    likes!: Like[]
    
    @children('comments')
    comments!: Comment[]
} 
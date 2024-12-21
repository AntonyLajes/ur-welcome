import { Model } from "@nozbe/watermelondb";
import { children, date, immutableRelation, relation, text } from "@nozbe/watermelondb/decorators";
import { User } from "./user-model";
import { Like } from "./like-model";
import { Associations } from "@nozbe/watermelondb/Model";
import { Comment } from "./comment-model";

export class Post extends Model {

    static table = 'posts'
    static associations: Associations = {
        likes: { type: 'has_many', foreignKey: 'post_id' },
        comments: { type: 'has_many', foreignKey: 'post_id'},
        users: { type: 'belongs_to', key: 'author_id'  }
    }

    @text('content')
    content!: string

    @date('created_at')
    createdAt!: Date

    @text('author_id')
    authorId!: string // Campo que vai ser relacionado ao User

    @relation('users', 'author_id') // Definindo a relação de "pertence a"
    author!: User

    @children('likes') likes!: Like[]
    @children('comments') comments!: Comment[]

}
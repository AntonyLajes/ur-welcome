import { Model } from "@nozbe/watermelondb";
import { date, immutableRelation, relation, text } from "@nozbe/watermelondb/decorators";
import { User } from "./user-model";

export class Post extends Model {

    static table = 'posts'

    @text('content')
    content!: string

    @date('created_at')
    createdAt!: Date

    @text('author_id')
    authorId!: string // Campo que vai ser relacionado ao User

    @relation('users', 'author_id') // Definindo a relação de "pertence a"
    author!: User

}
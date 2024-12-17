import { Model } from "@nozbe/watermelondb";
import { relation, text } from "@nozbe/watermelondb/decorators";
import { Post } from "./post-model";

export class User extends Model {

    static table = 'users'

    @text('name')
    name!: string

    @text('email')
    email!: string

    @text('password')
    password!: string
    
    @relation('posts', 'author_id') // Relação com posts (Um usuário pode ter muitos Posts)
    posts!: Post[]

} 
import { Model } from "@nozbe/watermelondb";
import { date, immutableRelation, text } from "@nozbe/watermelondb/decorators";

export class Post extends Model {

    static table = 'posts'

    @immutableRelation('user', 'user_id')
    userId!: number

    @text('content')
    content!: string

    @date('created_at')
    createdAt!: Date

}
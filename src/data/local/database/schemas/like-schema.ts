import { tableSchema } from "@nozbe/watermelondb";

export const likeSchema = tableSchema({
    name: 'likes',
    columns: [
        {
            name: 'post_id',
            type: 'string',
            isIndexed: true
        },
        {
            name: 'user_id',
            type: 'string'
        }
    ]
})
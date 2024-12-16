import { tableSchema } from "@nozbe/watermelondb";

export const postSchema = tableSchema({
    name: 'posts',
    columns: [
        {
            name: 'user_id',
            type: 'string',
            isIndexed: true
        },
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'created_at',
            type: 'number'
        }
    ]
})
import { tableSchema } from "@nozbe/watermelondb";

export const postSchema = tableSchema({
    name: 'posts',
    columns: [
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'created_at',
            type: 'number',
            isIndexed: true
        },
        {
            name: 'author_id',
            type: 'string',
            isIndexed: true
        }
    ]
})
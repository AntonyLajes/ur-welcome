import { tableSchema } from "@nozbe/watermelondb";

export const commentSchema = tableSchema({
    name: 'comments',
    columns: [
        {
            name: 'post_id',
            type: 'string',
            isIndexed: true
        },
        {
            name: 'author_id',
            type: 'string'
        },
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'created_at',
            type: 'number',
            isIndexed: true
        }
    ]
})
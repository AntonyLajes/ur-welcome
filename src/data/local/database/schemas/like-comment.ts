import { tableSchema } from "@nozbe/watermelondb";

export const likeCommentSchema = tableSchema({
    name: 'like_comment',
    columns: [
        {
            name: 'comment_id',
            type: 'string',
            isIndexed: true
        },
        {
            name: 'user_id',
            type: 'string'
        }
    ]
})
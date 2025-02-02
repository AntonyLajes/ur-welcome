import { tableSchema } from "@nozbe/watermelondb";

export const userSchema = tableSchema({
    name: 'users',
    columns: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        },
        {
            name: 'pic',
            type: 'string',
            isOptional: true
        },
    ]
})
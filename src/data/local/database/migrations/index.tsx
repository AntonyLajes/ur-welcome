import { createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
    migrations: [
        {
            toVersion: 3,
            steps: [
                createTable({
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
                        }
                    ]
                })
            ]
        },
        {
            toVersion: 2,
            steps: [
                createTable({
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
            ]
        }
    ]
})
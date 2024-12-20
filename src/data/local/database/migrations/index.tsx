import { createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
    migrations: [
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
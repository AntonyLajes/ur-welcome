import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import migrations from "../migrations"
import { schemas } from "../schemas"
import { Database } from "@nozbe/watermelondb"
import { models } from "../models"
import { User } from "../models/user-model"
import { Post } from "../models/post-model"

const adapter = new SQLiteAdapter({
    schema: schemas,
    migrations
})

export const database = new Database({
    adapter,
    modelClasses: models
})

export const userDatabase = database.get<User>('users')
export const postDatabase = database.get<Post>('posts')
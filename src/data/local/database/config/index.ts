import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import migrations from "../migrations"
import { schemas } from "../schemas"
import { Database } from "@nozbe/watermelondb"
import { models } from "../models"

const adapter = new SQLiteAdapter({
    schema: schemas,
    migrations
})

export const database = new Database({
    adapter,
    modelClasses: models
})
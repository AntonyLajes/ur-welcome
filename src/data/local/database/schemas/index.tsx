import { appSchema } from "@nozbe/watermelondb";
import { userSchema } from "./user-schema";
import { postSchema } from "./post-schema";

export const schemas = appSchema({
    version: 1,
    tables: [userSchema, postSchema]
})
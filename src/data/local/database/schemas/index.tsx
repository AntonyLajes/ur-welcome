import { appSchema } from "@nozbe/watermelondb";
import { userSchema } from "./user-schema";
import { postSchema } from "./post-schema";
import { likeSchema } from "./like-schema";

export const schemas = appSchema({
    version: 2,
    tables: [userSchema, postSchema, likeSchema]
})
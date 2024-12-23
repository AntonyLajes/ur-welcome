import { appSchema } from "@nozbe/watermelondb";
import { userSchema } from "./user-schema";
import { postSchema } from "./post-schema";
import { likeSchema } from "./like-schema";
import { commentSchema } from "./comment-schema";
import { likeCommentSchema } from "./like-comment";

export const schemas = appSchema({
    version: 6,
    tables: [userSchema, postSchema, likeSchema, commentSchema, likeCommentSchema]
})
import { Post as PostModel } from "@/src/data/local/database/models/post-model";
import { VStack } from "../ui/vstack";

import PostBody from "./post-body";
import PostFooter from "./post-footer";
import PostHeader from "./post-header";
import { withObservables } from "@nozbe/watermelondb/react";
import { User } from "@/src/data/local/database/models/user-model";
import { Divider } from "../ui/divider";

type Props = {
    post: PostModel,
    author: User
}

function Post({ post, author }: Props) {

    return (
        <VStack
            className="bg-white px-8 py-4 mt-2"
            space="sm"
        >
            <PostHeader author={author} postDatetime={post.createdAt}/>
            <PostBody content={post.content} img={post.img}/>
            {
                !post.img && (
                    <Divider className="bg-typography-50"/>
                )
            }
            <PostFooter postId={post.id}/>
        </VStack>
    )

}

const enhance = withObservables(['post'], ({post}: { post: PostModel}) => ({
    post,
    author: post.author
}))

export default enhance(Post)
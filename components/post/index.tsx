import { Post as PostModel } from "@/src/data/local/database/models/post-model";
import { VStack } from "../ui/vstack";

import PostBody from "./post-body";
import PostFooter from "./post-footer";
import PostHeader from "./post-header";
import { withObservables } from "@nozbe/watermelondb/react";
import { userDatabase } from "@/src/data/local/database/config";
import { useEffect, useState } from "react";
import { User } from "@/src/data/local/database/models/user-model";
import { UserRepository } from "@/src/data/local/database/repository/user-repository";

type Props = {
    post: PostModel
}

export default function Post({ post }: Props) {

    const [author, setAuthor] = useState<User | undefined>(undefined)
    const userRepository = new UserRepository()

    const fetchAuthor = async () => {
        const fetchedAuthor = await userRepository.selectById(post.authorId)
        if(!fetchedAuthor) return
        setAuthor(fetchedAuthor)
    }

    useEffect(() => {
        fetchAuthor()
    }, [])

    return (
        <VStack
            className="bg-white px-8 py-4 mt-2"
            space="sm"
        >
            <PostHeader author={author} postDatetime={post.createdAt}/>
            <PostBody content={post.content}/>
            <PostFooter/>
        </VStack>
    )

}
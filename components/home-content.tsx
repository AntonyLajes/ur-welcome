import { FlatList } from "react-native"
import CreatePost from "./create-post"
import Post from "./post"
import { Post as PostModel } from "@/src/data/local/database/models/post-model"
import { Box } from "lucide-react-native"
import React from "react"

import { withObservables } from "@nozbe/watermelondb/react"
import { postDatabase } from "@/src/data/local/database/config"

type PostData = PostModel | { key: string }

type PostsListItemProps = {
    posts: PostModel[],
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

type HomeContentProps = {
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

function HomeContent({ posts, setShowDrawer }: PostsListItemProps) {

    const postsWithHeader: PostData[] = [{key: 'createPost'} ,...posts]

    return (
        <FlatList
            data={postsWithHeader}
            renderItem={({ item }) => {
                if (typeof item === "object" && 'key' in item) {
                    return <CreatePost onConnect={() => setShowDrawer(true)} />
                } else {
                    return <Post post={item} />
                }
            }}
        />
    )

}

const enhance = withObservables([], () => ({
    posts: postDatabase.query()
}))

const EnhancedHomeContent: React.FC<HomeContentProps> = enhance(HomeContent)

export default EnhancedHomeContent
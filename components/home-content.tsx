import { FlatList } from "react-native"
import CreatePost from "./create-post"
import Post from "./post"
import { Post as PostModel } from "@/src/data/local/database/models/post-model"
import { Box } from "lucide-react-native"
import React from "react"

import { withObservables } from "@nozbe/watermelondb/react"
import { postDatabase } from "@/src/data/local/database/config"
import { Q } from "@nozbe/watermelondb"
import { Text } from "./ui/text"
import EmptyPosts from "./empty-posts"
import { VStack } from "./ui/vstack"

type PostData = PostModel | { key: string }

type PostsListItemProps = {
    posts: PostModel[]
}

function HomeContent({ posts }: PostsListItemProps) {
    const postsWithHeader: PostData[] = [{ key: 'createPost' }, ...posts]

    const renderItem = ({ item }: { item: PostData }) => {
        if ('key' in item) {
            return <CreatePost />
        } else {
            return <Post post={item} />
        }
    }

    return (
        <VStack>
            <FlatList
                data={postsWithHeader}
                keyExtractor={(item) => ('id' in item ? item.id : item.key)}
                renderItem={renderItem}
            />
            {posts.length === 0 && <EmptyPosts />}
        </VStack>
    )

}

const enhance = withObservables([], () => ({
    posts: postDatabase.query(Q.sortBy('created_at', Q.desc))
}))

const EnhancedHomeContent: React.FC = enhance(HomeContent)

export default EnhancedHomeContent
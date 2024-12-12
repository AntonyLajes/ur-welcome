import { FlatList } from "react-native";
import { Box } from "@/components/ui/box";
import Post from "@/components/post";
import CreatePost from "@/components/create-post";

type PostData = number | { key: string }

export default function Home() {
    const posts: PostData[] = [{ key: 'createPost' }, 1, 2, 3, 4, 5]

    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => {
                if (typeof item === "object" && 'key' in item) {
                    return <CreatePost />
                } else {
                    return <Post />
                }
            }}
            ItemSeparatorComponent={() => <Box className="py-1" />}
        />
    )

}
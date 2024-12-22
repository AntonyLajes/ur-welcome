import FlatListComments from "@/components/comments";
import CreateComment from "@/components/create-comment";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams } from "expo-router";

type Params = {
    postId: string
}

export default function Comments() {

    const { postId }: Params = useLocalSearchParams()

    return (
        <VStack
            className="flex-1 bg-white"
        >
            <FlatListComments
                postId={postId}
            />

            <VStack>
                <Divider />
                <CreateComment postId={postId}/>
            </VStack>
        </VStack>
    )

}
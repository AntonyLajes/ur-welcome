import Comment from "@/components/comment";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function Comments() {

    return (
        <VStack
            className="flex-1 bg-white"
        >
            <Comment/>
        </VStack>
    )

} 
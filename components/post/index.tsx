import { VStack } from "../ui/vstack";

import PostBody from "./post-body";
import PostFooter from "./post-footer";
import PostHeader from "./post-header";


export default function Post() {

    return (
        <VStack
            className="bg-white px-8 py-4"
            space="sm"
        >
            <PostHeader/>
            <PostBody/>
            <PostFooter/>
        </VStack>
    )

}
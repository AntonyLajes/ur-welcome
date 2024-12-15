import { HStack } from "../ui/hstack";
import PostFooterButton from "./post-footer-button";

import { ThumbsUpIcon, MessageCircleMoreIcon } from "lucide-react-native";

export default function PostFooter() {

    return (
        <HStack
            className="justify-around px-1"
        >
            <PostFooterButton
                title="Curtir"
                icon={ThumbsUpIcon}
            />
            <PostFooterButton
                title="Comentar"
                icon={MessageCircleMoreIcon}
            />
        </HStack>
    )

}
import { HStack } from "../ui/hstack";
import PostFooterButton from "./post-footer-button";

import { ThumbsUpIcon, MessageCircleMoreIcon } from "lucide-react-native";
import React from "react";

export default function PostFooter() {

    return (
        <HStack
            className="justify-around px-1"
        >
            <PostFooterButton
                mode="Curtir"
                icon={ThumbsUpIcon}
            />
            <PostFooterButton
                mode="Comentar"
                icon={MessageCircleMoreIcon}
            />
        </HStack>
    )

}
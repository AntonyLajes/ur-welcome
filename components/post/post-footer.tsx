import { useState } from "react"

import { Divider } from "../ui/divider";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";

import { ThumbsUpIcon, MessageCircleMoreIcon } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Pressable } from "../ui/pressable";
import PostFooterButton from "./post-footer-button";

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
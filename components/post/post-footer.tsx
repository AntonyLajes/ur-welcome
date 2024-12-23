import { withObservables } from "@nozbe/watermelondb/react";
import { HStack } from "../ui/hstack";
import PostFooterButton from "./post-footer-button";

import { ThumbsUpIcon, MessageCircleMoreIcon } from "lucide-react-native";
import React from "react";
import { Like } from "@/src/data/local/database/models/like-model";
import { likeDatabase } from "@/src/data/local/database/config";
import { Q } from "@nozbe/watermelondb";
import { useUser } from "@/src/stores/user";

type PostFooterProps = {
    postId: string
}

export default function PostFooter({postId }: PostFooterProps) {

    const userLogged = useUser(state => state.userLogged)

    return (
        <HStack
            className="justify-around px-1 pt-1"
        >
            <PostFooterButton
                mode="Curtir"
                icon={ThumbsUpIcon}
                postId={postId}
                userLogged={userLogged}
            />
            <PostFooterButton
                mode="Comentar"
                icon={MessageCircleMoreIcon}
                postId={postId}
                userLogged={userLogged}
            />
        </HStack>
    )

}
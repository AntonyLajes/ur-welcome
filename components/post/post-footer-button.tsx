import { useState } from "react"

import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { Pressable } from "../ui/pressable";
import { PressableProps } from "react-native"
import { router } from "expo-router";
import { LikeRepository } from "@/src/data/local/database/repository/like-repository";
import { useUser } from "@/src/stores/user";
import { logError } from "@nozbe/watermelondb/utils/common";
import { Like } from "@/src/data/local/database/models/like-model";
import { withObservables } from "@nozbe/watermelondb/react";
import { database, likeDatabase } from "@/src/data/local/database/config";
import { User } from "@/src/data/local/database/models/user-model";
import { Q } from "@nozbe/watermelondb";
import { useDialog } from "@/src/stores/dialog";

type PostFooterButtonItemProps = {
    mode: "Curtir" | "Comentar",
    icon: React.ElementType,
    postId: string,
    userLogged: User | undefined,
    likeCount: number,
    liked: Like[]
}

type PostFooterButtonProps = {
    mode: "Curtir" | "Comentar",
    icon: React.ElementType,
    postId: string,
    userLogged: User | undefined
}

function PostFooterButton({ mode, icon, postId, userLogged, likeCount, liked }: PostFooterButtonItemProps) {

    const setShowDialog = useDialog(state => state.setShowDialog)

    const isLiked = !!liked[0]
    const dynamicColor = isLiked && mode === "Curtir" ? "color-blue-500" : "color-typography-700"

    const likeRepository = new LikeRepository()
    
    const handleLike = async () => {
        if(!userLogged) {
            setShowDialog(true)
            return
        }

        if(isLiked){
            await likeRepository.remove(userLogged?.id, postId)
        }else{
            await likeRepository.insert(userLogged?.id, postId)
        }
    }

    const onComment = () => {
        router.navigate({
            pathname: "/comments",
            params: {
                postId
            }
        })
    }

    return (
        <Pressable
            onPress={() => mode === "Curtir" ? handleLike() : onComment()}
        >
            <HStack
                className="items-center"
                space="xs"
            >
                <Icon as={icon} className={`${dynamicColor}`} />
                <Text className={`${dynamicColor}`}>{mode}</Text>
            </HStack>
        </Pressable>
    )

}

const enhance = withObservables(['postId', 'userLogged'], ({postId, userLogged }: {postId: string, userLogged: User | undefined}) => ({
    likeCount: likeDatabase.query(Q.where('post_id', postId)).observeCount(),
    liked: likeDatabase.query(Q.where('post_id', postId), Q.where('user_id', userLogged?.id ?? '')).observe()
}))

const EnhancedPostFooterButton: React.FC<PostFooterButtonProps> = enhance(PostFooterButton)

export default EnhancedPostFooterButton
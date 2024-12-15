import { useState } from "react"

import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { Pressable } from "../ui/pressable";
import { PressableProps } from "react-native"
import { router } from "expo-router";

type PostFooterButtonProps = {
    mode: "Curtir" | "Comentar",
    icon: React.ElementType
}

export default function PostFooterButton({ mode, icon }: PostFooterButtonProps) {

    const [isLiked, setIsLiked] = useState(false)
    const dynamicColor = isLiked && mode === "Curtir" ? "color-blue-500" : "color-typography-700"

    return (
        <Pressable
            onPress={() => mode === "Curtir" ? setIsLiked(state => !state) : router.navigate("/comments")}
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
import { useState } from "react"

import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { Pressable } from "../ui/pressable";

type PostFooterButtonProps = {
    title: "Curtir" | "Comentar",
    icon: React.ElementType
}

export default function PostFooterButton({ title, icon }: PostFooterButtonProps) {

    const [isLiked, setIsLiked] = useState(false)
    const dynamicColor = isLiked && title === "Curtir" ? "color-blue-500" : "color-typography-700"

    return (
        <Pressable
            onPress={() => {title === "Curtir" ? setIsLiked((state) => !state) : console.log("Abrir comentário")}}
        >
            <HStack
                className="items-center"
                space="xs"
            >
                <Icon as={icon} className={`${dynamicColor}`} />
                <Text className={`${dynamicColor}`}>{title}</Text>
            </HStack>
        </Pressable>
    )

}
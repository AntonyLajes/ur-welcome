import { CircleXIcon } from "lucide-react-native"
import { Box } from "../ui/box"
import { Icon } from "../ui/icon"
import { Image } from "../ui/image"

import colors from "tailwindcss/colors"
import { Pressable } from "../ui/pressable"

type Props = {
    uri: string | undefined,
    onRemove: () => void
}

export default function PostImage({ uri, onRemove }: Props) {

    return (
        <Box
            className="w-20 h-20"
        >
            <Image
                className="rounded-lg"
                source={{
                    uri
                }}
                alt="Post image."
                width={64}
                height={64}
            />
            <Pressable
                onPress={onRemove}
                className="absolute right-1 top-1"
            >
                <Icon
                    as={CircleXIcon}
                    color={`${colors.white}`}
                    size="md"
                />
            </Pressable>
        </Box>

    )

}
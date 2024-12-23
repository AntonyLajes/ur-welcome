import { User } from "@/src/data/local/database/models/user-model";

import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { passedTime } from "@/src/utils/passedTime";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { UserPenIcon } from "lucide-react-native";
import { Icon } from "../ui/icon";

type Props = {
    author: User | undefined,
    postDatetime: Date
}

export default function PostHeader({ author, postDatetime }: Props) {
    
    return (
        <HStack
            className="items-center"
            space="sm"
        >
            <Box
                className="rounded-full border"
            >
                {author?.picUri ? (
                    <Avatar>
                        <AvatarFallbackText>{author?.name}</AvatarFallbackText>
                        <AvatarImage
                            source={{
                                uri: `${author.picUri}`
                            }}
                        />
                    </Avatar>
                ) :
                    <Box
                        className="border-1 rounded-full w-12 h-12 justify-center items-center"
                    >
                        <Icon as={UserPenIcon} className="p-4" />
                    </Box>
                }
            </Box>
            <VStack>
                <Heading
                    className="text-typography-900"
                    size="sm"
                >
                    {author ? author.name : "Lorem Ipsum"}
                </Heading>
                <Text
                    size="xs"
                >
                    {passedTime(postDatetime)}
                </Text>
            </VStack>
        </HStack>
    )

}
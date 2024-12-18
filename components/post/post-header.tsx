import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

import { User } from "@/src/data/local/database/models/user-model";
import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

type Props = {
    author: User | undefined,
    postDatetime: Date
}

export default function PostHeader({ author, postDatetime }: Props) {

    console.log(`author =>`, author);
    const passedTime = () => {
        return dayjs(postDatetime).fromNow()
    }
    
    return (
        <HStack
            className="items-center"
            space="sm"
        >
            <Box
                className="rounded-full border"
            >
                <Image
                    className="w-12 h-12 rounded-full"
                    source={{
                        uri: 'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYXlcLzBiN2Y0ZTliLWY1OWMtNDAyNC05ZjA2LWIzZGMxMjg1MGFiNy0xOTIwLTEwODAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0='
                    }}
                    alt="Profile Picture"
                />
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
                    {passedTime()}
                </Text>
            </VStack>
        </HStack>
    )

}
import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function PostHeader() {

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
                    Marcos dos Santos
                </Heading>
                <Text
                    size="xs"
                >
                    9h
                </Text>
            </VStack>
        </HStack>
    )

}
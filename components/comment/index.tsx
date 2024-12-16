import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Image } from "../ui/image";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

import { ThumbsUp } from "lucide-react-native"

export default function Comment() {

    return (
        <VStack
            className="p-4"
        >
            <HStack
                className="items-start"
                space="sm"
            >
                <Image
                    className="rounded-full w-12 h-12"
                    source={{
                        uri: 'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYXlcLzBiN2Y0ZTliLWY1OWMtNDAyNC05ZjA2LWIzZGMxMjg1MGFiNy0xOTIwLTEwODAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0='
                    }}
                    alt="Profile Picture"
                />
                <VStack
                    className="flex-1 "
                    space="sm"
                >
                    <VStack
                        className="bg-zinc-200 p-4 rounded-3xl"
                    >
                        <Text
                            className="text-typography-950"
                            bold
                        >
                            Lorem Ipsum da Silva
                        </Text>
                        <Text>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat sint mollitia consequuntur voluptatibus! Modi voluptas qui minus quam inventore labore quia veritatis iste, beatae tempora, porro neque, minima deserunt odit.
                        </Text>
                    </VStack>
                    <HStack
                        className="justify-between"
                    >
                        <HStack
                            className="items-center"
                            space="sm"
                        >
                            <Text>
                                3h
                            </Text>
                            <Pressable>
                                <Text>
                                    Curtir
                                </Text>
                            </Pressable>
                            <Pressable>
                                <Text>
                                    Responder
                                </Text>
                            </Pressable>
                        </HStack>
                        <HStack
                            className="items-center"
                            space="sm"
                        >
                            <Text>
                                21
                            </Text>
                            <Icon
                                as={ThumbsUp}
                            />
                        </HStack>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    )

}
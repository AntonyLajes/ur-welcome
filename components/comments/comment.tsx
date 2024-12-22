import { Comment as CommentModel } from "@/src/data/local/database/models/comment-model";


import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Image } from "../ui/image";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

import { ThumbsUp } from "lucide-react-native"
import { withObservables } from "@nozbe/watermelondb/react";
import { User } from "@/src/data/local/database/models/user-model";
import dayjs from "dayjs";
import { passedTime } from "@/src/utils/passedTime";

type CommentProps = {
    comment: CommentModel,
    author: User
}

function Comment({ comment, author }: CommentProps) {
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
                            {author.name}
                        </Text>
                        <Text>
                            {comment.content}
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
                                {passedTime(comment.createdAt)}
                            </Text>
                            <Pressable>
                                <Text>
                                    Curtir
                                </Text>
                            </Pressable>
                            {/* <Pressable>
                                <Text>
                                    Responder
                                </Text>
                            </Pressable> */}
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

const enhance = withObservables(['comment'], ({comment}: {comment: CommentModel}) => ({
    comment,
    author: comment.author
}))

export default enhance(Comment)
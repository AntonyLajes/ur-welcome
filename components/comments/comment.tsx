import { withObservables } from "@nozbe/watermelondb/react";
import { Q } from "@nozbe/watermelondb";

import { Comment as CommentModel } from "@/src/data/local/database/models/comment-model";
import { User } from "@/src/data/local/database/models/user-model";
import { LikeComment } from "@/src/data/local/database/models/like-comment";

import { likeCommentDatabase } from "@/src/data/local/database/config";

import { LikeCommentRepository } from "@/src/data/local/database/repository/like-comment-repository";

import { useDialog } from "@/src/stores/dialog";
import { passedTime } from "@/src/utils/passedTime";

import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Image } from "../ui/image";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

import { ThumbsUp } from "lucide-react-native"

type CommentObservableProps = {
    comment: CommentModel,
    author: User,
    liked: LikeComment[],
    likeCount: number,
    userLogged: User
}

type CommentProps = {
    comment: CommentModel,
    userLogged: User | undefined
}

function Comment({ comment, author, liked, likeCount, userLogged }: CommentObservableProps) {

    const isLiked = !!liked[0]
    const setShowDialog = useDialog(state => state.setShowDialog)
    
    const likeCommentRepository = new LikeCommentRepository()

    const likeComment = async () => {
        try {
            if(!userLogged) {
                setShowDialog(true)
                return
            }
            if(isLiked){
                await likeCommentRepository.remove({
                    userId: userLogged?.id,
                    commentId: comment.id
                })
            }else{
                await likeCommentRepository.insert({
                    userId: userLogged?.id,
                    commentId: comment.id
                })
            }
        } catch (error) {
            
        }
    } 

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
                            <Pressable
                                onPress={likeComment}
                            >
                                <Text
                                    bold={isLiked}
                                >
                                    {isLiked ? 'Curtiu' : 'Curtir'}
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
                                {likeCount}
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

const enhance = withObservables(['comment', 'userLogged'], ({comment, userLogged}: {comment: CommentModel, userLogged: User | undefined}) => ({
    comment,
    author: comment.author,
    liked: likeCommentDatabase.query(Q.where('user_id', userLogged?.id ?? ''), Q.where('comment_id', comment.id)),
    likeCount: likeCommentDatabase.query(Q.where('comment_id', comment.id)).observeCount()
}))

const EnhancedComment: React.FC<CommentProps> = enhance(Comment)

export default EnhancedComment
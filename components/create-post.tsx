import { Box } from "./ui/box";
import { Button, ButtonText } from "./ui/button";
import { Textarea, TextareaInput } from "./ui/textarea";
import { VStack } from "./ui/vstack";
import { useState } from "react";
import { PostRepository } from "@/src/data/local/database/repository/post-repository";
import { useUser } from "@/src/stores/user";
import { Text } from "./ui/text";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";

type Props = {
    onConnect: () => void
}

export default function CreatePost({ onConnect }: Props) {

    const [postContent, setPostContent] = useState('')
    const [showDialog, setShowDialog] = useState(false)

    const postRepository = new PostRepository()
    const userLogged = useUser((state) => state.userLogged)

    const createPost = async () => {
        if (!userLogged) {
            setShowDialog(true)
            return
        }
        await postRepository.insert({ content: postContent, user: userLogged })
    }

    return (
        <VStack
            className="p-8 bg-white"
        >
            <Box
                className="gap-4 border rounded-3xl p-4"
            >
                <Textarea
                    className="rounded-3xl"
                >
                    <TextareaInput
                        value={postContent}
                        onChangeText={setPostContent}
                        placeholder="O que está pensando?"
                        multiline
                    />
                </Textarea>
                <Button
                    variant="outline"
                    className="rounded-3xl"
                    onPress={createPost}
                >
                    <ButtonText>
                        Publicar
                    </ButtonText>
                </Button>
            </Box>
            <AlertDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading
                            size="sm"
                        >
                            Você não está conectado!
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody
                        className="mt-2"
                    >
                        <Text>
                            Conecte-se para publicar, curtir e comentar.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter
                        className="mt-4"
                    >
                        <HStack
                            className="w-full justify-between"
                        >
                            <Button
                                variant="outline"
                                onPress={() => setShowDialog(false)}
                            >
                                <ButtonText>
                                    Cancelar
                                </ButtonText>
                            </Button>
                            <Button
                                onPress={() => {
                                    setShowDialog(false)
                                    onConnect()
                                }}
                            >
                                <ButtonText>
                                    Conectar
                                </ButtonText>
                            </Button>
                        </HStack>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </VStack>
    )

}
import { Box } from "./ui/box";
import { Button, ButtonText } from "./ui/button";
import { VStack } from "./ui/vstack";
import { useState } from "react";
import { PostRepository } from "@/src/data/local/database/repository/post-repository";
import { useUser } from "@/src/stores/user";
import { Text } from "./ui/text";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import TextareaInput from "./text-area-input";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast, ToastDescription, ToastTitle, useToast } from "./ui/toast";

const createPostFormSchema = z.object({
    content: z.string({message: "Este campo é obrigatório!"}).min(1, { message: "Insira um texto válido." })
})

type CreatePostFormData = z.infer<typeof createPostFormSchema>

type Props = {
    onConnect: () => void
}

export default function CreatePost({ onConnect }: Props) {

    const createPostForm = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostFormSchema)
    })

    const { handleSubmit, reset } = createPostForm
    const [showDialog, setShowDialog] = useState(false)
    const toast = useToast()

    const postRepository = new PostRepository()
    const userLogged = useUser((state) => state.userLogged)

    const showToast = () => {
        const toastId = Math.random()
        toast.show({
            id: String(toastId),
            placement: 'bottom',
            duration: 1500,
            render: ({id}) => {
                const uniqueToastId = `toast-${id}`
                return (
                    <Toast
                        nativeID={uniqueToastId}
                    >
                        <ToastDescription>Publicado com sucesso!</ToastDescription>
                    </Toast>
                )
            }

        })
    }

    const createPost = async (data: CreatePostFormData) => {
        try {
            if (!userLogged) {
                setShowDialog(true)
                return
            }
            await postRepository.insert({ content: data.content, user: userLogged })
            showToast()
            reset()
        } catch (error) {
            
        }
    }

    return (
        <VStack
            className="p-8 bg-white"
        >
            <Box
                className="gap-4 border rounded-3xl p-4"
            >
                <FormProvider {...createPostForm}>
                <TextareaInput
                    name="content"
                    placeholder="O que está pensando?"
                    multiline
                />
                <Button
                    variant="outline"
                    className="rounded-3xl"
                    onPress={handleSubmit(createPost)}
                >
                    <ButtonText>
                        Publicar
                    </ButtonText>
                </Button>
                </FormProvider>
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
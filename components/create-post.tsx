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
import { useDialog } from "@/src/stores/dialog";

const createPostFormSchema = z.object({
    content: z.string({message: "Este campo é obrigatório!"}).min(1, { message: "Insira um texto válido." })
})

type CreatePostFormData = z.infer<typeof createPostFormSchema>

export default function CreatePost() {

    const createPostForm = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostFormSchema)
    })

    const { handleSubmit, reset } = createPostForm
    const toast = useToast()

    const postRepository = new PostRepository()
    const userLogged = useUser((state) => state.userLogged)
    const setShowDialog = useDialog(state => state.setShowDialog)

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
        </VStack>
    )

}
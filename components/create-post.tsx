import { Box } from "./ui/box";
import { Button, ButtonText } from "./ui/button";
import { VStack } from "./ui/vstack";
import { useEffect, useState } from "react";
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
import { showToast } from "./toast";
import { Pressable } from "./ui/pressable";
import { Icon } from "./ui/icon";
import { ImageIcon } from "lucide-react-native"
import { getGalleryImage } from "@/src/utils/get-gallery-image";
import PermissionNotGrantedError from "@/src/utils/error/permission-not-granted";
import { Alert, Linking } from "react-native";
import { Image } from "./ui/image";
import PostImage from "./post/post-image";

const createPostFormSchema = z.object({
    content: z.string({ message: "Este campo é obrigatório!" }).min(1, { message: "Insira um texto válido." })
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

    const [image, setImage] = useState<string | undefined>()

    const createPost = async (data: CreatePostFormData) => {
        try {
            if (!userLogged) {
                setShowDialog(true)
                return
            }
            await postRepository.insert({ content: data.content, user: userLogged })
            showToast(toast)
            reset()
        } catch (error) {
            showToast(toast, `Ocorreu um erro ao publicar.`)
        }
    }

    const pickImage = async () => {
        try {
            const result = await getGalleryImage()
            if (!result) return
            setImage(result.uri)
        } catch (error) {
            if (error instanceof PermissionNotGrantedError) {
                Alert.alert(
                    "Permissão Necessária!",
                    "Precisamos de acesso à sua galeria para selecionar imagens. Por favor, habilite nas configurações.",
                    [
                        {
                            text: 'Cancelar', style: 'cancel'
                        },
                        {
                            text: 'Configurações', onPress: () => Linking.openSettings()
                        }
                    ]
                )
            }
        }
    }

    useEffect(() => {
        console.log(`image =>`, image)
    }, [image])

    return (
        <VStack
            className="p-8 bg-white"
        >
            <Box
                className="gap-4 border rounded-3xl p-4"
            >
                <FormProvider {...createPostForm}>
                    <VStack
                        space="sm"
                    >
                        <TextareaInput
                            name="content"
                            placeholder="O que está pensando?"
                            multiline
                        />
                        {
                            image && (
                                <PostImage uri={image} onRemove={() => setImage(undefined)}/>
                            )
                        }
                    </VStack>
                    <HStack
                        className="justify-center items-center"
                        space="sm"
                    >
                        <Button
                            variant="outline"
                            className="flex-1 rounded-3xl"
                            onPress={handleSubmit(createPost)}
                        >
                            <ButtonText>
                                Publicar
                            </ButtonText>
                        </Button>
                        <Pressable
                            onPress={pickImage}
                        >
                            <Icon
                                as={ImageIcon}
                                size="xl"
                            />
                        </Pressable>
                    </HStack>
                </FormProvider>
            </Box>
        </VStack>
    )

}
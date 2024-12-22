import { FormProvider, useForm } from "react-hook-form";
import { Box } from "./ui/box";
import { VStack } from "./ui/vstack";
import TextareaInput from "./text-area-input";
import { Button, ButtonText } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input";
import { useUser } from "@/src/stores/user";
import { useDialog } from "@/src/stores/dialog";
import { CommentRepository } from "@/src/data/local/database/repository/comment-repository";
import { showToast } from "./toast";
import { useToast } from "./ui/toast";

const createCommentFormSchema = z.object({
    content: z.string({ message: "Este campo é obrigatório!" }).min(1, { message: "Insira um texto válido." })
})

type CreateCommentFormData = z.infer<typeof createCommentFormSchema>

type Props = {
    postId: string
}

export default function CreateComment({ postId }: Props) {

    const createCommentForm = useForm<CreateCommentFormData>({
        resolver: zodResolver(createCommentFormSchema)
    })

    const { handleSubmit, reset } = createCommentForm

    const userLogged = useUser(state => state.userLogged)
    const setShowDialog = useDialog(state => state.setShowDialog)
    const toast = useToast()
    const commentRepository = new CommentRepository()

    const createComment = async ({ content }: CreateCommentFormData) => {
        try {
            if(!userLogged){
                setShowDialog(true)
                return
            }
            await commentRepository.insert({
                authorId: userLogged.id,
                postId,
                content
            })
            reset()
            showToast(toast, "Comentário publicado.")
        } catch (error) {
            showToast(toast, `Ocorreu um erro ao publicar.`)
        }
    }

    return (
        <VStack
            className="p-8 bg-white"
        >
            <Box
                className="gap-4"
            >
                <FormProvider {...createCommentForm}>
                    <TextareaInput
                        name="content"
                        placeholder="Escreva um comentário público"
                        multiline
                    />
                    <Button
                        variant="outline"
                        className="rounded-lg"
                        onPress={handleSubmit(createComment)}
                    >
                        <ButtonText>
                            Comentar
                        </ButtonText>
                    </Button>
                </FormProvider>
            </Box>
        </VStack>
    )

}
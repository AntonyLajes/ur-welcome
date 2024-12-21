import { useDialog } from "@/src/stores/dialog"
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog"
import { Button, ButtonText } from "./ui/button"
import { Heading } from "./ui/heading"
import { HStack } from "./ui/hstack"
import { Text } from "./ui/text"

type Props = {
    onConnect: () => void
}

export default function UnauthenticatedDialog({ onConnect }: Props){

    const {showDialog, setShowDialog} = useDialog()

    return (
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
    )

}
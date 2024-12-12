import { Box } from "./ui/box";
import { Button, ButtonText } from "./ui/button";
import { Text } from "./ui/text";
import { Textarea, TextareaInput } from "./ui/textarea";
import { VStack } from "./ui/vstack";

export default function CreatePost() {

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
                        placeholder="O que está pensando?"
                        multiline
                    />
                </Textarea>
                <Button
                    variant="outline"
                    className="rounded-3xl"
                >
                    <ButtonText>
                        Publicar
                    </ButtonText>
                </Button>
            </Box>
        </VStack>
    )

}
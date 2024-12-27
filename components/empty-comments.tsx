import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

export default function EmptyComments() {
    return (
        <VStack
            className="mt-16 justify-center items-center"
        >
            <Heading>
                Nada para mostrar!
            </Heading>
            <Text>
                Comente algo para que seus amigos vejam.
            </Text>
        </VStack>
    )
}
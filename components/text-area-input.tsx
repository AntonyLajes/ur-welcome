
import { TextInputProps } from "react-native"
import { useController, useFormContext } from "react-hook-form"
import { VStack } from "./ui/vstack"
import { Text } from "./ui/text"
import { Textarea, TextareaInput as GSTextareaInput } from "./ui/textarea"

type Props = TextInputProps & {
    name: string
}

export default function TextareaInput({ name, ...props }: Props) {

    const { control, formState: { errors } } = useFormContext()
    const { field } = useController({
        control,
        name
    })

    const fieldError = errors[name]

    return (
        <VStack>
            <Textarea
                isInvalid={!!fieldError}
                className="rounded-3xl"
            >
                <GSTextareaInput
                    value={field.value}
                    onChangeText={field.onChange}
                    {...props}
                />
            </Textarea>
            {
                fieldError && fieldError.message && (
                    <Text
                        className="text-error-500"
                    >
                        {String(fieldError.message)}
                    </Text>
                )
            }
        </VStack>
    )

}
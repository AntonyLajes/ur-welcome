
import { Input as GSInput, InputField } from "@/components/ui/input"
import { TextInputProps } from "react-native"
import { useController, useFormContext } from "react-hook-form"
import { VStack } from "./ui/vstack"
import { Text } from "./ui/text"

type Props = TextInputProps & {
    name: string
}

export default function Input({ name, ...props }: Props) {

    const { control, formState: { errors } } = useFormContext()
    const { field } = useController({
        control,
        name
    })

    const fieldError = errors[name]
    console.log(`fieldError =>`, fieldError)    

    return (
        <VStack>
            <GSInput
                isInvalid={!!fieldError}
            >
                <InputField
                    value={field.value}
                    onChangeText={field.onChange}
                    {...props}
                />
            </GSInput>
            {
                fieldError && (
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
import Input from "./input";
import { Button, ButtonText } from "./ui/button";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

const signInSchema = z.object({
    email: z.string({message: 'Este campo é obrigatório.'}).email({message: 'Insira um email válido.'}).min(1, 'Insira um email.'),
    password: z.string({message: 'Este campo é obrigatório.'}).min(6, 'Insira uma senha.')
})

type SignInSchema = z.infer<typeof signInSchema>

type Props = {
    onNavigateSignUp: () => void
}
export default function SignIn({ onNavigateSignUp: onCreate }: Props) {

    const signInForm = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    })
    const { handleSubmit } = signInForm

    const onSignIn = async (data: SignInSchema) => {
        console.log(`data =>`, data)
    }

    return (
        <FormProvider {...signInForm}>
            <VStack
                space="sm"
            >
                <Input
                    name="email"
                    placeholder="email"
                />
                <Input
                    name="password"
                    placeholder="senha"
                />
                <VStack>
                    <Button
                        variant="outline"
                        onPress={handleSubmit(onSignIn)}
                    >
                        <ButtonText>
                            Entrar
                        </ButtonText>
                    </Button>
                    <Text
                        className="text-center"
                    >
                        ou
                    </Text>
                    <Button
                        onPress={onCreate}
                    >
                        <ButtonText>
                            Registrar
                        </ButtonText>
                    </Button>
                </VStack>
            </VStack>
        </FormProvider>
    )

}
import { useState } from "react";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import colors from "tailwindcss/colors"

import Input from "./input";
import { VStack } from "./ui/vstack";
import { Button, ButtonSpinner, ButtonText } from "./ui/button";

import { UserRepository } from "@/src/data/local/database/repository/user-repository";
import { FieldError } from "@/src/data/local/database/utils/FieldError";

const signUpSchema = z.object({
    name: z.string({ message: 'Este campo é obrigatório.' }).min(1, 'Insira um nome válido.'),
    email: z.string({ message: 'Este campo é obrigatório.' }).email({ message: 'Insira um email válido.' }).min(1, 'Insira um email.'),
    password: z.string({ message: 'Este campo é obrigatório.' }).min(6, 'Insira uma senha.')
})

type SignUpSchema = z.infer<typeof signUpSchema>

type Props = {
    onBack: () => void
}

export default function SignUp({ onBack }: Props) {

    const signUpForm = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })
    const { handleSubmit, setError } = signUpForm

    const [signInIsLoading, setSignInIsLoading] = useState(false)

    const userRepository = new UserRepository()

    const onSignUp = async (data: SignUpSchema) => {
        try {
            setSignInIsLoading(true)
            const createdUser = await userRepository.insert(data)
            console.log(`onSignUp createdUser =>`, createdUser)
        } catch (error) {
            if (error instanceof FieldError) {
                setError(error.field, { type: "value", message: error.message })
            }
        } finally {
            setSignInIsLoading(false)
        }
    }

    return (
        <FormProvider {...signUpForm}>
            <VStack
                space="sm"
            >
                <Input
                    name="name"
                    placeholder="nome"
                />
                <Input
                    name="email"
                    placeholder="email"
                />
                <Input
                    name="password"
                    placeholder="senha"
                    secureTextEntry
                />
                <VStack
                    space="sm"
                >
                    <Button
                        onPress={handleSubmit(onSignUp)}
                    >
                        {
                            signInIsLoading ?
                                <ButtonSpinner color={colors.gray[500]} /> :
                                <ButtonText>
                                    Registrar
                                </ButtonText>
                        }
                    </Button>
                    <Button
                        onPress={onBack}
                        variant="outline"
                    >
                        <ButtonText>
                            Voltar
                        </ButtonText>
                    </Button>
                </VStack>
            </VStack>
        </FormProvider>
    )

}
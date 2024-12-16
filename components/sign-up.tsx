import { useState } from "react";
import Input from "./input";
import { Button, ButtonText } from "./ui/button";
import { VStack } from "./ui/vstack";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    const { handleSubmit } = signUpForm

    const onSignIn = async (data: SignUpSchema) => {
        console.log(`data =>`, data)
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
                />
                <VStack
                    space="sm"
                >
                    <Button
                        onPress={handleSubmit(onSignIn)}
                    >
                        <ButtonText>
                            Registrar
                        </ButtonText>
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
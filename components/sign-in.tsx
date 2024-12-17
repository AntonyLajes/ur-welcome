import { useEffect, useState } from "react";

import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import Input from "./input";
import { Button, ButtonSpinner, ButtonText } from "./ui/button";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

import { UserRepository } from "@/src/data/local/database/repository/user-repository";
import { UserNotFoundError } from "@/src/data/local/database/utils/UserNotFoundError";

import colors from "tailwindcss/colors"
import { useUser } from "@/src/stores/user";

const signInSchema = z.object({
    email: z.string({ message: 'Este campo é obrigatório.' }).email({ message: 'Insira um email válido.' }).min(1, 'Insira um email.'),
    password: z.string({ message: 'Este campo é obrigatório.' }).min(6, 'Insira uma senha.')
})

export type SignInSchema = z.infer<typeof signInSchema>

type Props = {
    onNavigateSignUp: () => void
}
export default function SignIn({ onNavigateSignUp: onCreate }: Props) {

    const signInForm = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    })
    const { handleSubmit, setError } = signInForm

    const [signInError, setSignInError] = useState(false)
    const [signInIsLoading, setSignInIsLoading] = useState(false)
    
    const setUserLogged = useUser((state) => state.setUserLogged) 

    const userRepository = new UserRepository()

    const onSignIn = async (data: SignInSchema) => {
        try {
            setSignInError(false)
            setSignInIsLoading(true)
            const loggedUser = await userRepository.login(data)
            setUserLogged(loggedUser)
        } catch (error: any) {
            if (error instanceof UserNotFoundError) {
                setError("email", { type: "value", message: "" })
                setError("password", { type: "value", message: "" })
                setSignInError(true)
            }
        } finally {
            setSignInIsLoading(false)
        }
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
                    secureTextEntry
                />
                {
                    signInError && (
                        <Text className="text-error-500">Erro ao se autenticar. Verifique o email e a senha.</Text>
                    )
                }
                <VStack>
                    <Button
                        variant="outline"
                        onPress={handleSubmit(onSignIn)}
                    >
                        {
                            signInIsLoading ?
                                <ButtonSpinner color={colors.gray[500]} /> :
                                <ButtonText>
                                    Entrar
                                </ButtonText>
                        }
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
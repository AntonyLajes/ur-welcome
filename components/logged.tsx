import { useUser } from "@/src/stores/user";
import { Avatar, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import { Button, ButtonText } from "./ui/button";
import { Heading } from "./ui/heading";
import { Image } from "./ui/image";
import { VStack } from "./ui/vstack";

export default function Logged() {

    const { userLogged, setUserLogged } = useUser()

    const onLogout = () => {
        setUserLogged(undefined)
    }

    return (
        <VStack
            className="items-center"
            space="xl"
        >
            <Avatar>
                <AvatarFallbackText>{userLogged?.name}</AvatarFallbackText>
                <AvatarImage
                    source={{
                        uri: "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYXlcLzBiN2Y0ZTliLWY1OWMtNDAyNC05ZjA2LWIzZGMxMjg1MGFiNy0xOTIwLTEwODAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0="
                    }}
                />
            </Avatar>
            <VStack
                space="sm"
            >
                <Heading
                    size="md"
                    className="text-center"
                >
                    {userLogged?.name}
                </Heading>
                <Button
                    onPress={onLogout}
                >
                    <ButtonText>
                        Desconectar
                    </ButtonText>
                </Button>
            </VStack>
        </VStack>
    )

}
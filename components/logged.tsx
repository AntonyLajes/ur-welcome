import { useUser } from "@/src/stores/user";
import { Avatar, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import { Button, ButtonText } from "./ui/button";
import { Heading } from "./ui/heading";
import { Image } from "./ui/image";
import { VStack } from "./ui/vstack";
import { useState } from "react";
import { Pressable } from "./ui/pressable";
import { Icon } from "./ui/icon";
import { CircleUser, UserPenIcon } from "lucide-react-native";
import { Box } from "./ui/box";
import { getGalleryImage } from "@/src/utils/get-gallery-image";
import { UserRepository } from "@/src/data/local/database/repository/user-repository";

export default function Logged() {

    const { userLogged, setUserLogged } = useUser()
    const [image, setImage] = useState<string | undefined>(undefined)
    const userRepository = new UserRepository()

    const onLogout = () => {
        setUserLogged(undefined)
    }

    const updatePicProfile = async () => {
        try {
            const result = await getGalleryImage()
            
            if(!result || !userLogged) return
            await userRepository.updatePicProfile(userLogged, result.uri)
            const updatedUser = await userRepository.selectById(userLogged.id)
            if(!updatedUser) return
            setUserLogged(updatedUser)
        } catch (error) {
            
        }
    }

    return (
        <VStack
            className="items-center"
            space="xl"
        >
            <Pressable
                onPress={updatePicProfile}
            >
                {userLogged?.picUri ? (
                    <Avatar>
                        <AvatarFallbackText>{userLogged?.name}</AvatarFallbackText>
                        <AvatarImage
                            source={{
                                uri: `${userLogged.picUri}`
                            }}
                        />
                    </Avatar>
                ) :
                    <Box
                        className="border-2 rounded-full w-16 h-16 justify-center items-center"
                    >
                        <Icon as={UserPenIcon} className=" p-4" />
                    </Box>
                }
            </Pressable>
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
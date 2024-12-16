import React, { useState } from "react";
import { FlatList } from "react-native";

import { Stack } from "expo-router";

import { Box } from "@/components/ui/box";
import Post from "@/components/post";
import CreatePost from "@/components/create-post";
import { Icon } from "@/components/ui/icon";

import { UserIcon } from "lucide-react-native"
import { Pressable } from "@/components/ui/pressable";
import { Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

type PostData = number | { key: string }

export default function Home() {
    const posts: PostData[] = [{ key: 'createPost' }, 1, 2, 3, 4, 5]

    const [showDrawer, setShowDrawer] = useState(false)
    const [isCreate, setIsCreate] = useState(false)

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <Pressable
                            onPress={() => setShowDrawer(state => !state)}
                        >
                            <Icon as={UserIcon} />
                        </Pressable>
                    )
                }}
            />
            <Drawer
                isOpen={showDrawer}
                onClose={() => setShowDrawer(state => !state)}
                anchor="left"
                size="lg"
            >
                <DrawerBackdrop />
                <DrawerContent>
                    <DrawerHeader
                        className="justify-center"
                    >
                        <Icon
                            as={UserIcon}
                            size="xl"
                        />
                    </DrawerHeader>
                    <DrawerBody>
                        {
                            isCreate ?
                                <VStack
                                    space="sm"
                                >
                                    <Input>
                                        <InputField placeholder="name" />
                                    </Input>
                                    <Input>
                                        <InputField placeholder="email" />
                                    </Input>
                                    <Input>
                                        <InputField placeholder="password" />
                                    </Input>
                                    <VStack
                                        space="sm"
                                    >
                                        <Button>
                                            <ButtonText>
                                                Registrar
                                            </ButtonText>
                                        </Button>
                                        <Button
                                            onPress={() => setIsCreate(false)}
                                            variant="outline"
                                        >
                                            <ButtonText>
                                                Voltar
                                            </ButtonText>
                                        </Button>
                                    </VStack>
                                </VStack> :
                                <VStack
                                    space="sm"
                                >
                                    <Input>
                                        <InputField placeholder="email" />
                                    </Input>
                                    <Input>
                                        <InputField placeholder="password" />
                                    </Input>
                                    <VStack>
                                        <Button
                                            variant="outline"
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
                                            onPress={() => setIsCreate(true)}
                                        >
                                            <ButtonText>
                                                Registrar
                                            </ButtonText>
                                        </Button>
                                    </VStack>
                                </VStack>
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    if (typeof item === "object" && 'key' in item) {
                        return <CreatePost />
                    } else {
                        return <Post />
                    }
                }}
                ItemSeparatorComponent={() => <Box className="py-1" />}
            />
        </>
    )

}
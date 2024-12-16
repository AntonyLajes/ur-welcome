import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { Stack } from "expo-router";

import { Box } from "@/components/ui/box";
import Post from "@/components/post";
import CreatePost from "@/components/create-post";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { SignUpModel } from "@/components/sign-up";
import SignUp from "@/components/sign-up";
import SignIn from "@/components/sign-in";

import { UserIcon } from "lucide-react-native"
import { database } from "../data/local/database/config";
import { User } from "../data/local/database/models/user-model";

type PostData = number | { key: string }

export default function Home() {
    const posts: PostData[] = [{ key: 'createPost' }, 1, 2, 3, 4, 5]

    const [showDrawer, setShowDrawer] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const onSignUp = async (data: SignUpModel) => {
        await database.write(async () => {
            await database.get<User>('users').create(user => {
                user.name = data.name
                user.email = data.email
                user.password = data.password
            })
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await database.get<User>('users').query().fetch()
            console.log(`data =>`, data)
        }
        fetchData()
    }, [])

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
                            isSignUp ?
                            <SignUp
                                onBack={() => setIsSignUp(false)}
                                onSignUp={onSignUp}
                            /> :
                            <SignIn
                                onNavigateSignUp={() => setIsSignUp(true)}
                            />
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
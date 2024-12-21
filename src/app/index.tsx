import React, { useEffect, useState } from "react";

import { Stack } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import SignUp from "@/components/sign-up";
import SignIn from "@/components/sign-in";

import { UserIcon } from "lucide-react-native"
import { useUser } from "../stores/user";
import Logged from "@/components/logged";
import HomeContent from "@/components/home-content";
import UnauthenticatedDialog from "@/components/unauthenticated-dialog";


export default function Home() {
    
    const [showDrawer, setShowDrawer] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const userLogged = useUser((state) => state.userLogged)

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <Pressable
                            onPress={() => setShowDrawer(state => !state)}
                            className="px-4"
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
                            !userLogged ?
                                isSignUp ?
                                    <SignUp
                                        onBack={() => setIsSignUp(false)}
                                    /> :
                                    <SignIn
                                        onNavigateSignUp={() => setIsSignUp(true)}
                                    />
                                : <Logged />
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <HomeContent />
            <UnauthenticatedDialog onConnect={() => setShowDrawer(true)}/>
        </>
    )

}
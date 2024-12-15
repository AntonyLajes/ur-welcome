import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {

    return (
        <GluestackUIProvider mode="light">
            <Stack>
                <Stack.Screen name="index" options={{
                    title: "UrWelcome"
                }} />
                <Stack.Screen name="comments" options={{
                    title: "Comentários"
                }} />
            </Stack>
        </GluestackUIProvider>
    )

}
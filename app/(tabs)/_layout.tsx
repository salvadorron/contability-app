import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

export default function StackLayout() {



    return (
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
    )
}
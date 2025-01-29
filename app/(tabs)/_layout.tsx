import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function StackLayout() {



    return (
        <Tabs >
            <Tabs.Screen name="index" options={{ headerShown: false, title: 'Registros', tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} /> }} />
            <Tabs.Screen name="trash" options={{ headerShown: false, title: 'Papelera', tabBarIcon: ({ color }) => <FontAwesome size={28} name="trash" color={color} /> }} />
        </Tabs>
    )
}
import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
        <Stack.Screen 
            name="HomeScreen" 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="DisplayJob" 
            options={{ headerShown: false, presentation: "modal" }} 
        />
        <Stack.Screen
            name="CreateJob"
            options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
            name="UserAccount"
            options={{ headerShown: false }}
        />
    </Stack>
  );
}
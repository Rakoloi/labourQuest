import { Stack, useSegments, router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import AuthProvider from "./context/AuthContext";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config";
import { User } from "firebase/auth";

export default function RootLayout() {
  const [user, setUser] = useState <User | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
      setLoading(false);
    })

    return unsubscribe;
  },[])

  useEffect(() => {
    if(loading) return;

    const inAuthGroup = !user;

    if(!user && !inAuthGroup){
      router.replace("/") //check proper way to get to login
    }else if(user && inAuthGroup){
      router.replace("/(tabs)/HomeScreen")
    }
  }, [user, loading, segments])

  if (loading) return null; //can return a splash screen

  return(
    // <AuthProvider>
    //   <SafeAreaProvider>
    //     <StatusBar />
    //     <Stack screenOptions={{ headerShown: false }}>
    //       <Stack.Screen name="index" /> 
    //       {/* <Stack.Screen name="screens"  /> */}
    //       <Stack.Screen name="register"  />
    //       <Stack.Screen name="(tabs)" />

    //       <Stack.Screen
    //         name="screens/CreateJob"
    //         options={{ presentation: "modal", headerShown: false }}
    //       />

    //       <Stack.Screen
    //         name="screens/ViewJob"
    //         options={{ presentation: "modal", headerShown: false }}
    //       />
    //     </Stack>
    //   </SafeAreaProvider>
    // </AuthProvider>
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
}

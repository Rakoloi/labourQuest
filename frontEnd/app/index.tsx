import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router, useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";

//import components
import Input from "./components/Input";
import Button from "./components/Button";
import UserAuth from "./logic/userAuth";
import Loader from "./components/Loading";

//Zod and useForm imports for validations.
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginFormData,
} from "../schemas/loginSchema";



export default function Index() {

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
  mode: "onChange",
  reValidateMode: "onChange",
});

  // const[userEmail, setUserEmail] = useState("");
  // const[password, setPassword] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const { setEmail } = useAuth();

  const handleLogin = async(data: LoginFormData) => {
    setIsLoading(true);
    const {email, password} = data;
    setEmail(email);

    try{
      const userLogin = UserAuth(email, password)
      if((await userLogin).results){
        // router.replace({pathname: "/screens/HomeScreen", params: {email: email}});
        //router.replace({pathname: "/(tabs)/HomeScreen"});

        router.replace({pathname: "/(tabs)/HomeScreen", params: {email: email}});
        setIsLoading(true);
      }
      else{
        console.log((await userLogin).message);
        setIsLoading(false);  
      }
    }catch(err: any){
        window.alert("unable to login");
        setIsLoading(false);
        console.log("Login failed. please try again. "+ err);
      }
  }
  return (
    <View style={styles.container}>
      {/* {isLoading && <Loader />} */}
      <Loader visible={isLoading} message="Loggin in" />
      <View style={styles.form}>

        <Image 
          source={require("../assets/images/logo.jpg")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              error={errors.email?.message}
              icon="mail-outline"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Password"
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.password?.message}
              icon="lock-closed-outline"
            />
          )}
        />
         
      </View>

      <Button ButtonText="Login" ButtonClick={handleSubmit(handleLogin)}/>

      {/* Extra text */}
      <Text style={styles.footerText}>
        Dont have an account? <TouchableOpacity onPress={() => router.push("./register")}><Text style={styles.link}>Sign Up</Text></TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    //marginBottom: 20,
    //borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  form: {
    gap: 20, // adds space between inputs
    marginBottom: 30,
  },

  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#16A34A",
    fontWeight: "600",
  },
});

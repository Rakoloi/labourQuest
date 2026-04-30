import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router, useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";

//import components
import Input from "./components/Input";
import Button from "./components/Button";
import UserAuth from "./logic/userAuth";
import Loader from "./components/Loading";



export default function Index() {

  const[userEmail, setUserEmail] = useState("");
  const[password, setPassword] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const { setEmail } = useAuth();

  const handleLogin = async() => {

    //bypass login :Temporary
    //router.replace({pathname: "/(tabs)/HomeScreen" });

    //set the email value globally:
    setEmail(userEmail);

    setIsLoading(true);
    if(userEmail != "" && password != ""){
      try{
        const userLogin = UserAuth(userEmail, password)
        if((await userLogin).results){
          //router.replace({pathname: "/screens/HomeScreen", params: {email: email}});
          router.replace({pathname: "/(tabs)/HomeScreen"});
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
    }else{
      window.alert("all fields are required");
      setIsLoading(false);
    }
    //router.push("./screens/HomeScreen");
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
         
        <Input 
          label="Email"
          placeholder="email"
          value={userEmail}
          onChangeText={setUserEmail}
          secureTextEntry = {false}
        />

        <Input 
          label="Password"
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry = {true}
        />
      </View>

      {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity> */}

      <Button ButtonText="Login" ButtonClick={handleLogin}/>

      {/* Extra text */}
      <Text style={styles.footerText}>
        Don’t have an account? <TouchableOpacity onPress={() => router.push("./register")}><Text style={styles.link}>Sign Up</Text></TouchableOpacity>
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
  // button: {
  //   backgroundColor: "#16A34A",
  //   paddingVertical: 14,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   marginBottom: 20,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 4,
  //   elevation: 2,
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
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

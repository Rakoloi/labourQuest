import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "./components/Button";
import Input from "./components/Input";
import Dropdown from "./components/Dropdown";
import Loader from "./components/Loading";
import CreateAccount from "./logic/createAccount";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [location, setLocation] = useState("");
  const [avalabilty, setAvailability] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const FormSubmit = async() => {
    //router.push("./screens/HomeScreen");
    if(password == confirmPassword){

      if(!phoneNum && !email && !name && !surname && !password && !confirmPassword && !location && !avalabilty){
        console.log("all fields are required");
      }else{
        const createUser = CreateAccount(name, surname, email, phoneNum, password, location, avalabilty);
        if((await createUser).results){
          //router.push("./screens/HomeScreen");
          router.replace({pathname: "/screens/HomeScreen", params: {email: email}});
        }else{
          console.log((await createUser).message);
        }
      }
      
    }else{
      window.alert("password dont match..");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {isLoading && <Loader />}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.form}>
          <Input
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            secureTextEntry={false}
          />
          <Input
            label="Surname"
            placeholder="Enter your surname"
            value={surname}
            onChangeText={setSurname}
            secureTextEntry={false}
          />
          <Input
            label="Phone"
            placeholder="Enter your phone number"
            value={phoneNum}
            onChangeText={setPhoneNum}
            secureTextEntry={false}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          <Input
            label="location"
            placeholder="location"
            value={location}
            onChangeText={setLocation}
            secureTextEntry={false}
          />
          <Dropdown
            label="availability"
            placeholder="availability"
            value={avalabilty}
            onSelect={setAvailability} 
            options={["full-time","part-time","weekends"]}
          />

          <View style={styles.buttonWrapper}>
            <Button ButtonClick={FormSubmit} ButtonText="Sign Up" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // clean neutral background
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#2D3748", // dark gray text
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonWrapper: {
    marginTop: 20,
  },
});
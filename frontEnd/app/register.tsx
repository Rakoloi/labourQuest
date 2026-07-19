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
import { useAuth } from "./context/AuthContext";

//Zod and useForm imports for validations.
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData
} from "../schemas/registerSchema";

const Register = () => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      cellPhone: "",
      email: "",
      location: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [profilePic, setProfilePic] = useState("");
  const [avalabilty, setAvailability] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setEmail } = useAuth();

  const FormSubmit = async(data: RegisterFormData) => {
    //router.push("./screens/HomeScreen");
    setIsLoading(true)
    const {name, surname, cellPhone, email, location, password} = data;
    const createUser = CreateAccount(name, surname, email, cellPhone, password, location, avalabilty);
    if((await createUser).results){
      setEmail(email)
      router.push("/(tabs)/HomeScreen");
      setIsLoading(false);
    }else{
      //display error that account was unable to be created.
      window.alert("unable to create an account, please try again...");
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {isLoading && <Loader visible={isLoading} message="Creating account" />}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.form}>
           
          <Controller 
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Name"
                placeholder="Enter your name"
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                error={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="surname"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Surname"
                placeholder="Enter your surname"
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                error={errors.surname?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="cellPhone"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Cellphone"
                placeholder="Enter your phone numbers"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                secureTextEntry={false}
                error={errors.cellPhone?.message}
              />
            )}
          />

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
            name="location"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Location"
                placeholder="Location"
                value={value}
                onChangeText={onChange}
                error={errors.location?.message}
                icon="location-outline"
              />
            )}
          />

          <Dropdown
            label="availability"
            placeholder="availability"
            value={avalabilty}
            onSelect={setAvailability} 
            options={["full-time","part-time","weekends"]}
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                label="confirm password"
                placeholder="confirm password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.confirmPassword?.message}
                icon="lock-closed-outline"
              />
            )}
          />

          <View style={styles.buttonWrapper}>
            <Button ButtonClick={handleSubmit(FormSubmit)} ButtonText="Sign Up" />
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
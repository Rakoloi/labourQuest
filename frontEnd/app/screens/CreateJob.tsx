import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import PostJob from "../logic/postJob";
import Loader from "../components/Loading";
import SuccessPopUp from "../components/successPopUp";
//import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

//Zod and useForm imports for validations.
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createJobSchema,
  CreateJobFormData,
} from "../../schemas/createJobSchema"

const CreateJob = () => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      location: "",
      cellPhone: "",
      jobPay: ""
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [payType, setPayType] = useState("");
  const [startDate, setStartDate] = useState(""); //job start date
  const [jobOening, setJobOpening] = useState("");
  const [jobPictures, setJobPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {email} = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  const Create = async(data: CreateJobFormData) => {
    setIsLoading(true);
    const {jobTitle, jobDescription, location, cellPhone, jobPay} = data;
    if(!email){
      alert("email not found")
      return
    }
    const job = await PostJob(email, jobTitle, location, cellPhone, jobPay, payType, jobDescription);
    setIsLoading(false);
    if(job.results){
      setShowSuccess(true);
         
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* {isLoading && <Loader />} */}
        <Loader visible={isLoading} message="creating job..."/>
        <Text style={styles.header}>Create Job</Text>

        <SuccessPopUp visible={showSuccess} 
          message="job created" 
          onClose={() => {
            setShowSuccess(false);
            router.back();
          }}
        />

        <View style={styles.form}>

          <Controller 
            control={control}
            name="jobTitle"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Name"
                placeholder="Enter job title"
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                error={errors.jobTitle?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="jobDescription"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Description"
                placeholder="Enter job description"
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                error={errors.jobTitle?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Location"
                placeholder="Enter job location"
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                error={errors.location?.message}
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
            name="jobPay"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Pay"
                placeholder="enter pay for job"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                secureTextEntry={false}
                error={errors.jobPay?.message}
              />
            )}
          />
          
          <Dropdown
              label="Pay Type"
              placeholder="Pay Type"
              value={payType}
              onSelect={setPayType} 
              options={["Hourly","Weekly","Once-off"]}
            />

          <View style={styles.buttonWrapper}>
            <Button ButtonText="Create Job" ButtonClick={handleSubmit(Create)} />
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 5,
    paddingVertical: 20,
    backgroundColor: "#F9FAFB", // light neutral background
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#16a34a", // dark neutral text
    marginBottom: 10,
    textAlign: "center",
  },
  form: {
    // backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    //elevation: 3,
  },
  buttonWrapper: {
    marginTop: 24,
  },
});

export default CreateJob;
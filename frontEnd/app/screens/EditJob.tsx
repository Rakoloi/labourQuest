import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import PostJob from "../logic/postJob";
import Loader from "../components/Loading";
import SuccessPopUp from "../components/successPopUp";
//import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../context/AuthContext";

// firebase imports
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config";

type Job = {
  title: string;
  description: string;
  pay: string;
  location: string;
  docId: string;
};

//Zod and useForm imports for validations.
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editJobSchema,
  EditJobFormData,
} from "../../schemas/editSchema"

const EditJob = () => {
    const { job } = useLocalSearchParams();
    const jobData: Job | null = job ? JSON.parse(job as string) : null;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<EditJobFormData>({
        resolver: zodResolver(editJobSchema),
        defaultValues: {
            jobTitle: jobData?.title,
            jobDescription: jobData?.description,
            location: jobData?.location,
            jobPay: jobData?.pay
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {email} = useAuth();
    const [showSuccess, setShowSuccess] = useState(false);

    const Edit = async(data: EditJobFormData) => {
        setIsLoading(true);   
        const {jobTitle, jobDescription, location, jobPay} = data; 
        if (!email) {
            throw new Error("User email is missing.");
        }
        if(!jobData?.docId){
            throw new Error("docId not found");
        }
        
        try{
            const jobRef = doc(db, "Users", email, "JobsCreated", jobData.docId);

            await updateDoc(jobRef, {
                JobTitle: jobTitle, JobDescription: jobDescription, Location: location, Pay: jobPay
            });
            setShowSuccess(true);
            
        }catch(error: any){
            console.log(error);
            alert("unable to edit job");
        }
        setIsLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container}>
                {/* {isLoading && <Loader />} */}
                <Loader visible={isLoading} message="editing job..."/>
                <Text style={styles.header}>Edit Job</Text>

                <SuccessPopUp visible={showSuccess} 
                    message="job edited" 
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

                    <View style={styles.buttonWrapper}>
                        <Button ButtonText="Save Changes" ButtonClick={handleSubmit(Edit)} />
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



export default EditJob;
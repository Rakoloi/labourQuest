import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import PostJob from "../logic/postJob";
import Loader from "../components/Loading";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
 

const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState(""); //must remove
  const [pay, setPay] = useState("");
  const [payType, setPayType] = useState("");
  const [startDate, setStartDate] = useState(""); //job start date
  const [jobOening, setJobOpening] = useState("");
  const [jobPictures, setJobPictures] = useState([]);
  const {email} = useLocalSearchParams();
  const userEmail = typeof email === "string" ? email : email?.[0];
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const Create = async() => {
    // handle create logic
    setIsLoading(true);

    if(jobTitle && description && location && contact && pay && payType){
      const job = PostJob(userEmail, jobTitle, location, contact, pay, payType, description);
      console.log("message: "+(await job).message)
      //setIsLoading(false);
      router.back();
    }
    else if(!jobTitle){
      alert("job title is required");
      //setIsLoading(false);
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

        <View style={styles.form}>
          
          <Input
            label="Job Title"
            placeholder="Enter job title"
            value={jobTitle}
            onChangeText={setJobTitle}
            secureTextEntry={false}
          />
          <Input
            label="Job Description"
            placeholder="Enter job description"
            value={description}
            onChangeText={setDescription}
            secureTextEntry={false}
          />
          <Input
            label="Location"
            placeholder="Enter location"
            value={location}
            onChangeText={setLocation}
            secureTextEntry={false}
          />
          <Input
            label="Phone number"
            placeholder="Enter phone number "
            value={contact}
            onChangeText={setContact}
            secureTextEntry={false}
            keyboardType="number-pad"
          />
          <Input
            label="Pay"
            placeholder="Enter amount"
            value={pay}
            onChangeText={setPay}
            secureTextEntry={false}
            keyboardType="number-pad"
          />
          <Dropdown
              label="Pay Type"
              placeholder="Pay Type"
              value={payType}
              onSelect={setPayType} 
              options={["Hourly","Weekly","Once-off"]}
            />

          <View style={styles.buttonWrapper}>
            <Button ButtonText="Create Job" ButtonClick={Create} />
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
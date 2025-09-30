import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

type Job = {
  title: string;
  description: string;
  year: number;
  category: string;
  pay: string;
};

const DisplayJob = () => {

    const {job} = useLocalSearchParams();
    const jobData: Job | null = job ? JSON.parse(job as string) : null;

    if (!jobData) {
        return (
            <View style={styles.container}>
                <Text>No job data found</Text>
            </View>
        );
    }

    const AcceptJob = () => {
        window.alert("job saved");
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{jobData.title}</Text>
            <Text style={styles.pay}>{jobData.pay}</Text>
            <Text style={styles.category}>{jobData.category}</Text>
            <Text style={styles.description}>{jobData.description}</Text>
            <Text style={styles.year}>{jobData.year}</Text>

            <Button ButtonClick={AcceptJob} ButtonText="Accept Job"/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff", 
  },

  title: { 
    fontSize: 26, 
    fontWeight: "700", 
    marginBottom: 12, 
    color: "#222", 
    textAlign: "center", 
  },

  pay: { 
    fontSize: 22, 
    fontWeight: "600", 
    color: "#2ecc71",   // elegant green shade
    marginBottom: 10, 
    textAlign: "center", 
  },

  category: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#555", 
    backgroundColor: "#f5f5f5", 
    paddingVertical: 6, 
    paddingHorizontal: 14, 
    borderRadius: 20, 
    alignSelf: "center", 
    marginBottom: 14, 
  },

  description: { 
    fontSize: 15, 
    color: "#444", 
    lineHeight: 22, 
    marginBottom: 18, 
    textAlign: "justify", 
  },

  year: { 
    fontSize: 13, 
    color: "#777", 
    fontStyle: "italic", 
    textAlign: "right", 
    marginBottom: 24, 
  },
});

export default DisplayJob;
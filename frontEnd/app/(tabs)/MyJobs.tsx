import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Pressable } from "react-native"
import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import Loader from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import SuccessPopUp from "../components/successPopUp";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from "expo-router";

//import firebase
import { db } from "@/config";
import { doc, getDoc, getDocs, onSnapshot, setDoc, collection, deleteDoc } from "firebase/firestore";

type Job = {
    docId: string;
    title: string;
    description: string;
    year: number;
    category: string;
    pay: string;
    status: Status;
};

type Status = "Active" | "Pending" | "Completed";

const MyJob = () => {
    const [selected, setSelected] = useState<Status>("Active");
    const[isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState<Job[]>([]);
    const { email } = useAuth();
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState("");
    const insets = useSafeAreaInsets();

    const[numOfPending, setNumOfPending] = useState<number>(0);
    const[numOfActive, setNumOfActive] = useState<number>(0);
    const[numOfComplete, setNumOfComplete] = useState<number>(0);

    const HandleClick = (option: Status) => {
        setSelected(option);
    }

    //function to cancel the job or mark it as done or complete:
    const JobBtnAction = async(userChoise: string, jobId: string) => {

        if(!email) return;

        try{    
            setIsLoading(true);
            if(userChoise === "completed"){
                //remove job from the JobsCreated to the JobsCompleted:
                //1.Red the job first.
                const jobRef = doc(db, "Users", email, "JobsAccepted", jobId);
                const jobSnap = await getDoc(jobRef);
                if(!jobSnap.exists()){
                    console.log("job does not esixt...");
                    setIsLoading(false);
                    return;
                }
                const jobData = jobSnap.data();

                //2.Add the job to JobsComplete:
                const completeRef = doc(db, "Users", email, "JobsCompleted", jobId);
                await setDoc(completeRef, jobData)

                //3.Delete the job:
                await deleteDoc(jobRef);

                //alert("congradulations on completing the job")
                setIsLoading(false);
                setShowSuccess(true);
                setSuccessMsg("Congradulations!! you completed the job");

            }
            else if(userChoise === "Cancel"){
                const jobRef = doc(db, "Users", email, "JobsCreated", jobId);
                const jobSnap = await getDoc(jobRef);
                if(!jobSnap.exists()){
                    console.log("job does not esixt...");
                    return;
                }
                const jobData = jobSnap.data();

                await deleteDoc(jobRef);
                setIsLoading(false);
                setShowSuccess(true);
                setSuccessMsg("Job deleted");
                //alert("job cancelled...")
            }        
        }catch(error){
            alert("unable to perform the operation...");
        }
        }

    // Fetch data based on selected tab
    useEffect(() => {
        if (!email) return;
        setIsLoading(true);

        let subCollection = "";

        if (selected === "Pending") {
            subCollection = "JobsCreated";
        } else if (selected === "Active") {
            subCollection = "JobsAccepted";
        } else if (selected === "Completed") {
            subCollection = "JobsCompleted";
        }

        const jobsRef = collection(db, "Users", email, subCollection);

        const unsubscribe = onSnapshot(jobsRef, (snapshot) => {
        const jobsArray: Job[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            // console.log(data);
            return {
                docId: doc.id,
                title: data.JobTitle || "No title",
                description: data.JobDescription || "No description",
                year: data.createdAt
                    ? new Date(data.createdAt.seconds * 1000).getFullYear()
                    : new Date().getFullYear(),
                category: data.category || "General",
                pay: data.Pay ? `R${data.Pay}` : "R0",
                status: selected,
            };
        });

        setJobs(jobsArray);
        //console.log(subCollection)
        if(subCollection === "JobsCreated"){
            setNumOfPending(snapshot.size)
        }
        else if(subCollection === "JobsAccepted"){
            setNumOfActive(snapshot.size)
        }
        else if(subCollection === "JobsCompleted"){
            setNumOfComplete(snapshot.size)
        }
       
        setIsLoading(false);
        });

        return () => unsubscribe();
    }, [selected, email]); 

    return(       
        <ScrollView style={{marginTop: insets.top}}>
            <SuccessPopUp visible={showSuccess} message={successMsg} onClose={() => setShowSuccess(false)} />
            <Loader visible={isLoading} message="Loading..."/>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.item,
                        selected === "Pending" && styles.selectedItem
                    ]}
                    onPress={() => HandleClick("Pending")}
                >
                    <Text style={[styles.number, selected === 'Pending' && styles.selectedText]}>{numOfPending}</Text>
                    <Text style={[styles.description, selected === 'Pending' && styles.selectedText]}>Pending</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.item,
                        selected === "Active" && styles.selectedItem
                    ]}
                    onPress={() => HandleClick("Active")}
                >
                    <Text style={[styles.number, selected === 'Active' && styles.selectedText]}>{numOfActive}</Text>
                    <Text style={[styles.description, selected === 'Active' && styles.selectedText]}>Active</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.item,
                        selected === "Completed" && styles.selectedItem
                    ]}
                    onPress={() => HandleClick("Completed")}
                >
                    <Text style={[styles.number, selected === 'Completed' && styles.selectedText]}>{numOfComplete}</Text>
                    <Text style={[styles.description, selected === 'Completed' && styles.selectedText]}>Completed</Text>                   
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                {isLoading ? (
                    <Loader visible={isLoading} message="Loading jobs"/>
                    ) : jobs.length === 0 ? (
                    <Text>No jobs found</Text>
                    ) : (
                    jobs.map((job) => (
                        <Pressable
                            key={job.docId}
                            disabled={selected !== "Pending"}
                            onPress={() => {
                                if (selected === "Pending") {
                                    router.push({
                                        pathname: "/screens/EditJob",
                                        params: {
                                            job: JSON.stringify(job),
                                        },
                                    });
                                }
                            }}
                        >
                            <JobCard
                                docId={job.docId}
                                title={job.title}
                                status={job.status}
                                description={job.description}
                                pay={job.pay}
                                dateCreated={job.year.toString()}
                                location="South Africa"
                                onComplete={() => JobBtnAction("completed", job.docId)}
                                onCancel={() => JobBtnAction("Cancel", job.docId)}
                            />
                        </Pressable>
                    ))
                )}
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    //styles for the top header
  container: {
    flexDirection: "row",      // 👈 horizontal alignment
    justifyContent: "space-between",
    padding: 16,
    marginTop:10
  },
  body: {
    padding: 10
  },

  item: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    //card shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedItem: {
    //backgroundColor: "#bbf7d0", // green theme
    transform: [{ scale: 1.05 }],
    borderWidth: 2,
    borderColor: "#16a34a",
  },

  selectedText: {
    color: "#16a34a", // green text
    fontWeight: "bold",
  },

  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  description: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
})

export default MyJob;
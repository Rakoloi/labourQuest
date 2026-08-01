import { router } from "expo-router";
import { useEffect, useState, } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

//import icons
import { Ionicons } from '@expo/vector-icons';
import SearchInput from "../components/SearchInput";
import Loader from "../components/Loading";
import jobs from '../data/jobs.json';

//import firebase
import { db } from "@/config";
import { collectionGroup, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";

type Job = {
  title: string;
  description: string;
  year: number;
  category: string;
  pay: string;
  jobOwner: string;
};

const HomeScreen = () => {
    const[search, setSearch] = useState("");
    const [activeIcon, setActiveIcon] = useState<"create" | "person" | null>(null);
    //const {email} = useLocalSearchParams();
    const[isLoading, setIsLoading] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [id, setId] = useState("");
    const {email} = useAuth();
    //console.log("email in HomeScreen: "+ email)

    useEffect(() => {
      setIsLoading(true);

      const unsubscribe = onSnapshot(
        collectionGroup(db, "JobsCreated"),
        (snapshot) => {
          const jobsArray: Job[] = snapshot.docs
            .filter((doc) => {
              // The path is: Users/{userEmail}/JobsCreated/{docId}
              // doc.ref.parent.parent?.id gives us the {userEmail} segment
              const ownerEmail = doc.ref.parent.parent?.id;
              return ownerEmail !== email; // exclude current user's jobs
            })
            .map((doc) => {
              const data = doc.data();
              return {
                docId: doc.id,
                title: data.JobTitle || "No title",
                description: data.JobDescription || "No description",
                year: data.createdAt
                  ? new Date(data.createdAt.seconds * 1000).getFullYear()
                  : new Date().getFullYear(),
                category: data.category || "General",
                pay: data.Pay ? `R${data.Pay}` : "R0",
                jobOwner: data.JobCreatedBy
              };
            });

          setJobs(jobsArray);
          //console.log(jobs)
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching jobs in real-time:", error);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();    
    }, [email]);

    const IconExecute = (iconClicked: string) => {
        if(iconClicked == "account"){
            console.log("account icon is clicked")
            router.push('./UserAccount')
            
        }
        else if(iconClicked == "create"){
            //window.alert("create a job")
            //router.replace({pathname: "/screens/CreateJob", params: {email: email}});
            router.push({pathname: "/screens/CreateJob", params: {email: email}})
        }
    }

    const renderItem = ({ item }: { item: Job }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.85}
      onPress={() => router.push({pathname:"/screens/ViewJob", params: { job: JSON.stringify(item), email: email }})}
    >
      {/* CHANGED: Green accent bar at the top of the card */}
    <View style={styles.accentBar} />

    {/* CHANGED: Top row — title + pay badge */}
    <View style={styles.headerRow}>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      {/* CHANGED: Pay is now a green pill/badge */}
      <View style={styles.payBadge}>
        <Text style={styles.payText}>{item.pay}</Text>
      </View>
    </View>

    {/* CHANGED: Category pill — now uses green tones */}
    <View style={styles.categoryPill}>
      <Ionicons name="pricetag-outline" size={13} color="#16a34a" />
      <Text style={styles.categoryText}>{item.category}</Text>
    </View>

    {/* description — unchanged logic, kept as-is */}
    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

    {/* CHANGED: Footer row with divider line above it */}
    <View style={styles.divider} />
    <View style={styles.footerRow}>
      <Ionicons name="calendar-outline" size={14} color="#16a34a" />
      <Text style={styles.year}>{item.year}</Text>
      {/* CHANGED: Added arrow icon to hint card is tappable */}
      <Ionicons name="arrow-forward-circle-outline" size={18} color="#16a34a" style={styles.arrowIcon} />
    </View>
    </TouchableOpacity>
  );

    return(
      <SafeAreaView>
        
        <View style={{ height: '100%', paddingTop: '8%'}}>
          {/* {isLoading && <Loader />} */}
          <Loader visible={isLoading} message="Loading" />
            <View style={styles.container}>
                <SearchInput
                    value={search} 
                    placeholder="search"
                    onChangeText={setSearch}
                />                             
            </View>
            
            <View style={{height: "100%"}}>
                {/* write the code here */}
                <FlatList
                    data={jobs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 16 }}
                />
            </View>

            <TouchableOpacity
              style={styles.fab}
              activeOpacity={0.5}
              onPress={() => IconExecute("create")}
            >
              <Ionicons name="briefcase-outline" size={20} color="#fff" />
              <Text style={styles.fabText}>Create</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
  container: {
    //width: "100%",
    paddingHorizontal: 12,
    //backgroundColor: "#fff",
  },
  

  icon: {
    marginLeft: 10,
    backgroundColor: "#f9f9f9",
    padding: 6,
    borderRadius: 12,
  },

  card: {
    backgroundColor: "#f0fdf4",       // CHANGED: soft green background
    padding: 0,                        // CHANGED: padding removed (handled inside now)
    borderRadius: 16,                  // CHANGED: more rounded
    marginBottom: 16,
    shadowColor: "#16a34a",            // CHANGED: green-tinted shadow
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#bbf7d0",            // CHANGED: light green border
    overflow: "hidden",
  },

  // CHANGED: New — green top accent bar
  accentBar: {
    height: 5,
    backgroundColor: "#16a34a",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,  // CHANGED: padding moved here
    paddingTop: 14,         // CHANGED: padding moved here
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14532d",   // CHANGED: deep green title
    flex: 1,
    marginRight: 10,
  },

  // CHANGED: Pay is now a badge/pill
  payBadge: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  // CHANGED: Pay text style (was inline, now inside badge)
  payText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  // CHANGED: Category redesigned with green tones
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#dcfce7",       // CHANGED: light green pill
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 16,             // CHANGED: horizontal padding from card edge
  },

  // CHANGED: Category text color updated
  categoryText: {
    fontSize: 13,
    color: "#15803d",
    fontWeight: "500",
  },

  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 21,
    marginBottom: 12,
    paddingHorizontal: 16,  // CHANGED: padding moved here
  },

  // CHANGED: New — thin divider above footer
  divider: {
    height: 1,
    backgroundColor: "#bbf7d0",
    marginHorizontal: 16,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,  // CHANGED: padding moved here
    paddingVertical: 10,    // CHANGED: padding moved here
  },

  year: {
    fontSize: 13,
    color: "#4b5563",
    marginLeft: 5,
    flex: 1,          // CHANGED: pushes arrow icon to the far right
  },

  // CHANGED: New — arrow icon aligned to right of footer
  arrowIcon: {
    marginLeft: "auto",
  },

  //styeles for the bottom right button:
  fab: {
    position: "absolute",
    bottom: 28,
    right: 20,
    backgroundColor: "#16a34a",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: "#16a34a",
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    gap: 8,
  },

  // CHANGED: Label inside the FAB
  fabText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});

export default HomeScreen;
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import SearchInput from "../components/SearchInput";
import jobs from '../data/jobs.json';

type Job = {
  title: string;
  description: string;
  year: number;
  category: string;
  pay: string;
};

const HomeScreen = () => {
    const[search, setSearch] = useState("");
    const [activeIcon, setActiveIcon] = useState<"create" | "person" | null>(null);

    const IconExecute = (iconClicked: string) => {
        if(iconClicked == "account"){
            console.log("account icon is clicked")
            router.push('./UserAccount')
        }
        else if(iconClicked == "create"){
            //window.alert("create a job")
            router.push('./CreateJob')
        }
    }

    const renderItem = ({ item }: { item: Job }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push({pathname:"./DisplayJob", params: { job: JSON.stringify(item) }})}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.pay}>{item.pay}</Text>
      </View>
      <Text style={styles.category}>
        <Ionicons name="pricetag-outline" size={14} color="#555" /> {item.category}
      </Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.footerRow}>
        <Ionicons name="calendar-outline" size={14} color="#888" />
        <Text style={styles.year}>{item.year}</Text>
      </View>
    </TouchableOpacity>
  );

    return(
        <View style={{backgroundColor: 'white', height: '100%', paddingTop: '10%'}}>
            <View style={styles.container}>
                <Ionicons 
                    name='person-outline' 
                    style={{marginRight: 8}} 
                    size={30} 
                    color="green"
                    onPress={() => IconExecute("account")}
                /> 

                <SearchInput
                    value={search} 
                    placeholder="search"
                    onChangeText={setSearch}
                />
                <Ionicons 
                    name='create-outline' 
                    style={styles.icon} 
                    size={30} 
                    color='green'
                    onPress={() => IconExecute("create")}
                />
                                
            </View>
            <View>
                {/* write the code here */}
                <FlatList
                    data={jobs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 16 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  icon: {
    marginLeft: 10,
    backgroundColor: "#f9f9f9",
    padding: 6,
    borderRadius: 12,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 10,
  },

  pay: {
    fontSize: 17,
    fontWeight: "700",
    color: "#16a34a",
  },

  category: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },

  description: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 12,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  year: {
    fontSize: 13,
    color: "#777",
    marginLeft: 6,
  },
});

export default HomeScreen;
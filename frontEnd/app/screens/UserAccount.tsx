import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";

const UserAccount = () => {
  const [name, setName] = useState("Rakoloi Mosa");
  const [email, setEmail] = useState("rakoloimosa@gmail.com");
  const [phone, setPhone] = useState("+27 123 456 789");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileWrapper}>
        <Image
          source={require('../data/mosaImg.jpg')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <MaterialIcons name="camera-alt" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={styles.name}>{name}</Text>

      {/* Personal Info Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <MaterialIcons name="edit" size={22} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          secureTextEntry={false}
          keyboardType="default"
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          secureTextEntry={false}
          keyboardType="email-address"
        />

        <Input
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          secureTextEntry={false}
          keyboardType="phone-pad"
        />

        {isEditing && (
          <View style={styles.saveButton}>
            <Button ButtonText="Save Changes" ButtonClick={handleSave} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    marginTop: "5%"
  },
  profileWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    padding: 6,
    borderRadius: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 25,
  },
  section: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  saveButton: {
    marginTop: 20,
  },
});

export default UserAccount;
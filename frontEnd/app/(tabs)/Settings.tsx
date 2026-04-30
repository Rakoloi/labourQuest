import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

//firebase inports
import { doc, getDoc, getDocs, onSnapshot, setDoc, collection, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/config";
import { signOut } from "firebase/auth";

//data types for information from the database
type personalInfo = {
  AccountStatus: string,
  Availability: string,
  Email: string,
  Location: string,
  Name: string,
  Phone: string,
  Surname: string
}

const SettingsScreen = () => {
  //const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const {email} = useAuth();
  const [userInfo, setUserInfo] = useState<personalInfo | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchUser = async () => {
      if(!email) return;

      try{
        const userSnap = await getDoc(doc(db, "Users", email));

        if(userSnap.exists()){
          setUserInfo(userSnap.data() as personalInfo);
        }
        else{
          console.log("user not found");
        }
      }
      catch (error){
        console.log("Error fetching data: ", error)
      }
    }

    fetchUser();
    
  }, []);

  const handleLogout = async() => {
    
    try{
      await signOut(auth);
      alert("user logged, out")
      router.replace("/");
    }
    catch(error){
      console.log(error);
      alert("unable to logou...");
    }
  };

  console.log(userInfo)

  return (
    <View style={styles.screen}>

      <ScrollView contentContainerStyle={{marginTop: insets.top, padding: 16}} showsVerticalScrollIndicator={false}>
        <StatusBar style="dark" />
        {/* profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Ionicons name="person" size={36} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{userInfo?.Name + " "+userInfo?.Surname}</Text>
            <Text style={styles.profileEmail}>{userInfo?.Email}</Text>
          </View>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Ionicons name="pencil-outline" size={16} color="#16a34a" />
          </TouchableOpacity>
        </View>

        {/* account section */}
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.group}>

          <SettingRow
            icon="person-outline"
            iconBg="#dcfce7"
            iconColor="#16a34a"
            label="Edit Profile"
            onPress={() => {}}
          />

          <Divider />

          <SettingRow
            icon="lock-closed-outline"
            iconBg="#dbeafe"
            iconColor="#2563eb"
            label="Change Password"
            onPress={() => {}}
          />

          <Divider />

          <SettingRow
            icon="mail-outline"
            iconBg="#fef3c7"
            iconColor="#d97706"
            label="Email Address"
            value={userInfo?.Email}
            onPress={() => {}}
          />

        </View>

        {/* preferences section */}
        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.group}>

          <SettingToggle
            icon="notifications-outline"
            iconBg="#dcfce7"
            iconColor="#16a34a"
            label="Push Notifications"
            value={notificationsEnabled}
            onToggle={() => setNotificationsEnabled((prev) => !prev)}
          />

          <Divider />

          <SettingToggle
            icon="location-outline"
            iconBg="#fce7f3"
            iconColor="#db2777"
            label="Location Access"
            value={locationEnabled}
            onToggle={() => setLocationEnabled((prev) => !prev)}
          />

          <Divider />

          <SettingToggle
            icon="moon-outline"
            iconBg="#ede9fe"
            iconColor="#7c3aed"
            label="Dark Mode"
            value={darkMode}
            onToggle={() => setDarkMode((prev) => !prev)}
          />

        </View>

        {/* support section */}
        <Text style={styles.sectionLabel}>Support</Text>
        <View style={styles.group}>

          <SettingRow
            icon="help-circle-outline"
            iconBg="#dbeafe"
            iconColor="#2563eb"
            label="Help & FAQ"
            onPress={() => {}}
          />

          <Divider />

          <SettingRow
            icon="chatbubble-ellipses-outline"
            iconBg="#dcfce7"
            iconColor="#16a34a"
            label="Contact Support"
            onPress={() => {}}
          />

          <Divider />

          <SettingRow
            icon="document-text-outline"
            iconBg="#fef3c7"
            iconColor="#d97706"
            label="Terms & Privacy Policy"
            onPress={() => {}}
          />

        </View>

        {/* app info section */}
        <Text style={styles.sectionLabel}>App</Text>
        <View style={styles.group}>

          <SettingRow
            icon="information-circle-outline"
            iconBg="#f3f4f6"
            iconColor="#6b7280"
            label="App Version"
            value="v1.0.0"
            showArrow={false}
          />

          <Divider />

          <SettingRow
            icon="star-outline"
            iconBg="#fef3c7"
            iconColor="#d97706"
            label="Rate the App"
            onPress={() => {}}
          />

        </View>

        {/* logout button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Made with ❤️ — By Mosa </Text>

      </ScrollView>
    </View>
  );
};

/* ── reusable sub-components ── */

type SettingRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  label: string;
  value?: string;
  onPress?: () => void;
  showArrow?: boolean;
};

const SettingRow = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  onPress,
  showArrow = true,
}: SettingRowProps) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
    <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={18} color={iconColor} />
    </View>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowRight}>
      {value && <Text style={styles.rowValue}>{value}</Text>}
      {showArrow && <Ionicons name="chevron-forward" size={16} color="#ccc" />}
    </View>
  </TouchableOpacity>
);

type SettingToggleProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  label: string;
  value: boolean;
  onToggle: () => void;
};

const SettingToggle = ({ icon, iconBg, iconColor, label, value, onToggle }: SettingToggleProps) => (
  <View style={styles.row}>
    <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={18} color={iconColor} />
    </View>
    <Text style={styles.rowLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: "#e5e7eb", true: "#86efac" }}
      thumbColor={value ? "#16a34a" : "#f3f4f6"}
    />
  </View>
);

const Divider = () => <View style={styles.divider} />;

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  // header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 54,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0fdf4",
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: 'center'
  },

  scroll: {
    padding: 16,
    paddingBottom: 48,
    gap: 6,
   
  },

  // profile card
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    gap: 14,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    shadowColor: "#16a34a",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  avatarWrapper: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },

  profileName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
  },

  profileEmail: {
    fontSize: 13,
    color: "#6b7280",
  },

  editProfileBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },

  // section label
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 14,
    marginBottom: 6,
    marginLeft: 4,
  },

  // grouped rows card
  group: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 14,
    gap: 12,
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },

  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  rowValue: {
    fontSize: 13,
    color: "#9ca3af",
  },

  divider: {
    height: 1,
    backgroundColor: "#f9fafb",
    marginLeft: 62,
  },

  // logout
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fecaca",
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#dc2626",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#d1d5db",
    marginTop: 16,
  },
});
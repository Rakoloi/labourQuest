import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="MyJobs"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.sideTabWrapper}>
              <View style={[styles.iconBox, focused && styles.iconBoxActive]}>
                <Ionicons
                  name={focused ? "list" : "list-outline"}
                  size={30}
                  color={focused ? "#16a34a" : "#9ca3af"}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.middleTabWrapper}>
              <View
                style={[
                  styles.middleIconWrapper,
                  focused ? styles.middleIconActive : styles.middleIconInactive,
                ]}
              >
                <View
                  style={[styles.middleGlow, { opacity: focused ? 0.5 : 0 }]}
                />
                <Ionicons
                  name={focused ? "search" : "search-outline"}
                  size={30}
                  color={focused ? "#fff" : "#16a34a"}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.sideTabWrapper}>
              <View style={[styles.iconBox, focused && styles.iconBoxActive]}>
                <Ionicons
                  name={focused ? "settings" : "settings-outline"}
                  size={30}
                  color={focused ? "#16a34a" : "#9ca3af"}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  tabBar: {
    //backgroundColor: "#fff",
    //backgroundColor: "#0f1f16",
    //borderTopWidth: 1,
    //borderTopColor: "#f0fdf4",
    borderColor: "#3dbd6e",
    width: "96%",
    height: 55,
    paddingBottom: 0,
    paddingTop: 0,
    shadowColor: "#16a34a",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    //shadowOffset: { width: 0, height: -3 },
    //elevation: 12,

    alignSelf: "center",
    marginBottom: "2%",
    borderRadius: 18,
    //shadowColor: "#3dbd6e",
   
  },

  // side tab — vertically and horizontally centered
  sideTabWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "50%", //make it center
  },

  // inactive — white box
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  // active — light green box
  iconBoxActive: {
    backgroundColor: "#dcfce7",
    shadowColor: "#16a34a",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    //shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  // middle tab wrapper — centered
  middleTabWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },

  middleIconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 58,
    height: 58,
    borderRadius: 29,
  },

  // inactive middle — transparent with green border
  middleIconInactive: {
    backgroundColor: "#fff",
    borderWidth: 2.5,
    borderColor: "#65c284",
    shadowOpacity: 0,
    elevation: 0,
  },

  // active middle — solid green with glow
  middleIconActive: {
    backgroundColor: "#16a34a",
    borderWidth: 0,
    shadowColor: "#16a34a",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  // glow ring behind middle button
  middleGlow: {
    position: "absolute",
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#dcfce7",
  },
});

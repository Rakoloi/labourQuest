import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"; // CHANGED: added ScrollView, TouchableOpacity
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"; // CHANGED: added map
import { Ionicons } from "@expo/vector-icons"; // CHANGED: added icons
import Button from "../components/Button";
import Accept from "../logic/acceptJob";
import Loader from "../components/Loading";
import SuccessPopUp from "../components/successPopUp";
import { useState } from "react";

type Job = {
  title: string;
  description: string;
  year: number;
  category: string;
  pay: string;
  docId: string;
  latitude?: number;   // CHANGED: optional location fields
  longitude?: number;
};

const ViewJob = () => {
  const { job, email } = useLocalSearchParams();
  const userEmail = email as string;
  const jobData: Job | null = job ? JSON.parse(job as string) : null;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showSuccessModal, setSuccessModal] = useState(false);

  if (!jobData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noData}>No job data found.</Text>
      </View>
    );
  }

  // CHANGED: fallback coords if job has no location (defaults to Johannesburg)
  const jobLocation = {
    latitude: jobData.latitude ?? -26.2041,
    longitude: jobData.longitude ?? 28.0473,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const AcceptJob = async () => {
    setIsLoading(true);
    const acceptResults = await Accept(jobData.docId, userEmail);
    if (acceptResults.result) {
      setIsLoading(false);
      setSuccessModal(true);
    } else {
      setIsLoading(false);
    }
  };

  const handleOk = () => {
    setSuccessModal(false);
    router.back();
  };

  return (
    <View style={styles.screen}>
      {isLoading && <Loader />}
      {showSuccessModal && <SuccessPopUp size={250} message="Job Accepted!" onOk={handleOk} />}

      {/* CHANGED: back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#16a34a" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* CHANGED: header card */}
        <View style={styles.headerCard}>
          <View style={styles.accentBar} />
          <View style={styles.headerContent}>

            {/* CHANGED: category pill */}
            <View style={styles.categoryPill}>
              <Ionicons name="pricetag-outline" size={13} color="#16a34a" />
              <Text style={styles.categoryText}>{jobData.category}</Text>
            </View>

            <Text style={styles.title}>{jobData.title}</Text>

            {/* CHANGED: pay badge */}
            <View style={styles.payBadge}>
              <Ionicons name="cash-outline" size={16} color="#fff" />
              <Text style={styles.payText}>{jobData.pay}</Text>
            </View>

          </View>
        </View>

        {/* CHANGED: description section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text-outline" size={18} color="#16a34a" />
            <Text style={styles.sectionTitle}>Job Description</Text>
          </View>
          <Text style={styles.description}>{jobData.description}</Text>
        </View>

        {/* CHANGED: details row */}
        <View style={styles.detailsRow}>
          <View style={styles.detailChip}>
            <Ionicons name="calendar-outline" size={15} color="#16a34a" />
            <Text style={styles.detailText}>{jobData.year}</Text>
          </View>
          <View style={styles.detailChip}>
            <Ionicons name="briefcase-outline" size={15} color="#16a34a" />
            <Text style={styles.detailText}>{jobData.category}</Text>
          </View>
        </View>

        {/* CHANGED: map section */}
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={18} color="#16a34a" />
            <Text style={styles.sectionTitle}>Job Location</Text>
          </View>

          <View style={styles.mapWrapper}>
            <MapView
              style={styles.map}
              provider={PROVIDER_DEFAULT}
              initialRegion={jobLocation}
              scrollEnabled={true}
              zoomEnabled={true}
            >
              <Marker
                coordinate={{ latitude: jobLocation.latitude, longitude: jobLocation.longitude }}
                title={jobData.title}
                description={jobData.category}
              >
                {/* CHANGED: custom green marker */}
                <View style={styles.markerContainer}>
                  <Ionicons name="location" size={36} color="#16a34a" />
                </View>
              </Marker>
            </MapView>
          </View>
        </View>

        {/* CHANGED: accept button with spacing */}
        <View style={styles.buttonWrapper}>
          <Button ButtonClick={AcceptJob} ButtonText="Accept Job" />
        </View>

      </ScrollView>
    </View>
  );
};

export default ViewJob;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff", // CHANGED: soft green background
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noData: {
    fontSize: 16,
    color: "#888",
  },

  // CHANGED: floating back button
  backBtn: {
    position: "absolute",
    top: 48,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  scroll: {
    paddingTop: 80,   // CHANGED: clears the back button
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 16,
  },

  // CHANGED: top header card
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    shadowColor: "#16a34a",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // CHANGED: green top accent bar
  accentBar: {
    height: 5,
    backgroundColor: "#16a34a",
  },

  headerContent: {
    padding: 20,
    gap: 12,
  },

  // CHANGED: category pill
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  categoryText: {
    fontSize: 13,
    color: "#15803d",
    fontWeight: "500",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#14532d",  // CHANGED: deep green
  },

  // CHANGED: green pay badge
  payBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "#16a34a",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },

  payText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // CHANGED: white section card
  section: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    shadowColor: "#16a34a",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden", // CHANGED: clips map to card border radius
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 16,        // CHANGED: moved padding here
    paddingBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#14532d",
  },

  description: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
    margin: 16,
  },

  // CHANGED: row of detail chips
  detailsRow: {
    flexDirection: "row",
    gap: 10,
  },

  detailChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    shadowColor: "#16a34a",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  detailText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },

  // CHANGED: map container with rounded corners
  mapWrapper: {
    width: "100%",      // CHANGED: full width
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#bbf7d0",
   
  },

  map: {
    flex: 1,
    
  },

  // CHANGED: custom green map marker
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonWrapper: {
    marginTop: 8,
  },
});
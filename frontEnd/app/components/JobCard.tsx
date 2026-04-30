import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

type JobCardProps = {
  docId: string,
  title: string;
  status: "Active" | "Completed" | "Pending";
  description: string;
  pay: string;
  dateCreated: string;
  location: string;
  onComplete?: () => void;
  onCancel?: () => void;
};

const statusConfig = {
  Active: { color: "#16a34a", bg: "#dcfce7", icon: "checkmark-circle-outline" as const },
  Completed: { color: "#6b7280", bg: "#f3f4f6", icon: "archive-outline" as const },
  Pending: { color: "#d97706", bg: "#FACC15", icon: "time-outline" as const },
};

const JobCard = ({
  title,
  status,
  description,
  pay,
  dateCreated,
  location,
  onComplete,
  onCancel,
}: JobCardProps) => {

  const currentStatus = statusConfig[status];

  return (
    <View style={styles.card}>

      {/* green accent bar at top */}
      <View style={styles.accentBar} />

      <View style={styles.cardContent}>

        {/* header row — title + status badge */}
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: currentStatus.bg }]}>
            <Ionicons name={currentStatus.icon} size={13} color={currentStatus.color} />
            <Text style={[styles.statusText, { color: currentStatus.color }]}>{status}</Text>
          </View>
        </View>

        {/* description */}
        <Text style={styles.description} numberOfLines={2}>{description}</Text>

        <View style={styles.divider} />

        {/* info row — pay, date, location */}
        <View style={styles.infoRow}>
          <View style={styles.infoChip}>
            <Ionicons name="cash-outline" size={14} color="#16a34a" />
            <Text style={styles.infoText}>{pay}</Text>
          </View>

          <View style={styles.infoChip}>
            <Ionicons name="calendar-outline" size={14} color="#6b7280" />
            <Text style={styles.infoText}>{dateCreated}</Text>
          </View>

          <View style={styles.infoChip}>
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text style={styles.infoText} numberOfLines={1}>{location}</Text>
          </View>
        </View>

        {/* Complete button — only when Active */}
        {status === "Active" && (
          <TouchableOpacity style={styles.completeBtn} onPress={onComplete} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
            <Text style={styles.completeBtnText}>Complete</Text>
          </TouchableOpacity>
        )}

        {/* Cancel button — only when Pending */}
        {status === "Pending" && (
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.85}>
            <Ionicons name="close-circle-outline" size={18} color="#d97706" />
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    shadowColor: "#16a34a",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    overflow: "hidden",
  },

  // green top accent bar
  accentBar: {
    height: 5,
    backgroundColor: "#16a34a",
  },

  cardContent: {
    padding: 16,
    gap: 10,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#14532d",
    flex: 1,
  },

  // dynamic badge — color set inline based on status
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  description: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 21,
  },

  divider: {
    height: 1,
    backgroundColor: "#f0fdf4",
  },

  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  infoChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  infoText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },

  // green complete button
  completeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 4,
    shadowColor: "#16a34a",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },

  completeBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  // amber outlined cancel button
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#fef3c7",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#d97706",
  },

  cancelBtnText: {
    color: "#d97706",
    fontSize: 15,
    fontWeight: "700",
  },
});
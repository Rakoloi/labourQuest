import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from "react-native";
import { useState } from "react";

type DropdownProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onSelect: (item: string) => void;
  options: string[];
};

const Dropdown = ({ label, placeholder, value, onSelect, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Display selected value or placeholder */}
      <TouchableOpacity
        style={[styles.dropdown, isOpen && { borderColor: "green" }]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.textValue, !value && { color: "#888" }]}>
          {value || placeholder || "Select option"}
        </Text>
      </TouchableOpacity>

      {/* Modal with options */}
      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        />
        <View style={styles.modalBox}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  dropdown: {
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  textValue: {
    fontSize: 16,
    color: "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 8,
    maxHeight: "60%",
    position: "absolute",
    top: "30%",
    left: 20,
    right: 20,
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
});

export default Dropdown;
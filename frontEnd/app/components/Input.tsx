import { TextInput, View, StyleSheet, Text } from "react-native";
import { useState } from "react";  

type inputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "number-pad" | "decimal-pad"; 
};

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default", 
}: inputProps) => {
  const [isFocused, setIsFocused] = useState(false); 

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && { borderColor: "green" }, 
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#888"
        cursorColor="green" // 
        keyboardType={keyboardType} // 
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)} 
      />
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
  input: {
    borderWidth: 1.3,
    borderColor: "#ccc", // 
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
});

export default Input;
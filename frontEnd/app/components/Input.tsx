import { TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";  
import { Ionicons } from "@expo/vector-icons";

type inputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "number-pad" | "decimal-pad";
  icon?: keyof typeof Ionicons.glyphMap; // CHANGED: optional left icon prop
  error?: string; // NEW
};

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  icon, // CHANGED: destructured
  error,
}: inputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // CHANGED: password toggle state

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, isFocused && styles.labelFocused]}>{label}</Text>}{/* CHANGED: label turns green on focus */}
      
      
      {error && (<Text style={styles.errorText}>{error}</Text>)}
      {/* CHANGED: wrapper row holds icon + input + eye icon inside one border */}
      {/* <View style={[styles.inputRow, isFocused && styles.inputRowFocused]}> */}
      <View style={[
        styles.inputRow,
        error
          ? styles.inputRowError
          : isFocused
          ? styles.inputRowFocused
          : null,
      ]}
>

        {/* CHANGED: left icon, grey by default, green on focus */}
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={isFocused ? "#16a34a" : "#888"}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible} // CHANGED: respects toggle
          placeholderTextColor="#888"
          cursorColor="#16a34a"
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* CHANGED: eye toggle only shown for password fields */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsPasswordVisible((prev) => !prev)}>
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={isFocused ? "#16a34a" : "#888"}
            />
          </TouchableOpacity>
        )}

      </View>
      
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

  // CHANGED: label turns green when focused
  labelFocused: {
    color: "#16a34a",
  },

  // CHANGED: row wrapper that holds the border, icon, input and eye icon
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.3,
    borderColor: "#ccc",          // grey by default
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fafafa",   // CHANGED: light grey background
  },

  // CHANGED: green border when typing
  inputRowFocused: {
    borderColor: "#16a34a",
  },

  // CHANGED: left icon right margin
  leftIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "transparent", // CHANGED: transparent so inputRow bg shows
  },

  inputRowError: {
  borderColor: "#dc2626",
},

  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 4,
  },

});

export default Input;
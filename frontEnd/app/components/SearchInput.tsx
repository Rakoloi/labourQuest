import { TextInput, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type inputProps = {

    placeholder ?: string;
    value : string;
    onChangeText : (text: string) => void;
}

const SearchInput = ({placeholder, value, onChangeText}:inputProps) => {
  const [isFocused, setIsFocused] = useState(false);
    return(
        <View style={[styles.container, isFocused && styles.containerFocused]}>
          <Ionicons
                name="search"
                size={18}
                color={isFocused ? "#17B169" : "#888"}
                style={styles.icon}
            />
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#888"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    //width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    //backgroundColor: "#fff",
  },
  
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginRight: 8,
  },
  containerFocused: {
    borderColor: "#17B169",
  },

});
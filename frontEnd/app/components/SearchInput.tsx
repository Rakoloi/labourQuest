import { TextInput, View, StyleSheet, Text } from "react-native";

type inputProps = {

    placeholder ?: string;
    value : string;
    onChangeText : (text: string) => void;
}

const SearchInput = ({placeholder, value, onChangeText}:inputProps) => {
    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#888"
            />
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    //marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
});
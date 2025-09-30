import { TouchableOpacity, StyleSheet, Text } from "react-native";

type ButtonProps = {
    ButtonText ?: string;
    ButtonClick : () => void;
}

const Button = ({ButtonText, ButtonClick}: ButtonProps) => {
    return(
        <TouchableOpacity style={styles.button} onPress={ButtonClick}>
            <Text style={styles.buttonText}>{ButtonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default Button;
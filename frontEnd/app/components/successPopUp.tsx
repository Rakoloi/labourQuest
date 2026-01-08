import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import loadingAnimation from "../../assets/lottie-files/Successful.json";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

interface SuccessPopUpProps {  
    size?: number;
    onOk?: () => void;
    message?: string;
}

const SuccessPopUp = ({size = 300, onOk = () => {}, message = "Success!"}) => {
    return(
        <View style={styles.overlay}>
            <View style={styles.popup}>
                <LottieView
                    source={loadingAnimation}
                    autoPlay
                    loop={true}
                    style={{ width: size, height: size }} 
                />

                <Text style={styles.message}>{message}</Text>
                <TouchableOpacity style={styles.button} onPress={onOk}>
                    <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.6)", // slightly lighter overlay
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
    button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SuccessPopUp;
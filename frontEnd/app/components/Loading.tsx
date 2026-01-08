import { StyleSheet, View, Dimensions } from "react-native";
import loadingAnimation from "../../assets/lottie-files/Loading.json"
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const Loader = ({size = 300}) => {
    return(
        <View style={styles.overlay}>
            <LottieView
                source={loadingAnimation}
                autoPlay
                loop
                style={{ width: size, height: size }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.8)", // semi-transparent black background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // ensure it overlays other components
  },
});

export default Loader;
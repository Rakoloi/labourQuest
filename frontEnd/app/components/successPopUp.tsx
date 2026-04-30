
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import { useEffect, useRef } from "react";
import loadingAnimation from "../../assets/lottie-files/Successful.json";
import LottieView from "lottie-react-native";
 
const { width } = Dimensions.get("window");
 
interface SuccessPopUpProps {
  visible: boolean;
  message: string;
  size?: number;
  onClose: () => void;
}
 
const SuccessPopUp = ({ visible, message, size = 200, onClose }: SuccessPopUpProps) => {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);
 
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);
 
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };
 
  return (
    /**
     * Modal with transparent + statusBarTranslucent blocks all scrolling
     * and touch events on the screen beneath automatically.
     */
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.popup,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        >
          <View style={styles.accentBar} />
 
          <View style={styles.animationWrapper}>
            <LottieView
              source={loadingAnimation}
              autoPlay
              loop={true}
              style={{ width: size, height: size }}
            />
          </View>
 
          <View style={styles.pill}>
            <View style={styles.pillDot} />
            <Text style={styles.pillText}>{message}</Text>
          </View>
 
          <View style={styles.divider} />
 
          <TouchableOpacity
            style={styles.button}
            onPress={handleClose}
            activeOpacity={0.82}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
 
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 18, 12, 0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#FAFFFE",
    borderRadius: 28,
    paddingTop: 0,
    paddingBottom: 30,
    paddingHorizontal: 28,
    alignItems: "center",
    width: width * 0.82,
    maxWidth: 360,
    overflow: "hidden",
    shadowColor: "#1a3d2b",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  accentBar: {
    width: "100%",
    height: 5,
    backgroundColor: "#3dbd6e",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginBottom: 4,
  },
  animationWrapper: {
    marginTop: 8,
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edf9f1",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 14,
    gap: 6,
  },
  pillDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#3dbd6e",
  },
  pillText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2e9958",
    letterSpacing: 1.4,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e8f5ed",
    marginBottom: 22,
  },
  button: {
    backgroundColor: "#2aab60",
    paddingVertical: 14,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#1f8f4e",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
 
export default SuccessPopUp;
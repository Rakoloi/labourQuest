
import { StyleSheet, View, Dimensions, Text, Modal, Animated } from "react-native";
import { useEffect, useRef } from "react";
import loadingAnimation from "../../assets/lottie-files/Loading.json";
import LottieView from "lottie-react-native";
 
const { width } = Dimensions.get("window");
 
interface LoaderProps {
  visible: boolean;
  message?: string;
  size?: number;
}
 
const Loader = ({ visible, message = "Please wait...", size = 180 }: LoaderProps) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);
 
  return (
    /**
     * Modal blocks all scroll and touch events on the screen beneath.
     * statusBarTranslucent covers the Android status bar as well.
     */
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        {/* Frosted card */}
        <View style={styles.card}>
          {/* Top accent line */}
          <View style={styles.accentLine} />
 
          <LottieView
            source={loadingAnimation}
            autoPlay
            loop
            style={{ width: size, height: size }}
          />
 
          {/* Dots row */}
          <View style={styles.dotsRow}>
            {[0, 1, 2].map((i) => (
              <PulsingDot key={i} delay={i * 160} />
            ))}
          </View>
 
          <Text style={styles.message}>{message}</Text>
        </View>
      </Animated.View>
    </Modal>
  );
};
 
/** Small animated pulsing dot */
const PulsingDot = ({ delay }: { delay: number }) => {
  const scale = useRef(new Animated.Value(0.6)).current;
 
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
 
  return (
    <Animated.View style={[styles.dot, { transform: [{ scale }] }]} />
  );
};
 
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(8, 14, 10, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(15, 31, 22, 0.85)",
    borderRadius: 28,
    paddingTop: 0,
    paddingBottom: 28,
    paddingHorizontal: 32,
    alignItems: "center",
    width: width * 0.72,
    maxWidth: 300,
    overflow: "hidden",
    shadowColor: "#0a2016",
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
    borderWidth: 1,
    borderColor: "#3dbd6e",
  },
  accentLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#3dbd6e",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginBottom: 4,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
    marginBottom: 14,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3dbd6e",
  },
  message: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4a6655",
    letterSpacing: 0.8,
    textAlign: "center",
  },
});
 
export default Loader;
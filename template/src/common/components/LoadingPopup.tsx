import React from "react"
import { Text, View, ActivityIndicator, StyleSheet } from "react-native"
import Animated from "react-native-reanimated"
import { useTimingTransition } from "react-native-redash"
import Portal from "./abstract/Portal"

interface LoadingPopupProps {
  visible: boolean
}
const LoadingPopup = ({ visible }: LoadingPopupProps) => {
  const opacity = useTimingTransition(visible, {
    duration: visible ? 400 : 100,
  })

  return (
    <Portal>
      <Animated.View
        pointerEvents="none"
        style={[styles.backdrop, { opacity }]}
      >
        <View style={styles.card}>
          <ActivityIndicator size={44} animating={visible} />
          <Text style={styles.text}>Loading... This could take a minute.</Text>
        </View>
      </Animated.View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
    elevation: 1,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    bottom: "10%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.0,
    elevation: 10,
    width: 300,
    padding: 10,
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 12,

    alignSelf: "center",
    color: "grey",
    textAlign: "center",
    lineHeight: 18,
  },
})

export default LoadingPopup

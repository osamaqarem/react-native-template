import { colors } from "./colors"
import { StyleSheet } from "react-native"

// Some common styling boilerplate.
export const AppStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  safeAreaScroll: { flexGrow: 1, backgroundColor: colors.white },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  touchableActiveOpacity: { opacity: 0.84 },
})

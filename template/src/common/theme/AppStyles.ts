import { colors } from "./colors"

// Some common styling boilerplate.
export const AppStyles = {
  safeArea: { flex: 1, backgroundColor: colors.white },
  safeAreaScroll: { flexGrow: 1, backgroundColor: colors.white },
  centerContent: {
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  touchableActiveOpacity: 0.84,
}

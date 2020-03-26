import { colors } from "./colors"
import { typography } from "./typography"

export const AppStyles = {
  safeArea: { flex: 1, backgroundColor: colors.white },
  safeAreaScroll: { flexGrow: 1, backgroundColor: colors.white },
  centerContent: {
    justifyContent: "center" as const,
    alignItems: "center" as const
  },
  regularText: {
    fontFamily: typography.fontFamily.normal,
    fontSize: typography.fontSize.p,
    color: colors.white,
    top: 2
  },
  stackHeaderStyles: {
    headerTintColor: colors.white,
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: colors.red, height: 84 },
    headerTitleStyle: {
      color: colors.white,
      fontSize: typography.fontSize.p,
      fontFamily: typography.fontFamily.bold,
      fontWeight: "700" as const,
      letterSpacing: typography.letterSpacing.h2
    }
  },
  touchableActiveOpacity: 0.84
}

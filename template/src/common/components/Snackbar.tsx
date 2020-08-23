import React, { useEffect, useMemo, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Animated, { cond, neq, set, useCode } from "react-native-reanimated"
import { bin, timing, useValue } from "react-native-redash"
import { useSafeArea } from "react-native-safe-area-context"

const SNACKBAR_HEIGHT = 54

interface SnackbarProps {
  visible: boolean
  message: string
  onDismiss: () => void
  onPress?: () => void
  btnTitle?: string
  unsafeView?: boolean
}
const Snackbar = ({
  visible,
  message,
  onDismiss,
  btnTitle,
  onPress,
  unsafeView,
}: SnackbarProps) => {
  const timeoutRef = useRef(-1)
  const insets = useSafeArea()
  const safeArea = !unsafeView
    ? insets
    : { top: 0, bottom: 0, left: 0, right: 0 }
  const snackbarHeight =
    SNACKBAR_HEIGHT + safeArea.bottom + safeArea.bottom / 2 + 10
  const translateY = useValue(snackbarHeight)
  const opacity = useMemo(
    () =>
      timing({
        to: 1,
        from: 0.2,
        duration: 200,
      }),
    // eslint-disable-next-line
    [message]
  )

  useCode(
    () => [
      cond(
        bin(visible),
        set(
          translateY,
          timing({
            from: translateY,
            to: 0,
            duration: 250,
          })
        ),
        cond(
          neq(translateY, snackbarHeight),
          set(
            translateY,
            timing({
              from: translateY,
              to: snackbarHeight,
              duration: 150,
            })
          )
        )
      ),
    ],
    [visible, snackbarHeight, translateY]
  )

  useEffect(() => {
    if (visible) {
      timeoutRef.current = setTimeout(() => {
        onDismiss()
      }, 3000)
    }

    return clearTimeoutRef
  }, [onDismiss, visible])

  const clearTimeoutRef = () => clearTimeout(timeoutRef.current)

  const handleOnPress = () => {
    onDismiss()
    clearTimeout(timeoutRef.current)
    setTimeout(() => {
      onPress!()
    }, 150)
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.snackbar,
          {
            transform: [{ translateY }],
            height: snackbarHeight,
            backgroundColor: "#1D2226",
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.text,
            {
              marginBottom: safeArea.bottom,
              opacity,
            },
          ]}
        >
          {message}
        </Animated.Text>
        {onPress && (
          <TouchableOpacity
            onPress={handleOnPress}
            style={styles.touchable}
            activeOpacity={0.6}
          >
            <Text
              style={[
                styles.dismissText,
                {
                  marginBottom: safeArea.bottom,
                  color: "#15AAE1",
                },
              ]}
            >
              {btnTitle}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.touchable}
          activeOpacity={0.6}
        >
          <Text
            style={[
              styles.dismissText,
              {
                marginBottom: safeArea.bottom,
                color: "#2E97C8",
              },
            ]}
          >
            Dismiss
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    justifyContent: "center",
    width: 90,
  },
  dismissText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 14,
    flex: 1,
    paddingHorizontal: 22,
  },
  snackbar: {
    height: SNACKBAR_HEIGHT,
    width: "100%",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
})

export default Snackbar

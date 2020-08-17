import React, { useMemo, useRef, useEffect } from "react"
import { StyleSheet, StatusBar, BackHandler, Keyboard } from "react-native"
import Animated from "react-native-reanimated"
import { timing } from "react-native-redash"
import { useFocusEffect } from "@react-navigation/native"

function useBackgroundOverlay(visible: boolean, onTouchStart: () => void) {
  const isFirstRender = useRef(true)
  const opacity = useMemo(
    () =>
      isFirstRender.current
        ? 0
        : timing({
            from: visible ? 0 : 0.2,
            to: visible ? 0.2 : 0,
          }),
    [visible]
  )

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          onTouchStart()
          return true
        } else {
          return false
        }
      }
      BackHandler.addEventListener("hardwareBackPress", onBackPress)

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [onTouchStart, visible])
  )

  return (
    <>
      {visible && <StatusBar backgroundColor="grey" animated />}
      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        onTouchStart={() => {
          Keyboard.dismiss()
          onTouchStart()
        }}
        style={[
          styles.overlay,
          {
            opacity,
          },
        ]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    elevation: 1,
    backgroundColor: "black",
  },
})

export default useBackgroundOverlay

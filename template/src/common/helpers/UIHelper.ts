import Animated, { Easing } from "react-native-reanimated"
import {
  Platform,
  Animated as AnimatedRN,
  Easing as EasingRN,
  Dimensions,
} from "react-native"

const {
  Value,
  timing,
  clockRunning,
  startClock,
  block,
  cond,
  stopClock,
} = Animated

// Initial dimensions of the view (not accurate after e.g. rotation)
const { height, width } = Dimensions.get("window")

// Simple scale animation for use with React Native Animated API.
const btnScaleAnim = {
  in: { toValue: 0.98, duration: 50, easing: Easing.inOut(Easing.ease) },
  out: {
    toValue: 1,
    duration: 50,
    easing: Easing.inOut(Easing.ease),
  },
}

// Useful to check if the iOS device has a notch.
const isIphoneX =
  Platform.OS === "ios" &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812 || height === 896 || width === 896)

// Stack navgiator fade transition.
// Forked from react-navigation-transitions
// https://github.com/plmok61/react-navigation-transitions
const fadeIn = (duration = 300) => {
  return {
    transitionSpec: {
      duration,
      easing: EasingRN.out(EasingRN.poly(4)),
      timing: AnimatedRN.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }: any) => {
      const { index } = scene

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      })

      return { opacity }
    },
  }
}

// Boilerplate timing function for use with Reanimated.
const runTiming = (
  clock: Animated.Clock,
  start: number,
  end: number,
  duration: number
) => {
  const state = {
    finished: new Value(0),
    position: new Value(start),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration,
    toValue: new Value(end),
    easing: Easing.out(Easing.exp),
  }

  return block([
    cond(clockRunning(clock), 0, startClock(clock)),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ])
}

export const UIHelper = {
  width,
  height,
  btnScaleAnim,
  isIphoneX,
  fadeIn,
  runTiming,
}

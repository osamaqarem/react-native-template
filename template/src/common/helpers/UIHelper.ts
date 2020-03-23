import Animated, { Easing } from "react-native-reanimated"
import {
  Platform,
  Animated as AnimatedRN,
  Easing as EasingRN,
  Dimensions
} from "react-native"

const {
  Value,
  timing,
  clockRunning,
  startClock,
  block,
  cond,
  stopClock
} = Animated

export const { height, width } = Dimensions.get("window")

class UIHelper {
  public btnScaleAnim = {
    in: { toValue: 0.98, duration: 50, easing: Easing.inOut(Easing.ease) },
    out: {
      toValue: 1,
      duration: 50,
      easing: Easing.inOut(Easing.ease)
    }
  }

  // Forked from: react-native-iphone-x-helper
  // https://github.com/ptelad/react-native-iphone-x-helper
  // TODO: better approach?
  public isIphoneX = () => {
    return (
      Platform.OS === "ios" &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (height === 812 || width === 812 || height === 896 || width === 896)
    )
  }

  public onScroll = (contentOffset: {
    x?: Animated.Node<number>
    y?: Animated.Node<number>
  }) =>
    Animated.event([
      {
        nativeEvent: {
          contentOffset
        }
      }
    ])

  // Forked from react-navigation-transitions
  // https://github.com/plmok61/react-navigation-transitions
  public fadeIn = (duration = 300) => {
    return {
      transitionSpec: {
        duration,
        easing: EasingRN.out(EasingRN.poly(4)),
        timing: AnimatedRN.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ position, scene }: any) => {
        const { index } = scene

        const opacity = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: [0, 1]
        })

        return { opacity }
      }
    }
  }

  public runTiming = (
    clock: Animated.Clock,
    start: number,
    end: number,
    duration: number
  ) => {
    const state = {
      finished: new Value(0),
      position: new Value(start),
      time: new Value(0),
      frameTime: new Value(0)
    }

    const config = {
      duration,
      toValue: new Value(end),
      easing: Easing.out(Easing.exp)
    }

    return block([
      cond(clockRunning(clock), 0, startClock(clock)),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position
    ])
  }
}

export default new UIHelper()

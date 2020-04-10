import { useRef } from "react"
import { State } from "react-native-gesture-handler"
import {
  call,
  cond,
  eq,
  or,
  set,
  useCode,
  Value,
} from "react-native-reanimated"
import { onGestureEvent, withTimingTransition } from "react-native-redash"

/**
 * Helper for gesture-based scale transitions using Reanimated.
 */
export interface ScaleTransitionProps {
  scaleWhenPressed: number
  regularScale: number
  duration: number
  easing?: any
  onPress?: () => void
}
const useScaleTransition = ({
  duration,
  scaleWhenPressed,
  regularScale,
  easing,
  onPress,
}: ScaleTransitionProps) => {
  const state = useRef(new Value(State.UNDETERMINED)).current
  const pressed = useRef(new Value(regularScale)).current
  const scale = useRef(
    withTimingTransition(pressed, {
      easing,
      duration,
    })
  ).current

  useCode(
    () => [
      cond(eq(state, State.BEGAN), set(pressed, scaleWhenPressed)),
      cond(
        or(eq(state, State.END), eq(state, State.FAILED)),
        cond(eq(pressed, scaleWhenPressed), [
          set(pressed, regularScale),
          cond(
            eq(state, State.END),
            call([], () => onPress && onPress())
          ),
        ])
      ),
    ],
    [duration, scaleWhenPressed, regularScale, easing, onPress]
  )

  const gestureHandler = onGestureEvent({ state })

  return { gestureHandler, scale }
}

export default useScaleTransition

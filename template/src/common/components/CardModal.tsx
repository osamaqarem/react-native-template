import React, { memo, ReactNode } from "react"
import Animated, {
  cond,
  multiply,
  not,
  or,
  set,
  useCode,
  Value,
} from "react-native-reanimated"
import { bin, spring, useValue } from "react-native-redash"
import { layoutUtil } from "../helpers/layoutUtil"

const HEIGHT_OFFSET = 0.7
const TUCK_IN_HEIGHT = -0.05 * layoutUtil.height

interface Props {
  children: ReactNode
  tuckedIn: boolean
  cardHeight?: number
  almostTuckedIn?: boolean
}

const CardModal = memo(
  ({
    children,
    tuckedIn,
    cardHeight = layoutUtil.height,
    almostTuckedIn = false,
  }: Props) => {
    const animation = useValue(0)
    const heightValue = multiply(-cardHeight, HEIGHT_OFFSET)

    useCode(
      () => [
        cond(
          // down animation
          or(not(bin(tuckedIn)), bin(almostTuckedIn)),
          set(
            animation,
            spring({
              to: cond(bin(almostTuckedIn), TUCK_IN_HEIGHT, 0),
              from: animation,
              config: {
                damping: new Value(20),
              },
            })
          ),
          cond(or(bin(tuckedIn), not(bin(almostTuckedIn))), [
            // up animation
            set(
              animation,
              spring({
                to: heightValue,
                from: animation,
                config: {
                  damping: new Value(20),
                },
              })
            ),
          ])
        ),
      ],
      [tuckedIn, heightValue, almostTuckedIn]
    )

    return (
      <Animated.View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          position: "absolute",
          flex: 1,
          width: "100%",
          height: cardHeight * HEIGHT_OFFSET,
          bottom: -cardHeight * HEIGHT_OFFSET,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 6.65,
          elevation: 6,
          transform: [{ translateY: animation }],
          zIndex: 10,
        }}
      >
        {children}
      </Animated.View>
    )
  }
)

CardModal.displayName = "CardModal"
export default CardModal

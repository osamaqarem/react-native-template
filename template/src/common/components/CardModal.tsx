import React, { ReactNode, useMemo } from "react"
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
import { StyleSheet, ViewStyle } from "react-native"
import { layoutUtil } from "../helpers/layoutUtil"

const HEIGHT_OFFSET = 0.7
const TUCK_IN_HEIGHT = -0.05 * layoutUtil.height

interface Props {
  children: ReactNode
  visible: boolean
  cardHeight?: number
  almostTuckedIn?: boolean
  cardStyle?: ViewStyle
}

const CardModal = ({
  children,
  visible,
  cardHeight = layoutUtil.height,
  almostTuckedIn = false,
  cardStyle,
}: Props) => {
  const animation = useValue(0)
  const heightValue = useMemo(() => multiply(-cardHeight, HEIGHT_OFFSET), [
    cardHeight,
  ])

  const isTuckedIn = bin(visible)
  const isAlmostTuckedIn = bin(almostTuckedIn)

  useCode(
    () => [
      cond(
        // down animation
        or(not(isTuckedIn), isAlmostTuckedIn),
        set(
          animation,
          spring({
            to: cond(isAlmostTuckedIn, TUCK_IN_HEIGHT, 0),
            from: animation,
            config: {
              damping: new Value(20),
              mass: 0.6,
            },
          })
        ),
        cond(or(isTuckedIn, not(isAlmostTuckedIn)), [
          // up animation
          set(
            animation,
            spring({
              to: heightValue,
              from: animation,
              config: {
                damping: new Value(20),
                mass: 0.8,
              },
            })
          ),
        ])
      ),
    ],
    [visible, heightValue, almostTuckedIn]
  )

  return (
    <>
      <Animated.View
        style={[
          styles.card,
          {
            height: cardHeight * HEIGHT_OFFSET,
            bottom: -cardHeight * HEIGHT_OFFSET,
            transform: [{ translateY: animation }],
          },
          cardStyle,
        ]}
      >
        {children}
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    position: "absolute",
    flex: 1,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 6.65,
    elevation: 6,
    zIndex: 10,
  },
})

export default React.memo(CardModal)

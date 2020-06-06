import React, { memo, ReactNode, useState } from "react"
import Animated, {
  and,
  call,
  cond,
  multiply,
  not,
  set,
  useCode,
  Value,
} from "react-native-reanimated"
import { bin, spring } from "react-native-redash"
import { useMemoOne } from "use-memo-one"
import { UIHelper } from "../helpers/UIHelper"

const HEIGHT_OFFSET = 0.7

interface Props {
  children: ReactNode
  visible: boolean
  cardHeight?: number
}

const CardModal = memo(
  ({ children, visible, cardHeight = UIHelper.height }: Props) => {
    const [mayAnimateExit, setMayAnimateExit] = useState(() =>
      visible ? true : false
    )
    const animation = useMemoOne(() => new Value(0), [])
    const isVisible = useMemoOne(() => bin(visible), [])
    const heightValue = useMemoOne(() => multiply(-cardHeight, HEIGHT_OFFSET), [
      cardHeight,
    ])

    useCode(
      () => [
        cond(
          [and(not(isVisible), bin(mayAnimateExit))],
          set(
            animation,
            spring({
              to: 0,
              from: heightValue,
              config: {
                damping: new Value(20),
              },
            })
          ),
          cond(isVisible, [
            set(
              animation,
              spring({
                to: heightValue,
                from: 0,
                config: {
                  damping: new Value(20),
                },
              })
            ),
            cond(
              not(bin(mayAnimateExit)),
              call([], () => setMayAnimateExit(true))
            ),
          ])
        ),
      ],
      [isVisible, heightValue, mayAnimateExit]
    )

    return (
      <Animated.View
        style={{
          backgroundColor: "#FFFFFF",
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
        }}
      >
        {children}
      </Animated.View>
    )
  }
)

CardModal.displayName = "CardModal"
export default CardModal

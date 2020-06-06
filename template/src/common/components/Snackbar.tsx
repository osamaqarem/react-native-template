import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Animated, {
  cond,
  neq,
  set,
  useCode,
  Value,
} from "react-native-reanimated"
import { bin, timing } from "react-native-redash"
import { useMemoOne } from "use-memo-one"

const HEIGHT = 54

interface Props {
  visible: boolean
  message: string
}
const Snackbar = ({ visible, message }: Props) => {
  const translateY = useMemoOne(() => new Value(HEIGHT), [])
  useCode(
    () => [
      cond(
        bin(visible),
        set(
          translateY,
          timing({
            from: translateY,
            to: 0,
          })
        ),
        cond(
          neq(translateY, HEIGHT),
          set(
            translateY,
            timing({
              from: translateY,
              to: HEIGHT,
            })
          )
        )
      ),
    ],
    [visible]
  )

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.snackbar}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  text: {
    marginLeft: 38,
    color: "#fff",
    fontWeight: "bold",
  },
  snackbar: {
    height: HEIGHT,
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
})
export default Snackbar

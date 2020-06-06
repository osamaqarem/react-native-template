import React from "react"
import { ActivityIndicator, StyleSheet, Text } from "react-native"
import { INPUT_WIDTH } from "./NormalTextInput"
import TouchableScale from "./TouchableScale"

interface Props {
  onPress?: () => void
  loading?: boolean
  name: string
  color?: string
}

/**
 * A button with a simple scale animation.
 */
const NormalBtn = React.memo(
  ({ name = "", loading = false, color = "red", onPress }: Props) => {
    const btnContent = !loading ? (
      <Text style={styles.text}>{name}</Text>
    ) : (
      <ActivityIndicator color="#FFFFFF" size={28} animating={loading} />
    )

    return (
      <TouchableScale
        config={{
          onPress,
          duration: 50,
          scaleWhenPressed: 0.98,
          regularScale: 1,
        }}
        containerStyle={[
          styles.button,
          {
            backgroundColor: color ?? "crimson",
            opacity: !loading ? 1 : 0.8,
          },
        ]}
      >
        {btnContent}
      </TouchableScale>
    )
  }
)

NormalBtn.displayName = "NormalBtn"

const styles = StyleSheet.create({
  button: {
    width: INPUT_WIDTH,
    marginVertical: 8,
    alignSelf: "center",
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.0,
    elevation: 5,
  },
  text: {
    color: "#ffffff",
    letterSpacing: 0.4,
  },
})

export default NormalBtn

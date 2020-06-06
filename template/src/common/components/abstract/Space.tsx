import React from "react"
import { View } from "react-native"

interface SpaceVerticalProps {
  s: number
}
const SpaceVertical = ({ s }: SpaceVerticalProps) => (
  <View
    style={{
      marginVertical: s,
    }}
  />
)

const Space = {
  V: SpaceVertical,
}

export default Space

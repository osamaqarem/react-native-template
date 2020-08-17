import { Dimensions } from "react-native"
import Animated, { call, useCode } from 'react-native-reanimated'

// Initial dimensions of the view (not accurate after e.g. rotation)
const { height, width } = Dimensions.get("window")

const useDebug = (values: { [key: string]: Animated.Node<number> }) => {
  const keys = Object.keys(values)
  const nodes = Object.values(values)

  useCode(
    () =>
      call(nodes, (arrayOfNodes) => {
        keys.map((key, i) => console.log(key + " " + arrayOfNodes[i]))
      }),
    [keys]
  )
}

export const layoutUtil = {
  width,
  height,
  useDebug
}

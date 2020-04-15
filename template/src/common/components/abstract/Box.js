import React, { memo } from "react"
import { View } from "react-native"

const SCALE = [0, 4, 8, 12, 14, 16, 20, 24, 28]
export const Box = memo(
  ({
    children,
    mb,
    mt,
    mr,
    ml,
    mx,
    my,
    width,
    selfStart,
    selfCenter,
    selfEnd,
    justStart,
    justCenter,
    justEnd,
  }) => {
    const props = {
      ...(mt && { marginTop: SCALE[mt] }),
      ...(mb && { marginBottom: SCALE[mb] }),
      ...(ml && { marginLeft: SCALE[ml] }),
      ...(mr && { marginRight: SCALE[mr] }),
      ...(mx && { marginHorizontal: SCALE[mx] }),
      ...(my && { marginVertical: SCALE[mx] }),
      ...(width && { width }),
      ...(selfStart && { alignSelf: "flex-start" }),
      ...(selfCenter && { alignSelf: "center" }),
      ...(selfEnd && { alignSelf: "flex-end" }),
      ...(justStart && { justifyContent: "flex-start" }),
      ...(justCenter && { justifyContent: "center" }),
      ...(justEnd && { justifyContent: "flex-end" }),
    }

    return <View style={props}>{children}</View>
  }
)

Box.displayName = "Box"

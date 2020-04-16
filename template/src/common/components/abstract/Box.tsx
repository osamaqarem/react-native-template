import React, { memo, ReactNode } from "react"
import { FlexStyle, View, ViewStyle } from "react-native"

const SCALE = [0, 4, 8, 12, 14, 16, 20, 24, 28]
type RANGE = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface BoxProps {
  children?: ReactNode
  mt?: RANGE
  mb?: RANGE
  ml?: RANGE
  mr?: RANGE
  mx?: RANGE
  my?: RANGE
  width?: FlexStyle["width"]
  selfStart?: boolean
  selfCenter?: boolean
  selfEnd?: boolean
  justStart?: boolean
  justCenter?: boolean
  justEnd?: boolean
}
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
  }: BoxProps) => {
    const props: ViewStyle = {
      ...(mt && { marginTop: SCALE[mt] }),
      ...(mb && { marginBottom: SCALE[mb] }),
      ...(ml && { marginLeft: SCALE[ml] }),
      ...(mr && { marginRight: SCALE[mr] }),
      ...(mx && { marginHorizontal: SCALE[mx] }),
      ...(my && { marginVertical: SCALE[my] }),
      ...(width && { width }),
      alignSelf:
        (selfStart && ("flex-start" as const)) ||
        (selfCenter && ("center" as const)) ||
        (selfEnd && ("flex-end" as const)) ||
        ("auto" as const),
      justifyContent:
        (justStart && ("flex-start" as const)) ||
        (justCenter && ("center" as const)) ||
        (justEnd && ("flex-end" as const)) ||
        "flex-start",
    }

    return <View style={props}>{children}</View>
  }
)

Box.displayName = "Box"

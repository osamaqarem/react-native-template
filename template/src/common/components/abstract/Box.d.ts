import { ReactNode } from "react"
import { FlexStyle } from "react-native"

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

declare const Box: React.FC<BoxProps>

export default Box

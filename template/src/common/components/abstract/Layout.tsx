import styled from "styled-components/native"
import {
  color,
  ColorProps,
  flexbox,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  FlexboxProps,
} from "styled-system"
import { theme } from "../../theme"

type Colors = ColorProps<typeof theme>
type Typography = {
  fontFamily?: keyof typeof theme["fonts"]
  fontSize?: keyof typeof theme["fontSizes"]
  letterSpacing?: keyof typeof theme["letterSpacings"]
}

export const Box = styled.View<
  Colors & SpaceProps & LayoutProps & FlexboxProps
>`
  ${color}
  ${space}
  ${layout}
  ${flexbox}
`
export const P = styled.Text<Colors & Typography>`
  ${color}
  ${typography}
`

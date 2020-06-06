import { Dimensions, Platform } from "react-native"

// Initial dimensions of the view (not accurate after e.g. rotation)
const { height, width } = Dimensions.get("window")


// Useful to check if the iOS device has a notch.
const isIphoneX =
  Platform.OS === "ios" &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812 || height === 896 || width === 896)


export const UIHelper = {
  width,
  height,
  isIphoneX,
}

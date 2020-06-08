import * as React from "react"
import { RootStackParamsList } from "../../features/navigation/Navigator"
import { CommonActions } from "@react-navigation/native"

/**
 * Used in {@link Navigator} to keep track of navigation container mounts.
 */
export const isMountedRef: any = React.createRef()

/**
 * Used for navigation by NavigationService
 */
export const navigationRef: any = React.createRef()

const ERROR_NOT_INIT =
  "Navigation Service: attempting to navigate with an unintialized ref."

/**
 * Go to a screen using .navigate()
 */
const navigate = (name: keyof RootStackParamsList, params?: object) => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params)
  } else {
    throw new Error(ERROR_NOT_INIT)
  }
}

/**
 * Go to a screen and remove all other screens in the current stack.
 */
const navigateAndReset = (name: keyof RootStackParamsList, params?: object) => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.dispatch(
      CommonActions.reset({
        routes: [{ name, params }],
      })
    )
  } else {
    throw new Error(ERROR_NOT_INIT)
  }
}

/**
 * Pop the current screen.
 */
const goBack = () => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.goBack()
  } else {
    throw new Error(ERROR_NOT_INIT)
  }
}

export const navigationService = {
  navigate,
  navigateAndReset,
  goBack,
}

import * as React from "react"
import { RootStackParamsList } from "../../features/navigation/Navigator"
import { CommonActions, StackActions } from "@react-navigation/native"

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

export type GetRouteParams<T extends keyof RootStackParamsList> = Pick<RootStackParamsList, T>[T]

type Screens = keyof RootStackParamsList

/**
 * Go to a screen using .navigate()
 */
const navigate = <T extends object>(name: Screens, params?: T) => {
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
const navigateAndReset = <T extends object>(name: Screens, params?: T) => {
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

/**
 * Replace the current screen.
 */
const replace = <T extends object>(name: Screens, params?: T) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.dispatch(
      StackActions.replace(name, params)
    )
  } else {
    throw new Error(ERROR_NOT_INIT)
  }
}


/**
 * Custom navigation stack reset.
 * e.g.
 * navigationService.reset([
 *        { name: "Screen1" },
 *        { name: "Screen2" },
 *        { name: "Screen3" },
 *        { name: "Screen4" },
 *      ], 3)
 */
const reset = <T extends object>(routes: { name: Screens, params?: T }[], index: number) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.dispatch(
      CommonActions.reset({
        index,
        routes,
      })
    )
  } else {
    throw new Error(ERROR_NOT_INIT)
  }
}

/**
 * Pop the desired number of screens.
 */
const pop = (count: number) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.dispatch(
      StackActions.pop(count)
    )
  } else {
    throw new Error(ERROR_NOT_INIT)
  }
}

export const navigationService = {
  navigate,
  navigateAndReset,
  goBack,
  replace,
  reset,
  pop,
}

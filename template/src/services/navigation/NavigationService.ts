import * as React from "react"
import { RootStackParamsList } from "../../features/navigation/Navigator"
import { CommonActions } from "@react-navigation/native"

export const isMountedRef: any = React.createRef()

export const navigationRef: any = React.createRef()

class NavigationService {
  private static ERROR_NOT_INIT =
    "Navigation Service: attempting to navigate with an unintialized ref."

  public static navigate(name: keyof RootStackParamsList, params: any) {
    if (isMountedRef.current && navigationRef.current) {
      // Perform navigation if the app has mounted
      navigationRef.current.navigate(name, params)
    } else {
      throw new Error(this.ERROR_NOT_INIT)
    }
  }

  public static navigateAndReset(
    name: keyof RootStackParamsList,
    params?: any
  ) {
    if (isMountedRef.current && navigationRef.current) {
      // Perform navigation if the app has mounted
      navigationRef.current.dispatch(
        CommonActions.reset({
          routes: [{ name, params }]
        })
      )
    } else {
      throw new Error(this.ERROR_NOT_INIT)
    }
  }
}

export default NavigationService

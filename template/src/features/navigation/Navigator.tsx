import SplashScreen from "react-native-bootsplash"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import {
  isMountedRef,
  navigationRef,
} from "../../services/navigation/navigationService"
import Home from "../home/Home"
import Landing from "../landing/Landing"

export type RootStackParamsList = {
  Home: undefined
  Landing: undefined
}

const Stack = createStackNavigator<RootStackParamsList>()

function Navigator() {
  /**
   * Hide the splash screen on mount
   * Keep track of nav container mounts for usage of {@link NavigationService}
   */
  useEffect(() => {
    isMountedRef.current = true
    SplashScreen.hide({ duration: 250 })
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

import SplashScreen from "react-native-splash-screen"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import {
  isMountedRef,
  navigationRef
} from "../../services/navigation/NavigationService"
import Home from "../home/Home"
import Login from "../login/Login"

export type RootStackParamsList = {
  Home: undefined
  Login: undefined
}

const Stack = createStackNavigator<RootStackParamsList>()

function Navigator() {
  useEffect(() => {
    isMountedRef.current = true
    SplashScreen.hide()
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

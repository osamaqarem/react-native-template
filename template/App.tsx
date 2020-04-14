/**
 * Generated from
 * https://github.com/osamaq/react-native-template-osamaq
 *
 */

import * as Sentry from "@sentry/react-native"
import React from "react"
import { Platform, UIManager } from "react-native"
import { enableScreens } from "react-native-screens"
import { Provider } from "react-redux"
import { store, persistor } from "./src/redux/store"
import { PersistGate } from "redux-persist/integration/react"
import ErrorBoundary from "./src/features/errorboundary/ErrorBoundary"
import Navigator from "./src/features/navigation/Navigator"
import { ThemeProvider } from "styled-components/native"
import reactotron from "./reactotron"
import BuildConfig from "react-native-config"
import { makeMirage } from "./src/services/network/service/mirage"
import NetworkHelper from "./src/common/helpers/NetworkHelper"
import { theme } from "./src/common/theme"
;(function setup() {
  // React Navigation, optimize memory usage.
  enableScreens()

  // Initialize sentry SDK. Insert your DSN string.
  const DSN = null

  !__DEV__ &&
    DSN &&
    Sentry.init({
      dsn: DSN,
      beforeBreadcrumb(breadcrumb, _) {
        if (breadcrumb?.data?.url === NetworkHelper.pingingUrl) {
          return null
        }
        return breadcrumb
      },
    })

  // Reactotron
  __DEV__ &&
    import("./reactotron").then(() => {
      console.log("Reactotron Configured")
      console.rtron.clear()
      console.tron("Environement: ", BuildConfig.ENV)
    })

  // Layout animation
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  // Mirage – API Mocking
  if (BuildConfig.MOCK_EXAMPLE_API === "YES") {
    makeMirage()
    __DEV__ && console.log("Mirage Configured")
  }
})()

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Navigator />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

const AppWithOverlay = __DEV__ ? reactotron.overlay(App) : App

export default AppWithOverlay

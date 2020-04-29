/**
 * Generated from
 * https://github.com/osamaq/react-native-template-osamaq
 *
 */

import * as Sentry from "@sentry/react-native"
import React from "react"
import { Platform, UIManager } from "react-native"
import BuildConfig from "react-native-config"
import { enableScreens } from "react-native-screens"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import reactotron from "./reactotron"
import NetworkHelper from "./src/common/helpers/NetworkHelper"
import ErrorBoundary from "./src/features/error-boundary/ErrorBoundary"
import Navigator from "./src/features/navigation/Navigator"
import { persistor, store } from "./src/redux/store"
import { makeMirage } from "./src/services/network/mock/mirage"
;(function setup() {
  // Log environement variables
  console.tron(BuildConfig)

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
          <Navigator />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

const AppWithOverlay = __DEV__ ? reactotron.overlay(App) : App

export default AppWithOverlay

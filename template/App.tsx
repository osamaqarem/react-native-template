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
import NetworkHelper from "./src/common/helpers/NetworkHelper"
import reactotron from "./reactotron"

function setup() {
  // React Navigation, optimize memory usage.
  enableScreens()

  // Initialize sentry SDK. Insert your DSN string.
  const DSN = null
  DSN &&
    Sentry.init({
      dsn: DSN,
      beforeBreadcrumb(breadcrumb, _) {
        if (breadcrumb?.data?.url === NetworkHelper.pingingUrl) {
          return null
        }
        return breadcrumb
      }
    })

  // Reactotron
  __DEV__ &&
    import("./reactotron").then(() => {
      console.log("Reactotron Configured")
      console.rtron.clear()
    })

  // Layout animation
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }
}

setup()

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

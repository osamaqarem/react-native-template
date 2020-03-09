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
import ErrorBoundary from "./src/features/errorboundary/ErrorBoundary"
import Navigator from "./src/features/navigation/Navigator"
import store from "./src/redux/store"
import NetworkHelper from "./src/common/helpers/NetworkHelper"

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
    import("./reactotron").then(() => console.log("Reactotron Configured"))

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
        <Navigator />
      </Provider>
    </ErrorBoundary>
  )
}

export default App

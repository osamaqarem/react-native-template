import * as Sentry from "@sentry/react-native"
import { Action } from "redux"

// Log redux action type to sentry
export default () => (next: any) => (action: Action<string>) => {
  action.type &&
    Sentry.addBreadcrumb({
      category: action.type
    })

  return next(action)
}

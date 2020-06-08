import * as Sentry from "@sentry/react-native"
import { Action } from "redux"

// Add redux action type to sentry error log for when an error happens.
const sentryMiddleware = () => (next: any) => (action: Action<string>) => {
  action.type &&
    Sentry.addBreadcrumb({
      category: action.type
    })

  return next(action)
}

export default sentryMiddleware
import BuildConfig from "react-native-config"
import { from } from "rxjs"
import HttpException from "../../../../common/exceptions/HttpException"
import { ApiClient } from "../ApiClient"
import { ExampleApiEndpoints, ExampleApi } from "./ExampleApi"

const BASE_URL = BuildConfig.EXAMPLE_API_BASE_URL

/**
 * ExampleApiImplementation talks to BaseApiService API client to
 * perform HTTP requests.
 *
 * Also contains business logic specific to ExampleApi.
 *
 * To add new endpoints @see ExampleRestApi
 */
const ExampleApiImplementation: ExampleApiEndpoints = {
  login: () =>
    from(
      ApiClient.get({
        url: BASE_URL + ExampleApi.login(),
        timeoutInSeconds: 10,
      })
    ),
  logout: () =>
    ApiClient.get({
      url: BASE_URL + ExampleApi.logout(),
    }),
  submit: (body: object, token: string) =>
    from(
      ApiClient.get({
        url: BASE_URL + ExampleApi.submit(),
        body,
        token,
      })
    ),
}

/**
 * API specific business logic
 */
const isTokenValid = (exp: number) => {
  if (Date.now() > exp) {
    return false
  }
  return true
}

const timedOut = (err: any) => {
  if (
    typeof err === "object" &&
    "message" in err &&
    err.message === "Aborted"
  ) {
    return true
  } else {
    return false
  }
}

const sessionIsExpired = (err: any) => {
  if (
    typeof err === "object" &&
    err instanceof HttpException &&
    err.status == 401
  ) {
    if (
      err.message === "Invalid access token" ||
      err.message.includes("expired")
    ) {
      return true
    }
  }
}

export const ExampleApiService = {
  ...ExampleApiImplementation,
  isTokenValid,
  timedOut,
  sessionIsExpired,
}

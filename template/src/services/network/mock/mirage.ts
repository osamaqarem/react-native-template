import { Server } from "miragejs"
import BuildConfig from "react-native-config"
import GenericResponse from "../exampleApi/models/GenericResponse"

/**
 * Use mirage to mock APIs.
 */
export const makeMirage = () =>
  new Server({
    urlPrefix: BuildConfig.EXAMPLE_API_BASE_URL,
    routes() {
      ; (this.pretender.handledRequest = function (verb, path, request) {
        console.tron(`${verb}: ${path}`, request)
      }),
        this.get(
          "/200",
          (): GenericResponse => ({
            code: 200,
            description: "OK",
          })
        )
    },
  })

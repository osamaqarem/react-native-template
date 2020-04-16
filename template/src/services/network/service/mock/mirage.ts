import { Server } from "miragejs"
import BuildConfig from "react-native-config"
import GenericResponse from "../../models/GenericResponse"

/**
 * Use mirage to mock APIs.
 */
export const makeMirage = () =>
  new Server({
    urlPrefix: BuildConfig.EXAMPLE_API_BASE_URL,
    routes() {
      this.get(
        "/200",
        (): GenericResponse => ({
          code: 200,
          description: "OK",
        })
      )
    },
  })

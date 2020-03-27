import Config from "react-native-config"
import { from } from "rxjs"
import HttpException from "../../exceptions/HttpException"
import GenericResponse from "../../models/GenericResponse"
import ExampleRestApi, { ApiEndpoints } from "./ExampleRestApi"
import BaseApiService from "../BaseApiService"

export default class ExampleApiService extends BaseApiService
  implements ApiEndpoints {
  private BASE_URL = Config.EXAMPLE_API_BASE_URL

  sessionIsExpired = (err: any) => {
    if (err instanceof HttpException && err.status == 401) {
      return true
    } else {
      return false
    }
  }

  isTokenValid(exp: number) {
    if (Date.now() > exp) {
      return false
    }
    return true
  }

  /**
   * Set up common request configrations
   */

  getHttpPostConfig = (body: object, token: string) => ({
    method: "post",
    body: JSON.stringify(body),
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    }
  })

  /**
   * Set up API endpoints
   */

  login = () =>
    from(
      super.api<GenericResponse>({
        url: this.BASE_URL + ExampleRestApi.login(),
        timeoutInSeconds: 10
      })
    )

  logout = () =>
    this.api<GenericResponse>({ url: this.BASE_URL + ExampleRestApi.logout() })

  submit = (body: {}, token: string) =>
    from(
      super.api<GenericResponse>({
        url: this.BASE_URL + ExampleRestApi.submit(),
        config: this.getHttpPostConfig(body, token)
      })
    )
}

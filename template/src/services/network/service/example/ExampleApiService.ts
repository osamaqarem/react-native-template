import { from } from "rxjs"
import HttpException from "../../exceptions/HttpException"
import GenericResponse from "../../models/GenericResponse"
import RestApi, { ApiEndpoints } from "./RestApi"
import BaseApiService from "../BaseApiService"

export default class ExampleApiService extends BaseApiService
  implements ApiEndpoints {
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
      this.api<GenericResponse>({ url: RestApi.login(), timeoutInSeconds: 10 })
    )

  logout = () => this.api<GenericResponse>({ url: RestApi.logout() })

  submit = (body: {}, token: string) =>
    from(
      this.api<GenericResponse>({
        url: RestApi.submit(),
        config: this.getHttpPostConfig(body, token)
      })
    )
}

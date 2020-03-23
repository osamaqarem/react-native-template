import { from } from "rxjs"
import NetworkHelper from "../../../common/helpers/NetworkHelper"
import RestApi, { ApiEndpoints } from "../RestApi"
import GenericResponse from "../models/GenericResponse"
import HttpException from "../exceptions/HttpException"
import OfflineException from "../exceptions/OfflineException"

export default class ApiService implements ApiEndpoints {
  private defaultTimeout = 30
  private BASE_URL = "https://httpstat.us/"
  private ERR_NO_INTERNET = "Internet not reachable"
  private httpGetConfig = {
    method: "get",
    headers: {
      accept: "application/json"
    }
  }

  /**
   * Only return the request if its JSON, otherwise throws.
   */

  private responseOkOrThrow = async <T>(res: Response) => {
    const isJSON = res.headers
      .get("Content-Type")
      ?.startsWith("application/json")

    const isText = res.headers.get("Content-Type")?.startsWith("text")

    if (res.ok && isJSON) {
      // HTTP 2XX
      return (await res.json()) as Promise<T>
    } else {
      // Not 2XX
      if (isJSON) {
        const error: GenericResponse = await res.json()
        throw new HttpException(error.code, error.description, res.url)
      } else if (isText) {
        const errorText = await res.text()
        throw new HttpException(res.status, errorText, res.url)
      }
      // Not 2XX, not JSON and not text.
      throw new HttpException(res.status, "Unsupported content type", res.url)
    }
  }

  /**
   * API Client
   */

  private api = async <T>({
    url,
    config,
    timeoutInSeconds
  }: {
    url: RequestInfo
    config?: RequestInit
    timeoutInSeconds?: number
  }) => {
    if (NetworkHelper.isInternetReachable) {
      const fullURL = this.BASE_URL + url
      const reqConfig = config || this.httpGetConfig
      const reqTimeout = timeoutInSeconds || this.defaultTimeout

      const contoller = new AbortController()
      const finalConfig = { signal: contoller.signal, ...reqConfig }

      const abort = setTimeout(() => {
        contoller.abort()
      }, reqTimeout * 1000)

      const result = await fetch(fullURL, finalConfig)
      clearTimeout(abort)

      return this.responseOkOrThrow<T>(result)
    } else {
      throw new OfflineException(
        "Offline",
        this.ERR_NO_INTERNET,
        url.toString()
      )
    }
  }

  /**
   * Set up common error handling logic
   */

  requestTimedOut = (err: any) => {
    if ("message" in err && err.message === "Aborted") {
      return true
    } else {
      return false
    }
  }

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

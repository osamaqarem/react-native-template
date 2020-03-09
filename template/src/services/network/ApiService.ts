import { from } from "rxjs"
import NetworkHelper from "../../common/helpers/NetworkHelper"
import HttpException from "./exceptions/HttpException"
import OfflineException from "./exceptions/OfflineException"
import GenericResponse from "./models/GenericResponse"
import RestApi, { ApiEndpoints } from "./RestApi"

class ApiService implements ApiEndpoints {
  private defaultTimeout = 30
  private BASE_URL = "https://httpstat.us/"
  private ERR_NO_INTERNET = "Internet not reachable"
  private defaultConfig = {
    headers: {
      Accept: "application/json"
    }
  }

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
      const reqConfig = config || this.defaultConfig
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

  public requestTimedOut = (err: any) => {
    if ("message" in err && err.message === "Aborted") {
      return true
    } else {
      return false
    }
  }

  public sessionIsExpired = (err: any) => {
    if (err instanceof HttpException && err.status == 401) {
      return true
    } else {
      return false
    }
  }

  public login = () =>
    from(
      this.api<GenericResponse>({ url: RestApi.login(), timeoutInSeconds: 10 })
    )

  public logout = () => this.api<GenericResponse>({ url: RestApi.logout() })
}

export default new ApiService()

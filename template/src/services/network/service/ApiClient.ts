import NetworkHelper from "../../../common/helpers/NetworkHelper"
import HttpException from "../exceptions/HttpException"
import OfflineException from "../exceptions/OfflineException"
import GenericResponse from "../models/GenericResponse"

type ContentType = "JSON" | "Text" | "Unsupported"
interface ApiConfig {
  url: RequestInfo
  verb?: "GET" | "PUT" | "POST" | "DELETE"
  timeoutInSeconds?: number
  token?: string
  body?: object
}

const defaultTimeout = 30

const getContentType = (res: Response): ContentType => {
  const isJSON =
    res.headers.get("Content-Type")?.startsWith("application/json") || false
  if (isJSON) return "JSON"
  const isText = res.headers.get("Content-Type")?.startsWith("text") || false
  if (isText) return "Text"

  return "Unsupported"
}

const getHttpConfig = (
  verb: ApiConfig["verb"] = "GET",
  token?: string,
  body?: object
): RequestInit => {
  const base = {
    method: verb,
    headers: {
      accept: "application/json",
    },
  }

  const withBody = body ? { ...base, body: JSON.stringify(body) } : base

  const withToken = token
    ? {
        ...withBody,
        headers: {
          ...base.headers,
          authorization: `Bearer ${token}`,
        },
      }
    : withBody

  return withToken
}

const doThrow = async (res: Response, contentType: ContentType) => {
  // Not 2XX
  if (contentType === "JSON") {
    const error: GenericResponse = await res.json()
    throw new HttpException(error.code, error.description, res.url)
  } else if (contentType === "Text") {
    const errorText = await res.text()
    throw new HttpException(res.status, errorText, res.url)
  }

  // Not 2XX, not JSON and not text.
  throw new HttpException(res.status, "Unsupported content type", res.url)
}

const processResponse = async (res: Response) => {
  const contentType = getContentType(res)

  // HTTP 2XX
  if (res.ok) {
    if (contentType === "JSON") {
      return await res.json()
    } else {
      return res
    }
  }

  return doThrow(res, contentType)
}

const makeRequest = async ({
  url,
  verb,
  timeoutInSeconds,
  token,
  body,
}: ApiConfig) => {
  if (NetworkHelper.isInternetReachable) {
    const reqConfig = getHttpConfig(verb, token, body)

    const reqTimeout = timeoutInSeconds || defaultTimeout

    const contoller = new AbortController()
    const finalConfig = { signal: contoller.signal, ...reqConfig }

    const abort = setTimeout(() => {
      contoller.abort()
    }, reqTimeout * 1000)

    const res = await fetch(url, finalConfig)

    clearTimeout(abort)

    return processResponse(res)
  } else {
    throw new OfflineException(
      "Offline",
      "Internet not reachable",
      url.toString()
    )
  }
}

export const ApiClient = {
  get: ({ token, body, url, timeoutInSeconds }: Omit<ApiConfig, "verb">) =>
    makeRequest({ token, body, url, timeoutInSeconds, verb: "GET" }),
  post: ({ token, body, url, timeoutInSeconds }: Omit<ApiConfig, "verb">) =>
    makeRequest({ token, body, url, timeoutInSeconds, verb: "POST" }),
  put: ({ token, body, url, timeoutInSeconds }: Omit<ApiConfig, "verb">) =>
    makeRequest({ token, body, url, timeoutInSeconds, verb: "PUT" }),
  delete: ({ token, body, url, timeoutInSeconds }: Omit<ApiConfig, "verb">) =>
    makeRequest({ token, body, url, timeoutInSeconds, verb: "DELETE" }),
}

/**
 * All custom exceptions should extend this class.
 */
export default class BaseException extends Error {
  private _status: number | string
  private _message: string
  private _url: string
  private _originalError: object
  public _type: string = 'BaseException'

  get status(): number | string {
    return this._status
  }

  get message(): string {
    return this._message
  }

  get url(): string {
    return this._url
  }

  get originalError(): object {
    return this._originalError
  }

  constructor(status: number | string, message: string, url: string, originalError: object) {
    super()

    this._status = status
    this._message = message
    this._url = url
    this._originalError = originalError
  }
}

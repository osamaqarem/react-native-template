/**
 * All custom exceptions should extend this class.
 */
export default class BaseException extends Error {
  private _status: Nullable<number | string>
  private _message: Nullable<string>
  private _url: Nullable<string>
  private _originalError: Nullable<object>
  public _type = 'BaseException'

  get status() {
    return this._status
  }

  get message() {
    return this._message || 'unknown'
  }

  get url() {
    return this._url
  }

  get originalError(): Nullable<object> {
    return this._originalError
  }

  constructor(status: Nullable<number | string> = 'unknown', message: Nullable<string> = 'unknown', url: Nullable<string> = 'unknown', originalError: Nullable<object>) {
    super(message ?? undefined)

    this._status = status
    this._message = message
    this._url = url
    this._originalError = originalError
  }
}
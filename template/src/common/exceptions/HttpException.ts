import BaseException from "./BaseException"

export default class HttpException extends BaseException {
    constructor(
        status: Nullable<number | string> = "unknown",
        message: Nullable<string> = "unknown",
        url: Nullable<string> = "unknown",
        originalError: Nullable<object>
    ) {
        super(status, message, url, originalError)
        this._type = "HttpException"
    }
}
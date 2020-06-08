import BaseException from "./BaseException"

export default class HttpException extends BaseException {
    constructor(status: number | string, message: string, url: string, originalError: object) {
        super(status, message, url, originalError);
        this._type = 'HttpException'
    }
}

import { captureMessage } from "@sentry/react-native"

/**
 * Send to Sentry
 */
const captureLog = (msg: any) => {
    if (msg) {
        if (typeof msg === "object") {
            captureMessage(JSON.stringify(msg))
        } else {
            captureMessage(msg)
        }
    }
}


export const logUtil = {
    captureLog,
}

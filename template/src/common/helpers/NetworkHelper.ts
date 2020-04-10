import NetInfo from "@react-native-community/netinfo"

// This url is pinged to check network connectivity
const pingingUrl = "https://clients3.google.com/generate_204"
// Keeps track of connectivity state
let isInternetReachable = false

// A subscription that pings pingingUrl and updates isInternetReachable.
const unsubscribe = NetInfo.addEventListener((state) => {
  isInternetReachable = state.isInternetReachable ?? false
})

// Useful for multi-part form submissions.
const getFormUrlEncoded = (jsonBody: any) => {
  const formBody: any = []

  for (const key in jsonBody) {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(jsonBody[key])
    formBody.push(encodedKey + "=" + encodedValue)
  }
  return formBody.join("&")
}

export const NetworkHelper = {
  pingingUrl,
  isInternetReachable,
  unsubscribe,
  getFormUrlEncoded,
}

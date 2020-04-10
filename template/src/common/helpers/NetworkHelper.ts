import NetInfo from "@react-native-community/netinfo"

class NetworkHelper {
  // This url is pinged to check network connectivity
  // Keeps track of connectivity state
  pingingUrl = "https://clients3.google.com/generate_204"
  isInternetReachable = false

  // A subscription that pings pingingUrl and updates isInternetReachable.
  unsubscribe = NetInfo.addEventListener((state) => {
    // in iOS simulator, its always not connected.
    if (__DEV__ && state.isConnected) {
      this.isInternetReachable = true
    } else {
      this.isInternetReachable = state.isInternetReachable ?? false
    }
  })
  // Useful for multi-part form submissions.
  getFormUrlEncoded = (jsonBody: any) => {
    const formBody: any = []

    for (const key in jsonBody) {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(jsonBody[key])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    return formBody.join("&")
  }
}

export default new NetworkHelper()

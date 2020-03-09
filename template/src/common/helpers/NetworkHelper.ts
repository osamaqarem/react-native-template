import NetInfo from "@react-native-community/netinfo"

class NetworkHelper {
  public pingingUrl = "https://clients3.google.com/generate_204"
  public isInternetReachable = false

  public unsubscribe = NetInfo.addEventListener(state => {
    this.isInternetReachable = state.isInternetReachable ?? false
  })

  public getFormUrlEncoded = (jsonBody: any) => {
    const formBody: any = []

    for (let key in jsonBody) {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(jsonBody[key])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    return formBody.join("&")
  }
}

export default new NetworkHelper()

import Reactotron from "reactotron-react-native"
// @ts-ignore
import ReactotronFlipper from "reactotron-react-native/dist/flipper"
import AsyncStorage from "@react-native-community/async-storage"
import { reactotronRedux } from "reactotron-redux"
import NetworkHelper from "./src/common/helpers/NetworkHelper"

declare global {
  interface Console {
    tron: typeof console.log
    rtron: Required<typeof Reactotron>
  }
}

let reactotron: any

if (__DEV__) {
  reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({
      name: "HelloWorld",
      createSocket: (path) => new ReactotronFlipper(path),
    }) // controls connection & communication settings
    .use(reactotronRedux())
    .useReactNative({
      networking: {
        ignoreUrls: new RegExp(NetworkHelper.pingingUrl),
      },
    }) // add all built-in react native plugins

  reactotron.connect()

  console.rtron = reactotron as Required<typeof Reactotron>
  console.tron = (...args) => {
    console.log(...args)
    // @ts-ignore
    reactotron.logImportant(...args)
  }

  console.tron("Reactotron Configured")
}

export default reactotron as Required<typeof Reactotron>

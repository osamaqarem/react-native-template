import Config from "react-native-config"
import ExampleApiService from "./ExampleApiService"
import MockApiService from "./mock/ExampleMockApiService"

export const exampleApi = Config.BUILD_VARIANT
  ? new MockApiService()
  : new ExampleApiService()

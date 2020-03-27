import Config from "react-native-config"
import ExampleApiService from "./ExampleApiService"
import MockApiService from "./mock/ExampleMockApiService"

export const exampleApi =
  Config.MOCK_EXAMPLE_API === "YES"
    ? new MockApiService()
    : new ExampleApiService()

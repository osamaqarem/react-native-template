import { mock } from "../../../package.json"
import ExampleApiService from "./service/example/ExampleApiService"
import MockApiService from "./service/example/mock/ExampleMockApiService"

export const api = !mock ? new ExampleApiService() : new MockApiService()

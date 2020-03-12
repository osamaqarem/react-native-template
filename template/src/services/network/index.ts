import { mock } from "../../../package.json"
import ApiService from "./service/ApiService"
import MockApiService from "./service/mock/MockApiService"

export const api = !mock ? new ApiService() : new MockApiService()

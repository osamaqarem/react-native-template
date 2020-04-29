import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import authReducer from "./slices/authSlice"
import AsyncStorage from "@react-native-community/async-storage"

// Redux persist
const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: []
}

const rootReducer = combineReducers({
  auth: authReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>

export default persistReducer(rootPersistConfig, rootReducer)

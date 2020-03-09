import { combineReducers } from "redux"
import authReducer from "./slices/authslice"

const rootReducer = combineReducers({
  auth: authReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>

export default rootReducer

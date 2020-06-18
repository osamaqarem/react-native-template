import { combineReducers } from "redux"
import { exampleReducer } from './slices/exampleSlice'

export const rootReducer = combineReducers({
  example: exampleReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>
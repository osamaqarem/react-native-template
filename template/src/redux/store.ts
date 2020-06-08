import { configureStore, Action, getDefaultMiddleware } from "@reduxjs/toolkit"
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable"
import reactotron from "../../reactotron"
import sentryMiddleware from "./middleware/sentryMiddleware"
import { rootReducer, RootStoreType } from "./rootReducer"
import { exampleEpics } from "./slices/exampleSlice"

// Redux observable
export type MyEpic = Epic<any, any, RootStoreType, any>
export const rootEpic = combineEpics(...exampleEpics)
const epicMiddleware = createEpicMiddleware<any, any, RootStoreType, any>()

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware, sentryMiddleware, ...getDefaultMiddleware()],
  // Only create reactotron enhancer in DEV
  enhancers: (__DEV__ && [reactotron.createEnhancer()]) || undefined,
  devTools: true,
})

export type AppDispatch = typeof store.dispatch

epicMiddleware.run(rootEpic)

export default store

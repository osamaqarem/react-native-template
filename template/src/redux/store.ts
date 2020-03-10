import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit"
import { combineEpics, createEpicMiddleware } from "redux-observable"
import { loginEpic } from "./slices/authslice"
import rootReducer from "./rootReducer"
import reactotron from "../../reactotron"
import sentryMiddleware from "./middleware/sentryMiddleware"

// Redux observable
export const rootEpic = combineEpics(loginEpic)
const epicMiddleware = createEpicMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware, sentryMiddleware, ...getDefaultMiddleware()],
  // Only create reactotron enhancer in DEV
  enhancers: (__DEV__ && [reactotron.createEnhancer()]) || undefined,
  devTools: false
})

epicMiddleware.run(rootEpic)

export default store

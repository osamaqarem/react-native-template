import { configureStore, Action } from "@reduxjs/toolkit"
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable"
import { persistStore } from "redux-persist"
import thunk from "redux-thunk"
import reactotron from "../../reactotron"
import sentryMiddleware from "./middleware/sentryMiddleware"
import persistedReducer, { RootStoreType } from "./rootReducer"
import { authEpics } from "./slices/authSlice"

// Redux observable
export type MyEpic = Epic<Action, Action, RootStoreType, any>
export const rootEpic = combineEpics(...authEpics)
const epicMiddleware = createEpicMiddleware<any, any, RootStoreType, any>()

const store = configureStore({
  reducer: persistedReducer,
  middleware: [epicMiddleware, sentryMiddleware, thunk],
  // Only create reactotron enhancer in DEV
  enhancers: (__DEV__ && [reactotron.createEnhancer()]) || undefined,
  devTools: true,
})

export type AppDispatch = typeof store.dispatch

epicMiddleware.run(rootEpic)

const persistor = persistStore(store)

export { store, persistor }

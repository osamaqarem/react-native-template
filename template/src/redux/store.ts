import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit"
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable"
import { persistStore } from "redux-persist"
import thunk from "redux-thunk"
import { authEpics } from "./slices/authslice"
import persistedReducer, { RootStoreType } from "./rootReducer"
import reactotron from "../../reactotron"
import sentryMiddleware from "./middleware/sentryMiddleware"

// Redux observable
export type MyEpic = Epic<any, any, RootStoreType, any>
export const rootEpic = combineEpics(...authEpics)
const epicMiddleware = createEpicMiddleware<any, any, RootStoreType, any>()

const store = configureStore({
  reducer: persistedReducer,
  middleware: [epicMiddleware, sentryMiddleware, thunk],
  // Only create reactotron enhancer in DEV
  enhancers: (__DEV__ && [reactotron.createEnhancer()]) || undefined,
  devTools: false
})

epicMiddleware.run(rootEpic)

const persistor = persistStore(store)

export { store, persistor }

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ofType } from "redux-observable"
import { concat, of } from "rxjs"
import { catchError, map, switchMap } from "rxjs/operators"
import NavigationService from "../../services/navigation/NavigationService"
import { ExampleApiService } from "../../services/network/service/exampleApi/ExampleApiService"
import { AppDispatch, MyEpic } from "../store"

type AuthReducer = {
  authState: "SIGNED_IN" | "SIGNED_OUT"
  loading: boolean
}

const initialState: AuthReducer = {
  authState: "SIGNED_OUT",
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: () => {},
    AUTH_DONE: (_, action: PayloadAction<AuthReducer["authState"]>) => ({
      authState: action.payload,
      loading: false,
    }),
    AUTH_LOADING: (state) => ({ ...state, loading: true }),
    AUTH_ERROR: () => initialState,
  },
})

const loginEpic: MyEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN.type),
    switchMap(() => {
      const request$ = ExampleApiService.login().pipe(
        map((res) => {
          NavigationService.navigateAndReset("Home")

          if (res.description === "OK") {
            const outcome: AuthReducer["authState"] = "SIGNED_IN"

            return {
              type: AUTH_DONE.type,
              payload: outcome,
            }
          } else {
            return AUTH_ERROR()
          }
        }),
        catchError((err) => {
          if (ExampleApiService.sessionIsExpired(err)) {
            return logout()
          }
          console.warn(err)
          __DEV__ && console.tron(err.stack)
          return of(AUTH_ERROR())
        })
      )

      return concat(of(AUTH_LOADING()), request$)
    })
  )

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(AUTH_LOADING())

    const res = await ExampleApiService.logout()

    if (res.description === "OK") {
      dispatch(AUTH_DONE("SIGNED_IN"))
    } else {
      dispatch(AUTH_DONE("SIGNED_OUT"))
    }

    NavigationService.navigateAndReset("Login")
  } catch (err) {
    console.warn(err)
    __DEV__ && console.tron(err.stack)
  }
}

export const { LOGIN, AUTH_DONE, AUTH_ERROR, AUTH_LOADING } = authSlice.actions
export const authEpics = [loginEpic]

export default authSlice.reducer

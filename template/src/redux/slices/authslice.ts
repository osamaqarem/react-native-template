import { createSlice } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { ofType } from "redux-observable"
import { Observable, of } from "rxjs"
import { catchError, map, switchMap } from "rxjs/operators"
import NavigationService from "../../services/navigation/NavigationService"
import { exampleApi } from "../../services/network/service/exampleApi"
import { MyEpic } from "../store"

type AuthReducer = {
  authenticated: boolean
  loading: boolean
}

const initialState: AuthReducer = {
  authenticated: false,
  loading: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    DO_AUTH: state => ({ ...state, loading: true }),
    AUTH_SUCCESS: (state, action) => ({
      ...state,
      authenticated: action.payload,
      loading: false
    }),
    AUTH_ERROR: () => initialState,
    LOADING: (state, action) => ({ ...state, loading: action.payload })
  }
})

const loginEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(DO_AUTH.type),
    switchMap(() => {
      NavigationService.navigateAndReset("Home")
      return exampleApi.login()
    }),
    map(res => ({
      type: AUTH_SUCCESS.type,
      payload: res.description === "OK" ? true : false
    })),
    catchError(err => {
      if (exampleApi.sessionIsExpired(err)) {
        return logout()
      }
      console.warn(err)
      __DEV__ && console.tron(err.stack)
      return of(AUTH_ERROR())
    })
  )

export const logout = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(LOADING(true))
    NavigationService.navigateAndReset("Login")
    const result = await exampleApi.logout()
    dispatch({
      type: AUTH_SUCCESS.type,
      payload: result.description === "OK" ? false : true
    })
  } catch (err) {
    console.warn(err)
    __DEV__ && console.tron(err.stack)
  }
}

export const { DO_AUTH, AUTH_SUCCESS, AUTH_ERROR, LOADING } = authSlice.actions

export default authSlice.reducer
export const authEpics = [loginEpic]

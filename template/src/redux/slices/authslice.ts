import { createSlice } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { ofType } from "redux-observable"
import { Observable, of } from "rxjs"
import { catchError, map, switchMap } from "rxjs/operators"
import NavigationService from "../../services/navigation/NavigationService"
import { api } from "../../services/network/ApiService"

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
    doAuth: state => ({ ...state, loading: true }),
    authSuccess: (state, action) => ({
      ...state,
      authenticated: action.payload,
      loading: false
    }),
    authError: () => initialState,
    loading: (state, action) => ({ ...state, loading: action.payload })
  }
})

export const loginEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(doAuth.type),
    switchMap(() => {
      NavigationService.navigateAndReset("Home")
      return api.login()
    }),
    map(res => ({
      type: authSuccess.type,
      payload: res.description === "OK" ? true : false
    })),
    catchError(err => {
      if (api.sessionIsExpired(err)) {
        return logout()
      }
      console.warn(err)
      __DEV__ && console.tron(err.stack)
      return of(authError())
    })
  )

export const logout = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(loading(true))
    NavigationService.navigateAndReset("Login")
    const result = await api.logout()
    dispatch({
      type: authSuccess.type,
      payload: result.description === "OK" ? false : true
    })
  } catch (err) {
    console.warn(err)
    __DEV__ && console.tron(err.stack)
  }
}

export const { doAuth, authSuccess, authError, loading } = authSlice.actions

export default authSlice.reducer

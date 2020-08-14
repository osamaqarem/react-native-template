import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ofType } from "redux-observable"
import { Observable } from "rxjs"
import { map, withLatestFrom } from 'rxjs/operators'
import { RootStoreType } from "../rootReducer"
import { MyEpic } from "../store"

type ExampleReducer = {
    globalValue: 'PING' | 'PONG'
}

const initialState: ExampleReducer = {
    globalValue: 'PING'
}

const exampleSlice = createSlice({
    name: "example",
    initialState,
    reducers: {
        ping: (state) => { state.globalValue = 'PING' },
        pong: (state) => { state.globalValue = 'PONG' },
    },
})


const exampleEpic: MyEpic = (action$: Observable<PayloadAction<undefined>>, state$: Observable<RootStoreType>) =>
    action$.pipe(
        ofType(exampleActions.ping.type, exampleActions.pong.type),
        withLatestFrom(state$),
        map(([action, state]) => {
            console.log(`exampleEpic: I am reacting to ${state.example.globalValue}`)

            // Epics are a stream of actions-in, actions-out
            return { type: 'useless_action' }
        })
    )

export const exampleReducer = exampleSlice.reducer
export const exampleActions = exampleSlice.actions
export const exampleEpics = [exampleEpic]
import GenericResponse from "../../models/GenericResponse"
import { Observable } from "rxjs"

export interface ExampleApiEndpoints {
  login: () => Observable<GenericResponse>
  logout: () => Promise<GenericResponse>
  submit: (body: object, token: string) => Observable<GenericResponse>
}

export const ExampleRestApi: {
  [key in keyof ExampleApiEndpoints]: () => string
} = {
  login: () => "200?sleep=1000",
  logout: () => "200?sleep=1000",
  submit: () => "200?sleep=1000",
}

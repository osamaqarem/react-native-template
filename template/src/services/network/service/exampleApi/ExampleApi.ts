import GenericResponse from "../../models/GenericResponse"
import { Observable } from "rxjs"

/**
 * Add new endpoints to this interface, and typescript will
 * let you know which implementations to update.
 */
export interface ExampleApiEndpoints {
  login: () => Observable<GenericResponse>
  logout: () => Promise<GenericResponse>
  submit: (body: object, token: string) => Observable<GenericResponse>
}

// Endpoint URLs.
export const ExampleApi: {
  [key in keyof ExampleApiEndpoints]: () => string
} = {
  login: () => "/200?sleep=1000",
  logout: () => "/200?sleep=1000",
  submit: () => "/200?sleep=1000",
}

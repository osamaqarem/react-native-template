import ApiService from "../ApiService"
import GenericResponse from "../../models/GenericResponse"
import { from } from "rxjs"

export default class MockApiService extends ApiService {
  login = () => {
    return from(
      new Promise<GenericResponse>((res, _) => {
        setTimeout(() => {
          const data: GenericResponse = {
            code: 200,
            description: "mocking example"
          }

          res(data)
        }, 2000)
      })
    )
  }

  logout = () => {
    return super.logout()
  }

  submit = () => {
    return super.submit({}, "token")
  }
}

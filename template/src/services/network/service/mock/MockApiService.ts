import ApiService from "../ApiService"

export default class MockApiService extends ApiService {
  login = () => {
    return super.login()
  }

  logout = () => {
    return super.logout()
  }
}

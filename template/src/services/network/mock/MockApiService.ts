import { ApiService } from "../ApiService"

class MockApiService extends ApiService {
  login = () => {
    return super.login()
  }

  logout = () => {
    return super.logout()
  }
}

export default MockApiService

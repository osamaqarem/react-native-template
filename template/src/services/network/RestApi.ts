export interface ApiEndpoints {
  login: () => {}
  logout: () => {}
}

class RestApi implements ApiEndpoints {
  private VERSION_1 = "v1"

  public login = () => "200?sleep=1000"
  public logout = () => "200?sleep=1000"
}

export default new RestApi()

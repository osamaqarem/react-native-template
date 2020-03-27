export interface ApiEndpoints {
  login: () => {}
  logout: () => {}
}

class ExampleRestApi implements ApiEndpoints {
  private VERSION = "v1"

  public login = () => "200?sleep=1000"
  public logout = () => "200?sleep=1000"
  public submit = () => "200?sleep=1000"
}

export default new ExampleRestApi()

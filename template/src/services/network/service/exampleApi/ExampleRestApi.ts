export interface ApiEndpoints {
  login: () => {}
  logout: () => {}
}

class ExampleRestApi implements ApiEndpoints {
  private VERSION = "v1"

  login = () => "200?sleep=1000"
  logout = () => "200?sleep=1000"
  submit = () => "200?sleep=1000"
}

export default new ExampleRestApi()

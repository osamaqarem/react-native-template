declare module "react-native-config" {
  interface Env {
    MOCK_EXAMPLE_API: "YES" | "NO"
    EXAMPLE_API_BASE_URL: "https://httpstat.us/"
  }

  const Config: Env

  export default Config
}

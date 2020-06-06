declare module "react-native-config" {
  interface Env {
    ENV: "DEVELOPMENT" | "STAGING" | "PRODUCTION"
    MOCK_EXAMPLE_API: "YES" | "NO"
    EXAMPLE_API_BASE_URL: "https://httpstat.us"
    SENTRY_DSN: ""
  }

  const Config: Env

  export default Config
}
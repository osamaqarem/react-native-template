declare module "react-native-config" {
  interface Env {
    ENV: "DEVELOPMENT" | "STAGING" | "PRODUCTION"
    MOCK_EXAMPLE_API: "YES" | "NO"
    GITHUB_API_BASE_URL: "https://api.github.com"
    SENTRY_DSN: ""
  }

  const Config: Env

  export default Config
}
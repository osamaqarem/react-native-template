declare module "react-native-config" {
    interface Config {
      BUILD_VARIANT: "DEBUG" | "RELEASE"
      MOCK_API: "YES" | "NO"
      EXAMPLE_API_BASE_URL: "https://httpstat.us/"
    }

    const config: Config

    export default config
  }
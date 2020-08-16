describe("Example", () => {
  beforeAll(async () => {
    await device.reloadReactNative()
  })

  it("should have a Landing screen", async () => {
    await expect(element(by.id("title"))).toBeVisible()
  })

  it("Should be able to navigate to Home screen", async () => {
    await expect(element(by.id("goHomeBtn"))).toBeVisible()
    await element(by.id("goHomeBtn")).tap()
  })

  it("Home screen should render examples", async () => {
    await expect(element(by.text("Redux Example"))).toBeVisible()
    await expect(element(by.text("Data Fetching Example"))).toBeVisible()
  })
})

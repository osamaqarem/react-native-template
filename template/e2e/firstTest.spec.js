describe("Example", () => {
  beforeAll(async () => {
    await device.reloadReactNative()
  })

  it("should have welcome screen", async () => {
    await expect(element(by.text("Welcome to React"))).toBeVisible()
  })

  it("Should be able to sign in", async () => {
    await expect(element(by.id("signInBtn"))).toBeVisible()
    await element(by.id("signInBtn")).tap()
    await expect(element(by.text("Home"))).toBeVisible()
  })

  it("Should be able to sign out", async () => {
    await expect(element(by.id("signOutBtn"))).toBeVisible()
    await element(by.id("signOutBtn")).tap()
    await expect(element(by.text("Welcome to React"))).toBeVisible()
  })
})

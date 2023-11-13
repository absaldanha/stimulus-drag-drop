import { type PlaywrightTestConfig, devices } from "@playwright/test"

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  testDir: "./tests/",
  testMatch: "functional/**/*_tests.ts",
  webServer: {
    command: "npm start",
    timeout: 120 * 1000,
  },
  use: {
    baseURL: "http://server:9000/",
  },
}

export default config

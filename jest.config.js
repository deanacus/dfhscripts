module.exports =  {
  "setupFilesAfterEnv": [
    "<rootDir>/testing/setupTests.js"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,}"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 75,
      "functions": 75,
      "lines": 75,
      "statements": 75
    }
  }
}
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "babel",
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  collectCoverage: true,
  collectCoverageFrom: ["**/*/*.tsx", "!**/node_modules/**"],
  testMatch: ["**/*.test.tsx"],
  clearMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  modulePathIgnorePatterns: ["<rootDir>/src/stories"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^jose": require.resolve("jose"),
    "^@panva/hkdf": require.resolve("@panva/hkdf"),
    "preact-render-to-string": require.resolve("preact-render-to-string"),
    preact: require.resolve("preact"),
    uuid: require.resolve("uuid"),
  },
};

export default createJestConfig(config);

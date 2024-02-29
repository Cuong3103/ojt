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
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);

import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'babel',
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  collectCoverageFrom: ["**/*/*.ts", "!**/node_modules/**"],
  testMatch: ['**/*.test.ts'],
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/(*.)/$1'
  }
}

export default createJestConfig(config);

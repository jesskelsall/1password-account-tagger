module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/__tests__/_*/*.ts',
    '!src/__tests__/*',
    '!src/index.ts',
    '!src/tags/tags.ts',
  ],
  coverageDirectory: 'reports/coverage',
  preset: 'ts-jest',
  roots: ['src'],
  setupFilesAfterEnv: ['./src/__tests__/_setup/toMatchJoiSchema.ts'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
}

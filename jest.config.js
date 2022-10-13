module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': '<rootDir>/node_modules/ts-jest',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
};

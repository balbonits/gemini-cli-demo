module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock', './jest.setup.js'],
  transform: {
    '^.+\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleNameMapper: {
    '^chart.js$': '<rootDir>/__mocks__/chart.js',
    '^https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js$': '<rootDir>/__mocks__/marked.js',
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
};

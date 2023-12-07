module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg)$": "<rootDir>/src/icons/",
  },
  testMatch: ["<rootDir>src/tests/*.test.js"],
};

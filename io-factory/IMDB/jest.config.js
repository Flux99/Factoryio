module.exports = {
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
    testEnvironment: 'node',
    setupFilesAfterEnv: ['jest-extended'],
    "moduleNameMapper": {
      "\\.(css|scss)$": "identity-obj-proxy"
    },
    "globals": {
      "ts-jest": {
        "tsconfig": "tsconfig.json"
      },
      "JWT_SECRET": "thisissecret"
    },
    "preset": "ts-jest"
  };
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',  // You might want to use 'node' or 'jsdom' depending on your needs
    transform: {
      "^.+\\.(ts|tsx)$": "babel-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
          babelConfig: true,
        },
      },
      setupFilesAfterEnv: ['./jest.setup.js']
  };
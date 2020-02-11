module.exports = {
  testRegex: '.*\\.test.mjs$',
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/'
  ],
  moduleFileExtensions: [
    'mjs',
    'js'
  ],
  automock: false,
  collectCoverage: true
};

module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/icons/(.*)$': '<rootDir>/src/icons/$1',
        '^@/types/(.*)$': '<rootDir>/src/types/$1',
    },
    transform: {
        "\\.[jt]sx?$": "babel-jest"
    },
};

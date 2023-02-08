/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/src/utils/tests.ts'],
    testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
};

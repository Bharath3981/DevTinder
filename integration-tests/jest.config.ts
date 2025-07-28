import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' }); // <--- this is critical

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 999999, // Effectively disables timeout for all tests
};
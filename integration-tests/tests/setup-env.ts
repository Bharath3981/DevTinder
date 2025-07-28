import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../dotenv/.env.test'),
});

console.log('✅ Loaded .env.test:', process.env.DATABASE_URL);

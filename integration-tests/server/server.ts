// placeholder for server.ts
import express from 'express';
import { Response } from 'supertest';

const app = express();
app.use(express.json());

// Sample testable endpoint
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
});

const PORT = process.env.PORT || 4000;
export const server = app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
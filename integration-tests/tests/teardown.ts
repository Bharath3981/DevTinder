// placeholder for teardown.ts
import { prisma } from '../src/prismaClient';

module.exports = async () => {
  await prisma.$disconnect();
};
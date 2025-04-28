// placeholder for users.api.test.ts
import { prisma } from '../../src/prismaClient';
import { getAPI, setheaders } from '../../src/baseRoute';
import supertest from 'supertest';
import { payloads } from '../payloads/payload.media.create';
import { asertEqual } from '../util';
import { createMedia } from './create/createMedia';

for (const [label, payload] of Object.entries(payloads)) {
  describe(`Create and validate media for ${label}`, () => {
      createMedia(payload);
  });
}

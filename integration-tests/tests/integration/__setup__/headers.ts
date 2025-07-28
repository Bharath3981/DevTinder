import request from 'supertest';
import { BASE_URL } from './config';

const headers = {
  Authorization: 'Bearer ' + process.env.BEARER_TOKEN,
  Tenantgroupcode: 'dev',
  'Content-Type': 'application/json',
};

export const authorizedPost = (url: string) => request(BASE_URL).post(url).set(headers);

export const authorizedPut = (url: string) => request(BASE_URL).put(url).set(headers);

export const authorizedGet = (url: string) => request(BASE_URL).get(url).set(headers);

import request from 'supertest';
import { saveMediaPayload } from '../payloads/payload.media.save';
import { saveMedia } from './media/media.save';
import { publishMedia } from './media/media.publish';
import { publishMediaPayloads } from '../payloads/payload.media.publish';
import { publishUpdateMediaPayloads } from '../payloads/payload.media.publish.update';
import { updatePublishMedia } from './media/media.publish.update';

describe('Media API Integration', () => {
  //saveMedia(saveMediaPayload);
  // Object.entries(publishMediaPayloads).forEach(([label, payload]) => {
  //   publishMedia(label, payload);
  // });
  Object.entries(publishUpdateMediaPayloads).forEach(([label, payload]) => {
    updatePublishMedia(label, payload);
  });
});

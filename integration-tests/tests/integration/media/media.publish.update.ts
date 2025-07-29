import { prisma } from '../../../src/prismaClient';
import { assertEqualWithLabel } from '../../utils/util';
import { authorizedGet, authorizedPost, authorizedPut } from '../__setup__/headers';

export function updatePublishMedia(label: string, payload:any) {
  let mediaId = '';
  beforeAll(async () => {
    const postRes = await authorizedPut(`/media/${payload.id}/publish`).send(payload);
    if (postRes.ok !== true) {
      console.error(`[${label}] Failed to publish media:`, postRes.body.details);
      return;
    }
    expect(postRes.statusCode).toBe(200);
    mediaId = postRes.body.data?.id;
    expect(mediaId).toBeDefined();
  });

  describe(`${label} - Validate Media Response: ${mediaId}`, () => {
    let actual: any;
    
    beforeAll(async () => {
      const getRes = await authorizedGet(`/media/${mediaId}`);
      assertEqualWithLabel('GET response status', getRes.statusCode, 200);
      actual = getRes.body.data;
    });

    it('should match mediaTypeId', () => {
      assertEqualWithLabel('mediaTypeId', actual.mediaTypeId, payload.mediaTypeId);
    });

    it('should match expirationDate', () => {
      assertEqualWithLabel('expirationDate', new Date(actual.expirationDate).toISOString(), new Date(payload.expirationDate).toISOString());
    });

    it('should match publishDate', () => {
      assertEqualWithLabel('publishDate', new Date(actual.publishDate).toISOString(), new Date(payload.publishDate).toISOString());
    });

    it('should match tags', () => {
      expect(actual.tags).toEqual(expect.arrayContaining(payload.tags));
    });

    it('should match customParameters', () => {
      Object.entries(payload.customParameters).forEach(([key, val]) => {
        expect(actual.customParameters[key]).toBe(val);
      });
    });

    it('should match videoAsset properties', () => {
      expect(actual.videoAsset.videoKey).toBe(payload.videoAsset.videoKey);
      expect(actual.videoAsset.duration).toBeCloseTo(payload.videoAsset.duration, 2);
      if (payload.videoAsset.isVideoReUploaded) {
        expect(actual.videoAsset.contentSource).toBe('EXTERNAL');
        const expectedUrl = `https://cdn.jwplayer.com/videos/${payload.externalId}`;
        expect(actual.videoAsset.videoUrl).toBe(expectedUrl);
      } else {
        expect(actual.videoAsset.contentSource).toBe(payload.videoAsset.contentSource);
        expect(actual.videoAsset.videoUrl).toBe(payload.videoAsset.videoUrl);
      }
      expect(actual.videoAsset.mediaId).toBe(payload.id);
      expect(actual.videoAsset.isVideoReUploaded).toBe(false);
    });

    it('should match mediaBasicInfo', () => {
      expect(actual.mediaBasicInfo.length).toBe(payload.mediaBasicInfo.length);
      payload.mediaBasicInfo.forEach((expected:any, i:number) => {
        const actualInfo = actual.mediaBasicInfo[i];
        expect(actualInfo.title).toBe(expected.title);
        expect(actualInfo.description).toBe(expected.description);
        expect(actualInfo.language).toBe(expected.language);
      });
    });

    it('should match thumbnailAsset based on rules', () => {
      expect(actual.thumbnailAsset.length).toBe(payload.thumbnailAsset.length);
      payload.thumbnailAsset.forEach((expected:any) => {
        const actualThumb = actual.thumbnailAsset.find((t:any) => t.thumbnailKey === expected.thumbnailKey);
        expect(actualThumb).toBeDefined();
        if (!actualThumb) return;

        if (expected.thumbnailKey === 'default' && expected.isThumbnailReuploaded) {
          expect(actualThumb.contentSource).toBe('EXTERNAL');
          const expectedUrl = `https://cdn.jwplayer.com/v2/media/${payload.externalId}/poster.jpg`;
          expect(actualThumb.thumbnailUrl).toBe(expectedUrl);
          expect(actualThumb.isThumbnailReuploaded).toBe(false);
        } else if(expected.thumbnailKey !== 'default') {
          expect(actualThumb.thumbnailUrl).toBe(expected.thumbnailUrl);
          expect(actualThumb.contentSource).toBe(expected.contentSource);
          expect(actualThumb.thumbnailKey).toBe(expected.thumbnailKey);
          expect(actualThumb.isThumbnailReuploaded).toBe(false);
          expect(actualThumb.externalId).toBe("");

          // Validate it is added in customParameters
          // expect(actual.customParameters).toHaveProperty(expected.thumbnailKey);
          // expect(actual.customParameters[expected.thumbnailKey]).toBe(expected.thumbnailUrl);
        }
        expect(actualThumb.mediaId).toBe(payload.id);
      });
    });

    it('should match network', () => {
      assertEqualWithLabel('network', actual.network, payload.network);
    });
  });

  // ✅ CLEANUP
  afterAll(async () => {
    // if (mediaId) {
    //   try {
    //     await prisma.mediaBasicInfo.deleteMany({ where: { mediaId } });
    //     await prisma.thumbnailAsset.deleteMany({ where: { mediaId } });
    //     await prisma.videoAsset.deleteMany({ where: { mediaId } });
    //     await prisma.deliveryMedia.delete({ where: { id: mediaId } });
    //     await prisma.media.delete({ where: { id: mediaId } });
    //   } catch (error: any) {
    //     throw new Error(error.message);
    //   }
    // }
  });
}

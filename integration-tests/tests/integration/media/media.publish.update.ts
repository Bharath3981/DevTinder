import { prisma } from '../../../src/prismaClient';
import { assertEqualWithLabel } from '../../utils/util';
import { authorizedGet, authorizedPost } from '../__setup__/headers';

export function publishMedia(label: string, payload:any) {
  let mediaId = '';
  beforeAll(async () => {
    const postRes = await authorizedPost('/media/publish').send(payload);
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

    // it('should match expirationDate', () => {
    //   assertEqualWithLabel('expirationDate', new Date(actual.expirationDate).toISOString(), new Date(payload.expirationDate).toISOString());
    // });

    // it('should match publishDate', () => {
    //   assertEqualWithLabel('publishDate', new Date(actual.publishDate).toISOString(), new Date(payload.publishDate).toISOString());
    // });

    // it('should match tags', () => {
    //   expect(actual.tags).toEqual(expect.arrayContaining(payload.tags));
    // });

    // it('should match customParameters', () => {
    //   Object.entries(payload.customParameters).forEach(([key, val]) => {
    //     expect(actual.customParameters[key]).toBe(val);
    //   });
    // });

    // it('should match videoAsset fields', () => {
    //   expect(actual.videoAsset.videoKey).toBe(payload.videoAsset.videoKey);
    //   expect(actual.videoAsset.duration).toBeCloseTo(payload.videoAsset.duration, 2);
    //   expect(actual.videoAsset.contentSource).toBe(payload.videoAsset.contentSource || 'EXTERNAL');
    // });

    // it('should match mediaBasicInfo', () => {
    //   expect(actual.mediaBasicInfo.length).toBe(payload.mediaBasicInfo.length);
    //   payload.mediaBasicInfo.forEach((expected:any, i:number) => {
    //     expect(actual.mediaBasicInfo[i].title).toBe(expected.title);
    //     expect(actual.mediaBasicInfo[i].description).toBe(expected.description);
    //     expect(actual.mediaBasicInfo[i].language).toBe(expected.language);
    //   });
    // });

    // it('should match thumbnailAsset based on thumbnailKey', () => {
    //   payload.thumbnailAsset.forEach((expected:any) => {
    //     const match = actual.thumbnailAsset.find((t:any) => t.thumbnailKey === expected.thumbnailKey);
    //     expect(match).toBeDefined();
    //     if (match) {
    //       expect(match.thumbnailKey).toBe(expected.thumbnailKey);
    //       expect(match.thumbnailUrl).toContain(expected.thumbnailKey); // loose check since actual may transform URL
    //     }
    //   });
    // });
  });

  // ✅ CLEANUP
  afterAll(async () => {
    if (mediaId) {
      try {
        await prisma.mediaBasicInfo.deleteMany({ where: { mediaId } });
        await prisma.thumbnailAsset.deleteMany({ where: { mediaId } });
        await prisma.videoAsset.deleteMany({ where: { mediaId } });
        await prisma.deliveryMedia.delete({ where: { id: mediaId } });
        await prisma.media.delete({ where: { id: mediaId } });
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  });
}

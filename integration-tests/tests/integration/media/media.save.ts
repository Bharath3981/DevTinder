import { prisma } from '../../../src/prismaClient';
import { assertEqualWithLabel } from '../../utils/util';
import { authorizedGet, authorizedPost } from '../__setup__/headers';

export function saveMedia(payload:any) {
  let mediaId = '';
  beforeAll(async () => {
    const postRes = await authorizedPost('/media').send(payload);
    expect(postRes.statusCode).toBe(201);
    mediaId = postRes.body.data?.id;
    expect(mediaId).toBeDefined();
  });

  describe(`Validate Media Response: ${mediaId}`, () => {
    let actual: any;

    beforeAll(async () => {
      const getRes = await authorizedGet(`/media/${mediaId}`);
      assertEqualWithLabel('GET response status', getRes.statusCode, 200);
      actual = getRes.body.data;
    });

    it('Current MediaId', () => {
      assertEqualWithLabel('mediaTypeId', actual.mediaTypeId, payload.mediaTypeId);
    });

    it('should match mediaTypeId', () => {
      assertEqualWithLabel('mediaTypeId', actual.mediaTypeId, payload.mediaTypeId);
    });

    it('should contain all tags', () => {
      expect(actual.tags).toEqual(expect.arrayContaining(payload.tags));
    });

    it('should match customParameters', () => {
      expect(actual.customParameters).toEqual(payload.customParameters);
    });

    it('should match expirationDate', () => {
      assertEqualWithLabel('expirationDate', new Date(actual.expirationDate).toISOString(), new Date(payload.expirationDate).toISOString());
    });

    it('should match publishDate', () => {
      assertEqualWithLabel('publishDate', new Date(actual.publishDate).toISOString(), new Date(payload.publishDate).toISOString());
    });

    it('should match network', () => {
      assertEqualWithLabel('network', actual.network, payload.network);
    });

    it('should match mediaBasicInfo count', () => {
      assertEqualWithLabel('mediaBasicInfo.length', actual.mediaBasicInfo.length, payload.mediaBasicInfo.length);
    });

    payload.mediaBasicInfo.forEach((expected:any, i:number) => {
      it(`should match mediaBasicInfo[${i}].title`, () => {
        assertEqualWithLabel(`mediaBasicInfo[${i}].title`, actual.mediaBasicInfo[i].title, expected.title);
      });

      it(`should match mediaBasicInfo[${i}].description`, () => {
        assertEqualWithLabel(`mediaBasicInfo[${i}].description`, actual.mediaBasicInfo[i].description, expected.description);
      });

      it(`should match mediaBasicInfo[${i}].language`, () => {
        assertEqualWithLabel(`mediaBasicInfo[${i}].language`, actual.mediaBasicInfo[i].language, expected.language);
      });
    });

    it('should match thumbnailAsset count', () => {
      assertEqualWithLabel('thumbnailAsset.length', actual.thumbnailAsset.length, payload.thumbnailAsset.length);
    });

    payload.thumbnailAsset.forEach((expected:any, i:number) => {
      it(`should match thumbnailAsset[${i}].thumbnailKey`, () => {
        assertEqualWithLabel(`thumbnailAsset[${i}].thumbnailKey`, actual.thumbnailAsset[i].thumbnailKey, expected.thumbnailKey);
      });

      it(`should match thumbnailAsset[${i}].thumbnailUrl`, () => {
        assertEqualWithLabel(`thumbnailAsset[${i}].thumbnailUrl`, actual.thumbnailAsset[i].thumbnailUrl, expected.thumbnailUrl);
      });
    });

    it('should match videoAsset.videoKey', () => {
      assertEqualWithLabel('videoKey', actual.videoAsset.videoKey, payload.videoAsset.videoKey);
    });

    it('should match videoAsset.videoUrl', () => {
      assertEqualWithLabel('videoUrl', actual.videoAsset.videoUrl, payload.videoAsset.videoUrl);
    });

    it('should match dynamicLink', () => {
      expect(actual.dynamicLink).toEqual(payload.dynamicLink);
    });

    it('should match adBreaks', () => {
      expect(actual.adBreaks).toEqual(payload.adBreaks);
    });
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

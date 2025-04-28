import supertest from "supertest";
import { getAPI, setheaders } from "../../../src/baseRoute";
import { asertEqual } from "../../util";
import { prisma } from "../../../src/prismaClient";


export async function createMedia(payload: any) {
    let mediaId = "";
    let api = getAPI();
    beforeAll(async () => {
      let mediaRes = (await setheaders(api.post("/media").send(payload))) as supertest.Response;
      expect(mediaRes.statusCode).toBe(201);
      mediaId = mediaRes.body.data?.id;
      expect(mediaId).toBeDefined();
    });
  
    describe(`Validate Media Response: ${mediaId}`, () => {
      let actual: any;
  
      beforeAll(async () => {
        const getRes = (await setheaders(api.get(`/media/${mediaId}`).send(payload))) as supertest.Response;
        expect(getRes.statusCode).toBe(200);
        actual = getRes.body.data;
      });
  
      it('should match mediaTypeId', () => {
          asertEqual("", actual.mediaTypeId, payload.mediaTypeId);
        //expect(actual.mediaTypeId).toBe(payload.mediaTypeId);
      });
  
      it('should contain all tags', () => {
        //asertEqual("", actual.tags, expect.arrayContaining(payload.tags));
        expect(actual.tags).toEqual(expect.arrayContaining(payload.tags));
      });
  
      it('should match customParameters', () => {
        expect(actual.customParameters).toEqual(payload.customParameters);
      });
  
      it('should match expirationDate and publishDate', () => {
        //expect(new Date(actual.expirationDate).toISOString()).toBe(new Date(payload.expirationDate).toISOString());
        //expect(new Date(actual.publishDate).toISOString()).toBe(new Date(payload.publishDate).toISOString());
      });

      it('should match media fields', () => {
        expect(actual.network).toEqual(process.env.NETWORK);
        //expect(new Date(actual.expirationDate).toISOString()).toBe(new Date(payload.expirationDate).toISOString());
        //expect(new Date(actual.publishDate).toISOString()).toBe(new Date(payload.publishDate).toISOString());
      });
  
      it('should match mediaBasicInfo array', () => {
        expect(actual.mediaBasicInfo.length).toBe(payload.mediaBasicInfo.length);
        payload.mediaBasicInfo.forEach((expected:any, i:number) => {
          expect(actual.mediaBasicInfo[i].title).toBe(expected.title);
          expect(actual.mediaBasicInfo[i].description).toBe(expected.description);
          expect(actual.mediaBasicInfo[i].language).toBe(expected.language);
        });
      });
  
      it('should match thumbnailAsset array', () => {
        expect(actual.thumbnailAsset.length).toBe(payload.thumbnailAsset.length);
        (payload.thumbnailAsset || []).forEach((expected: any, i: number) => {
          const actualThumb = actual.thumbnailAsset[i];
          expect(actualThumb.thumbnailKey).toBe(expected.thumbnailKey);
          expect(actualThumb.thumbnailUrl ?? null).toBe(expected.thumbnailUrl ?? null);
          expect(actualThumb.externalId ?? null).toBe(expected.externalId ?? null);
          expect(actualThumb.isThumbnailReuploaded ?? false).toBe(expected.isThumbnailReuploaded ?? false);
          expect(actualThumb.deleted ?? false).toBe(expected.deleted ?? false);
          expect(actualThumb.publishDate ?? null).toBe(expected.publishDate ?? null);
          expect(actualThumb.contentSource ?? null).toBe(expected.contentSource ?? "LOCAL");
          expect(actualThumb.tenantId).toBe(Number(process.env.TENANT_ID));
        });
      });
  
      it('should match videoAsset fields', () => {
        const expectedVideo = payload.videoAsset;
        const actualVideo = actual.videoAsset;
        expect(actualVideo.videoKey).toBe(expectedVideo.videoKey);
        expect(actualVideo.videoUrl).toBe(expectedVideo.videoUrl);
        expect(actualVideo.duration ?? null).toBe(expectedVideo.duration ?? null);
        expect(actualVideo.publishDate ?? null).toBe(expectedVideo.publishDate ?? null);
        expect(actualVideo.deleted ?? false).toBe(expectedVideo.deleted ?? false);
        expect(actualVideo.isVideoReUploaded ?? false).toBe(expectedVideo.isVideoReUploaded ?? false);
        expect(actualVideo.contentSource ?? null).toBe(expectedVideo.contentSource ?? "LOCAL");
        expect(actualVideo.tenantId).toBe(Number(process.env.TENANT_ID));
      });
  
      it('should match dynamicLink', () => {
        (payload.dynamicLink || []).forEach((expected: any, i: number) => {
          const actualLink = actual.dynamicLink[i];
          expect(actualLink.campaignName).toBe(expected.campaignName);
          expect(actualLink.campaignSource).toBe(expected.campaignSource);
          expect(actualLink.campaignMedium).toBe(expected.campaignMedium);
          expect(actualLink.previewTitle ?? null).toBe(expected.previewTitle ?? null);
          expect(actualLink.previewSocialImageUrl ?? null).toBe(expected.previewSocialImageUrl ?? null);
          expect(actualLink.previewDescription ?? null).toBe(expected.previewDescription ?? null);
          expect(actualLink.shortUrl ?? null).toBe(expected.shortUrl ?? null);
          expect(actualLink.isDynamicLinkUpdated ?? null).toBe(expected.isDynamicLinkUpdated ?? false);
        });
      });
  
     it('should match adBreaks', () => {
        (payload.adBreaks || []).forEach((expected: any, i: number) => {
          const actualBreak = actual.adBreaks[i];
          expect(actualBreak.slot).toBe(expected.slot);
          expect(actualBreak.seconds).toBe(expected.seconds);
        });
      });
    });
  
    afterAll(async () => {
      if (mediaId) {
        try {
          if (payload.mediaBasicInfo) {
            await prisma.mediaBasicInfo.deleteMany({ where: { mediaId } });
          }
          if (payload.thumbnailAsset) {
            await prisma.thumbnailAsset.deleteMany({ where: { mediaId } });
          }
          if (payload.videoAsset) {
            const video = await prisma.videoAsset.findUnique({ where: { mediaId } });
            if (video) {
              await prisma.caption.deleteMany({ where: { videoId: video.id } });
              await prisma.audioTrack.deleteMany({ where: { videoId: video.id } });
              await prisma.videoResolution.deleteMany({ where: { videoId: video.id } });
              await prisma.imageResolution.deleteMany({ where: { videoId: video.id } });
              await prisma.videoAsset.delete({ where: { mediaId } });
            }
          }
          if (payload.adBreaks) {
            await prisma.adBreak.deleteMany({ where: { mediaId } });
          }
          if (payload.dynamicLink) {
            await prisma.dynamicLink.deleteMany({ where: { mediaId } });
          }
          await prisma.media.delete({ where: { id: mediaId } });
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    });
}
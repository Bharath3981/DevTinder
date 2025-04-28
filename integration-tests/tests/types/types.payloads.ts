import { Request } from 'express';

export enum ContentSourceType {
  LOCAL = 'LOCAL',
  EXTERNAL = 'EXTERNAL',
}

export type BaseMediaFieldsInput = {
  id: string;
  tags?: string[];
  customParameters?: Record<string, any>;
  externalId?: string;
  expirationDate: string;
  mediaTypeId: number;
  trailers?: string[];
  deleted?: boolean;
  isSynced?: boolean;
  jwplayerMetadata?: Record<string, any>;
  network?: string;
  auditInfoId?: string;
};

export type MediaBasicInfoInput = {
  id?: number;
  title: string;
  description?: string;
  programName?: string;
  programId?: string;
  language: string;
};

export type AdBreakInput = {
  slot: number;
  seconds: number;
  auditInfoId?: string;
  
};

export type ThumbnailAssetInput = {
  id?: number;
  tenantId: number; // already added
  thumbnailKey: string;
  thumbnailUrl: string;
  externalId?: string;
  isThumbnailReuploaded?: boolean;
  deleted?: boolean;
  publishDate?: string;
  auditInfoId?: string;
  contentSource?: ContentSourceType;
};

export type VideoAssetInput = {
  id?: number;
  tenantId: number; // added
  videoKey: string;
  videoUrl: string;
  deleted?: boolean;
  publishDate?: string;
  duration?: number;
  isVideoReUploaded?: boolean;
  contentSource?: ContentSourceType;
  videoResolutions?: VideoResolutionInput[];
  imageResolutions?: ImageResolutionInput[];
  audioTracks?: AudioTrackInput[];
  captions?: CaptionInput[];
};

export type VideoResolutionInput = {
  resolution: string;
  videoUrl?: string;
  videoHeight?: string;
  videoWidth?: string;
};

export type ImageResolutionInput = {
  resolution: string;
  imageUrl?: string;
  imgKey?: string;
  imageType?: string;
};

export type AudioTrackInput = {
  language?: string;
  label?: string;
  audioUrl?: string;
  contentSource?: ContentSourceType;
  isAudioTracksReuploaded?: boolean;
  externalId?: string;
};

export type CaptionInput = {
  language?: string;
  label?: string;
  captionUrl?: string;
  contentSource?: ContentSourceType;
  isCaptionsReuploaded?: boolean;
  externalId?: string;
};

export type DynamicLinkInput = {
  campaignName: string;
  campaignSource: 'VOD' | 'Email' | 'Social';
  campaignMedium: 'VOD' | 'Email' | 'Facebook' | 'Instagram' | 'Twitter' | 'Youtube';
  previewTitle?: string;
  previewSocialImageUrl?: string;
  previewDescription?: string;
  shortUrl?: string;
  isDynamicLinkUpdated?: boolean;
  contentSource?: ContentSourceType;
};

export type CreateMediaInput = BaseMediaFieldsInput & {
  mediaBasicInfo?: MediaBasicInfoInput[];
  adBreaks?: AdBreakInput[];
  thumbnailAsset?: ThumbnailAssetInput[];
  videoAsset?: VideoAssetInput;
  dynamicLink?: DynamicLinkInput[];
};

export type UpdateMediaInput = Partial<CreateMediaInput> & {
  id: string;
};

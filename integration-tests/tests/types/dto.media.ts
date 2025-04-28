
enum ContentSourceType {
    LOCAL = 'LOCAL',
    EXTERNAL = 'EXTERNAL',
  }
export type BaseMediaFieldsDto = {
  id: string;
  tags?: string[];
  customParameters?: Record<string, any>;
  tenantId: number;
  externalId?: string | null;
  expirationDate: string | Date;
  publishDate?: string | Date;
  mediaTypeId: number;
  trailers?: string[];
  createdBy?: string;
  updatedAt?: string | Date;
  lastPublishedAt?: string;
  lastPublishedBy?: string;
  updatedBy?: string;
  deleted?: boolean;
  isSynced?: boolean;
  jwplayerMetadata?: Record<string, any>;
  network?: string;
  auditInfoId?: string;
};

export type CreateMediaDto = BaseMediaFieldsDto & {
  // Nested relations
  mediaBasicInfo?: MediaBasicInfoDto[];
  adBreaks?: AdBreakDto[];
  thumbnailAsset?: ThumbnailAssetDto[];
  videoAsset?: VideoAssetDto;
  dynamicLink?: DynamicLinkDto[];
};

export type UpdateMediaDto = Partial<BaseMediaFieldsDto> & {
  id: string; // Required to identify the media to update

  // Nested optional relations
  mediaBasicInfo?: MediaBasicInfoDto[];
  adBreaks?: AdBreakDto[];
  thumbnailAsset?: ThumbnailAssetDto[];
  videoAsset?: VideoAssetDto;
  dynamicLink?: DynamicLinkDto[];
};

export type MediaBasicInfoDto = {
  id?: number;
  title: string;
  description?: string;
  programName?: string;
  programId?: string;
  language: string;
  tenantId: number;
};

export type AdBreakDto = {
  slot: number;
  seconds: number;
  auditInfoId?: string;
};

export type ThumbnailAssetDto = {
  id?: number;
  tenantId: number; // already added
  thumbnailKey: string;
  thumbnailUrl: string;
  externalId?: string | null;
  isThumbnailReuploaded?: boolean;
  deleted?: boolean;
  publishDate?: Date | string;
  auditInfoId?: string;
  contentSource?: ContentSourceType;
};

export type VideoAssetDto = {
  id?: number;
  tenantId: number; // added
  videoKey: string;
  videoUrl: string;
  deleted?: boolean;
  publishDate?: string;
  duration?: number;
  isVideoReUploaded?: boolean;
  contentSource?: ContentSourceType;

  // optional nested relations
  videoResolutions?: VideoResolutionDto[];
  imageResolutions?: ImageResolutionDto[];
  audioTracks?: AudioTrackDto[];
  captions?: CaptionDto[];
};

export type VideoResolutionDto = {
  resolution: string;
  videoUrl?: string;
  videoHeight?: string;
  videoWidth?: string;
};

export type ImageResolutionDto = {
  resolution: string;
  imageUrl?: string;
  imgKey?: string;
  imageType?: string;
};

export type AudioTrackDto = {
  language?: string;
  label?: string;
  audioUrl?: string;
  contentSource?: ContentSourceType;
  isAudioTracksReuploaded?: boolean;
  externalId?: string;
};

export type CaptionDto = {
  language?: string;
  label?: string;
  captionUrl?: string;
  contentSource?: ContentSourceType;
  isCaptionsReuploaded?: boolean;
  externalId?: string;
  videoId?: number;
};

export type DynamicLinkDto = {
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

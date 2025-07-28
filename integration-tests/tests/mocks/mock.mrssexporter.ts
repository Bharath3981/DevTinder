import { MediaItem, RssChannel } from '../../src/types/types.mrss';

export const preparedMrssChannelMock: RssChannel = {
  title: 'Test Playlist',
  description: 'A test playlist',
  link: 'http://localhost:3000/api/delivery/mrss/export/feedConfigId',
  pubDate: '2025-02-01T00:00:00.000Z',
  lastBuildDate: '2025-07-08T11:51:20.716Z',
};

export const preparedMediaMockForMRSS: MediaItem = {
  guid: 'media1',
  title: 'Title of the Media',
  pubDate: '2025-07-08T09:46:11.599Z',
  description: 'Description of the Media',
  videoAsset: {
    url: 'https://example.com/videoId',
    medium: 'video',
    type: 'video/mp4',
    duration: 120,
  },
  thumbnailAsset: [
    {
      url: 'https://example.com/poster.jpg',
      type: 'default',
    },
  ],
  tags: 'tag1, tag2',
  customParameters: {
    param1: 'Param1',
    Param2: 'Param2',
  },
};

import { PlaylistEntry } from '../../src/types/types.playlist';

const now = Date.now();
export const playlistEntriesMock: PlaylistEntry[] = [
  {
    id: 'entry1',
    playlistId: 'playlist1',
    mediaId: 'media1',
    addedAt: new Date(now - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    removedAt: null,
    isRemoved: false,
  },
  {
    id: 'entry2',
    playlistId: 'playlist1',
    mediaId: 'media2',
    addedAt: new Date(now - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    removedAt: null,
    isRemoved: false,
  },
];

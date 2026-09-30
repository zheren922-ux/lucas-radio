const YTMusic = require('ytmusic-api');

class YouTubeMusicProvider {
    constructor() {
        this.ytmusic = new YTMusic();
        this.isInitialized = false;
    }

    // 初始化 API
    async init() {
        if (!this.isInitialized) {
            await this.ytmusic.initialize();
            this.isInitialized = true;
        }
    }

    // 搜索歌曲并格式化为你播放器需要的数据结构
    async searchTracks(query) {
        await this.init();
        try {
            const results = await this.ytmusic.searchSongs(query);
            return results.map(track => ({
                id: track.videoId,
                title: track.name,
                artist: track.artist.name,
                album: track.album ? track.album.name : 'Unknown',
                cover: track.thumbnails.length ? track.thumbnails[track.thumbnails.length - 1].url : null,
                source: 'ytmusic'
            }));
        } catch (error) {
            console.error('YT Music 搜索失败:', error);
            return [];
        }
    }

    // 获取特定歌单详情
    async getPlaylist(playlistId) {
        await this.init();
        try {
            const playlist = await this.ytmusic.getPlaylist(playlistId);
            return playlist;
        } catch (error) {
            console.error('获取 YT Music 歌单失败:', error);
            return null;
        }
    }
}

module.exports = new YouTubeMusicProvider();
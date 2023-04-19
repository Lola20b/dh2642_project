import {searchMusic, getSongDetails, getLyricsDetails, getAlbumDetails, getArtistDetails} from "./geniusAPI.js";
import resolvePromise from "./resolvePromise";

// Model to keep abstract data

class Model{
    constructor(){
        // model properties
        this.searchInput={};
        this.searchInput.q = "";
        this.searchInput.per_page = 5;
        this.searchInput.page = 1;
        this.searchResultsPromiseState = {};
        this.songPromiseState = {};
        this.lyricsPromiseState = {};
        this.albumPromiseState = {};
        this.artistPromiseState = {};
        
        this.savedSongs = [];
        this.savedAlbums = [];
        this.savedArtists = [];
    }

    // Set the search input
    setSearchQuery(searchText) {
        this.searchInput.q = searchText;
    }

    // Set the search type
    setSearchType(searchType) {
        //this.searchInput.type = searchType;
    }

    // Do the search
    doSearch(searchParams) {
        resolvePromise(searchMusic(searchParams), this.searchResultsPromiseState);
    }

    fetchSong(songParams) {
        resolvePromise(getSongDetails(songParams), this.songPromiseState);
    }
 
    fetchLyrics(lyricsParams) {
        resolvePromise(getLyricsDetails(lyricsParams), this.lyricsPromiseState);
    }

    fetchAlbum(albumParams) {
        resolvePromise(getAlbumDetails(albumParams), this.albumPromiseState)
    }

    fetchArtist(artistParams) {
        resolvePromise(getArtistDetails(artistParams), this.artistPromiseState)
    }

    saveSong(songID) {
        function sameSongIdCB(id) {
            return id === songID;
        }

        // Adds artistID att end of savedArtists if not already present
        if (!this.savedSongs.some(sameSongIdCB)) {
            this.savedSongs= [...this.savedSongs, songID];
        }
    }

    saveAlbum(albumID) {
        function sameAlbumIdCB(id) {
            return id === albumID;
        }

        // Adds artistID att end of savedArtists if not already present
        if (!this.savedAlbums.some(sameAlbumIdCB)) {
            this.savedAlbums= [...this.savedAlbums, albumID];
        }
    }

    saveArtist(artistID) {
        function sameArtistIdCB(id) {
            return id === artistID;
        }

        // Adds artistID att end of savedArtists if not already present
        if (!this.savedArtists.some(sameArtistIdCB)) {
            this.savedArtists= [...this.savedArtists, artistID];
            console.log("Save artist");
            console.log(this.savedArtists);
        }
    }
}

export default Model;
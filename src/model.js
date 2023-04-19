import {searchMusic, getSongDetails, getLyricsDetails, getAlbumDetails} from "./geniusAPI.js";
import resolvePromise from "./resolvePromise";

// Model to keep abstract data

class Model{
    constructor(){
        // model properties
        this.searchInput={};
        this.searchResultsPromiseState = {};
        this.songPromiseState = {};
        this.lyricsPromiseState = {};
        this.albumPromiseState = {};
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
}

export default Model;
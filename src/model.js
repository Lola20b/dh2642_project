import {searchMusic, getSongDetails} from "./geniusAPI.js";
import resolvePromise from "./resolvePromise";

// Model to keep abstract data

class Model{
    constructor(){
        // model properties
        this.searchInput={};
        this.searchResultsPromiseState = {};
        this.songResultsPromiseState = {};
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
        resolvePromise(getSongDetails(songParams), this.songResultsPromiseState);
    }
 
}

export default Model;
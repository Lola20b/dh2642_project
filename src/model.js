import {searchMusic} from "./geniusAPI.js";
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


 
}

export default Model;
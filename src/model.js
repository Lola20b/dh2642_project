

// Model to keep abstract data

class Model{
    constructor(){
        // model properties
        this.searchInput={};
        this.seachOptions = {};
    }

    // Set the search input
    setSearchQuery(searchText) {
        this.searchInput.query = searchText;
    }

    // Set the search type
    setSearchType(searchType) {
        this.searchInput.type = searchType;
    }

    // Do the search
    doSearch(searchParams) {
        console.log(searchParams)
    }


 
}

export default Model;
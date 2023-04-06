import SearchFormView from "../views/searchFormView.jsx";
import SearchResultView from "../views/searchResultView.jsx";
import promiseNoData from "../views/promiseNoData.jsx";
import resolvePromise from "../resolvePromise.js";
import {onMounted, onUnmounted} from "vue";

// Search presenter - conntects model and views for search

export default{
    name: "Search",  
    props:["model"],
    setup(props){

        function bornACB(){
            if(!props.model.searchResultsPromiseState.promise) {
                resolvePromise(props.model.doSearch({q: "Bob Marley"}), props.model.searchResultsPromiseState);
            }
        }

        function deathACB(){
            // do nothing
            
        }

        onMounted(bornACB)
        onUnmounted(deathACB)
        
        function onSearchInputACB(searchInput){
            props.model.setSearchQuery(searchInput);
        }

        function onTypeACB(searchType){
            props.model.setSearchType(searchType);
        }

        function onSearchACB(){
            props.model.doSearch(props.model.searchInput);
        }

        return function acb(props){return (
        <div>
            {<SearchFormView 
                typeOptions={["All", "Song", "Artist", "Album"]} 
                onSearchInput={onSearchInputACB} 
                onType={onTypeACB}
                onSearch={onSearchACB}
            />}

            {promiseNoData(props.model.searchResultsPromiseState) || 
            <SearchResultView results={props.model.searchResultsPromiseState.data} />}

            

        </div>
        );};
    },
};
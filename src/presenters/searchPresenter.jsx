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
            console.log(searchType)
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
            {/* TODO: Check if the artists, songs,albums can be passed in a cleaner fashion */}
            {promiseNoData(props.model.searchResultsPromiseState) || 
            <SearchResultView searchOption={props.model.searchInputType}
            results={props.model.searchResultsPromiseState.data}
            artists={props.model.searchResultsPromiseState.data.sections.find(result => result.type === "artist").hits}
            songs={props.model.searchResultsPromiseState.data.sections.find(result => result.type === "song").hits} 
            albums={props.model.searchResultsPromiseState.data.sections.find(result => result.type === "album").hits}
            />}

            

        </div>
        );};
    },
};
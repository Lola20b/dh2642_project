import SearchFormView from "../views/searchFormView.jsx";

// Search presenter - conntects model and views for search

export default{
    name: "Search",  
    props:["model"],
    setup(props){
        
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
                typeOptions={["Song", "Artist", "Album"]} 
                onSearchInput={onSearchInputACB} 
                onType={onTypeACB}
                onSearch={onSearchACB}
            />}
        </div>
        );};
    },
};
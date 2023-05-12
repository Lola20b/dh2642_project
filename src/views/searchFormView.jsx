function SearchFormView(props){
  
    return (
            <div>
                <p class='searchBarText'>Search for a song, artist or album!</p>
                <input type="text" class="searchInput" onChange={searchInputACB}></input>
                <select class="types" onChange={chooseTypeACB}>
                    {props.typeOptions.map(typeCB)}
                </select>

                <button class="searchButton" onClick={clickSearchACB}>Search</button>



            </div>
            
    );

    //fire custom event
    function searchInputACB(e) {props.onSearchInput(e.target.value)}
    function chooseTypeACB(e) {props.onType(e.target.value)} 
    function clickSearchACB(e) {props.onSearch()}

    function typeCB(typeOption){
        return <option key={typeOption} value={typeOption}>
        {typeOption}
        </option>
    }

}

export default SearchFormView;
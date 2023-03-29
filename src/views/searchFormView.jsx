function SearchFormView(props){
  
    return (
            <div>
                <input onChange={searchInputACB}></input>
                <select onChange={chooseTypeACB}>
                <option value=""></option>
                    {props.typeOptions.map(typeCB)}
                </select>

                <button onClick={clickSearchACB}>Search</button>



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
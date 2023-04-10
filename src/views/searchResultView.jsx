function SearchFormView(props){
    
    // temporary placeholder for search results
    // TODO: Send in this data from the model
    const res = props.results.sections[0].hits
  
    return (
            <div>
                {res.map(resultCB)}
            </div>
            
    );

    function songView(result){
        return (
            <div class='searchResultViewBox'>
                <div class="searchResultView_left">
                    <h3 class="searchResultView_header">Song</h3>
                    <p>{result.result.title}   By: {result.result.artist_names}</p>
                    <a class="searchResultViewMoreInfo" href="">More information</a>
                </div>
                <div class="searchResultView_right">
                    <img class="searchResultsViewPicture" src={result.result.song_art_image_url} alt="Song art image"/>
                </div>
            </div>
        );
    }

    function artistView(result){       
        return (
            <div class='searchResultViewBox'>
                <div class="searchResultView_left">
                    <h3 class="searchResultViewHeader">Artist</h3>
                    <p>{result.result.name}</p>
                    <a class="searchResultViewMoreInfo" href="">More information</a>
                </div>
                <div class="searchResultView_right">
                    <img class="searchResultViewPicture" src={result.result.image_url} alt="Artist Image"/>
                </div>

            </div>
        );
    }

    function albumView(result){
        return (
            <div class='albumView'>
                Album
            </div>
        );
    }


    function resultCB(result){
        // check for type of result, and render appropriate component
        if(result.type === "song"){
            return songView(result);
        }
        else if(result.type === "artist"){
            return artistView(result);
        }
        else if(result.type === "album"){
            return albumView(result);
        }
        else{
            return <div>Unknown</div>
        }
    }

}

export default SearchFormView;
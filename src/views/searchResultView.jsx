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
            <div class='songView'>
                <h3>Song</h3>
                <p>{result.result.title} {result.result.artist_names}</p>
            </div>
        );
    }

    function artistView(result){
        // artist name is in result.result.name
        // artist image is in result.result.image_url
        // show both
        
        return (
            <div class='artistView'>
                <h3>Artist</h3>
                <p>{result.result.name}
                <img style='height:150px' src={result.result.image_url} alt="Artist Image"/>
                </p>
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
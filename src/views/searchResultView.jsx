function SearchFormView(props){

    // depending on searchoption we want to render different views
    return (
            <div>
                {console.log(props.songs)}
                {function searchOptionCB(){
                    console.log(props.searchOption)
                    if (props.searchOption === "All"){
                        return allView();
                    }else if(props.searchOption === "Song"){
                        return songView();
                    }else if(props.searchOption === "Artist"){
                        return artistView();
                    }else if(props.searchOption === "Album"){
                        return albumView();
                    }
                }()}
            </div>
            
    );

    function allView(){
        // render all the views
        return (
            <div>
                {songView()}
                {artistView()}
                {albumView()}
            </div> 
        );
    }

    // These views are boxes
    function songView(){
        return (
            <div class='searchResultViewBox'>
                <h3 class="searchResultView_header">Songs</h3>
                {props.songs.map(songCB)}
            </div>
        );

        function songCB(song){
            return (
                <div>
                    <div class="searchResultView_left">
                        <p>{song.result.title}   By: {song.result.artist_names}</p>
                        <a class="searchResultViewMoreInfo" href="">More information</a>
                    </div>
                    <div class="searchResultView_right">
                        <img class="searchResultsViewPicture" src={song.result.song_art_image_url} alt="Song art image"/>
                    </div>
                </div>
            );
        }
    }

    function artistView(){       
        return (
            <div class='searchResultViewBox'>
                <h3 class="searchResultView_header">Artists</h3>
                {props.artists.map(artistCB)}
            </div>
        );

        function artistCB(artist){
            return (
                <div>
                    <div class="searchResultView_left">
                        <p>{artist.result.name}</p>
                        <a class="searchResultViewMoreInfo" href="">More information</a>
                    </div>
                    <div class="searchResultView_right">
                        <img class="searchResultViewPicture" src={artist.result.image_url} alt="Artist Image"/>
                    </div>
                </div>
            );
        }
    }

    function albumView(){
        return (
            <div class='searchResultViewBox'>
                <h3 class="searchResultView_header">Albums</h3>
                {props.albums.map(albumCB)}
            </div>
        );

        function albumCB(album){
            return (
                <div class="searchResultView_innerbox">
                    <div class="searchResultView_left">
                        <p>{album.result.full_title}</p>
                        <a class="searchResultViewMoreInfo" href="">More information</a>
                    </div>
                    <div class="searchResultView_right">
                        <img class="searchResultViewPicture" src={album.result.cover_art_thumbnail_url} alt="Album art Image"/>
                    </div>
                </div>
            );
        }
    }

}

export default SearchFormView;
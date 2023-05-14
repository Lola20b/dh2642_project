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
            <div>
                <p class="searchResultsFortext">Songs that match search input "{props.searchInput}"</p>
                <div class='searchResultViewBox'>
                    <h3 class="searchResultViewHeader">Songs</h3>
                    {props.songs.map(songCB)}
                </div>
            </div>

        );

        function songCB(song){
            return (
                <div class='searchResultViewInnerbox'>
                    <div class="searchResultView_left">
                        <p class='searchResultTitle'>{song.result.title}   By: {song.result.artist_names}</p>
                        <a class="searchResultViewMoreInfo" href={'/Info?type=song&id='+song.result.id}>More information</a>
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
            <div>
                <p class="searchResultsFortext">Artists that match search input "{props.searchInput}"</p>
                <div class='searchResultViewBox'>
                <h3 class="searchResultViewHeader">Artists</h3>
                {props.artists.map(artistCB)}
            </div>
            </div>
            
        );

        function artistCB(artist){
            return (
                <div class='searchResultViewInnerbox'>
                    <div class="searchResultView_left">
                        <p class='searchResultTitle'>{artist.result.name}</p>
                        <a class="searchResultViewMoreInfo" href={'/Info?type=artist&id='+artist.result.id}>More information</a>
                    </div>
                    <div class="searchResultView_right">
                        <img class="searchResultsViewPicture" src={artist.result.image_url} alt="Artist Image"/>
                    </div>
                </div>
            );
        }
    }

    function albumView(){
        return (
            <div>
                <p class="searchResultsFortext">Albums that match search input "{props.searchInput}"</p>
                <div class='searchResultViewBox'>
                    <h3 class="searchResultViewHeader">Albums</h3>
                    {props.albums.map(albumCB)}
                </div>
            </div>

        );

        function albumCB(album){
            return (
                <div class="searchResultViewInnerbox">
                    <div class="searchResultView_left">
                        <p class='searchResultTitle'>{album.result.full_title}</p>
                        <a class="searchResultViewMoreInfo" href={'/Info?type=album&id='+album.result.id}>More information</a>
                    </div>
                    <div class="searchResultView_right">
                        <img class="searchResultsViewPicture" src={album.result.cover_art_thumbnail_url} alt="Album art Image"/>
                    </div>
                </div>
            );
        }
    }

}

export default SearchFormView;
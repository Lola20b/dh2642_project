function ProfileView(props) {
    return (
        // return a table with three columns and two rows. The table should fill to the entire page. Each column has a top row that says "Artists", "Songs", "Albums" and
        // a bottom row that has a list of the artists, songs, and albums.
        // Use placeholder css-classes for now and then these will be styled later. The lists of artists, songs, and albums
        // will be filled in using the _presentCB functions below. 
        <div class="test">
            <table class="profileTable">
                <tr>
                    <th class="tableTitle">Artists</th>
                    <th class="tableTitle">Songs</th>
                    <th class="tableTitle">Albums</th>
                </tr>
                <tr>
                    <td>
                        {props.savedArtists.map(artistsPresentCB)}
                    </td>
                    <td>
                        {props.savedSongs.map(songsPresentCB)}
                    </td>
                    <td>
                        {props.savedAlbums.map(albumsPresentCB)}
                    </td> 
                    {print()}
                </tr>
            </table>
        </div>
    );
        

    function print() {
        props.printPres()
    }
    function artistsPresentCB(artist){
        return (
            <div class="profileView_artist_name">
                {artist.name}
                <button onClick={clickRemoveArtistACB}>Remove</button>
            </div>
        );

        function clickRemoveArtistACB(evt) { props.onWishRemoveArtist(artist);}
    }

    function songsPresentCB(song){
        return (
            <div class="profileView_song_name">
                {song.title}
                <button onClick={clickRemoveSongACB}>Remove</button>
            </div>
        );

        function clickRemoveSongACB(evt) { props.onWishRemoveSong(song);}
    }

    function albumsPresentCB(album){
        return (
            <div class="profileView_album_name">
                {album.name}
                <button onClick={clickRemoveAlbumACB}>Remove</button>
            </div>
        );

        function clickRemoveAlbumACB(evt) { props.onWishRemoveAlbum(album);}
    }
    
}

export default ProfileView;
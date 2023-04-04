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
                        {props.artists.map(artistsPresentCB)}
                    </td>
                    <td>
                        {props.songs.map(songsPresentCB)}
                    </td>
                    <td>
                        {props.albums.map(albumsPresentCB)}
                    </td>
                </tr>
            </table>
        </div>
    );
        

    function artistsPresentCB(artist){
        return (
            <div class="profileView_artist_name">
                {artist}
            </div>
        );
    }

    function songsPresentCB(song){
        return (
            <div class="profileView_song_name">
                {song}
            </div>
        );
    }

    function albumsPresentCB(album){
        return (
            <div class="profileView_album_name">
                {album}
            </div>
        );
    }
    
}

export default ProfileView;
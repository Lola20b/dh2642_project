function ProfileView(props) {
    return (
        // return a table with three columns and two rows. The table should fill to the entire page. Each column has a top row that says "Artists", "Songs", "Albums" and
        // a bottom row that has a list of the artists, songs, and albums.
        // Use placeholder css-classes for now and then these will be styled later. The lists of artists, songs, and albums
        // will be filled in using the _presentCB functions below. 
        <div class="profileTest">

            <table class="profileTable">
                <thead class="tableTitle">Artists</thead>
                <tbody>
                    {props.savedArtists.map(artistsPresentCB)}
                </tbody>
            </table>
            <table class="profileTable">
                <thead class="tableTitle">Songs</thead>
                <tbody>
                {props.savedSongs.map(songsPresentCB)}
                </tbody>
            </table>
            <table class="profileTable">
                <thead class="tableTitle">Albums</thead>
                <tbody>
                {props.savedAlbums.map(albumsPresentCB)}
                </tbody>
            </table>
        </div>
    );
        

    function print() {
        props.printPres()
    }
    function artistsPresentCB(artist){
        return (
            <tr class="tableRow">
                <a  href={'/Info?type=artist&id='+artist.id}>{artist.name}</a>
                <button class="removeButton" onClick={clickRemoveArtistACB}>Remove</button>
            </tr>
        );

        function clickRemoveArtistACB(evt) { props.onWishRemoveArtist(artist);}
    }

    function songsPresentCB(song){
        return (
            <tr class="tableRow">
                <a  href={'/Info?type=song&id='+song.id}>{song.title}</a>
                <button class="removeButton" onClick={clickRemoveSongACB}>Remove</button>
            </tr>
        );

        function clickRemoveSongACB(evt) { props.onWishRemoveSong(song);}
    }

    function albumsPresentCB(album){
        return (
            <tr class="tableRow">
                <a  href={'/Info?type=album&id='+album.id}>{album.name}</a>
                <button class="removeButton" onClick={clickRemoveAlbumACB}>Remove</button>
            </tr>
        );

        function clickRemoveAlbumACB(evt) { props.onWishRemoveAlbum(album);}
    }
    
}

export default ProfileView;
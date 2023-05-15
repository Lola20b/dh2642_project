function InfoView(props) {
    if (props.type === "song") {
        return (<div class="infoView">
        <h1>{props.songData.song.title}</h1>
        <h2>{props.songData.song.artist_names}</h2>
        <img src={props.songData.song.custom_song_art_image_url} height="200"></img>
        <div>
            <button class="infoViewButton" disabled={props.isSongSaved} onClick={onSaveSongACB}>Save</button>
            <button class="infoViewButton" disabled={props.alreadyLikedSong} onClick={onLikeSongACB}>Like</button>
            Number of likes: {props.songLikesCounter}
        </div>
        <h3>Lyrics</h3>
        <p>{props.lyricsData.lyrics.lyrics.body.plain}</p>
        <h3>Description</h3>
        <p>{props.songData.song.description_preview}</p>

    </div>);
    } else if (props.type === "album") {
        return (<div class="infoView">
            <h1>{props.albumData.album.full_title}</h1>
            <img src={props.albumData.album.cover_art_url} height="200"></img>
            <div>
                <button class="infoViewButton" disabled={props.isAlbumSaved} onClick={onSaveAlbumACB}>Save</button>
                <button class="infoViewButton" disabled={props.alreadyLikedAlbum} onClick={onLikeAlbumACB}>Like</button>
                Number of likes: {props.albumLikesCounter}
            </div>
            <p>Release date: {props.albumData.album.release_date_for_display}</p>
            <h3>Description</h3>
            <p>{props.albumData.album.description_preview}</p>
            </div>);
    } else if (props.type === "artist") {
        return (<div class="infoView">
            <h1>{props.artistData.artist.name}</h1>
            <img src={props.artistData.artist.image_url} height="200"></img>
            <div>
                <button class="infoViewButton" disabled={props.isArtistSaved} onClick={onSaveArtistACB}>Save</button>
                <button class="infoViewButton" disabled={props.alreadyLikedArtist} onClick={onLikeArtistACB}>Like</button>
                Number of likes: {props.artistLikesCounter}
            </div>
            <p>{props.artistData.artist.description_preview}</p>
            </div>);
    }

    function onSaveSongACB(evt) {props.saveSong(props.songData.song);};
    function onSaveAlbumACB(evt) {props.saveAlbum(props.albumData.album);};
    function onSaveArtistACB(evt) {props.saveArtist(props.artistData.artist);};
    function onLikeSongACB(evt) {props.likeSong(props.songData.song);};
    function onLikeAlbumACB(evt) {props.likeAlbum(props.albumData.album);};
    function onLikeArtistACB(evt) {props.likeArtist(props.artistData.artist);};

}

export default InfoView;
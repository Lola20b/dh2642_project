function InfoView(props) {
    if (props.type === "song") {
        return (<div class="infoView">
        <h1>{props.songData.song.title}</h1>
        <h2>{props.songData.song.artist_names}</h2>
        <img src={props.songData.song.custom_song_art_image_url} height="200"></img>
        <button disabled={props.isSongSaved} onClick={onSaveSongACB}>Save</button>
        <h3>Lyrics</h3>
        <p>{props.lyricsData.lyrics.lyrics.body.plain}</p>
        <h3>Description</h3>
        <p>{props.songData.song.description_preview}</p>

    </div>);
    } else if (props.type === "album") {
        return (<div class="infoView">
            <h1>{props.albumData.album.full_title}</h1>
            <img src={props.albumData.album.cover_art_url} height="200"></img>
            <button disabled={props.isAlbumSaved} onClick={onSaveAlbumACB}>Save</button>
            <p>Release date: {props.albumData.album.release_date_for_display}</p>
            <h3>Description</h3>
            <p>{props.albumData.album.description_preview}</p>
            </div>);
    } else if (props.type === "artist") {
        return (<div class="infoView">
            <h1>{props.artistData.artist.name}</h1>
            <img src={props.artistData.artist.image_url} height="200"></img>
            <button disabled={props.isArtistSaved} onClick={onSaveArtistACB}>Save</button>
            <p>{props.artistData.artist.description_preview}</p>
            </div>);
    }

    function onSaveSongACB(evt) {props.saveSong(props.songData.song);};
    function onSaveAlbumACB(evt) {props.saveAlbum(props.albumData.album);};
    function onSaveArtistACB(evt) {props.saveArtist(props.artistData.artist);};
}

export default InfoView;
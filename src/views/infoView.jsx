function InfoView(props) {
    if (props.type === "song") {
        return (<div class="debug">
        <h1>{props.songData.title}</h1>
        <h2>{props.songData.artist}</h2>
        <img src={props.songData.custom_song_art_image_url} height="200"></img>
        <h3>Lyrics</h3>
        <p>{props.lyricsData}</p>
        <h3>Description</h3>
        <p>{props.songData.description_preview}</p>

    </div>);
    } else if (props.type === "album") {
        return (<div> Album </div>);
    } else if (props.type === "artist") {
        return (<div> Artist </div>);
    }
}

export default InfoView;
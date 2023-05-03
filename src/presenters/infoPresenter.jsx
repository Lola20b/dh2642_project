import InfoView from "../views/infoView";
import promiseNoData from "../views/promiseNoData.jsx";
import {onMounted, onUnmounted} from "vue";

export default 
{
    name: "Info",
    props: ["model", "type", "id"],
    setup(props) {
        function lifeACB(){
            if (props.type === "artist") {
                if(!props.model.artistPromiseState.promise) {
                    props.model.fetchArtist({id: props.id});
                }
            } else if (props.type === "album") {
                if(!props.model.albumPromiseState.promise) {
                    props.model.fetchAlbum({id: props.id});
                };
            } else if (props.type === "song") {
                if(!props.model.songPromiseState.promise) {
                    props.model.fetchSong({id: props.id});
                    props.model.fetchLyrics({id: props.id, text_format: 'plain'});
                }
            };
        }
        function ripACB(){console.log("perform cleanup");} 

        onMounted(lifeACB);
        onUnmounted(ripACB);

        return function renderACB() {
            if (props.type === "artist") {
                return ( <div>
                    
                    {promiseNoData(props.model.artistPromiseState) || 
                    <InfoView type="artist" artistData = {props.model.artistPromiseState.data} isArtistSaved={props.model.savedArtists.find(matchACB)} saveArtist={addArtistToProfileACB}/>}
                
                    </div>);
            } else if (props.type === "album") {
                return ( <div>
                              
                    {promiseNoData(props.model.albumPromiseState) || 
                    <InfoView type="album" albumData = {props.model.albumPromiseState.data} isAlbumSaved={props.model.savedAlbums.find(matchACB)} saveAlbum={addAlbumToProfileACB}/>}

                    </div>);
            }  else if (props.type === "song") {
                return ( <div>
                
                    {promiseNoData(props.model.songPromiseState) || promiseNoData(props.model.lyricsPromiseState) || 
                    <InfoView type="song" songData = {props.model.songPromiseState.data} lyricsData= {props.model.lyricsPromiseState.data} isSongSaved={props.model.savedSongs.find(matchACB)} saveSong={addSongToProfileACB}/>}
                
                    </div>);
            }

            function matchACB(elem) {
                return elem.id == props.id;
            }

            function addSongToProfileACB(song) {
                props.model.saveSong(song);
            }
            function addAlbumToProfileACB(album) {
                props.model.saveAlbum(album);
            }
            function addArtistToProfileACB(artist) {
                props.model.saveArtist(artist);
            }
        };
    },
}
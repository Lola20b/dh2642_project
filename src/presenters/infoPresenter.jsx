import InfoView from "../views/infoView";
import promiseNoData from "../views/promiseNoData.jsx";
import {onMounted, onUnmounted} from "vue";

export default 
{
    name: "Info",
    props: ["model"],
    setup(props) {
        function lifeACB(){
            if(!props.model.artistPromiseState.promise) {
                props.model.fetchArtist({id: "344497"});
            };
        }
        function ripACB(){console.log("perform cleanup");} 

        onMounted(lifeACB);
        onUnmounted(ripACB);

        return function renderACB() {
            return ( <div>
                
                {promiseNoData(props.model.artistPromiseState) || 
                <InfoView type={"artist"} artistData = {props.model.artistPromiseState.data} saveArtist={addArtistToProfileACB}/>}
            
                </div>);

            function addSongToProfileACB(songID) {
                props.model.saveSong(songID);
            }
            function addAlbumToProfileACB(albumID) {
                props.model.saveAlbum(albumID);
            }
            function addArtistToProfileACB(artistID) {
                props.model.saveArtist(artistID);
            }
        };
    },
}
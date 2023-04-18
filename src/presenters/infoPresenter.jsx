import InfoView from "../views/infoView";
import promiseNoData from "../views/promiseNoData.jsx";
import {onMounted, onUnmounted} from "vue";

export default 
{
    name: "Info",
    props: ["model"],
    setup(props) {
        function lifeACB(){
            if(!props.model.songResultsPromiseState.promise || !props.model.lyricsResultsPromiseState.promise) {
                props.model.fetchSong({id: "2396871"});
                props.model.fetchLyrics({id: "2396871", text_format: 'plain'});
            };
        }
        function ripACB(){console.log("perform cleanup");} 

        onMounted(lifeACB);
        onUnmounted(ripACB);

        return function renderACB() {
            return ( <div>
                
                {promiseNoData(props.model.songResultsPromiseState) || promiseNoData(props.model.lyricsResultsPromiseState) ||<InfoView type={"song"} songData = {props.model.songResultsPromiseState.data} lyricsData= {props.model.lyricsResultsPromiseState.data}/>}
            
                </div>);
        };
    },
}
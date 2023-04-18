import InfoView from "../views/infoView";
import promiseNoData from "../views/promiseNoData.jsx";
import {onMounted, onUnmounted} from "vue";

export default 
{
    name: "Info",
    props: ["model"],
    setup(props) {
        function lifeACB(){
            if(!props.model.songResultsPromiseState.promise) {
                props.model.fetchSong({id: "2396871"})
            };
        }
        function ripACB(){console.log("perform cleanup");} 

        onMounted(lifeACB);
        onUnmounted(ripACB);

        return function renderACB() {
            return ( <div>
                
                {promiseNoData(props.model.songResultsPromiseState) || <InfoView type={"song"} songData = {props.model.songResultsPromiseState.data} lyricsData={"[Verse 1] You were the shadow to my light Did you feel us? Another star, you fade away Afraid our aim is out of sight Wanna see us alight [Pre-Chorus 1] Where are you now? Where are you now? Where are you now? Was it all in my fantasy? Where are you now? Were you only imaginary? [Chorus] Where are you now? Atlantis, under the sea, under the sea Where are you now? Another dream The monster's running wild inside of me I'm faded, I'm faded So lost, I'm faded, I'm faded So lost, I'm faded [Verse 2] These shallow waters never met what I needed I'm letting go, a deeper dive Eternal silence of the sea I'm breathing, alive [Pre-Chorus 2] Where are you now? Where are you now? Under the bright but faded lights You set my heart on fire Where are you now? Where are you now? [Chorus] Where are you now? Atlantis, under the sea, under the sea Where are you now? Another dream The monster's running wild inside of me I'm faded, I'm faded So lost, I'm faded, I'm faded So lost, I'm faded"}/>}
            
                </div>);
        };
    },
}
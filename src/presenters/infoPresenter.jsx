import InfoView from "../views/infoView";
import promiseNoData from "../views/promiseNoData.jsx";
import {onMounted, onUnmounted} from "vue";

export default 
{
    name: "Info",
    props: ["model"],
    setup(props) {
        function lifeACB(){
            if(!props.model.albumPromiseState.promise) {
                props.model.fetchAlbum({id: "368574"});
            };
        }
        function ripACB(){console.log("perform cleanup");} 

        onMounted(lifeACB);
        onUnmounted(ripACB);

        return function renderACB() {
            return ( <div>
                
                {promiseNoData(props.model.albumPromiseState) || 
                <InfoView type={"album"} albumData = {props.model.albumPromiseState.data}/>}
            
                </div>);
        };
    },
}
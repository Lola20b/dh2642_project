import {RouterView} from "vue-router";

const VueRoot = {
    name: "VueRoot",
    setup(){

        return function renderACB(){
            return (
                <div class="flexParent">
                <div class="sidebar"><RouterView></RouterView></div>
                <div class="mainContent">Placeholder</div>
                </div>
            );
        }
    }
};

export default VueRoot;





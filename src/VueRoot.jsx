import {RouterView} from "vue-router";

const VueRoot = {
    name: "VueRoot",
    setup(){

        return function renderACB(){
            return (
                <div class="flexParent">
                <div class="mainContent"><RouterView/></div>
                </div>
            );
        }
    }
};

export default VueRoot;





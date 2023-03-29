import {RouterView} from "vue-router";

const VueRoot = {
    name: "VueRoot",
    setup(){

        return function renderACB(){
            return (
                <div>
                <div><RouterView/></div>
                </div>
            );
        }
    }
};

export default VueRoot;





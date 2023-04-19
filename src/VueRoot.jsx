import Sidebar from './presenters/sidebarPresenter'

import {RouterView} from "vue-router";

const VueRoot = {
    name: "VueRoot",
    setup(){

        return function renderACB(){
            return (
                <div class="flexParent">
                <div class="sidebar"><Sidebar/></div>
                <div class="mainContent"><RouterView/></div>
                </div>
            );
        }
    }
};

export default VueRoot;





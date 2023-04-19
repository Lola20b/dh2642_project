import Sidebar from './presenters/sidebarPresenter'
import { firebaseModelPromise } from "./firebaseModel.js";
import resolvePromise from "./resolvePromise.js";
import {onMounted, onUnmounted} from "vue";
import {RouterView} from "vue-router";
import { reactive } from "vue";
import Model from "./model.js";

const myModel= reactive(new Model());

const VueRoot = {
    name: "VueRoot",
    setup(){

        const currentfirebaseModelPromise = reactive({})

        function bornACB(){
            resolvePromise(firebaseModelPromise(myModel), currentfirebaseModelPromise)
        }

        function deathACB(){
            // do nothing
        }

        onMounted(bornACB)
        onUnmounted(deathACB)

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





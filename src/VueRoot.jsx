import Sidebar from './presenters/sidebarPresenter'
import { firebaseModelPromise } from "./firebaseModel.js";
import resolvePromise from "./resolvePromise.js";
import {onMounted, onUnmounted} from "vue";
import {RouterView} from "vue-router";
import { reactive } from "vue";
import Model from "./model.js";
import promiseNoData from './views/promiseNoData';

import { createRouter, createWebHistory } from 'vue-router'
import Profile from './presenters/profilePresenter'
import Search from './presenters/searchPresenter'
import Info from './presenters/infoPresenter'
import Auth from './presenters/AuthPresenter'

const myModel= reactive(new Model());

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: <Search model={myModel} />,
      },
      {
        path: '/Profile',
        name: 'profile',
        component: <Profile model={myModel} />,
      },
      {
        path: '/Info',
        name: 'info',
        component: <Info model={myModel} />
      },
      {
        path: '/Auth',
        name: 'Auth',
        component: Auth
      },
    ]
  })

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
            return promiseNoData(currentfirebaseModelPromise) ||
                <div class="flexParent">
                <div class="sidebar"><Sidebar model={myModel}/></div>
                <div class="mainContent"><RouterView/></div>
                </div>
            
        }
    }
};

export {VueRoot, router};





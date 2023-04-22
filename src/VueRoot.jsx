import Sidebar from './presenters/sidebarPresenter'
import { auth, connectModelToFirebase, firebaseModelPromise } from "./firebaseModel.js";
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
        component: <div></div>
      },
    ]
  })

const VueRoot = {
    name: "VueRoot",
    setup(){

        const currentfirebaseModelPromise = reactive({})

        function bornACB(){
            resolvePromise(connectModelToFirebase(myModel), currentfirebaseModelPromise)
        }

        function deathACB(){
            // do nothing
        }

        onMounted(bornACB)
        onUnmounted(deathACB)

        return function renderACB(){
            if(myModel.user===undefined) {
              return (
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" class="promiseStateLoading"/>
              ); 
            }
            if(myModel.user===null) {
              return <Auth auth = {auth}/>;
            }
            return (
                !myModel.ready && <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" class="promiseStateLoading"/> ||
                  <div class="flexParent">
                    <div class="sidebar"><Sidebar model={myModel}/></div>
                    <div class="mainContent"><RouterView/></div>
                  </div>
            )    
            
        }
    }
};

export {VueRoot, router};





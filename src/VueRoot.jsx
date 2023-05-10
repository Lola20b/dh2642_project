import Sidebar from './presenters/sidebarPresenter'
import { connectModelToFirebase, firebaseModelPromise } from "./firebaseModel.js";
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
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'

const myModel= reactive(new Model());

const auth = getAuth()

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
        component: Info,
        props: (route) => ({ type: route.query.type ,id: route.query.id , model: myModel}), 
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
                <img src="https://cdn.shopify.com/s/files/1/0611/9509/2191/t/2/assets/loading.gif?v=157493769327766696621636595199" class="promiseStateLoading"/>
              ); 
            }
            if(myModel.user===null) {
              return <Auth auth = {auth}/>;
            }
            return (
                !myModel.ready && <img src="https://cdn.shopify.com/s/files/1/0611/9509/2191/t/2/assets/loading.gif?v=157493769327766696621636595199" class="promiseStateLoading"/> ||
                  <div class="flexParent">
                    <div class="sidebar"><Sidebar model={myModel}/></div>
                    <div class="mainContent"><RouterView/></div>
                  </div>
            )    
            
        }
    }
};

export {VueRoot, router};





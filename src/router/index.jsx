import { createRouter, createWebHistory } from 'vue-router'
import { reactive } from "vue";
import Profile from '../presenters/profilePresenter'
import Search from '../presenters/searchPresenter'
import Model from '../model.js'
import Info from '../presenters/infoPresenter'
import Song from '../presenters/songPresenter'
import Artist from '../presenters/artistPresenter'
import Album from '../presenters/albumPresenter'

// Model
const myModel= reactive(new Model());

// TODO: Replace placeholder views with corresponding presenters
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
      component: Profile
    },
    {
      path: '/Info',
      name: 'info',
      component: Info,
      props: (route) => ({ type: route.query.type ,id: route.query.id , model: myModel}), 
    },
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { reactive } from "vue";
import ProfileView from '../views/profileView'
import Search from '../presenters/searchPresenter'
import Model from '../model.js'

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
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
  ]
})

export default router

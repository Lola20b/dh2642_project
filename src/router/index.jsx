import { createRouter, createWebHistory } from 'vue-router'
import { reactive } from "vue";
import Profile from '../presenters/profilePresenter'
import Sidebar from '../presenters/SidebarPresenter'
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
      path: '/Profile',
      name: 'profile',
      component: Profile
    },
  ]
})

export default router

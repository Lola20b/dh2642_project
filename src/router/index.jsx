import { createRouter, createWebHistory } from 'vue-router'
import { reactive } from "vue";
import Profile from '../presenters/profilePresenter'
import Sidebar from '../presenters/sidebarPresenter'
import Search from '../presenters/searchPresenter'
import Model from '../model.js'
import Info from '../presenters/infoPresenter'
import Auth from '../presenters/AuthPresenter'

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
      component: <Info model={myModel} />
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    },
  ]
})

export default router

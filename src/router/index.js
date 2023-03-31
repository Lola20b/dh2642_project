import { createRouter, createWebHistory } from 'vue-router'
import testView from '../views/testView.vue'
import ProfileView from '../views/profileView'
import Sidebar from '../presenters/SidebarPresenter'

// TODO: Replace placeholder views with corresponding presenters
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: testView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: Sidebar
    }
  ]
})

export default router

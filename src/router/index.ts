import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '@/views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: UsersView
    },
    {
      path: '/user',
      name: 'addUser',
      // lazy-loaded
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/user/:id',
      name: 'editUser',
      // lazy-loaded
      component: () => import('@/views/UserView.vue')
    }
  ]
})

export default router

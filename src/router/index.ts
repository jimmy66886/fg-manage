import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: import('@/views/LoginView.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: import('@/views/MenuView.vue'),
      children: [
        {
          path: 'user',
          name: 'user',
          component: import('@/components/ManageUser.vue')
        },
        {
          path: 'recipe',
          name: 'recipe',
          component: import('@/components/ManageRecipe.vue')
        },
        {
          path: 'category',
          name: 'category',
          component: import('@/components/ManageCategory.vue')
        },
        {
          path: 'index',
          name: 'index',
          component: import('@/components/ManageIndex.vue')
        },
      ]
    },
  ]
})

export default router

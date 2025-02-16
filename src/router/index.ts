import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StandardQuizView from '@/views/StandardQuizView.vue'
import DndQuizView from '../views/DndQuizView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/standard-quiz',
      name: 'standard-quiz',
      component: StandardQuizView,
    },
    {
      path: '/dnd-quiz',
      name: 'dnd-quiz',
      component: DndQuizView,
    },
  ],
})

export default router

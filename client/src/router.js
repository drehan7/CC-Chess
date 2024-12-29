import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import MainGameView from './MainGameView.vue'

const routes = [
  { path: '/', name: "Home", component: HomeView },
  { path: '/play', name: "Play", component: MainGameView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

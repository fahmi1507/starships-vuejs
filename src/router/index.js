
import { createRouter, createWebHashHistory } from 'vue-router'
import StarshipList from '../views/StarshipList.vue'
import StarshipDetail from '../components/StarshipDetail.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: StarshipList
  },
  {
    path: '/starships/:id',
    name: 'detail',
    component: StarshipDetail
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
]

const router = createRouter({
  history: createWebHashHistory('http://127.0.0.1:5173/'),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import ListStarships from '../components/ListStarships.vue'
import StarshipDetail from '../components/StarshipDetail.vue'
import PageNotFound from '../components/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ListStarships
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
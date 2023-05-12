import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots

createApp(App)
  .use(router)
  .component("infinite-loading", InfiniteLoading)
  .mount('#app')

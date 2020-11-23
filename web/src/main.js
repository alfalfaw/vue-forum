import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/style.scss'

import axios from 'axios'
import '@/utils/veevalidate'

const http = axios.create({
  baseURL: 'http://127.0.0.1:5000'
})

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

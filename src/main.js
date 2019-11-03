import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'

// TODO 填上发请求的 url，这样在以后的请求中只需要填写后面的路径部分
axios.defaults.baseURL = ''

Vue.prototype.axios = axios
Vue.prototype.qs = qs

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

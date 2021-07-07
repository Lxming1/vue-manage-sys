import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from '@/plugins/ElementUI'
import axios from './network/axios'

ElementUI()
axios()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

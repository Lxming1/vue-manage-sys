import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from '@/plugins/ElementUI'
import axios from './network/axios'
import ZKTable from 'vue-table-with-tree-grid'
import Quill from './plugins/vue-quill-editor'

ElementUI()
axios()
Quill()

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.component('tree-table', ZKTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

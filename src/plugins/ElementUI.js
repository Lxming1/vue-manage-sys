import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'
import Vue from 'vue'
export default function(){
  Vue.prototype.$message = ElementUI.Message
  Vue.use(ElementUI)
}

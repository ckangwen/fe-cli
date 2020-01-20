import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Col, Row, Menu, Submenu, MenuItem, MenuItemGroup, Tag } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tag)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

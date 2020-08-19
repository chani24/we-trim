import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router' 
import Home from './components/Home.vue';
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
Vue.use(BootstrapVue) 
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const routes = [
  { path: '', component: Home, name: 'Home'}
]

const router = new VueRouter({
  routes 
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

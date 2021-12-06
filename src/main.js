import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {firestorePlugin} from 'vuefire'
import  Home from './views/Home'
import  Buildings from './views/Buildings'


Vue.use(firestorePlugin)
Vue.use(VueRouter)
Vue.config.productionTip = false


const routes = [
  {path :'/buildings',component:Buildings,name:'buildings'},
  {path :'/',component:Home,name:'home'}

]

const router = new VueRouter({
  routes:routes,
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

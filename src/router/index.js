import Vue from 'vue'
import VueRouter from 'vue-router'
import newPage from '../components/NewPage.vue'
import demoEntry from '../view/DemoEntry.vue'
import principlesPage from '../view/PrinciplesPage.vue'
import resultPage from '../view/ResultPage.vue'
import schemesPage from '../view/SchemesPage.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/A',
      component: newPage
    },
    {
      path: '/',
      component: demoEntry   
    },
    {
      path: '/home',
      component: demoEntry   
    },
    {
      path: '/principles',
      component: principlesPage
    },
    {
      path: '/result',
      component: resultPage,
    },
    {
      path: '/schemes',
      component: schemesPage,
    }
  ]
})
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard, faPalette, faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'



library.add(faHatWizard)
library.add(faPalette)
library.add(faGithub)
library.add(faArrowRightLong)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

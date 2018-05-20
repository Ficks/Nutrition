import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/index.vue'
import Find from '@/components/Find/find'
import Consultation from '@/components/Consultation/consultation'
import My from '@/components/My/my'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/Find',
    name: 'Find',
    component: Find
  }, {
    path: '/Consultation',
    name: 'Consultation',
    component: Consultation
  }, {
    path: '/My',
    name: 'My',
    component: My
  }, ]
})

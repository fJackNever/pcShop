// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

require('./mock.js')

Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
  error:'/static/images/error.jpg',
  loading:'/static/images/load.gif'
})

Vue.use(infiniteScroll)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

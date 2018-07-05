// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import { userInfo } from './api'

Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
  error:'/static/images/error.jpg',
  loading:'/static/images/load.gif'
})

Vue.use(infiniteScroll)

//不需要登录的页面
const whiteList = ['/home','/goods','/login','/goodsDetails']
router.beforeEach(( to,from,next ) => {
  userInfo().then(res => {
    //没登录
    if(res.status){
      if(whiteList.indexOf(to.path) !== -1){
        next()
      }else{
        next('/login')
      }
    }else{
      //console.log(res.result)
      store.commit('RECORD_USERINFO',{info:res.result})
      //跳转到
      if(to.path === '/login'){
        next({path:'/'})
      }
      next()
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

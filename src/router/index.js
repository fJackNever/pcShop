import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['/page/index'], resolve)
const Login = resolve => require(['/page/Login/login'],resolve)
const Home = resolve => require(['/page/Home/home'],resolve)
const Cart = resolve => require(['/page/Cart/cart'], resolve)
const Goods = resolve => require(['/page/Goods/goods'],resolve)
const goodsDetails = resolve => require(['/page/Goods/goodsDetails'],resolve)
const user = resolve => require(['/page/User/user'],resolve)
const information = resolve => require(['/page/User/children/information'],resolve)
const addressList = resolve => require(['/page/User/children/addressList'],resolve)

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect:'/home',
      children:[
        {path:'home',component:Home},
        {path:'goods',name:'goods',component:Goods},
        {path:'goodsDetails',name:'goodsDetails',component: goodsDetails}
      ]
    },
    { path:'/login',name:'login',component:Login },
    { path:'/cart',name:'cart',component: Cart },
    {
      path:'/user',
      name:'user',
      component:user,
      redirect:'/user/information',
      children:[
        {path:'information',name:'information',component:information}, //账户资料
        {path:'addressList',name:'addressList',component:addressList}, //收货地址
      ]
    },
    {path:'*',redirect:'/home'}
  ]
})

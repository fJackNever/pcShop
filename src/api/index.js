import http from './public'

//导航接口
export const nav = ( params ) => {
  return http.fetchGet(`/nav`,params)
}

//首页接口
export const productHome = ( params ) => {
  return http.fetchPost(`/productHome`,params)
}


// //登录
// export const userLogin = ( params ) => {
//   return http.fetchPost(`${baseUrl}/users/login`,params)
// }
//
// //退出登录
// export const loginOut = ( params ) => {
//   return http.fetchPost(`${baseUrl}/users/loginOut`,params)
// }
//
// //用户信息
// export const userInfo = ( params ) => {
//   return http.fetchPost(`${baseUrl}/users/userInfo`,params)
// }
//
// //注册
// export const register = ( params ) => {
//   return http.fetchPost(`${baseUrl}/users/register`,params)
// }

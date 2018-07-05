import http from './public'
const baseUrl = '/api'

//电脑列表
export const getComputer = ( params ) => {
  return http.fetchGet( `${baseUrl}/goods/computer`, params )
}

//商品详情
export const productDet = (params) => {
  return http.fetchGet(`${baseUrl}/goods/productDet`,params)
}

//获取购物车列表
export const getCartList = ( params ) => {
  return http.fetchPost(`${baseUrl}/users/cartList`,params)
}

//加入购物车
export const addCart = ( params ) => {
  return http.fetchPost(`${baseUrl}/goods/addCart`,params)
}

//批量加入购物车
export const addCartBatch = ( params ) => {
  return http.fetchPost(`${baseUrl}/goods/addCartBatch`,params)
}

//编辑购物车
export const cartEdit = ( params ) => {
  return http.fetchPost(`${baseUrl}/users/cartEdit`,params)
}

//全选
export const editCheckAll = ( params ) => {
  return http.fetchPost(`${baseUrl}/users/editCheckAll`,params)
}

//删除购物车商品
export const cartDel = ( params ) => {
  return http.fetchPost(`${baseUrl}/users/cartDel`,params)
}

//获取用户地址
export const addressList = (params) => {
  return http.fetchPost(`${baseUrl}/users/addressList`,params)
}

//添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost(`${baseUrl}/users/addressAdd`,params)
}

//修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost(`${baseUrl}/users/addressUpdate`,params)
}

//删除收货地址
export const addressDel = (params) => {
  return http.fetchPost(`${baseUrl}/users/addressDel`,params)
}

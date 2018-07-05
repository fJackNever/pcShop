import {
  ADD_CART,
  ADD_ANIMATION,
  SHOW_CART,
  INIT_BUYCART,
  RECORD_USERINFO,
  EDIT_CART
} from './mutations-types'
import { setStore, getStore } from '../utils/storage'

export default{
  //网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART]( state ){
    let initCart = getStore('buyCart')
    if(initCart){
      state.cartList = JSON.parse(initCart);
    }
  },
  //加入购物车
  [ADD_CART](state,{ productId,productPrice,productName,productImg,productNum = 1}){
    let cart = state.cartList  //购物车
    let flag = true;
    let goods = {
      productId,
      productPrice,
      productName,
      productImg
    }

    if(cart.length){
        cart.forEach(item => {
          if(item.productId == productId){
            flag = false;
            item.productNum += productNum;
          }
        })
    }

    if(!cart.length || flag){
      goods.productNum = productNum
      goods.checked = "1"
      cart.push(goods)
    }

    state.cartList = cart;
    setStore('buyCart',cart)
  },

  //加入购物车动画
  [ADD_ANIMATION](state,{moveShow,elLeft,elTop,img,cartPositionT,cartPositionL,receiveInCart}){
      state.showMoveImg = moveShow;
      state.elLeft = elLeft;
      state.elTop = elTop;
      state.moveImgUrl = img;
      state.receiveInCart = receiveInCart;
      if(cartPositionT){
          state.cartPositionL = cartPositionL;
          state.cartPositionT = cartPositionT;
      }
  },

  //是否显示购物车
  [SHOW_CART] (state,{showCart}){
    state.showCart = showCart
  },

//记录用户信息
  [RECORD_USERINFO](state,{info}){
    state.userInfo = info;
    state.login = true;
  },

//修改购物车
  [EDIT_CART](state,{ productId, productNum, checked }){

    if(productNum){
      state.cartList.forEach((item,i) => {
        if( item.productId === productId ){
          item.productNum = productNum;
          item.checked = checked;
        }
      })
    }else if(productId){
      for(let i=0; i<state.cartList.length; i++){
        if(state.cartList[i].productId === productId){
          state.cartList.splice(i,1);
        }
      }
    }else{
      state.cartList.forEach((item) => {
        item.checked = checked ? '1' : '0'
      })
    }

    //存入localStorage
    setStore('buyCart',state.cartList);
  }

}

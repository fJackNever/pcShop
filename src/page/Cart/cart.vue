<template>
  <div id="cart">
      <y-header :showNav="false"></y-header>
      <div class="store-content page-cart">
        <div class="gray-box">
          <div class="title"><h2>购物清单</h2></div>

            <div v-if="cartList && cartList.length">
           <!--内容-->
             <div class="ui-cart">
                 <!--标题-->
                 <div class="cart-table-title">
                   <span class="name">商品信息</span>
                   <span class="operation">操作</span>
                   <span class="subtotal">小计</span>
                   <span class="num">数量</span>
                   <span class="priceSingle">单价</span>
                 </div>
                 <!--列表-->
                 <div class="cart-table" v-for="(item,i) in cartList" :key="i">
                    <div class="cart-items">
                      <!--勾选-->
                      <div class="items-choose fl">
                          <span class="blue-checkbox-new"
                                :class="{'checkbox-on':item.checked === '1'}"
                                @click="editCart(item)">
                          </span>
                      </div>
                      <!--图片-->
                      <div class="items-thumb fl">
                        <img :src="item.productImg" alt="item.productName">
                        <a href="javascript:;" target="_blank"></a>
                      </div>
                      <!--信息-->
                      <div class="goodsnName fl">
                        <div class="name-table">
                          <a href="javascript:;" v-text="item.productName" target="_blank" ></a>
                          <ul class="attribute">
                            <li>白色</li>
                          </ul>
                        </div>
                      </div>
                      <!--删除按钮-->
                      <div class="operation">
                        <a href="javascript:;" class="items-delete-btn" @click="cartDel(item.productId)"></a>
                      </div>
                      <!--总价格-->
                      <div class="subtotal">￥{{ item.productPrice * item.productNum }}</div>
                      <!--数量-->
                      <buy-num  :num="item.productNum"
                                :id="item.productId"
                                :checked="item.checked"
                                style="height:140px;
                                      display: flex;
                                      align-items:center;
                                      justify-content:center;"
                                      :limit="5"
                                      @edit-num="editNum">
                      </buy-num>
                      <!--价格-->
                      <div class="priceSingle">￥{{item.productPrice}}</div>
                    </div>
                 </div>
             </div>

             <!--合计-->
             <div class="fix-bottom">
                 <div class="cart-bar-operation">
                   <div class="choose-all">
                     <span class="blue-checkbox-new" @click="editCheckAll" :class="{'checkbox-on':checkAllFlag}"></span>
                     <span class="selectWord">全选</span>
                   </div>
                   <div class="delete-choose-goods">删除选中的商品</div>
                 </div>
                 <div class="shopping">
                   <div class="shopping-box">
                     <div class="shopping-total shopping-num">
                       <h4>已选择<i>{{checkNum}}</i>件商品</h4>
                       <h5>共计<i>{{totalNum}}</i>件商品</h5>
                     </div>
                     <div class="shopping-total shopping-price" >
                       <h4>应付总额：<span>￥</span><i>{{checkPrice}}</i></h4>
                       <h5>应付总额不含运费</h5>
                     </div>
                   </div>
                   <y-button :classStyle="buttonType"
                              class="big-main-btn"
                              style="magin:0;width:130px;height:50px;line-height: 50px;font-size:16px;"
                              text="现在结算">
                   </y-button>
                 </div>
             </div>
          </div>

          <div v-else style="padding:50px;">
            <div class="cart-e"></div>
            <p style="text-align: center;padding:20px;color:#8d8d8d;">你的购物车空空如也</p>
            <div style="text-align: center;">
              <router-link :to="{ name:'goods'}">
                <y-button text="现在选购" style="width:150px;height:40px;line-height:38px;color:#8d8d8d"></y-button>
              </router-link>
            </div>
          </div>

        </div>
      </div>
      <y-footer></y-footer>
  </div>
</template>

<script>

  import YHeader from '/common/header'
  import BuyNum from '/components/buynum'
  import YButton from '/components/YButton'
  import YFooter from '/common/footer'
  import { mapState,mapMutations } from 'vuex'
  import { cartEdit, editCheckAll, cartDel } from '/api/goods'
  export default{
    data(){
      return {
        buttonType:'main-btn'
      }

    },
    computed:{
      ...mapState(['cartList']),
      //是否全选
      checkAllFlag(){
        return this.checkedCount === this.cartList.length
      },

      //勾选的数量
      checkedCount(){
        return this.cartList.filter((item) => item.checked === '1').length
      },

      //计算总数量
      totalNum(){
        return this.cartList.reduce((accumulator,item) => accumulator + item.productNum,0)
      },

      //选中的总价格
      checkPrice(){
        return this.cartList.reduce((a,item) => item.checked === '1' ? a + (item.productNum * item.productPrice) : a,0)
      },

      //选中的商品数量
      checkNum(){
        //console.log(this.cartList)
        return this.cartList.reduce((accumulator,item) => item.checked === '1' ? accumulator + item.productNum : accumulator,0)
      }

    },
    methods:{
      ...mapMutations(['EDIT_CART','INIT_BUYCART']),

      //修改购物车商品数量
      editNum(productNum,productId,checked){
        this._cartEdit(productId,productNum,checked)
      },

      //全选
      editCheckAll(){
        let checkAll = !this.checkAllFlag
        editCheckAll({checkAll}).then(res => {
          this.EDIT_CART({checked:checkAll})
        })
      },

      //删除购物车商品
      cartDel(productId){
        cartDel({productId}).then(res => {
          this.EDIT_CART({productId})
        })
      },

      //修改购物车
      _cartEdit( productId, productNum, checked ){
        cartEdit({
          productId,
          productNum,
          checked
        }).then(res => {
          if(res.status === '0'){
            this.EDIT_CART({
              productId,
              checked,
              productNum
            })
          }
        })
      },

      //修改购物车
      editCart(item){
        let { checked, productId, productNum} = item;
        //勾选
        let newChecked = checked === '1' ? '0' : '1';
        this._cartEdit(productId, productNum, newChecked)
      }

    },
    created(){
      this.INIT_BUYCART()
    },
    components:{
      YHeader,
      BuyNum,
      YButton,
      YFooter
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .store-content{
    width:1220px;
    min-height:600px;
    padding:0 0 25px;
    padding-top:40px;
    margin:0 auto;
    .gray-box{
      position: relative;
      margin-bottom:30px;
      overflow:hidden;
      background: #fff;
      border-radius: 8px;
      border:1px solid #dcdcdc;
      border-color:rgba(0,0,0,.14);
      box-shadow:0 3px 8px -6px rgba(0,0,0,.1);
      .title{
        height:60px;
        padding:0 10px 0 24px;
        border-bottom:1px solid #d4d4d4;
        border-radius: 8px 8px 0 0;
        box-shadow:rgba(0,0,0,.06) 0 1px 7px;
        background: #f3f3f3;
        background: linear-gradient(#fbfbfb, #ececec);
        line-height:60px;
        font-size:18px;
        color: #333;
      }
    }
    .ui-cart{
      padding-bottom: 91px;
      .cart-table-title{
        line-height: 38px;
        height:38px;
        padding:0 0 0 30px;
        font-size:12px;
        background: #eee;
        border-bottom: 1px solid #dbdbdb;
        border-bottom-color: rgba(0,0,0,.08);
        span{
          width:137px;
          float:right;
          text-align:center;
          color:#838383;
        }
        .name{
          float:left;
          text-align: left;
        }
      }
      .cart-items{
        height:140px;
        .operation{
          padding:58px 0 0;
          font-size:12px;
          line-height:24px;
          .items-delete-btn{
            display: block;
            width:24px;
            height:24px;
            margin:0 auto;
            background: url(../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg);
            background-size: 100% auto;
            -moz-transition:none;
            -o-transition:none;
            transition: none;
            &:hover{
              background-position: 0 -360px;
            }
          }
        }
        .subtotal{
          font-weight: 700;
        }
        .item-cols-num,.operation,.priceSingle,.subtotal{
          overflow: hidden;
          float: right;
          width:137px;
          text-align: center;
          color:#666;
          line-height: 140px;
        }
      }
      .items-choose{
        position: relative;
        height:100%;
        width:74px;
      }
      .items-thumb{
        position: relative;
        margin-top: 30px;
        overflow: hidden;
        width:80px;
        height:80px;
      }
      img{
        width:80px;
        height:80px;
      }
      .cart-items .items > a{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        border-radius: 3px;
        box-shadow: 0 0 0 1px rgba(0,0,0,.06);
      }
      .goodsnName{
        width:380px;
        margin-left: 20px;
        color:#323232;
        display: table;
        height:140px;
        a{
          color:#333;
          font-size: 16px;
        }
      }
      .name-table{
        display: table-cell;
        vertical-align:middle;

      }
      .attribute{
        color:#999;
        font-size:12px;
        padding-top:4px;
      }
    }
  }



  .page-cart{
    .fix-bottom{
      height:90px;
      width:100%;
      position:absolute;
      bottom:0;
      background:linear-gradient(#fdfdfd,#f9f9f9);
      border-top:1px solid #e9e9e9;
      box-shadow:0 -3px  8px rgba(0,0,0,.04);
      .cart-bar-operation{
        height:100%;
        float: left;
        .choose-all{
          height:100%;
          float:left;
          position: relative;
          width:74px;
          .selectWord{
            position: absolute;
            left:50%;
            top:50%;
            transform:translate(18px,-11px);
          }
        }
        .delete-choose-goods{
          height:100%;
          float: left;
          line-height: 90px;
          margin-left: 25px;
          color: #bbb;
        }
      }
    }
    .shopping{
      float: right;
      padding:20px 30px;
    }
    .shopping-box{
      display: inline-block;
      padding-top: 1px;
      margin-right: 10px;
    }
    .shopping-total{
      display: inline-block;
      border-left: 1px solid #e1e1e1;
      padding:0 20px;
      .shopping-price{
        width:155px;
        padding-right: 0;
      }
      &.shopping-num i{
        width:28px;
        display: inline-block;
        text-align: center;
        margin: 0 3px;
      }
      h4{
        color:#323232;
        > i{
          font-size:18px;
          font-weight:700;
        }
        i,span{
          color:#d44d44;
        }
      }
      h5{
        color:#959595;
        > i{
          font-size:16px;
          font-weight: 700;
        }
      }
      .shopping-total:first-child{
        border:none;
      }

    }
    .shopping-total.shopping-num{
      text-align: right;
    }
    .big-main-btn{
      float: right;
    }
    .blue-checkbox-new{
      width:20px;
      height:20px;
      position: absolute;
      left:50%;
      top:50%;
      transform:translate(-10px,-10px);
      background: url(../../../static/images/checkbox-new_631a56a4f6.png) no-repeat 0 -20px;
      cursor: pointer;
      user-select: none;
    }
    .blue-checkbox-new.checkbox-on{
      background: url(../../../static/images/checkbox-new_631a56a4f6.png) no-repeat 0 0;
    }
  }

  .cart-e{
    margin:0 auto;
    background: url("/static/images/cart-empty_@2x.png") no-repeat;
    width:275px;
    height:300px;
    color:#8d8d8d;
  }
</style>

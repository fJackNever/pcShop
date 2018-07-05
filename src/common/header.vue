<template>
  <div class="header-box">

      <header class="w">
        <div class="w-box">

          <div class="nav-logo">
            <div class="shop_title">
              <router-link to="/">欢迎来到小点商城</router-link>
            </div>
          </div>

            <div class="nav-aside" :class="{fixed:(st && showNav)}">
              <div class="shop pr" @mouseover="cartShowState(true)" @mouseout="cartShowState(false)">
                <router-link :to="{name:'cart'}">购物车<i class="num" ref="num">{{totalNum}}</i>件</router-link>

                <!--购物车显示快-->
                <div class="car-user-wrapper pa" v-show="showCart">
                  <div class="car-user-list">
                    <div class="full" v-show="totalNum">

                      <!--购物列表-->
                      <div class="nav-cart-items">
                        <ul>
                          <li class="clearfix" v-for="(item,i) in cartList" :key="i">
                            <div class="cart-item">
                              <div class="cart-item-inner">
                                <router-link :to="{name:'goodsDetails',query: {productId: item.productId }}">
                                  <div class="item-thumb">
                                    <img :src="item.productImg">
                                  </div>
                                </router-link>

                                <div class="item-desc">
                                  <div class="cart-cell">
                                    <h4>
                                      <router-link :to="{name:'goodsDetails',query:{productId: item.productId }}">{{item.productName}}</router-link>
                                    </h4>
                                    <p class="attrs"><span>白色</span></p>
                                    <h6><span class="price-icon">￥</span><span class="price-num">{{item.productPrice}}</span>
                                    <span class="item-num">x {{item.productNum}}</span></h6>
                                  </div>
                                </div>

                                <div class="del-btn del" @click="delGoods(item.productId)">删除</div>

                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <!--总件数-->
                      <div class="nav-cart-total"><p>共 <strong>{{totalNum}}</strong>件商品</p><h5>合计：<span class="price-icon">￥</span><span class="price-num">{{totalPrice}}</span></h5>
                        <h6>
                          <y-button classStyle="main-btn" text="去购物车" @btnClick="toCart"
                                    style="height:40px;width:100%;margin: 0;color:#fff;font-size:14px;line-height: 38px;"></y-button>
                        </h6>
                      </div>

                    </div>

                  <div v-show="!totalNum" class="cart-con" style="height:313px;text-align: center;display: none;">
                    <p>你的购物车竟然是空的</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="user pr">
              <router-link to="/user">个人中心</router-link>

              <!--用户信息显示-->
              <div class="nav-user-wrapper pa" v-if="login">
                <div class="nav-user-list">
                  <ul>
                    <!--头像-->
                    <li class="nav-user-avatar">
                      <div>
                        <span class="avatar" :style="{backgroundImage:'url('+userInfo.avatar+')'}"></span>
                      </div>
                      <p class="name">{{userInfo.name}}</p>
                    </li>
                    <li v-for="(item,i) in navList" :key="i">
                      <router-link :to="item.link">{{item.text}}</router-link>
                    </li>
                    <li>
                      <a href="javascript:;" @click="_loginOut">退出</a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      <!--底部导航-->
      <div class="nav-sub" v-show="showNav" :class="{ fixed:st }">
        <!--<div class="nav-sub-bg"></div>-->
        <div class="nav-sub-wrapper" :class="{ fixed:st }">
          <div class="w">
            <ul class="nav-list">

              <li v-for="(item,i) in navType" :key="i" class="nav-type">
                <router-link :to="{path:item.link,query:{keyword:item.query && item.query.keyword ? item.query.keyword : ''}}">{{item.text}}</router-link>
                <ul v-show="item.children && item.children.length" class="child-ul" ref="lidata" :style="{width:liwidth[i] + 'px'}">
                    <li v-for="(item1,i) in item.children" :key="i">
                      <router-link :to="{path:item1.link,query:{keyword:item1.query && item1.query.keyword ? item1.query.keyword : ''}}">{{item1.text}}</router-link>
                    </li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </div>

    </div>

</template>

<script>

  import YButton from '/components/YButton'
  import { mapMutations,mapState } from 'vuex'
  import { loginOut } from '/api/index'
  import { getCartList, cartDel } from '/api/goods'
  import { setStore,removeStore } from "/utils/storage"


  export default{
    props:{
      showNav:{
        default:true,
        type:Boolean
      }
    },
    data(){
        return {
          liwidth:[],
          // 列表
          navList: [{
            text: '账号资料',
            link: '/user/information'
          }, {
            text: '收货地址',
            link: '/user/addressList'
          }],
          navType:[{
            text:'首页',
            link:'/'
          },{
            text:'手机通讯',
            link:'/goods',
            query:{keyword:'手机通讯'},
            children:[{
              text:'手机',
              link:'/goods',
              query:{keyword:'手机'}
            },{
              text:'老人机',
              link:'/goods',
              query:{keyword:'老人机'}
            },{
              text:'通讯机',
              link:'/goods',
              query:{keyword:'通讯机'}
            }]
          },{
            text:'数码',
            link:'/goods',
            query:{keyword:'数码'},
            children:[{
              text:'数码相机',
              link:'/goods',
              query:{keyword:'数码相机'}
            },{
              text:'单反相机',
              link:'/goods',
              query:{keyword:'单反相机'}
            }]
          },{
            text:'电脑',
            link:'/goods',
            query:{keyword:'电脑'},
            children:[{
              text:'笔记本',
              link:'/goods',
              query:{keyword:'笔记本'},
            },{
              text:'台式机',
              link:'/goods',
              query:{keyword:'台式机'},
            },{
              text:'平板电脑',
              link:'/goods',
              query:{keyword:'平板电脑'}
            }]
          },{
            text:'全部商品',
            link:'/goods'
          }],
          st:false,
        }
    },
    computed:{
      ...mapState(['cartList', 'showCart','login','userInfo']),

      //计算价格
      totalPrice(){
        let totalPrice = 0;

        this.cartList.forEach(item => {
          totalPrice += ( item.productNum * item.productPrice )
        })

        return totalPrice
      },

      //计算数量
      totalNum(){
        let totalNum = 0;
        this.cartList.forEach( item => {
          totalNum += ( item.productNum )
        })
        return totalNum
      },

    },
    methods:{
      ...mapMutations(['SHOW_CART','ADD_ANIMATION','INIT_BUYCART','RECORD_USERINFO','EDIT_CART']),

      //删除商品
      delGoods(productId){
        if(this.login){
            cartDel({productId}).then(res => {
              this.EDIT_CART({productId})
            })
        }else{
          this.EDIT_CART({productId})
        }
      },

      cartShowState(state){
        this.SHOW_CART({showCart:state})
      },
      //登录时获取一次购物车商品
      _getCartList(){
        getCartList().then(res => {
          //console.log(res.status)
          if(res.status === '1'){
            //若不存缓存也不清理缓存，直接存vuex的state，然后在退出登录时清理state数据，
            //那么退出登录后页面刷新后，会直接用缓存数据，但是退出登录面刷新后应该没有数据，购物为0
            setStore('buyCart',res.result)
          }
        }).then(this.INIT_BUYCART)
      },

      toCart(){
          this.$router.push({name:'cart'})
      },
      //控制顶部
      navFixed(){

        if(this.$route.path === "/goods" ||
          this.$route.path === "/home" ||
        this.$route.path === "/goodsDetails"){
          //计算是否吸顶
          if(this.showNav){
            let st = document.documentElement.scrollTop || document.body.scrollTop
                 st >= 100 ? this.st = true : this.st = false

          }

          //计算小圆位置
          this.$nextTick(() => {
            let num = this.$refs.num;
            const { left,top } = document.getElementsByClassName("num")[0].getBoundingClientRect();
            //console.log(left)
            this.ADD_ANIMATION({ cartPositionL:left, cartPositionT:top })
          })

        }
      },

      //退出登录
      _loginOut(){
        loginOut().then(res => {
          removeStore('buyCart')
          window.location.href = '/'
        })
      }
    },
    created(){
      //计算底部导航菜单的宽度
      this.$nextTick(() => {
        var strArray = []  ,n = '';

        for(let i=0; i<this.$refs.lidata.length; i++){
          strArray[i] = []
            for(let j=0; j<this.$refs.lidata[i].childNodes.length; j++){
              strArray[i][j] = this.$refs.lidata[i].childNodes[j].innerText.length;
            }

        }

        for(let k=0; k<strArray.length;k++){
          if(strArray[k].length>0){
            //this.liwidth[k] = parseInt(Math.max.apply(null,strArray[k]))*14+40
            this.$set(this.liwidth, k, parseInt(Math.max.apply(null,strArray[k]))*14+40);
          }else{
            this.liwidth[k] = 0
          }

        }

      })
    },
    mounted(){
      if(this.login){
        this._getCartList()
      }else{
        this.INIT_BUYCART()
      }
      setTimeout(() => {
        this.navFixed()
      },300)
      window.addEventListener('scroll', this.navFixed)
      //window.addEventListener('resize', this.navFixed)
    },

    destroyed(){
      window.addEventListener('scroll',this.navFixed)
      //window.removeEventListener('resize',this.navFixed)
    },

    components:{
      YButton
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  @import "../assets/style/mixin";

  .header-box{
    background: #ededed;
    width:100%;
  }

  header{
    height:32px;
    z-index:30;
    font-size:12px;
  }

  .w-box{
    display:flex;
    align-items:center;
    height:100%;
    .shop_title{
      height:32px;
      line-height: 32px;
      a{
        color:#666;
        cursor:pointer;
      }
    }

    .nav-aside{
      display: flex;
      &.fixed{
        width:262px;
        position:fixed;
        left:50%;
        margin-left: 265px;
        z-index: 32;
        top:0px;
        transform:translateY(22px);
        transition:transform .3s ease-out;
      }
    }

    .shop{
      position: relative;
      margin-left: 21px;
      width:95px;
      z-index: 99;
      &:hover{
        a{
          color:#de4037;
        }
      }

      > a {
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        color:#666;
        z-index: 1;
      }

      .car-user-wrapper{
        z-index:30;
        top:14px;
        padding-top:18px;
        width:360px;
        left:0px;
      }

      .car-user-list{
        &:before{
          left:34px;
          position: absolute;
          content:" ";
          background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) no-repeat -49px -43px;
          background-size:240px 107px;
          @include wh(20px,8px);
          top:-8px;
          margin-left:-10px;
        }
        padding:0;
        width:100%;
        position: relative;
        background: #fff;
        border:1px solid #d6d6d6;
        border-color:rgba(0, 0, 0, .08);
        border-radius: 8px;
        box-shadow:0 20px 40px rgba(0, 0, 0, .15);
        z-index: 10;
        .full{
          border-radius: 8px;
          overflow:hidden;
        }

        .cart-con{
          text-align:center;
          position: relative;
          p{
            padding-top:185px;
            color:#333333;
            font-size:16px;
          }
          &:before{
            position: absolute;
            content:'';
            left:50%;
            top:50%;
            width:76px;
            height:62px;
            background: url("/static/images/cart-empty-new.png") no-repeat;
            background-size: cover;
            transform:translate(-50% , -70%);
          }
        }

        .nav-cart-items{
          max-height: 363px;
          overflow-x:hidden;
          overflow-y: auto;
        }
        .cart-item{
          height:120px;
          width:100%;
          overflow:hidden;
          border-top:1px solid #f0f0f0;
          &:hover{
            background: #fcfcfc;
            .del{
              display: block;
            }
          }
        }

        li:first-child .cart-item{
          border-top:none;
          border-radius: 8px 8px 0 0;
          overflow: hidden;
        }

        .cart-item-inner{
          padding:20px;
          position: relative;
        }

        .item-thumb{
          position: relative;
          float: left;
          width:80px;
          height:80px;
          border-radius: 3px;
          &:before{
            content:"";
            position: absolute;
            left:0;
            top:0;
            bottom:0;
            right:0;
            z-index: 2;
            border:0px solid transparent;
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
            border-radius: 3px;
          }

          img{
            @include wh(80px,80px);
            border-radius:3px;
            overflow: hidden;
          }

        }

        .item-desc{
          margin-left: 98px;
          @include wh(205px,80px);
          h4{
            color:#000;
            width:185px;
            overflow:hidden;
            word-break:keep-all;
            white-space:nowrap;
            text-overflow: ellipsis;
            font-size:14px;
            line-height: 16px;
            margin-bottom: 10px;
          }

          .attrs span{
            display: inline-block;
            margin-right: 0px;
            font-size: 14px;
            line-height: 14px;
            color: #999;
          }

          h6{
            color:#cacaca;
            font-size: 12px;
            line-height: 14px;
            margin-top: 20px;
            span{
              display: inline-block;
              font-weight: 700;
              color: #cacaca;
            }
            .price-icon, .price-num {
              color: #d44d44;
            }
            .price-num {
              margin-left: 5px;
              font-size: 14px;
            }
            .item-num {
              margin-left: 10px;
            }
          }

        }

        .del{
          overflow: hidden;
          position: absolute;
          right:20px;
          top:50%;
          transform:translateY(-50%);
        }

      }

      .nav-cart-total{
        box-sizing:content-box;
        position: relative;
        padding:20px;
        height:40px;
        background: #fafafa;
        border-top:1px solid #f0f0f0;
        border-radius: 0 0 8px 8px;
        box-shadow: inset 0 -1px 0 #fff, 0 -3px 8px rgba(0, 0, 0, .04);
        background: -webkit-linear-gradient(#fafafa, #f5f5f5);
        background: linear-gradient(#fafafa, #f5f5f5);
        p{
          margin-bottom:4px;
          line-height:16px;
          font-size:12px;
          color:#c1c1c1;
        }
        h5{
          line-height: 20px;
          color:#6f6f6f;
          font-size: 14px;
          span{
            font-size:18px;
            color:#de4037;
            display:inline-block;
            font-weight: 700;
          }
          span:first-child{
            font-size:12px;
            margin-right:5px;
          }
        }
        h6{
          position: absolute;
          right:20px;
          top:20px;
          width:108px;
        }
      }
    }

    .user{
      width:62px;
      &:hover{
        a{
          color:#de4037;
        }
        .nav-user-wrapper{
          top:14px;
          opacity:1;
          transition: opacity .15s ease-out;
        }
      }
      >a{
        @include wh(62px,20px);
        display:block;
        color:#666;
      }
      li + li{
        text-align:center;
        position:relative;
        border-top:1px solid #f5f5f5;
        line-height: 44px;
        height:44px;
        color:#616161;
        font-size:12px;
        &:hover{
          background:#fafafa;
        }
        a{
          display:block;
          color:#616161;
        }
      }
      .nav-user-avatar{
        >div{
          position: relative;
          margin:0 auto 8px;
          @include wh(46px);
          text-align:center;
          &:before{
            content:"";
            position: absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            border-radius:50%;
            box-shadow: inset 0 0 1px rgba(0, 0, 0, .06);
          }
          .avatar{
            border-radius:50%;
            display:block;
            @include wh(100%);
            background-repeat:no-repeat;
            background-size:contain;
          }
        }
        .name{
          margin-bottom:16px;
          font-size:12px;
          line-height: 1.5;
          text-align: center;
          color:#757575;
        }
      }
      .nav-user-wrapper{
        width:168px;
        transform:translate(-50%);
        left:50%;
        position: absolute;
        z-index:30;
        padding-top:18px;
        opacity:0;
        top:-3000px;
      }
      .nav-user-list{
        width:168px;
        position:relative;
        padding-top:20px;
        background: #fff;
        border:1px solid rgba(0, 0, 0, .08);
        border-radius:8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, .15);
        z-index: 10;
        &:before{
          position: absolute;
          left:50%;
          content:"";
          background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) no-repeat -49px -43px;
          background-size: 240px 107px;
          @include wh(20px,8px);
          top:-8px;
          margin-left:-10px;
        }
      }
    }

  }

  .nav-sub{
    position: relative;
    height:90px;
    background: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .04);
    z-index:20;
    &.fixed{
      position: fixed;
      z-index:21;
      height:60px;
      top:0;
      left:0;
      right:0;
      border-bottom:1px solid #dadada;
      background:linear-gradient(#fff,#f1f1f1);
    }
    .nav-sub-wrapper{
      padding:31px 0;
      height:90px;
      position: relative;
      &.fixed{
        padding:0;
        height:100%;
        display: flex;
        align-items:center;
      }
    }
    .nav-list{
      line-height:28px;
      display: flex;
      align-items:center;
      height:100%;
      > li:first-child{
        padding-left:0;
        a{
          padding-left: 10px;
        }
      }
      .nav-type{
        position: relative;
        padding-left:2px;
        &:hover{
          ul{
            display: block;
          }
        }
        > a {
          display: block;
          padding:0 20px;
          color:#666;
        }
      }
      >li:before{
        content:'';
        position: absolute;
        left:0;
        top:13px;
        width:2px;
        height:2px;
        background: #bdbdbd;
      }
    }
  }

  .child-ul{
    position: absolute;
    left:50%;
    transform:translateX(-50%);
    z-index:20;
    width:100%;
    color:#666;
    background: #fff;
    box-shadow:0px 1px 20px;
    border-radius: 10px;
    display: none;
    transition: all .5s;
    li{
      width:100%;
      a{
        display: block;
        padding:0 10px;
        text-align: center;
      }
    }
    li:hover{
      background: #ccc;
    }
  }

</style>

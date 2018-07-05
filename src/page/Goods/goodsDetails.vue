<!--商品详情-->
<template>
    <div class="w store-content">
        <div class="gray-box">
          <div class="gallery-wrapper">
            <div class="gallery">
              <!--产品大图-->
              <div class="thumb">
                <div class="big">
                  <img :src="big" :alt="product.productName">
                </div>
                <div class="thumbnail">
                  <ul>
                    <li v-for="( item,i ) in small" :key="i" :class="{on:big == item }" @click="big=item">
                      <img v-lazy="item" :alt="product.productName">
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <!--右边-->
          <div class="banner">
            <div class="sku-custom-title">
              <h4>{{ product.productName }}</h4>
              <h6>
                <span>{{ product.sub_title }}</span>
                <span class="price">
                  <em>￥</em><i>{{ product.salePrice }}</i>
                </span>
              </h6>
            </div>

            <div class="num">
              <span class="params-name">数量</span>
              <buy-num @edit-num="editNum" :limit="Number(product.limit_num)"></buy-num>
            </div>

            <div class="sku-group" v-for="(item ,index) in getS" :key="index">
              <span class="sku-title">{{ item.title }}</span>
              <div class="sku-wrap">
                <div class="sku-item" @click="onSelectSku(index,it.id)" v-for="(it,idx) in item.items" :key="idx" :class="{actived:selectSkuId[index] == it.id}">
                    {{ it.name }}
                </div>
              </div>
            </div>

            <div class="buy">
              <y-button text="加入购物车"
                        classStyle="main-btn"
                        @btnClick="addCart(product.productId,product.salePrice,product.productName,product.productImageBig)"
                        style="width:145px;height:50px;line-height:48px;"></y-button>
              <y-button text="现在购买"
                        style="width:145px;height:50px;line-height:48px;"></y-button>
            </div>
          </div>
        </div>

      <!--产品信息-->
      <div class="item-info">
        <y-shelf title="产品信息" subTitle="用户评价" packing="包装与规格">
          <div slot="content">
            <div class="img-item" v-if="productMsg.productDetImgs && productMsg.productDetImgs.length">
              <img  v-for="(item,i) in productMsg.productDetImgs"
                    v-if="item"
                    v-lazy="item"
                    alt="产品信息"
                    :key="i">
            </div>
            <div class="no-info" v-else>
                该产品暂无内容
            </div>
          </div>
          <div slot="packing">
             <div class="procon-params">
               <div v-html="productMsg.packing"></div>
             </div>
          </div>
          <div slot="comment">
            <div class="no-info">
              该产品暂无评价
            </div>
          </div>
        </y-shelf>
      </div>
    </div>
</template>

<script>
  import { productDet, addCart } from "/api/goods"
  import { mapState , mapMutations } from "vuex"
  import BuyNum from "/components/buynum"
  import YButton from "/components/YButton"
  import YShelf from "/components/shelf"

  export default{
    data(){
      return {
        productMsg:{},
        small:[],
        big:"",
        product:{},
        selectSkuId:[1,5]
      }
    },
    computed:{
      ...mapState(['showMoveImg','showCart','login']),
      getS(){
        let arr = [
          {
            id: 1,
            title: "选择版本",
            items: [
              { id: 1,name: "64g"},
              {
                id: 2,
                name: "128g"
              },
              {
                id: 3,
                name: "256g"
              }
            ]
          },
          {
            id: 2,
            title: "选择颜色",
            items: [
              {
                id: 5,
                name: "红色"
              },
              {
                id: 6,
                name: "黄色"
              },
              {
                id: 7,
                name: "紫色"
              },
              {
                id: 8,
                name: "黑色"
              }
            ]
          }
        ]
        return arr
      }
    },
    methods:{
      ...mapMutations(['ADD_CART','SHOW_CART','ADD_ANIMATION']),

      addCart(id,price,name,img){
        if(!this.showMoveImg){  //动画是否在运动

          if(this.login){
            addCart({ productId:id, productNum:this.productNum}).then(res => {
              //并不重新请求数据
              this.ADD_CART({
                productId:id,
                productPrice:price,
                productName:name,
                productImg:img,
                productNum:this.productNum
              })
            })
          }else{
              //未登录
              this.ADD_CART({
                productId:id,
                productPrice:price,
                productName:name,
                productImg:img,
                productNum:this.productNum
              })
          }

          //加入购物车动画
          let dom = event.target;
          //获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2;
          let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2 ;
          //需要触发
          this.ADD_ANIMATION({
            moveShow:true,
            elLeft:elLeft,
            elTop:elTop,
            img:img
          })
          if(!this.showCart){
            this.SHOW_CART({ showCart:true });
          }

        }
      },

      editNum(num){
        this.productNum = num;
      },

      onSelectSku(index,id){
        this.selectSkuId[index] = id;
        this.selectSkuId = Object.assign([],this.selectSkuId);
      },

      _productDet(productId){
        productDet({ productId }).then(res => {
          let result = res.result;
          this.product = result;
          //console.log(this.product)
          this.productMsg = result.productMsg || "";
          this.small = result.productImageSmall.slice(0,5);
          this.big = this.small[0];
        })
      }
    },
    created(){
      this._productDet(this.$route.query.productId);
    },
    mounted(){
      window.scrollTo(0,0);
    },
    components:{
      BuyNum,
      YButton,
      YShelf
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .store-content{
    min-height:600px;
    width:1220px;
    padding:0 0 25px;
  }

  .gray-box{
    display:flex;
    padding:60px;
    margin:20px 0;
  }

  .gallery{
    width:540px;
    .thumb{
      .big{
        margin-left: 20px;
      }
      img{
        display: block;
        @include wh(360px,360px)
      }
    }
    .thumbnail{
      ul{
        display: flex;
      }
      li{
        @include wh(82px,82px);
        margin-top:10px;
        padding:12px;
        margin-left:10px;
        border:1px solid rgba(0,0,0,0.06);
        border-radius:5px;
        cursor:pointer;
        &.on{
          padding:10px;
          border:3px solid rgba(0,0,0,0.2);
        }
        img{
          display: block;
          @include wh(100%);
        }
      }
    }
  }

  //右边
  .banner{
    width:450px;
    margin-left: 10px;
    .sku-custom-title{
      h4{
        font-size:24px;
        line-height: 1.25;
        color:#000;
        margin-bottom: 13px;
      }
      h6{
        font-size:14px;
        line-height: 1.5;
        color:#bdbdbd;
        display: flex;
        align-items: center;
        justify-content:space-between;
      }
    }
    .num{
      padding:29px 0 8px 10px;
      border-top:1px solid #ebebeb;
      display: flex;
      align-items:center;
      .params-name{
        padding-right: 20px;
        font-size:14px;
        color:#8d8d8d;
        line-height:36px;
      }
    }
    .sku-group{
      width:100%;
      padding:10px;
      .sku-title{
        color:#8d8d8d;
      }
      .sku-wrap{
        display: flex;
        flex-flow:row wrap;   //Internet Explorer 10 及更早版本浏览器不支持 flex-flow 属性
                              //Safari 6.1 及更新版本通过 -webkit-flex-flow 属性支持该属性。
      }
      .actived{
        border:1px solid #5c81e3 !important;
        color:#5c81e3;
      }
      .sku-item{
        height:45px;
        border:1px solid #e1e1e1;
        margin-right: 10px;
        margin-top: 10px;
        border-radius: 4px;
        line-height: 45px;
        padding:0 20px;
        cursor:pointer;
      }
    }
    .buy{
      border-top:1px solid #ebebeb;
      padding:30px 0 0 10px;
    }
  }

  .item-info{
    .gray-box{
      padding:0;
      display: block;
    }
    .img-item{
      width:1220px;
      img{
        width: 100%;
        height:auto;
        display: block;
      }
    }
  }

  .no-info{
    padding:200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price{
    color:#d44d44;
    font-weight:700;
    font-size:16px;
    line-height:20px;
    text-align:right;
    i{
      padding-left:2px;
      font-size:24px;
    }
  }

</style>

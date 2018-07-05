<template>
  <div id="home">

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in slides" :key="index">
          <router-link :to="item.link_href" >
            <img :src="item.img_href">
          </router-link>
        </div>
      </div>
    </div>

    <section class="w mt30 clearfix">
      <y-shelf title="官方精选">
          <div slot="content" class="hot">
              <mall-goods :msg="item" v-for="(item,i) in hot" :key="i"></mall-goods>
          </div>
      </y-shelf>
    </section>

  </div>
</template>

<script>
  import Swiper from "swiper"
  import 'swiper/dist/css/swiper.min.css'
  import YShelf from '/components/shelf'
  import mallGoods from '/components/mallGoods'
  import { productHome } from '/api'

  export default{
    data(){
      return {
        slides: [
          {
            img_href:"../static/images/iphone8.png",
            link_href:'goodsDetails?productId=690105206'
          },
          {
            img_href:'../static/images/iphonx.png',
            link_href:'goodsDetails?productId=690128156'
          },
          {
            img_href:'../static/images/xiaomi.png',
            link_href:'goodsDetails?productId=731400976'
          },
          {
            img_href:'../static/images/timg.jpg',
            link_href:'goodsDetails?productId=149515868'
          }
        ],
        hot:[],
      }
    },
    mounted(){
      let mySwiper = new Swiper('.swiper-container', {
        autoplay:2000,
        loop:true,
        autoplayDisableOnInteraction : false,
      })

      productHome().then(res => {
        const { home_floors,home_hot } = res.result
        this.hot = home_hot;
      })

    },
    components:{
      YShelf,
      mallGoods
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .swiper-container {
    margin-top:50px;
    width: 1220px;
  }

  .swiper-container img{
    width:100%;
  }

  .mt30{
    margin-top:30px;
  }

  .hot{
    display: flex;
    > div{
      flex:1;
    }
  }

</style>

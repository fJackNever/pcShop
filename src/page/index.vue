<template>
  <div>
    <y-header></y-header>
    <router-view class="main"></router-view>
    <y-footer></y-footer>
    <!--抛物图片-->
    <transition @after-enter="afterEnter" @before-enter="beforeEnter">
      <!--整张图片-->
      <div class="move_img" v-if="showMoveImg"
           :style="{left:(cartPositionL - 10)+ 'px',top:(cartPositionT - 10)+'px'}">
          <div>
            <img :src="moveImgUrl">
          </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import YHeader from '@/common/header'
  import YFooter from '@/common/footer'
  import { mapState , mapMutations } from 'vuex'

  export default{
    data(){
      return {

      }
    },
    computed:{
      ...mapState(['cartPositionT','cartPositionL','showMoveImg','elLeft','elTop','moveImgUrl'])
    },
    methods:{
      ...mapMutations(['ADD_ANIMATION']),
      //监听图片进入购物车
      listenIncart(){
        this.ADD_ANIMATION({ moveShow: false })
      },

      beforeEnter(el){
        let elStyle = el.style;
        let elChild = el.children[0];
        let elChildSty = elChild.style;
        elStyle.transform = `translate3d(0,${this.elTop - this.cartPositionT}px,0)`
        elChildSty.transform = `translate3d(${-(this.cartPositionL - this.elLeft)}px,0,0) scale(1.2)`
      },

      afterEnter(el){
        let elStyle = el.style;
        let elChild = el.children[0];
        let elChildSty = elChild.style;
        elStyle.transform = `translate3d(0,0,0)`
        elChildSty.transform = `translate3d(0,0,0) scale(.2)`
        elStyle.transition = 'transform .55s ease-out'
        elChildSty.transition = 'transform .55s linear'

        let transtionEvent = this.whichTransitionEvent();

        elChild.addEventListener(transtionEvent,() => {
          this.listenIncart();
        })
      },

      //处理兼容
      whichTransitionEvent(){
        var t,
          el = document.createElement('surface'),
          transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
          }

        for(t in transitions){
          if( el.style[t] !== undefined ){
            return transitions[t];
          }
        }
      }

    },
    components:{
      YHeader,
      YFooter
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  @import "../assets/style/mixin";

  .main{
    min-height: calc(100vh - 454px);
    background: #ededed;
    overflow:hidden;
    width:100%;
  }

  .bn{
    border-style:none;
    border-width:0;
    border:none;
  }

  .move_img{
    position:fixed;
    width:40px;
    height:40px;
    z-index:29;
    div{
      @extend .bn;
    }
    img{
      border-radius: 50%;
      width:100%;
      height:100%;
      display: block;
      @extend .bn;
    }
  }

</style>

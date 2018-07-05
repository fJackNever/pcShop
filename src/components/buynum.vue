<template>
  <!--数量-->
  <div class="item-cols-num clearfix">
      <div class="select">
        <span class="down"
              :class="{ 'down-disabled':goodsNum<=1 }"
              @click="down()">-</span>
        <span class="num">
          <input type="text"
                  :class="{ show : show }"
                  v-model="goodsNum >= limit ? limit : goodsNum"
                 @blur="blur()"
                  maxlength="2">
          <ul ref="ul">
            <li v-for="i in numList" :key="i" >{{i}}</li>
          </ul>
        </span>
        <span class="up"
              :class="{ 'up-disabled':goodsNum>=limit }"
              @click.stop.prevent="up()">+</span>
      </div>
  </div>
</template>
<script>
  export default{
    props:{
      num:{
        type:Number,
        default:1
      },
      id:{
        type:[Number,String]
      },
      checked:{
        type:[String,Boolean]
      },
      limit:{
        type:Number,
        default:10
      }
    },
    data(){
      return {
        show:true,
        numList:[],
        goodsNum:this.num
        //flag:true,
      }
    },
    methods:{
      blur(){
        this.goodsNum = this.goodsNum > this.limit ? Number(this.limit) : Number(this.goodsNum)
        this.$emit('edit-num',this.goodsNum,this.id,this.checked)
      },
      down(){
        if( this.goodsNum > 1 ){
          this.ani('down')
        }
      },
      up(){
        if( this.goodsNum < this.limit ){
          this.ani('up')
        }
      },
      ani(opera){
        let n = this.goodsNum;
        this.numList = [n-1,n,n+1];
        let ul = this.$refs.ul;
        let ulStyle = ul.style;
        this.show = false;
        ulStyle.zIndex = '99';
        ulStyle.transition = 'all .2s ease-out';
        if(opera == "down"){
          this.goodsNum--;
          ulStyle.transform = 'translateY(-18px)'
        }else{
          this.goodsNum++;
          ulStyle.transform = 'translateY(-54px)'
        }

        let transitionEvent = this.whichTransitionEvent();

        ul.addEventListener(transitionEvent,() => {
          this.show = true;
          this.domInt(ulStyle);
        })

        this.$emit('edit-num',this.goodsNum,this.id,this.checked )
      },

      domInt( domStyle ){
        domStyle.zIndex = "1";
        domStyle.transition = "all 0s";
        domStyle.transform = "translateY(-36px)" //回到原位
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
    watch:{
      num(newVal,oldVal){
        this.goodsNum = newVal;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .select{
    display: flex;
    height:40px;
    padding-top:4px;

    .down , .up{
      background: url(../../static/images/cart-updown_8303731e15@2x.jpg) no-repeat;
      overflow: hidden;
      width:34px;
      height:37px;
      background-size: 100% auto;
      line-height: 40px;
      text-indent:-9999em;
      cursor: pointer;
      user-select:none;
    }
    .down{
      background-position: 0 -60px;
      &:hover{
        background-position: 0 -180px;
      }
    }
    .down.down-disabled , .down.down-disabled:hover{
      background-position: 0 -300px;
      cursor:not-allowed;
    }
    .up{
      margin:0;
      background-position: 0 0;
      &:hover{
        background-position: 0 -120px;
      }
    }

    .up.updisabled , .up.up-disabled:hover{
      background-position: 0 -240px ;
      cursor:not-allowed;
    }

    .num{
      position: relative;
      overflow: hidden;
      text-align: center;
      width:36px;
      height:18px;
      margin:7px 0 0;
      border:none;
      border-radius: 3px;
      line-height: 18px;
      font-size:14px;
    }

    input{
      z-index:10;
      width:100%;
      text-align:center;
      height:18px;
      background-color:#fff;
      border:none;
      text-align:center;
      line-height:18px;
      font-size:14px;
      padding:0;
      color: #666;
      visibility: hidden;
      position: relative;
      &.show{
        visibility: visible;
      }
    }
    ul{
      padding:0;
      line-height:18px;
      font-size:14px;
      display: inline-block;
      position:absolute;
      left:0;
      list-style:none;
      width:36px;
      font-family: system-ui;
      z-index:1;
      transform:translateY(-36px);
    }
  }



</style>

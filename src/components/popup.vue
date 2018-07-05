<template>
  <div id="popup" v-if="open">
    <div class="mask">
        <div class="topbar">
          <div class="dialog-tit">
            <h4>{{title}}</h4>
          </div>
        </div>
        <div class="s-content">
          <slot name="content"></slot>
        </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      open:{
        type:Boolean,
        default:false
      },
      title:{
        type:String,
        default:"管理收货地址"
      }
    }
  }
</script>

<style lang="scss" scoped>
  #popup{
    position: fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .5);
    .mask{
      width:30%;
      background: #fff;
      border-radius: 10px;
      .topbar{
        position: relative;
        z-index: 10;
        overflow: hidden;
        width:100%;
        height:60px;
        background: linear-gradient(#fff,#f5f5f5);
        border-bottom: 1px;
        border-radius: 10px 10px 0 0;
        box-shadow:2px 0 5px rgba(0,0,0,.1);
      }
    }
    .dialog-tit{
      height: 60px;
      padding:0 15px;
      line-height: 60px;
      h4{
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        color:#666;
      }
    }

    .s-content{
      padding:30px 15px;
    }
  }
</style>

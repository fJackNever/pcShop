<template>
    <div class="gray-box">
      <div class="title">
        <h2 @click="showDetail">{{title}}</h2>
        <h2 style="margin-left:30px;" v-if="packing" @click="showPacking">{{packing}}</h2>
        <h2 style="margin-left:30px;" v-if="subTitle" @click="showComment">{{subTitle}}</h2>

        <div>
          <slot name="right"></slot>
        </div>
      </div>

      <div>
        <slot name="content" v-if="detail"></slot>
        <slot name="packing" v-if="packingShow"></slot>
        <slot name="comment" v-if="comment"></slot>
      </div>

    </div>
</template>

<script>
  export default{
    props:[ 'title', 'subTitle','packing'],
    data(){
      return {
        detail:true,
        comment:false,
        packingShow:false
      }
    },
    methods:{
      showDetail(){
        this.detail = true;
        this.packingShow = false;
        this.comment = false;
      },
      showPacking(){
        this.detail = false;
        this.packingShow = true;
        this.comment = false;
      },
      showComment(){
        this.detail = false;
        this.packingShow = false;
        this.comment = true;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .gray-box{
    margin-bottom:30px;
    overflow:hidden;
    background: #fff;
    border-radius:8px;
    border:1px solid #dcdcdc;
    border-color:rgba(0,0,0,.14);
    box-shadow:0 3px 8px -6px rgba(0,0,0,.1);
    position: relative;
    .title{
      padding-left:30px;
      z-index:10;
      height:60px;
      padding:0 10px 0 24px;
      border-bottom:1px solid #d4d4d4;
      border-radius:8px 8px 0 0;
      box-shadow:rgba(0,0,0,.06) 0 1px 7px;
      background:linear-gradient(#fbfbfb,#ececec);
      line-height:60px;
      font-size:18px;
      color:#333;
      display:flex;
      justify-content: space-between;
      h2{
        font-size:18px;
        font-weight:400;
        color:#626262;
        display:inline-block;
        cursor:pointer;
      }
    }
  }
</style>

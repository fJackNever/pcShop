<template>
  <div id="good">
    <div class="nav">
      <div class="w">
        <a href="javascript:;" @click="reset()" :class="{ active: sortType == 1 }">综合排序</a>
        <a href="javascript:;" @click="sort(1)" :class="{ active: sortType == 2}">价格从低到高</a>
        <a href="javascript:;" @click="sort(-1)" :class="{ active: sortType == 3}">价格从高到低</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="params.priceGt">
          <span style="margin:0 5px"> - </span>
          <input type="number" placeholder="价格" v-model="params.priceLte">
          <y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left:10px;"></y-button>
        </div>
      </div>
    </div>

    <!--商品-->
    <div class="goods-box w" v-show="!loadingShow">
      <mall-goods v-for="( item , i ) in computer" :key="i" :msg="item"></mall-goods>
    </div>
    <div class="nodata w" v-show="loadingShow">
      <div class="nodata_word">
        搜搜瑞啦！数据暂存于二次元中
      </div>
      <div class="nodata_pic">
        <img src="/static/images/dog.png" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  import YButton from '/components/YButton'
  import { getComputer } from '/api/goods'
  import mallGoods from '/components/mallGoods'

  export default{
    data(){
      return {
        sortType:1,
        computer:[],
        timer: null,
        loadingShow:false,
        params:{
          page:1,  //页码
          sort:'', //排序
          priceGt:'', //最小价格
          priceLte:'',
          keyword:''
        }
      }
    },
    methods:{
      _getComputer(flag){
        getComputer({ ...this.params }).then( res => {
          if(res.result.count){
            this.loadingShow = false;
            let data = res.result.data;
            if(flag){
              this.computer = this.computer.concat(data);
            }else{
              this.computer = data;
            }

          }else{
            this.loadingShow = true;
          }
        })
      },
      //综合排序
      reset(){
        this.sortType = 1;
        this.params.sort = '';
        this.params.page = 1;
        this._getComputer();
      },
      //价格排序
      sort(v){
        v===1 ? this.sortType = 2 : this.sortType = 3;
        this.params.sort = v;
        this.params.page = 1;
        this._getComputer()
      }
    },
    created(){
      let { keyword } = this.$route.query
      if(keyword){
        this.params.keyword = keyword;
      }
      this._getComputer()
    },
    components:{
      YButton,
      mallGoods
    },
    watch:{
      $route(to){
        this.sortType = 1;
        this.params = {
          page: 1,  // 页码
          sort: '', // 排序
          priceGt: '',  // 最小价格
          priceLte: '',
          keyword: ''
        }
        let { keyword } = this.$route.query
        if(keyword){
          this.params.keyword = keyword
        }
        this._getComputer()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";

  .nav{
    height:60px;
    line-height: 60px;
    > div{
      display:flex;
      align-items: center;
      a{
        padding:0 15px;
        height:100%;
        font-size:12px;
        color:#999;
        &.active{
          color:#5683EA;
        }
        &:hover{
          color:#5683EA;
        }
      }
      input{
        @include wh(80px,30px);
        border:1px solid #ccc;
      }
      input + input{
        margin-left:10px;
      }
    }

    .price-interval{
      padding:0 15px;
      @extend %block-center;
      input[type=number]{
        border:1px solid #ccc;
        text-align:center;
        background:none;
        border-radius:5px;
      }

    }

  }

  .nodata{
    display: flex;
    align-items: center;
    .nodata_word{
      color:#666;
      font-size: 30px;
      flex:1.5;
      text-align: right;
    }
    .nodata_pic{
      flex:1;
      img{
        width: 250px;
      }
    }
  }

  .load-more-normal {
    width:1220px;
    text-align: center;
    height: 60px;
    line-height: 60px;
  }

  .load-more-hide {
    height: 0;
  }

  .goods-box{
    display:flex;
    flex-wrap:wrap;
    > div{
      border:1px solid #efefef;
    }
  }
</style>

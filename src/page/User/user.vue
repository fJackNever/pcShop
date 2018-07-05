<template>
  <div id="userWeb">
    <y-header :showNav="false"></y-header>
    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box">
            <div>
              <img :src="userInfo.avatar" alt="">
              <h5>{{userInfo.name}}</h5>
            </div>
            <div>
              <ul class="account-nav">
                <li v-for="(item,i) in nav" :key="i"
                    :class="{current:item.name === title}"
                    @click="tab(item)">
                  <a href="javascript:;">{{item.name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <y-footer></y-footer>
  </div>
</template>

<script>
  import YHeader from '/common/header'
  import YFooter from '/common/footer'
  import { mapState } from 'vuex'

  export default{
    data(){
      return {
        title:'账户资料',
        nav:[
          {name: '账户资料', path: 'information'},
          {name: '收货地址', path: 'addressList'},
        ]
      }
    },

    methods:{
      tab(e){
        this.$router.push({ name: e.path})
      }
    },

    computed:{
      ...mapState(['userInfo'])
    },

    components:{
      YHeader,
      YFooter
    },

    created(){
      let path = this.$route.path.split("/")[2]
      this.nav.forEach(item => {
        if(item.path === path){
          this.title = item.name
        }
      })
    },

    watch:{
      $route(to){
        let path = to.path.split("/")[2];
        this.nav.forEach( item => {
          if(item.path === path){
            this.title = item.name;
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";

  .w{
    padding-top:40px;
  }

  .content{
    display: flex;
    height:100%;
  }

  .account-sidebar{
    width:210px;
    border-radius:6px;
    .avatar{
      padding-top:20px;
      border-radius:10px;
      text-align:center;
      img{
        width:168px;
        height:168px;
      }
      h5{
        font-size:18px;
        line-height:48px;
        font-weight:700;
      }
    }
    .account-nav{
      padding-top:15px;
      li{
        height:48px;
        border-top:1px solid #EBEBEB;
        line-height: 48px;
        &:hover{
          a{
            position: relative;
            height:50px;
            background-color: #98AFEE;
            line-height: 50px;
            color:#fff;
          }
        }
        a{
          display: block;
        }
        &.current{
          a{
            position: relative;
            height:50px;
            background-color: #98AFEE;
            line-height: 50px;
            color:#fff;
          }
        }
      }
    }
  }

  .account-content{
    margin-left: 20px;
    flex:1;
  }

</style>

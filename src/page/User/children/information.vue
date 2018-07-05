<template>
  <div id="information">
    <y-shelf title="账户资料">
      <div slot="content">
        <div class="avatar-box">
          <div class="img-box">
            <img :src="userInfo.avatar" alt="">
          </div>
          <div class="r-box">
            <h3>修改头像</h3>
            <y-button @btnClick="editAvatar()" text="更换头像" classStyle="main-btn" style="margin:0;"></y-button>
          </div>
        </div>
        <div class="edit-avatar" v-if="editAvatarShow">
          <y-shelf title="设置头像">
            <div slot="content" class="content">
              <div class="edit-l">
                <div class="show-preview">
                    <div :style="{'width': previews.w + 'px','height': previews.h + 'px'
                    ,'overflow': 'hidden','zoom': option.zoom}">
                      <div :style="previews.div">
                        <img :src="option.img" :style="previews.img">
                      </div>
                    </div>
                </div>
                <div style="padding:10px 0">头像预览</div>
                <div class="btn">
                  <a href="javascript:;">切换头像</a>
                  <input type="file" value="上传头像" @change="upimg($event)">
                </div>
              </div>
              <div class="edit-r">
                <div>
                  <div class="big" v-if="option.img">
                    <vueCropper :img="option.img"
                                  @realTime="realTime"
                                  ref="cropper"
                                  :outputSize="example2.size"
                                  :info="example2.info"
                                  :canScale="example2.canScale"
                                  :autoCrop="example2.autoCrop"
                                  :fixed="example2.fixed"
                                  :fixedNumber="example2.fixedNumber">
                    </vueCropper>
                  </div>
                </div>
              </div>
              <div class="bottom-btn pa">
                <y-button style="width:140px;height:40px;line-height: 40px;" text="取消" @btnClick="editAvatarShow=false"></y-button>
                <y-button style="width:140px;height:40px;line-height: 40px;" text="确定" classStyle="main-btn" @btnClick="cropper"></y-button>
              </div>
            </div>
          </y-shelf>
        </div>
      </div>
    </y-shelf>
  </div>
</template>

<script>
import YShelf from '/components/shelf'
import YButton from '/components/YButton'
import VueCropper from 'vue-cropper'
import { mapState, mapMutations } from 'vuex'

export default{
  data(){
     return {
       editAvatarShow:false,
       previews:{},
       option: {
         img:'',
         zoom:0
       },
       example2:{
         info:true,
         size:1,
         canScale:false,
         autoCrop:true,
         //只有自动截图开启，宽度高度才生效
         //autoCropWidth:300,
         //autoCropHeight:250,
         //开启宽度和高度固定比例
         fixed:true,
         fixedNumber:[1,1]
       }
     }
  },

  computed:{
    ...mapState(['userInfo'])
  },

  methods:{
    upimg(e){
      let file = e.target.files[0];
      if(!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)){
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
        return false;
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.option.img = e.target.result;
      }
    },

    cropper(){
      if(this.option.img){

      }
    },

    editAvatar(){
      this.editAvatarShow = true
    },

    realTime(data){
      console.log(data)
      this.previews = data
      let w = 100/data.w
      this.option.zoom = w
    }
  },

  components:{
    YShelf,
    YButton,
    VueCropper
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .avatar-box{
    height:124px;
    display:flex;
    margin:0 30px 30px;
    border-bottom: 1px solid #dadada;
    line-height:30px;
    display: flex;
    align-items: center;
    .img-box{
      @include wh(80px);
      border-radius:5px;
      overflow: hidden;
    }
    img{
      display: block;
      @include wh(100%);
    }
    .r-box{
      margin-left: 20px;
      h3{
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }
    }
  }

  //修改头像
  .edit-avatar{
    z-index:9999;
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    @include wh(100%);
    background-color: rgba(0, 0, 0, .5);
    @extend %block-center;
    .content{
      display:flex;
      padding:45px 100px 0;
    }
    > div{
      @include wh(700px,500px);
      margin:0;
    }
    .btn{
      width:80px;
      height:30px;
      margin-left: 10px;
      position:relative;
      text-align: center;
      line-height: 30px;
      text-shadow: 0 1px 0 rgba(225,225,225, .496094);
      border:1px solid #e6e6e6;
      border-radius:10px;
      a{
        color:#666;
        display: block;
        @include wh(100%);
      }
      input[type=file]{
        position:absolute;
        right:0;
        left:0;
        top:0;
        opacity: 0;
        width:80px;
        height:30px;
        cursor: pointer;
        border-bottom: 15px solid #ccc;
        border-top:15px solid #ccc;
        box-sizing: border-box;
        overflow: hidden;
      }
    }

    .show-preview{
      width:100px;
      height:100px;
      border:1px solid #ccc;
      margin-bottom:20px;
      overflow:hidden;
    }

    .edit-l{
      width:100px;
      text-align:center;
    }

    .edit-r{
      margin-left: 20px;
      flex:1;
      > div{
        border:1px solid #ccc;
        width:320px;
        height:320px;
      }
      .big{
        width: 320px;
        height:320px;
      }
    }

    .bottom-btn{
      padding:0 15px;
      border-top:1px solid #e6e6e6;
      bottom:0;
      height:60px;
      right:0;
      left:0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

  }


</style>

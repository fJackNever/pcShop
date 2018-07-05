<template>
  <div id="addressList">
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加收货地址" @btnClick="update()"></y-button></span>
      <div slot="content">
        <div v-if="addList && addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.userName}}</div>
            <div class="address-msg">{{item.streetName}}</div>
            <div class="telephone">{{item.tel}}</div>
            <div class="default">
              <a href="javascript:;"
                 @click="changeDef(item)"
                 v-text="item.isDefault ? '(默认地址)': '设为默认'"
                 :class="{'default-address': item.isDefault}">
              </a>
            </div>
            <div class="operation">
              <a href="javascript:;" @click="update(item)">修改</a>
              <a href="javascript:;" @click="del(item.addressId,i)">删除</a>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding:80px 0;text-align: center;">
            <div style="font-size:20px;">你还未添加收货地址</div>
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" :title="popupTitle">
      <div slot="content" class="md" >
        <div class="inputKuang">
          <input type="text" placeholder="收货人姓名" v-model="msg.userName">
        </div>
        <div class="inputKuang">
          <input type="text" placeholder="手机号码" v-model="msg.tel">
        </div>
        <div class="inputKuang">
          <input type="text" placeholder="收货地址" v-model="msg.streetName">
        </div>
        <div class="inputKuang">
          <span><input type="checkbox" style="margin-left: 5px;" v-model="msg.isDefault">设为默认</span>
        </div>
        <div class="doBtn">

          <y-button text="取消"
                    style="width:140px;height:40px;line-height: 40px;font-size:14px;"
                    @btnClick="popupOpen=false">
          </y-button>

          <y-button text="保存"
                    style="width:140px;height:40px;line-height: 40px;font-size:14px;margin-left: 15px;"
                    :classStyle="btnHighlight ? 'main-btn': 'disabled-btn'"
                    @btnClick="save({ addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName, isDefault:msg.isDefault })">
          </y-button>

        </div>

      </div>
    </y-popup>
  </div>
</template>

<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import { addressList, addressAdd, addressUpdate, addressDel } from '/api/goods'

  export default{
    data(){
      return {
        popupOpen:false,
        popupTitle:"管理收货地址",
        addList:[],
        msg:{
          addressId:'',
          userName:'',
          tel:'',
          streetName:'',
          isDefault:false
        }
      }
    },

    computed:{
      btnHighlight(){
        let msg = this.msg;
        return msg.userName && msg.tel && msg.streetName
      }
    },

    methods:{

      update(item){
        this.popupOpen = true
        if(item){
          this.popupTitle = "修改收货地址";
          this.msg.userName = item.userName;
          this.msg.tel = item.tel;
          this.msg.streetName = item.streetName;
          this.msg.isDefault = item.isDefault;
          this.msg.addressId = item.addressId;
        }else{
          this.popupTitle = '新增收货地址';
          this.msg.userName = '';
          this.msg.tel = '';
          this.msg.streetName = '';
          this.msg.isDefault = false;
          this.msg.addressId = ''
        }

      },

      //获取收货地址
      _addressList(){
        addressList().then(res => {
          let data = res.result;
          if(data.length){
            this.addList = data;
          }else{
            this.addList = [];
          }
        })
      },

      //添加收货地址
      _addressAdd(params){
        addressAdd(params).then(res => {
          this._addressList()
        })
      },

      //修改收货地址
      _addressUpdate(params){
        addressUpdate(params).then(res => {
          this._addressList()
        })
      },

      //删除
      del(addressId,i){
        addressDel({addressId}).then(res => {
          if(res.status === '0'){
            this.addList.splice(i,1)
          }else{
            alert('删除失败')
          }
        })
      },

      save(p){
        if(p.addressId){
          this._addressUpdate(p)
        }else{
          delete p.addressId;
          this._addressAdd(p);
        }
        this.popupOpen = false;
      },

      changeDef(item){
        if(!item.isDefault){
          item.isDefault = true;
          this._addressUpdate(item);
        }
      }

    },

    created(){
      this._addressList()
    },

    components:{
      YShelf,
      YButton,
      YPopup
    }
  }
</script>

<style lang="scss" soped>
  .address-item{
    display: flex;
    align-items: center;
    height:115px;
    text-align: center;
    .name{
      width:106px;
    }
    .address-msg{
      flex:1;
    }
    .telephone{
      width:160px;
    }
    .default{
      width:80px;
      > a{
        text-align: center;
      }
    }
    .operation{
      width:135px;
      a{
        padding:10px 5px;
      }
    }
  }

  .address-item + .address-item{
    border-top:1px solid #cfcfcf;
  }

  .default-address{
    color:#626262;
    //display:block;
    pointer-events:none;
    cursor:default;
  }

  .md{
    .inputKuang{
      text-align: left;
      margin-bottom: 15px;
      > input{
        width:100%;
        height:50px;
        font-size:18px;
        padding:10px 20px;
        border:1px solid #ccc;
        border-radius: 6px;
        box-shadow:inset 0px 1px 1px 0px rgba(0, 0, 0, .1);
        line-height: 46px;
      }
    }
    .doBtn{
      display: flex;
      justify-content: center;
    }
  }

</style>

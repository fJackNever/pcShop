<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display:block;margin-top: -300px">
          <div class="title" v-if="loginPage">
            <h4>使用 小点 ID 登录官网</h4>
          </div>
          <!--登录-->
          <div class="content" v-if="loginPage">
             <ul class="common-form">
               <li class="username">
                 <div class="input">
                   <input type="text" v-model="ruleForm.userName" placeholder="账号">
                 </div>
               </li>
               <li>
                 <div class="input">
                   <input type="password" v-model="ruleForm.userPwd" placeholder="密码">
                 </div>
               </li>
               <li class="pr" style="text-align: right;">
                 <span class="pa" style="top:0;left:0;color:#d44d44;">{{ruleForm.errMsg}}</span>
                 <a href="javascript:;" @click="loginPage = false" style="padding:0 5px;">注册 小点 ID</a>
               </li>
             </ul>
             <div>
                <y-button text="登录" @btnClick="login" :classStyle="isLoginOk" class="btn"></y-button>
             </div>
          </div>

          <!--注册-->
          <div class="registered" v-else>
              <h4>注册 小点 ID</h4>
              <div class="content" style="margin-top:20px;">
                <ul class="common-form">
                  <li class="username">
                    <div class="input">
                      <input type="text"
                             v-model="registered.userName"
                             @keyup="registered.userName = registered.userName.replace(/[^\w\.]/ig,'')"
                             placeholder="账号">  <!--\w:字母，数字，下划线,\.:真正的点.（没有数目限制）,[^xyz]：表示取反，值不包含xyz-->
                    </div>
                  </li>
                  <li>
                    <div class="input">
                      <input type="password"
                             v-model="registered.userPwd"
                             placeholder="密码">
                    </div>
                  </li>
                  <li>
                    <div class="input">
                      <input type="password" v-model="registered.userPwd2" placeholder="重复密码">
                    </div>
                  </li>
                  <li style="height:30px;">
                    <div class="input" style="height:30px;">
                      <input type="radio" v-model="registered.userPP" style="width:20px;">
                      <p style="margin-left: 10px;">
                        同意
                        <a href="javascript:;" @click="onRegMsgPopup">用户注册协议</a>
                      </p>
                    </div>
                  </li>
                </ul>
                <div>
                  <y-button @btnClick="regist" :classStyle="isRegOk" text="注册" class="btn"></y-button>
                </div>
                <ul class="common-form">
                  <li style="color:#d44d44;">{{registered.errMsg}}</li>
                  <li style="text-align: center;line-height: 48px;margin-bottom:0;">
                    <span>如果您拥有 小点 ID，则可在此</span>
                    <a href="javascript:;"
                       @click="loginPage = true"
                       style="margin:0 5px;">
                      登录
                    </a>
                  </li>
                </ul>
              </div>
          </div>
      </div>
    </div>
    <div class="userPP" v-if="userPP">
      <div class="title">用户注册协议</div>
      <div style="position: absolute;right:40px;top:40px;cursor:pointer;"
           @click="userPP = false">关闭</div>
      <p>尊敬的顾客，欢迎注册成为本商城会员用户。本商城依据下列条款及条件为您提供会员服务， 此条款为本商城与本商城用户之间的服务协议，具有合同效力。请您务必在注册之前认真阅 读全部协议内容，如有任何疑问，可向本商城客服人员进行咨询。
        一、协议说明
        1、协议双方为本商城与本商城用户;
        2、无论用户事实上是否在注册之前认真阅读了本协议，只要用户按照本商城网站注册程序 成功注册为会员用户，您的行为表示您同意并签署了本协议; 3、本协议所称之“会员”，指依本站所定之会员加入程序顺利完成者;
        4、经本站认定为不适合加入会员者，本站保留有可拒绝其加入会员资格之权利;已加入 会员者，本网站亦保留有解除其会员资格之权利;
        5、本协议修订时，将会在本商城网站上进行告知;
        6、本商城各项服务的所有权、运作权、条款解释权、未尽事宜解释权归本商城所有。 二、 用户资格 1、用户必须是具备《中华人民共和国民法通则》规定的完全民事行为能力的自 然人，或者是具有相应合法证照的实体组织。 2、无民事行为能力人、限制民事行为能力人 以及无合法证照的组织不得注册并使用，如果以不当方式注册为本商城会员，则与本协议自 始无效，本网站有权注销其会员资格。 三、使用规则 1、用户在申请使用本商城服务时， 必须向本商城网站提供详尽、准确的个人资料。如个人资料有任何变动，必须及时更新; 2、 用户不应将其账号、密码转让或借予他人使用。如用户发现其账号遭他人非法使用，应立即 通知本商城。由于黑客行为或用户原因导致账号、密码遭他人非法使用，一切责任及后果均 由该用户自行承担; 3、用户通过本商城(包括但不限于论坛、商品评论)上传到本网站上 可公开获取区域的任何内容，表明用户同意本网站在全世界范围内具有免费的、永久性的、 不可撤销的完全再许可的权利; 4、用户在使用本商城网站服务过程中，必须遵循以下原 则: 遵守中国有关的法律和法规; 遵守所有与网络服务有关的网络协议、规定和程 序; 不得利用本商城网站服务系统进行任何可能对互联网正常运转造成不利影响的行 为; 不得利用本商城网站提供的网络服务上传、展示或传播任何虚假的、骚扰性的、中 伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料; 不得侵犯其 他任何第三方的专利权、著作权、商标权、名誉权、肖像权或其他合法权益; 不得利用 本商城网站服务系统从事任何不利于本网站的行为活动; 本商城网站有权对用户使用本 网站服务的情况进行审查和监督，如用户在使用网络服务时违反任何上述规定，本商城或其 授权人有权要求用户改正或直接采取一切必要的措施(包括但不限于更改或删除用户张贴的 内容、暂停或终止用户使用网络服务的权利等)以减轻用户不当行为造成的影响。 四、隐 私保护 尊重用户的隐私权是本商城的一项基本政策。本商城保证不对外公开或向第三 方提供单个用户的注册资料及用户在使用网络服务时存储在本网站的非公开内容，但下列情 况除外: 1、事先获得会员用户的明确授权; 2、根据相应的法律程序或政府机构之要求; 3、在紧急情况下维护第三方合法权益或社会利益的需要; 4、符合本商城网站之合法服务 程序或其他技术维护之要求。 五、产品介绍及服务 1、本商城努力使产品说明尽可能准 确，由于本商城失误而出现差错请用户及时通知本商城客服人员做出更改; 2、您所订购的 商品，如果发生缺货，您有权取消订单。 六、送货及费用 1、本商城依据顾客选择的支 付方式不同，按照顾客提交订单的商品内容及详细地址，将商品送达顾客手中。 1选择 银行转账或汇款、网银在线方式支付的用户，本商城免收送货费用; 2选择货到付款、 支付宝支付服务的用户，本商城送货上门收费标准如下: ·消费金额满299元以上免收送 货费，消费金额不足(含)299元的加收送货费29元; ·对于超重、超体积的物品本商 城将特殊处理并通知顾客。 2、订购时请清楚准确地填写收货人真实姓名、送货详细地址 及有效地联系方式。因如下情况造成订单延迟或无法配送等，本商城将不承担责任: 1
        客户提供错误信息、不详细的地址、无效的联系方式等; 2不可抗力，例如:自然灾害、 交通戒严、突发战争等。 七、网站活动声明 本网站将不定期推出下列会员活动: 1、 本商城每年12月1日推出积分兑换现金活动; 2、本商城每年推出两次积分抽奖活动，时 间为:6 月 30 日和 12 月 30 日; 3、本商城在特定节假日(如:三八妇女节等)举办各种 节假日特供，积分促销赠送活动; 4、本商城不定期进行积分换购礼品活动。 如果此类 活动涉及赚取、累计积分或其他有价值的实物，按照本商城会员积分政策和当次活动规则进 行。另外本商城保留在活动期间随时修改活动确切条款的权利并会及时通知。 八、免责声 明 1、用户明确同意其使用本商城网络服务所存在的风险将完全由其自己承担;因其使用 本商城网站网络服务而产生的一切后果也由其自己承担，本网站对用户不承担任何其他责任; 2、本商城不担保运营商的网络服务一定能满足用户的要求，也不担保运营商网络服务不会 中断，对网络服务的及时性、安全性、准确性也都不作担保; 3、对于因不可抗力或本商城 网站不能控制的原因造成的网络服务中断或其它缺陷，本商城不承担任何责任，但将尽力减 少因此而给用户造成的损失和影响; 4、本商城对于使用者在使用本网站服务所致之任何直 接、间接、衍生之财产或非财产之损害，不负赔偿责任; 5、用户同意，对于本商城网站向 会员用户提供的免费服务及其引发的任何损失，本网站无需承担任何责任。 九、邮件和短 信服务 1、本商城保留通过邮件、短信、网页公告及常规的信件的形式,对注册用户、购物 用户发送订单信息、促销活动、服务条款的修改、服务变更等告知服务的权利。如果本商城 能够证明以电子形式的信息已经发送给您或者在网站上公布，将被视为您已收到所有协议、 声明、公告等相关内容的信息; 2、用户对于本网站的通知应当通过本网站对外正式公布的 通信地址、传真号码、电子邮件地址、客服热线等联系信息进行送达。 十、服务协议的修 改 本商城有权在必要时修改服务协议，本网站服务条款一旦发生变动，将会在重要页 面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的本网站信息服务。 如果用户继续享用本网站信息服务，则视为接受服务协议的变动。本网站保留随时修改服务 协议条款的权利，不需对用户或第三方负责。 十一、版权声明 本商城网站上的所有 内容，诸如文字、图片、标识、数据、商标都是本网站或其内容提供者的财产，受中国和国 际版权法的保护。未经本网站书面授权或许可不得以任何目的对本网站或其任何部分进行复 制、复印、仿造、出售、转售、访问或以其他方式加以利用。 十二、违约赔偿 1、因本 商城违反有关法律、法规或本服务协议项下的任何条款而给用户造成损失，本网站同意承担 由此造成的损害赔偿责任; 2、如因用户违反有关法律、法规或本服务协议项下的任何条款 而给本商城或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。 十三、 法律管辖和适用 1、本协议的订立、执行和解释及争议的解决均适用中华人民共和国法律; 2、本协议之任何一部分与中华人民共和国法律相抵触，则该部分条款将完全按法律规定重 新解释; 3、本协议的规定是可分割的，如本协议任何规定被裁定为无效或不可执行，该规 定可被删除而其余条款应予以执行; 4、如双方就本协议内容或其执行发生任何争议，双方 应尽力友好协商解决;协商不成时，任何一方均可向本商城所在地的人民法院提起诉讼。</p>
    </div>
  </div>
</template>

<script>
  import YButton from '/components/YButton'
  import { userLogin, register } from '/api/index'
  import { addCartBatch } from '/api/goods'
  import { getStore, removeStore } from '/utils/storage'

  export default{
    data(){
      return {
        loginPage:true,
        userPP:false,
        cart:[],
        ruleForm:{
          userName:'',
          userPwd:'',
          errMsg:''
        },
        registered:{
          userName:'',
          userPwd:'',
          userPwd2:'',
          regPP:'',
          errMsg:''
        }
      }
    },

    computed:{
      isRegOk(){
        const { userName, userPwd, userPwd2 } = this.registered;
        return userName && userPwd && userPwd2 ? 'main-btn' : 'disabled-btn'
      },

      isLoginOk(){
        const { userName, userPwd } = this.ruleForm
        return userName && userPwd ? 'main-btn' : 'disabled-btn'
      }
    },

    methods:{
      onRegMsgPopup(){
          this.userPP = true
      },

      //登录时将本地的数据添加到购物车
      login_addCart(){
        let cartArr = [];
        let localCart = JSON.parse(getStore('buyCart'));
        if( localCart && localCart.length ){
          this.cart = localCart.map( item => {
            return {
              'productId':item.productId,
              'productNum':item.productNum
            }
          })
        }

      },

      login(){
        const { userName, userPwd } = this.ruleForm;
        if( !userName || !userPwd ){
          this.ruleForm.errMsg = '账号或者密码不能为空！'
        }else{
          userLogin({ userName, userPwd }).then(res => {
            if(res.status === '0'){
              if(this.cart.length){
                addCartBatch({ productMsg: this.cart}).then(res => {
                  if(res.status === '1'){
                    removeStore('buyCart')  //缓存已存到服务端，不再需要缓存,有问题？？
                  }
                }).then(this.$router.go(-1))
              }else {
                this.$router.go(-1)
              }
            }else{
              this.ruleForm.errMsg = res.msg
            }
          })
        }
      },

      regist(){
          const{ userName, userPwd, userPwd2 } = this.registered
          if( !userName || !userPwd || !userPwd2 ){
            this.registered.errMsg = '账号密码不能为空'
            return false
          }
          if(userPwd !== userPwd2 ){
            this.registered.errMsg = '两次输入的密码不相同';
            return false;
          }

          register({ userName, userPwd }).then(res => {
            this.registered.errMsg = res.msg
            if(res.status === '0'){
              setTimeout(() => {
                this.ruleForm.errMsg = '';
                this.registered.errMsg = '';
                this.loginPage = true;
              },500)
            }else{
              return false;
            }
          })
      }
    },
    mounted(){
      this.login_addCart()
    },
    components:{
      YButton
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .login{
      .wrapper{
        background: url(/static/images/bg_9b9dcb65ff.png) repeat;
        background-size: 100px;
        min-height: 650px;
        min-width: 630px;
        .input{
          height:50px;
          display: flex;
          align-items: center;
          input{
            font-size:16px;
            width:100%;
            height:100%;
            padding:10px 15px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
        }
      }
    .btn{
      width:100%;
      height:48px;
      font-size:18px;
      line-height:48px;
    }
    }

  .v2 .dialog{
    width:450px;
    border:1px solid #dadada;
    border-radius:10px;
    position: absolute;
    top:50%;
    left:50%;
    margin-left: -225px;
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    .title{
      margin:20px 0 50px;
      padding:70px 0 0;
      h4{
        text-align: center;
        color:#333;
        font-size: 20px;
        font-weight:400;
      }
    }
    .content{
      padding:0 40px 22px;
      .common-form{
        li{
          margin-bottom:15px;
        }
      }
    }
  }

  .dialog-shadow{
    box-shadow:0 13px 30px -6px rgba(0, 0, 0, .2);
  }

  .registered{
    h4{
      text-align: center;
      color:#666;
      border-bottom: 1px solid #dcdcdc;
      font-weight: 700;
      font-size: 20px;
      height:60px;
      line-height: 60px;
    }
  }

  .userPP{
    width:800px;
    height:100%;
    position: fixed;
    background: #fff;
    z-index:1000;
    left:50%;
    top:0;
    transform: translate(-50%);
    border-radius: 10px;
    padding:40px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 30px;
    .title{
      text-align: center;
      font-size:25px;
      margin-top: 10px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    p{
      line-height: 30px;
    }
  }

</style>

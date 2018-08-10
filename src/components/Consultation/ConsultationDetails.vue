<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="back"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>

        <scroller lock-x height="-125px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
            <div class="srcoll_box">
              <div class="info">
                <div class="top">
                  <div class="img">
                    <img :src="details.HeadImg" alt="">
                  </div>
                  <div class="wz">
                    <h1>{{details.Name}}</h1>
                    <h2>{{details.Experience}}经验</h2>
                    <p>{{details.Company}}</p>
                  </div>
                </div>
                <div class="bom">
                  <div class="bom_list">
                    <div class="ws"><span>{{details.ServiceTimes}}</span>次</div>
                    <p>服务次数</p>
                  </div>
                  <div class="bom_list">
                    <div class="ws"><span>{{details.PraiseCount}}</span>次</div>
                    <p>点赞次数</p>
                  </div>
                </div>
            </div>

              <div class="content">
                <div class="list">
                  <h2>擅长领域</h2>
                  <p>{{details.GoodAt}}</p>
                </div>
                <div class="list">
                  <h2>医学教育背景</h2>
                  <p>{{details.EducationalBackground}}</p>
                </div>

                <div class="pt_title">
                  患者评价<span>({{searchVal.len}})</span>
                </div>
                <div class="pj_box" v-for="(item,index) in listArr">
                  <div class="pj_list">
                    <div class="pj_xq">
                      <div class="xt">{{index+1}}楼 <span>{{item.Score | haoping}}</span></div>
                      <div class="xt date">{{item.CreateDate | mouthTimeGsh}}</div>
                    </div>
                      <p>{{item.Content}}</p>
                  </div>
                </div>
              </div>
            
            <p class="lgss">{{searchVal.uptext}}</p>
            <load-more tip="loading" v-show="loading"></load-more>
            </div>
        </scroller>
        
        <actionsheet v-model="payment.value" :menus="payment.menu" @on-click-menu="paymentFn" show-cancel></actionsheet>
        <actionsheet v-model="submitYes.value" :menus="submitYes.menu" @on-click-menu-jfzf="onJfzf" show-cancel></actionsheet>
        <div class="fixbom submit" @click="alertYhxy">
            图文咨询（{{details.Price}}元/次）
            <p>单次咨询为12小时</p>
        </div>

        <div class="alert_mms" v-show="fwxy"></div>
        <div class="alert_yhxy" v-show="fwxy">
            <h2>小易文化在线咨询服务协议</h2>
          <div class="boxs">
            <p>尊敬的用户：</p>
            <p>欢迎使用小易文化</p>
            <p>【协议说明】本协议是您与小易文化之间关于使用在线咨询服务所订立的协议。</p>
            <p>【审慎阅读】您在申请进行在线咨询服务之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。如您对协议有任何疑问，可通过湖南小易文化有限公司的客服或其它联络方式进行咨询。如您未满18周岁，或以其他形式被限制民事行为能力，请在监护人的陪同下阅读本协议。</p>
            <p>【签约动作】当您阅读后此服务协议后，选择“同意”项则表示您已充分阅读、理解并接受本协议的全部内容，已与小易文化达成一致，进入咨询在线咨询的下一个环节。阅读本协议的过程后，如果您不同意本协议或其中任何条款约定，您应立即选择“不同意”项，终止进入在线咨询的流程。</p>
            <p>【词汇定义】本文中所用词汇定义如下：</p>
            <p>小易文化：指包括湖南小易文化传播有公司所属的“小易饮食”在线移动客户端、在线网站或是其他现在或将来推出的所属平台。</p>
            <p>用户：指阅读并同意本协议内容，将使用小易文化在线咨询业务的单位或个人。（以下更多称为“您”）</p>
            <p>小易文化管理规定：指包括本协议在内的，由用户签署，或由小易文化在线在明显位置展示的，具有规范用户行为作用的各类规定、提示、声明文件。</p>
            <p>一、用户及注册：</p>
            <p>1.1 小易文化提供用户注册。您的帐号由您自行保管；您应当对以您的帐号进行的所有活动和事件负法律责任。</p>
            <p>1.2 您完善个人信息时，在账号名称、头像和简介等注册信息中不得出现违法和不良信息，否则小易文化在线有权拒绝提供服务，并关闭该账号。</p>
            <p> 二、服务内容：</p>
            <p>2.1 小易文化由小易文化经营者提供，小易文化经营者保留随时变更、中断或终止部分或全部网络服务的权利。</p>
            <p>2.2 小易文化作为相关咨询师、用户间交流互通平台，您通过小易文化发表的各种言论（包括但不仅限于咨询问题、个人经验、感谢信等），并不代表小易文化赞同您的观点或证实其内容的真实性。</p>
            <p>2.3 您在小易文化在线上获得的咨询师答复、指导意见、建议等，均不代表小易文化赞同其观点或证实内容的真实性，以上信息不能作为您采取其咨询方案的直接依据。如确有必要，您应当联系咨询师进行面对面的沟通。</p>
            <p>2.4 小易文化提供在线咨询服务时，会对服务收取报酬，支付方式分为两种：一是个人积分，您可以通过不同方式在小易文化获取积分（具体见用户使用指南），当积分足够支付一次咨询服务时，您可以选择用积分支付的方式；另一种是微信支付。每次咨询只能选择一种支付方式。如您拒绝支付此类报酬，小易文化有权不提供相关服务。</p>
            <p>2.5 小易文化仅提供相关的服务，除此之外与服务有关的设备（如电脑、调制解调器及其他与接入互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均应由您自行负担。</p>
            <p>2.6 因不可抗力、网络状况、通讯线路、用户自身过错等技术原因，或其他不可控原因导致您不能正常使用小易文化进行在线咨询服务，小易文化不承担相应责任。</p>
            <p>三、用户的权利和责任：</p>
            <p>3.1 您有权利拥有自己在小易文化在线的账号，并有权利使用自己的账号随时登陆小易文化进行在线咨询服务。</p>
            <p>3.2 您不得以任何形式转让或授权他人使用自己的小易文化账号，亦不得盗用他人帐号，由以上行为造成的后果由用户自行承担。</p>
            <p>3.3您对自己在小易文化上发布的信息承担责任，您不得发布违法信息，不得恶意评价。您承诺自己在使用小易文化在线时实施的所有行为均遵守国家法律、法规和小易文化的管理规定（见用户使用指南）以及社会公共利益或公共道德。如您违反上述任一规则，导致相应法律后果的发生，您将以自己的名义独立承担所有法律责任。</p>
            <p>3.4 您不得将涉及咨询纠纷的问题或其它有责任争议的问题在小易文化在线发布，关于咨询纠纷的问题，请另行咨询律师或相关主管部门寻求援助，小易文化有权将此类信息删除。</p>
            <p>3.5 您发现其他用户有违法或违反小易文化的使用规定的行为，可以向小易文化进行反映要求处理。您因小易文化在线展示的内容与其他用户发生纠纷的，司法部门可以要求小易文化根据法律程序提供该案件所需证据材料。</p>
            <p>3.6您有权在咨询结束后的24小时内进行合理的退款申请，并完善退款流程，小易文化在核实后确认符合退款标准的，将于退款申请后的48小时内将款额退还给用户，如核实后确认不符合退款标准的，将不会退款也不会另行通知。</p>
            <p>四、小易文化的权利和责任：</p>
            <p>4.1 小易文化将协助咨询师与用户之间进行合法的交流，并提供必要的网络技术帮助；</p>
            <p>4.2 小易文化有义务在现有技术上维护整个网络平台的正常运行，并努力提升和改进技术，使您与咨询师的网上交流、互助得以顺利进行；</p>
            <p>4.3 小易文化作为咨询师与用户互通服务的平台，不对您发布的信息的来源和正确性负责，不参与咨询师与用户间交流，不对咨询师与用户间交流的结果承担任何责任；</p>
            <p>4.4 对于您在小易文化上的不当行为或其它任何小易文化认为应当终止服务的情况，小易文化有权随时作出删除相关信息、终止服务提供等处理，而无需征得您的同意；</p>
            <p>4.5 小易文化没有义务对所有用户的注册数据、所有的活动行为以及与之有关的其它事项进行审查，但如存在下列情况，小易文化有权根据不同情况选择保留或删除相关信息或继续、停止对该用户提供服务，并追究相关法律责任：</p>
            <p>①您或其它第三方通知小易文化，认为某个具体用户、具体行为、具体事项可能存在重大问题；</p>
            <p>②您或其它第三方向小易文化告知网络平台上有违法或不当行为的，小易文化以普通非专业人员的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为具有违法或不当性质的。</p>
            <p>4.6 用户在小易文化上如与其它用户产生纠纷，请求小易文化从中予以调处，经小易文化在线审核后，小易文化在线有权向纠纷双方了解情况，并将所了解的情况互相通知对方；小易文化所作出的调处行为不具有法律效力，调处结果系由纠纷双方自愿作出，小易文化仅协助提供信息的沟通，不对调处结果承担相应法律责任。</p>
            <p>4.7 小易文化有权对用户的注册数据及活动行为进行查阅，发现注册数据或活动行为中存在任何问题或怀疑，均有权向用户发出询问及要求改正的通知或者直接作出删除等处理；</p>
            <p>4.8 经国家生效法律文书或行政处罚决定确认用户存在违法行为，或者小易文化有足够事实依据可以认定用户存在违法或违反小易文化管理规定的行为的，小易文化有权以合理方式公布用户的违法行为；</p>
            <p>4.9 因不可抗力（如火灾、水灾、暴动、骚乱、战争、自然灾害等）导致小易文化的服务中断或者用户数据损坏、丢失等，小易文化不承担任何责任；</p>
            <p>4.10 许可使用权：用户以此授予小易文化在线独家的、全球通用的、永久的、免费的许可使用权利，使小易文化有权(全部或部分) 使用、复制、修订、改写、发布、翻译、分发、执行和展示用户公示于网站的各类信息或制作其派生作品，和/或以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。</p>
            <p>五、服务变更、中断或终止：</p>
            <p>5.1 因系统维护或升级的需要而需暂停网络服务，小易文化将尽可能事先进行通告。</p>
            <p>5.2 如发生下列任何一种情形，小易文化有权解除本协议，并终止您的全部服务：</p>
            <p>5.2.1 您违反国家有关法律法规或小易文化管理规定，侵害他人合法权益的；</p>
            <p>5.2.2 您因在小易文化上的不当行为被行政或司法机构拘留或起诉；</p>
            <p>5.2.3 您丧失使用网站服务的行为能力；</p>
            <p>5.2.4 您提供的个人资料不真实；</p>
            <p>5.2.5 您盗用他人账户、发布违禁信息、骗取他人财物的；</p>
            <p>5.2.6 您传播虚假信息，歪曲事实，经查证属实的；</p>
            <p>5.2.7 其它小易文化认为需要终止服务的情况。</p>
            <p>除前款所述情形外，小易文化保留在不事先通知您的情况下随时中断或终止部分或全部网络服务的权利，对于服务的中断或终止而造成您的损失的，小易文化不承担任何责任。</p>
            <p>5.3 服务发生变更、中断、终止后，小易文化仍有以下权利：</p>
            <p> 5.3.1 小易文化有权保留您的注册数据及以前的行为记录；</p>
            <p>5.3.2 如您在服务变更、中断、终止前，在小易文化平台上存在违法行为或违反条款的行为，小易文化仍可行使本服务条款所规定的权利。</p>
            <p>六、隐私声明：</p>
            <p>6.1 适用范围</p>
            <p>6.1.1 您使用小易文化时，根据网站要求提供的个人信息；</p>
            <p>6.1.2 您使用小易文化在线咨询服务时，网站自动接收并记录用户浏览器上的服务器数据，包括但不限于IP地址、网站Cookie中的资料及您要求取用的网页记录；</p>
            <p>6.1.3 您使用小易文化时，上传的非公开的资料、基本情况、咨询方案等文字、图片、数据信息。</p>
            <p>6.1.4 小易文化通过合法途径从其他途径取得的您的个人资料。</p>
            <p>6.1.5 您认为不宜公开的其他内容。</p>
            <p>6.2 信息保密</p>
            <p>6.2.1 保护您的隐私是小易文化的一项基本政策，小易文化保证不对外公开或向第三方提供您的注册资料及您在使用网络服务时存储的非公开内容，但下列情况除外：事先获得您的明确授权；根据有关的法律法规要求；按照相关政府主管部门的要求；为维护社会公众的利益；为维护小易文化在线的合法权益。</p>
            <p>6.2.2 小易文化可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与小易文化在线同等的保护用户隐私的责任，则小易文化有权将您的注册资料等提供给该第三方。</p>
            <p>6.3 信息使用：</p>
            <p>6.3.1 在不透露您的保密信息的前提下，小易文化有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
            <p>6.3.2 咨询师与用户间的咨询问题内容在隐去姓名、单位、地址等信息后，小易文化可以不经过您的授权，进行公开、编辑、出版、发行。</p>
            <p>6.3.3 为服务用户的目的，小易文化可能通过使用您的个人信息向您提供服务，包括但不限于向您发出活动和服务信息等。</p>
            <p>七、免责声明：</p>
            <p>7.1 您使用小易文化在线咨询服务所存在的风险将完全由您自己承担；因其使用小易文化在线咨询服务而产生的一切后果也由您自己承担，小易文化对您不承担任何责任。</p>
            <p>7.2 您有权选择是否遵从小易文化平台上入驻咨询师给出的方案、意见等。</p>
            <p>7.3   对于因不可抗力或小易文化不能控制的原因造成的网络服务中断或其它缺陷，小易文化不承担任何责任，但将尽力减少因此而给您造成的损失和影响。</p>
            <p>八、违约赔偿：</p>
            <p>8.1 您同意保障和维护小易文化及其他用户的利益，如因您违反有关法律、法规或小易文化管理规定而给小易文化或任何其他第三人造成损失，您同意承担由此造成的损害赔偿责任。</p>
            <p>九、服务条款修改：</p>
            <p>9.1 小易文化有权根据服务情况变更、终止小易文化管理规定的各项条款，小易文化将会通过适当方式向您提示修改内容。</p>
            <p>9.2 如果您不同意小易文化管理规定所做的修改，有权停止使用网络服务。如果您继续使用网络服务，则视为您接受小易文化对服务条款相关条款所做的修改。</p>
            <p>十、法律管辖：</p>
            <p>10.1 本服务条款的订立、执行和解释及争议的解决均应适用中国法律。</p>
            <p>10.2 如双方就本服务条款内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向小易文化经营者所在地的人民法院提起诉讼。</p>
            <p>十一、通知送达</p>
            <p>11.1 本协议项下小易文化对于您所有的通知均可通过网页公告、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达给您。</p>
            <p>11.2 您对于小易文化的通知应当通过小易文化在线对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</p>
            <p>十二、其他规定</p>
            <p>12.1 本服务条款构成您与小易文化对服务条款之约定事项及其他有关事宜的完整协议，除服务条款规定的之外，未赋予服务条款各方其他权利。</p>
            <p>12.2 如本服务条款中的任何条款无论因何种原因完全或部分无效或不具有执行力，本条款的其余条款仍应有效并且有约束力。</p>
            <p>12.3 本服务条款中的标题仅为方便而设，在解释本条款时应被忽略。</p>
          </div>
          <div class="btn yes" @click="fwxyFn">
            同意
          </div>
          <div class="btn" @click="fwxy=false">
            拒绝
          </div>
        </div>
    </div>
</template>
<script>
import { LoadMore, Actionsheet, Loading } from "vux";
import { setTimeout, setInterval } from "timers";
export default {
  components: {
    LoadMore,
    Actionsheet,
    Loading
  },
  filters: {
    haoping(item) {
      if (item == 1) {
        return "一星差评";
      } else if (item == 2) {
        return "两星差评";
      } else if (item == 3) {
        return "三星中评";
      } else if (item == 4) {
        return "四星好评";
      } else if (item == 5) {
        return "五星好评";
      }
    }
  },
  data() {
    return {
      fwxy: false,
      loading: false,
      searchVal: {
        pageNum: 0,
        pageSize: 10,
        len: 0,
        uptext: "滑动获取更多评论"
      },
      submitYes: {
        value: false,
        menu: {
          "title.noop": "是否积分支付?",
          jfzf: "<span>确定</span>"
        }
      },
      payment: {
        value: false,
        menu: {
          "payment.noop": "请选择支付方式",
          price: "",
          integral: ""
        }
      },
      details: {},
      listArr: []
    };
  },
  methods: {
    onJfzf() {
      this.$http({
        url: "/api/WeChat/JFPay",
        type: "post",
        data: JSON.stringify({
          DietitianId: this.details.Id
        }),
        success: data => {
          if (data.Code === 20000) {
            this.$router.push({
              path: "/Consultation/State",
              query: {
                mode: 0,
                success: 1,
                name: this.details.Name,
                id: this.details.UserId
              }
            });
          } else {
            console.log(data);
            this.$vux.toast.show({
              type: "warn",
              text: data.Error || data.Message
            });
          }
        },
        error: error => {}
      });
    },
    init() {
      this.payment.menu.price = `<span style='color:#8dc13b'>微信支付 (${
        this.details.Price
      }元)</span>`;
      this.payment.menu.integral = `积分支付 (${this.details.integral})`;
    },
    paymentFn(key) {
      // 向服务端发送支付请求
      if (key == "price") {
        console.log("发起微信支付");
        this.$http({
          url: "/api/WeChat/GetWCPayRequestParams",
          type: "post",
          data: JSON.stringify({ DietitianId: this.$route.query.id }),
          success: data => {
            console.log("调用了微信支付接口");
            console.log(data);
            // 调用微信支付
            if (data.Code !== 20000) {
              this.$vux.toast.show({
                type: "warn",
                text: data.Error || data.Message
              });
              return;
            }

            data = JSON.parse(data.Data);
            this.WeChatZf(data);
          },
          error: data => {
            console.log("微信支付错误");
            console.log(data);
          }
        });
      } else if (key == "integral") {
        // 积分支付

        this.submitYes.value = true;
      }
    },
    WeChatZf(data) {
      var _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, //公众号名称，由商户传入
          timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, //随机串
          package: data.package,
          signType: data.signType, //微信签名方式：
          paySign: data.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            _this.$vux.toast.show({
              type: "success",
              text: "支付成功"
            });
            _this.timeAjax(data);
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            _this.$vux.toast.show({
              type: "warn",
              text: "您取消了支付"
            });
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            _this.$vux.toast.show({
              type: "warn",
              text: "支付失败，请重新支付"
            });
          }
        }
      );
    },
    timeAjax(dataJson) {
      // 轮询订单结果
      this.$http({
        url: "/api/WeChat/QueryOrder",
        type: "get",
        data: { ordercode: dataJson.ordercode },
        success: data => {
          if (data.Code === 20000) {
            this.$router.push({
              path: "/Consultation/State",
              query: {
                mode: 0,
                success: 1,
                name: this.details.Name,
                id: this.details.UserId
              }
            });
          } else if (data.Code === 9000) {
            this.$vux.toast.show({
              type: "warn",
              text: "支付失败：9000"
            });
          } else if (data.Code === 9004) {
            this.timeAjax(dataJson);
          }
        },
        error: data => {}
      });
    },
    back() {
      if (this.$route.query.back) {
        this.$router.push({
          path: this.$route.query.back
        });
      } else {
        this.$router.back(-1);
      }
    },
    getList(time) {
      // 获取评论列表
      if (this.loading) {
        // do nothing
      } else {
        this.loading = true;
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/Consultation/DietitianEvaluationList",
            type: "get",
            data: {
              DietitianId: this.$route.query.id,
              pageNum: this.searchVal.pageNum,
              pageSize: this.searchVal.pageSize
            },
            success: data => {
              this.searchVal.len = data.Data.ItemCount;
              this.setData(data.Data.Data);
            },
            error: function() {
              //错误处理
            }
          });
        }, time || 800);
      }
    },
    setData(data) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.listArr.push(data[i]);
        }
      } else {
        this.searchVal.pageNum--;
        this.searchVal.uptext = "没有更多评论了";
      }
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      this.loading = false;
    },
    alertYhxy() {
      this.fwxy = true;
    },
    fwxyFn() {
      this.fwxy = false;
      this.payment.value = true;
    }
  },
  mounted() {
    this.init();
    this.$http({
      url: "/api/Consultation/DietitianDetail",
      type: "get",
      data: { DietitianId: this.$route.query.id },
      success: data => {
        if (data.Code !== 20000) {
          this.$vux.toast.show({
            text: data.Error + "<br>3秒后返回上一页",
            width: "11em",
            isShowMask: true,
            type: "warn"
          });
          setTimeout(() => {
            this.$router.back(-1);
          }, 3000);
          return;
        }
        this.details = data.Data;
        this.payment.menu.price = `<span style='color:#8dc13b'>微信支付 (${
          this.details.Price
        }元)</span>`;
        this.payment.menu.integral = `积分支付 (${this.details.JFPrice})`;
      },
      error: function() {
        //错误处理
      }
    });

    this.getList(1);
  }
};
</script>
<style scoped lang="less">
.alert_mms {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.alert_yhxy {
  position: fixed;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 6px;
  z-index: 999;
  overflow: hidden;

  h2 {
    text-align: center;
    font-size: 18px;
    padding-bottom: 15px;
  }
  p {
    font-size: 14px;
    line-height: 26px;
  }
  .boxs {
    height: 75%;
    overflow: auto;
    padding-bottom: 50px;
  }

  .btn {
    float: right;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #545454;
    color: #fff;
    border-radius: 5px;
    margin-top: 12px;
  }

  .yes {
    float: left;
    background: #8dc13b;
  }
}
.container {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .info {
    height: auto;
    overflow: hidden;
    padding: 10px 40px 20px 40px;
    background: #8dc13b;
    .top {
      height: auto;
      overflow: hidden;
    }
    .img {
      width: 75px;
      height: 75px;
      overflow: hidden;
      border-radius: 50%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .wz {
      float: left;
      margin-left: 12px;
      color: #fff;
      font-size: 16px;
      box-sizing: border-box;

      h1 {
        font-size: 18px;
        font-weight: 500;
      }
      h2 {
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 8px;
      }
      p {
        font-size: 16px;
      }
    }

    .bom {
      width: 100%;
      height: auto;
      margin-top: 25px;
      overflow: hidden;
      color: #fff;

      .bom_list {
        text-align: center;
        width: 50%;
        float: left;
        font-size: 15px;

        span {
          font-size: 18px;
        }
      }
    }
  }

  .content {
    padding: 0 20px;
    box-sizing: border-box;

    .list {
      padding: 15px 0;
      border-bottom: 1px solid #e6e6e6;
      h2 {
        font-size: 16px;
        color: #545454;
        font-weight: 500;
        margin-bottom: 15px;
      }
      p {
        font-size: 15px;
        color: #666;
      }
    }

    .pt_title {
      border-bottom: 1px solid #e6e6e6;
      height: 40px;
      color: #545454;
      line-height: 40px;
      font-size: 14px;
      span {
        color: #ef7d1d;
      }
    }

    .pj_box {
      .pj_list {
        padding: 15px 0;
        border-bottom: 1px solid #e6e6e6;
        .pj_xq {
          margin-bottom: 15px;
          height: auto;
          overflow: hidden;
          div {
            float: left;
            font-size: 15px;
            color: #545454;
            span {
              color: #8dc13b;
              font-size: 13px;
            }
          }
          .date {
            color: #666666;
            float: right;
            font-size: 13px;
          }
        }

        p {
          font-size: 15px;
          color: #666666;
        }
      }
    }
  }

  .fixbom {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    height: 60px;
    background: #8dc13b;
    padding-top: 10px;
    box-sizing: border-box;

    p {
      font-size: 13px;
      color: #ddd;
    }
  }
}

.lgss {
  text-align: center;
  padding: 10px 0;
  color: #ccc;
  font-size: 14px;
}
</style>
<template>
  <div class="container">
    <!-- <div class="fixbo" :class="{fixboactive:zoomShow}"></div> -->
    <div class="header">
      <div class="left" @click="$router.back(-1)">
        <i class="iconfont icon-fanhui"></i>返回
      </div>
      <div class="title">{{title}}</div>
    </div>
    <div class="scroller_box chat" id="chat_box">
      <p class="mz">
        <span>仅代表营养师意见，与平台无关</span>
      </p>
      <!-- <div class="tipsas" v-if="isEnds">咨询已经结束了</div> -->
      <!-- <div class="tipsasdhi" v-if="isEnds"></div> -->

      <load-more tip="loading" v-show="loading"></load-more>
      <ul>
        <li v-for="(item,index) in listArr" :class="{he:item.id==he.id,my:item.id==my.id}">
          <div class="tx">
            <img :src="item.src" alt="">
          </div>
          <div class="box">
            <div class="text" v-if="item.type=='text'">{{item.text}}</div>
            <!-- <textarea v-if="item.type=='text'" v-model="item.text"></textarea> -->

            <div class="img" v-else>
              <img :src="item.text" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="text_jl" id="outh">{{chatText}}</div>
    <div class="ltk" :style="{height:chatText===''?'45px':outHeight+16+'px'}">
      <div class="rel">
        <div
          class="input"
          :style="{height:chatText==='' || outHeight<30?'30px':outHeight+'px','padding-right':chatText===''?'30px':'60px'}"
        >
          <textarea :disabled="isEnds" :style="{background:isEnds?'#ccc':''}" v-model="chatText"></textarea>
        </div>
        <div class="btn_fm">
          <span @click="sendMessage" v-show="chatText!==''">发送</span>
          <i v-show="chatText==''" v-if="!isEnds" class="iconfont icon-tupian"></i>
          <input class="upload_img" v-show="chatText==''" type="file" @change="addImg">
        </div>
      </div>
    </div>
    <div class="nav_bom_zoom" v-if="end"></div>
    <div class="alert_box" v-if="end">
      <p>本次咨询已结束，去给个评价吧~</p>
      <div class="boxs">
        <div class="btn">
          <router-link to="/Consultation/ChatRefund">前往评价</router-link>
        </div>
        <div class="backs">
          <router-link
            :to="{path:'/Consultation/ConsultationDetails',query:{
              back:'/Consultation'
            }}"
          >返回</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LoadMore, Toast } from "vux";
import { setTimeout } from "timers";
import { mapGetters } from "vuex";
import settings from "@/config/settings.js";
import { userInfo } from "os";
export default {
  computed: {
    ...mapGetters(["getLogin"])
  },
  components: {
    LoadMore,
    Toast
  },
  data() {
    return {
      isEnds: false,
      zoomShow: true,
      history: 1,
      end: false,
      chatText: "",
      outHeight: 44,
      outH: null,
      loading: false,
      scrollTop: 0,
      title: this.$route.query.name,
      he: {
        id: "fbd13b8f-51d8-47d7-b52d-a90600e9d398",
        name: this.$route.query.name,
        src: "/static/images/ystx.jpg"
      },
      my: {
        id: "5eb1d623-e862-415a-aeaf-a90c01553147",
        name: "lok666",
        src: "/static/images/tx.jpg"
      },
      listArr: [
        // {
        //   id: "fbd13b8f-51d8-47d7-b52d-a90600e9d398",
        //   name: "哈哈哈",
        //   src: "/static/images/ystx.jpg",
        //   type: "text",
        //   text: "请问有什么可以帮助你的？"
        // },
        // {
        //   id: "5eb1d623-e862-415a-aeaf-a90c01553147",
        //   name: "lok666",
        //   src: "/static/images/tx.jpg",
        //   type: "text",
        //   text: "我怎么可以吃才可以长胖？"
        // }
      ]
    };
  },
  watch: {
    chatText() {
      this.outHeight = this.outH.offsetHeight;
    }
  },
  methods: {
    tiSetout() {
      if (this.$route.query.ism == "false" || this.$route.query.ism == false) {
        this.isEnds = true;
        this.chatText = "咨询已结束";
        // this.$vux.toast.show({
        //   type: "warn",
        //   text: "咨询已经结束了哦",
        //   width: "11em"
        // });

        this.$vux.loading.hide();
        return true;
      } else {
        return false;
      }
    },
    addImg(event) {
      var ism = this.tiSetout();
      // if (ism) {
      //   return;
      // }

      // 发送图片
      let reader = new FileReader();
      let img1 = event.target.files[0];
      let type = img1.type; //文件的类型，判断是否是图片
      let size = img1.size; //文件的大小，判断图片的大小
      var accept = "image/gif, image/jpeg, image/png, image/jpg";
      if (type == "" || accept.indexOf(type) == -1) {
        this.$vux.toast.show({
          type: "warn",
          text: "图片格式只支持：gif、jpg、png、jpeg"
        });
        return false;
      }
      if (size > 10485760) {
        this.$vux.toast.show({
          type: "warn",
          text: "请选择10M以内的图片！"
        });
        return false;
      }
      let form = new FormData();
      form.append("file", img1, img1.name);
      this.$Axios
        .post(settings.server + "/api/User/UploadChatImg", form, {
          headers: {
            "Content-Type": "multipart/form-data",
            userid: this.getLogin.userid,
            Token: this.getLogin.Token
          }
        })
        .then(response => {
          console.log("上传成功");
          console.log(response);
          this.sendMessage("img", settings.server + response.data.Data);
        })
        .catch(error => {
          this.$vux.toast.show({
            type: "error",
            text: "上传出错"
          });
        });
    },
    getList() {
      if (this.loading) {
      } else {
        var els = document.getElementById("chat_box");
        this.scrollTop = els.scrollHeight;
        this.loading = true;
        setTimeout(() => {
          this.getHistoryMessage();
        }, 800);
      }
    },
    hd() {},
    // 即时通信
    connectServer() {
      var conn = $.hubConnection(settings.server);
      this.proxy = conn.createHubProxy("chatHub");
      this.receiveSystemMsg(); //注册接收系统消息
      this.receiveMessageHistory(); //注册接收历史消息
      this.receiveRecentMsg(); //注册近期消息
      this.receiveUserMsg(); //接收消息
      conn
        .start()
        .done(data => {
          this.connect(); //调用服务端connect方法
        })
        .fail(data => {});
    },
    receiveSystemMsg() {
      var isT = true;
      //接收服务端消息，
      this.proxy.on("receiveSystemMsg", (data, userInfo) => {
        var ism = this.tiSetout();
        // if (ism) {
        //   return;
        // }
        this.$vux.toast.show({
          type: "text",
          text: data,
          width: "12em"
        });
        if (userInfo && isT) {
          var userInfo = JSON.parse(userInfo);
          this.my.id = userInfo.UserId;
          this.my.name = userInfo.RealName;
          this.my.src = userInfo.UserPortrait;
          this.he.id = userInfo.ToId;
          this.he.name = userInfo.ToName;
          this.he.src = userInfo.ToUserPortrait;
          isT = false;

          // this.$vux.toast.show({
          //   text:"链接"
          // })
        }
        this.$vux.loading.hide();
        this.zoomShow = false;
      });
    },
    receiveRecentMsg() {
      //接收近期消息，
      this.proxy.on("receiveRecentMsg", data => {
        this.$vux.loading.show();
        this.zoomShow = true;
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
          var d = JSON.parse(data[i].Message);
          this.listArr.unshift(d);
        }
        this.$nextTick(() => {
          var els = document.getElementById("chat_box");
          setTimeout(() => {
            els.scrollTop = els.scrollHeight - this.scrollTop;
          }, 100);
          this.loading = false;
          this.$vux.loading.hide();
          this.zoomShow = false;
        });
      });
    },
    receiveMessageHistory() {
      //接收历史消息，
      this.proxy.on("receiveMessageHistory", data => {
        if (data.length == 0) {
          return;
        }
        this.history++;
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
          var d = JSON.parse(data[i].Message);
          this.listArr.unshift(d);
        }
        this.$nextTick(() => {
          var els = document.getElementById("chat_box");
          setTimeout(() => {
            els.scrollTop = els.scrollHeight - this.scrollTop;
          }, 100);
          this.loading = false;
        });
      });
    },
    getHistoryMessage() {
      // 事件获取历史消息，逻辑在上面
      this.proxy.invoke("requestMessageHistory", 1).done(msg => {});
    },
    receiveUserMsg() {
      //接收消息，
      this.proxy.on("receiveUserMsg", data => {
        data = JSON.parse(data);
        this.listArr.push(data);
      });
    },
    sendMessage(imgType, imgUrl) {
      var ism = this.tiSetout();
      // if (ism) {
      //   return;
      // }
      imgType = imgType == "img" ? imgType : null;
      // 发送消息
      var d = {
        id: this.my.id,
        name: this.my.name,
        src: this.my.src,
        type: imgType || "text",
        text: imgUrl || this.chatText
      };
      console.log(d);
      d = JSON.stringify(d);
      //发送消息，这个方法由按钮事件触发
      this.proxy.invoke("sendMessage", d).done(msg => {
        this.listArr.push(JSON.parse(d));
        if (!imgType) {
          this.chatText = "";
        }
      });

      var els = document.getElementById("chat_box");
      setTimeout(() => {
        els.scrollTop = els.scrollHeight;
      }, 100);
    },
    connect() {
      //连接
      var userId = this.getLogin.userid,
        token = this.getLogin.Token,
        toId = this.$route.query.id;
      this.proxy.invoke("connect", userId, token, toId).done(msg => {});
    }
  },
  mounted() {
    this.$vux.loading.show();
    this.connectServer();
    this.outH = document.getElementById("outh");
    this.outHeight = this.outH.offsetHeight;

    // 3秒后结束当前聊天
    // setTimeout(() => {
    //   this.end = true;
    // }, 3000);
    var el = document.getElementById("chat_box");
    el.onscroll = () => {
      var t = el.scrollTop; //获取距离页面顶部的距离
      if (t === 0) {
        this.getList();
      }
    };
    this.$nextTick(() => {
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 100);
    });

    // 让隐藏的width和textarear相同
    $("#outh").width($(".rel .input textarea").width());
  }
};
</script>
<style lang="less" scoped>
.fixbo {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: -99;
  transition: all 0.3s;
}
.fixboactive {
  z-index: 99;
  opacity: 1;
}
.container {
  height: 100%;
  background: #f3f3f3;
  padding-top: 45px;
  padding-bottom: 45px;
  box-sizing: border-box;
  .header {
    position: fixed;
    top: 0;
    z-index: 9099;
  }
  .chat {
    height: 100%;
    overflow: auto;
    padding: 11px 27/2px;
    box-sizing: border-box;
    position: relative;

    .mz {
      position: fixed;
      top: 55px;
      left: 0;
      z-index: 999;
      text-align: center;
      width: 100%;

      span {
        display: inline-block;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        font-size: 14px;
        padding: 3px 10px;
        border-radius: 5px;
      }
    }

    li {
      padding: 11px 0;
      box-sizing: border-box;
      height: auto;
      overflow: hidden;
    }

    .box {
      padding: 10px;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #dadada;
      border-radius: 4px;
      max-width: 80%;
      position: relative;

      .img {
        max-width: 100%;
      }
      .text {
        word-wrap: break-word;
        font-size: 15px;
      }

      &::after {
        content: "";
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        top: 12px;
      }
    }
    .tx {
      img {
        width: 83/2px;
        height: 83/2px;
        box-shadow: 3px 0 5px rgba(63, 63, 63, 0.39);
        color: #343434;
      }
    }
    .he {
      .tx {
        float: left;
      }
      .box {
        float: left;
        margin-left: 28/2px;

        &::after {
          left: -10px;
          background: url("/static/images/chat.png") no-repeat;
        }
      }
    }

    .my {
      .box {
        float: right;
        margin-right: 28/2px;
        background: #a0e03c;
        position: relative;

        &::after {
          right: -10px;
          background: url("/static/images/chat2.png") no-repeat;
        }
      }
      .tx {
        float: right;
      }
    }
  }

  .ltk {
    position: fixed;
    bottom: 0;
    min-height: 45px;
    height: auto;
    background: #e0e0e0;
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;
    left: 0;
    .rel {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    .input {
      position: absolute;
      left: 0;
      top: 8px;
      float: left;
      width: 100%;
      box-sizing: border-box;
      padding-right: 60px;
      min-height: 30px !important;
      textarea {
        background: #fff;
        height: 56/2px;
        border: 1px solid #c7c7c7;
        height: 100%;
        padding: 5px 12px;
      }
    }

    .btn_fm {
      position: relative;
      z-index: 999;
      float: right;
      span {
        background: #8dc13b;
        height: 29px;
        line-height: 29px;
        color: #fff;
        border-radius: 5px;
        font-size: 12px;
        padding: 0 12px;
        display: block;
        margin-top: 8px;
        margin-left: 2px;
      }
    }

    i {
      font-size: 22px;
      line-height: 45px;
      color: #515151;
    }
  }

  .text_jl {
    position: fixed;
    opacity: 1;
    z-index: 1;
    background: #000;
    min-height: 58/2px;
    height: auto;
    max-height: 130px;
    color: #fff;
    width: 100%;
    word-wrap: break-word;
    z-index: -99;
    bottom: -100px;
  }

  .alert_box {
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    background: #fff;
    border-radius: 10px;
    z-index: 9919;
    margin-top: -70px;

    p {
      font-size: 16px;
      color: #666666;
      margin: 30px 0 20px;
      text-align: center;
    }

    .boxs {
      width: 65%;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      padding-bottom: 65/2px;
      position: relative;

      .btn {
        background: #8dc13b;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        font-size: 15px;

        a {
          color: #fff;
        }
      }
      .backs {
        position: absolute;
        font-size: 15px;
        top: 0;
        right: -40px;

        a {
          display: block;
          color: #666666;
        }
      }
    }
  }

  .upload_img {
    position: absolute;
    right: 0;
    top: 10px;
    width: 22px;
    height: 22px;
    z-index: 999;
    opacity: 0;
    padding: 0;
  }
}
</style>
<style>
.xs-plugin-pulldown-container {
  display: none !important;
}
.tipsas {
  width: 200px;
  text-align: center;
  border-radius: 4px;
  margin: 0 auto;
  position: fixed;
  top: 45%;
  z-index: 9999;
  color: #fff;
  left: 50%;
  margin-left: -100px;
}
.tipsasdhi {
  display: block;
  width: 100%;
  height: 100%;
  z-index: 999;
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
}
</style>

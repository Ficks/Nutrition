<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{title}}</div>
      </div>
        <div class="scroller_box chat" id="chat_box">
            <load-more tip="loading" v-show="loading"></load-more>
            <ul>
                <li v-for="(item,index) in listArr" :class="{he:item.name==he.name,my:item.name==my.name}">
                    <div class="tx"><img :src="item.src" alt=""></div>
                    <div class="box">
                        <div class="text" v-if="item.type=='text'">{{item.text}}</div>
                        <!-- <textarea v-if="item.type=='text'" v-model="item.text"></textarea> -->
                        <div class="img" v-else><img :src="item.img" alt=""></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="text_jl" id="outh">{{chatText}}</div>
        <div class="ltk">
          <div class="rel">
            <div class="input" :style="{height:outHeight+'px','padding-right':chatText===''?'30px':'60px'}"><textarea v-model="chatText"></textarea></div>
            <div class="btn_fm">
              <span @click="msgNew" v-show="chatText!==''">发送</span>
              <i  v-show="chatText==''" class="iconfont icon-tupian"></i>
            </div>
          </div>
        </div>

        <div class="nav_bom_zoom" v-if="end"></div>
        <div class="alert_box" v-if="end">
          <p>本次咨询已结束，去给个评价吧~</p>
          <div class="boxs">
            <div class="btn"><router-link to="/Consultation/ChatRefund">前往评价</router-link></div>
            <div class="backs"><router-link :to="{path:'/Consultation/ConsultationDetails',query:{
              back:'/Consultation'
            }}">返回</router-link></div>
          </div>
        </div>
    </div>
</template>
<script>
import { LoadMore, Toast } from "vux";
import { setTimeout } from "timers";
export default {
  components: {
    LoadMore,
    Toast
  },
  data() {
    return {
      end: false,
      chatText: "",
      outHeight: 44,
      outH: null,
      loading: false,
      scrollTop: 0,
      title: this.$route.query.name,
      he: {
        name: this.$route.query.name,
        src: "/static/images/ystx.jpg"
      },
      my: {
        name: "lok666",
        src: "/static/images/tx.jpg"
      },
      listArr: [
        {
          name: this.$route.query.name,
          src: "/static/images/ystx.jpg",
          type: "text",
          text: "请问有什么可以帮助你的？"
        },
        {
          name: "lok666",
          src: "/static/images/tx.jpg",
          type: "text",
          text: "我怎么可以吃才可以长胖？"
        },
        {
          name: "lok666",
          src: "/static/images/tx.jpg",
          type: "img",
          img: "/static/images/ys.jpg"
        },
        {
          name: this.$route.query.name,
          src: "/static/images/ystx.jpg",
          type: "text",
          text: "请问有什么可以帮助你的？"
        },
        {
          name: "lok666",
          src: "/static/images/tx.jpg",
          type: "text",
          text: "我怎么可以吃才可以长胖？"
        },
        {
          name: "lok666",
          src: "/static/images/tx.jpg",
          type: "img",
          img: "/static/images/ys.jpg"
        },
        {
          name: this.$route.query.name,
          src: "/static/images/ystx.jpg",
          type: "text",
          text: "请问有什么可以帮助你的？"
        },
        {
          name: "lok666",
          src: "/static/images/tx.jpg",
          type: "text",
          text: "我怎么可以吃才可以长胖？"
        },
        {
          name: "lok666",
          src: "/static/images/tx.jpg",
          type: "img",
          img: "/static/images/ys.jpg"
        }
      ]
    };
  },
  watch: {
    chatText() {
      this.outHeight = this.outH.offsetHeight;
    }
  },
  methods: {
    msgNew() {
      // 发送消息
      if (this.chatText !== "") {
        this.listArr.push({
          name: "lok666",
          src: "/static/images/tx.jpg",
          type: "text",
          text: this.chatText
        });
        this.chatText = "";

        var els = document.getElementsByClassName("container")[0];
        console.log(els.scrollHeight);
        setTimeout(() => {
          els.scrollTop = els.scrollHeight;
        });
      } else {
        this.$vux.toast.show({
          text: "不能发送空消息",
          type: "text"
        });
      }
    },
    getList() {
      if (this.loading) {
      } else {
        var els = document.getElementsByClassName("container")[0];
        this.scrollTop = els.scrollHeight;
        this.loading = true;
        setTimeout(() => {
          this.listArr.unshift({
            name: "lok666",
            src: "/static/images/tx.jpg",
            type: "img",
            img: "/static/images/ys.jpg"
          });

          this.$nextTick(() => {
            setTimeout(() => {
              els.scrollTop = els.scrollHeight - this.scrollTop;
            });
            this.loading = false;
          });
        }, 2000);
      }
    },
    hd() {}
  },
  mounted() {
    this.outH = document.getElementById("outh");
    this.outHeight = this.outH.offsetHeight;
    console.log("当前页面API：" + this.$route.path);
    console.log("聊天数据：", this.listArr);

    setTimeout(() => {
      this.end = true;
    }, 3000);
    var el = document.getElementsByClassName("container")[0];
    el.onscroll = () => {
      var t = el.scrollTop; //获取距离页面顶部的距离
      if (t === 0) {
        this.getList();
      }
    };
    this.$nextTick(() => {
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      });
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  overflow: auto;
  background: #f3f3f3;
  padding-top: 55px;
  padding-bottom: 55px;
  box-sizing: border-box;
  .header {
    position: fixed;
    top: 0;
    z-index: 9099;
  }
  .chat {
    padding: 11px 27/2px;
    box-sizing: border-box;

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
      height: auto;
      overflow: hidden;
      width: 100%;
      height: 45px;
    }
    .input {
      position: absolute;
      left: 0;
      top: 8px;
      float: left;
      width: 100%;
      height: 22px;
      box-sizing: border-box;
      padding-right: 60px;
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
}
</style>
<style>
.xs-plugin-pulldown-container {
  display: none !important;
}
</style>

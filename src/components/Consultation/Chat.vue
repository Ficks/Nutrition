<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{title}}</div>
      </div>
        <div class="scroller_box chat" id="chat_box">
            <load-more tip="loading" class="loadingys" v-show="loading"></load-more>
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
          <div class="input" :style="{height:outHeight+'px'}"><textarea v-model="chatText"></textarea></div>
          <div class="btn_fm">
            <span @click="msgNew">发送</span>
            <i class="icofnont"></i>
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
      chatText: "",
      outHeight: 44,
      outH: null,
      loading: false,
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
        console.log(99999);
        this.loading = true;
        setTimeout(() => {
          this.listArr.unshift(
            {
              name: this.$route.query.name,
              src: "/static/images/ystx.jpg",
              type: "text",
              text: "新一代洗衣服111"
            },
            {
              name: "lok666",
              src: "/static/images/tx.jpg",
              type: "text",
              text: "新一代洗衣服222"
            },
            {
              name: "lok666",
              src: "/static/images/tx.jpg",
              type: "img",
              img: "/static/images/ys.jpg"
            }
          );
          this.$nextTick(() => {
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
    console.log(9990);
    var el = document.getElementsByClassName("container")[0];
    el.onscroll = () => {
      var t = el.scrollTop; //获取距离页面顶部的距离
      if (t === 0) {
        this.getList();
      }
    };
  }
};
</script>
<style lang="less" scoped>
.container {
  .loadingys {
    margin-top: -20px;
  }
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

    .input {
      float: left;
      width: 88%;
      margin-top: 8px;
      height: 22px;
      textarea {
        background: #fff;
        height: 56/2px;
        border: 1px solid #c7c7c7;
        height: 100%;
        padding: 5px 12px;
      }
    }

    .btn_fm {
      float: right;

      span {
        background: #8dc13b;
        height: 29px;
        line-height: 29px;
        color: #fff;
        border-radius: 5px;
        font-size: 14px;
        padding: 0 5px;
        display: block;
        margin-top: 8px;
        margin-left: 2px;
      }
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
}
</style>
<style>
.xs-plugin-pulldown-container {
  display: none !important;
}
</style>

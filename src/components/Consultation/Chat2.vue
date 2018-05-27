<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{title}}</div>
      </div>
        <!-- <scroller lock-x height="-45px" ref="scrollerBottom" @on-scroll="getList"> -->
             <scroller v-model="scrollerStatus" height="-45px"   lock-x   ref="scroller" :use-pulldown="true" :pulldowns-config="upobj" @on-pulldown-loading="selPullUp" >
            <div class="scroller_box chat">
                <load-more tip="loading" v-show="loading"></load-more>
                <ul>
                    <li v-for="(item,index) in listArr" :class="{he:item.name==he.name,my:item.name==my.name}">
                        <div class="tx"><img :src="item.src" alt=""></div>
                        <div class="box">
                            <div class="text" v-if="item.type=='text'">{{item.text}}</div>
                            <div class="img" v-else><img :src="item.img" alt=""></div>
                        </div>
                    </li>
                </ul>
            </div>
        </scroller>
    </div>
</template>
<script>
import { LoadMore } from "vux";
import { setTimeout } from "timers";
export default {
  components: {
    LoadMore
  },
  data() {
    return {
      scrollerStatus: {
        pullupStatus: "default"
      },
      upobj: {
        content: "请上拉刷新数据",
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: "请上拉刷新数据",
        upContent: "请上拉刷新数据",
        loadingContent: "加载中...",
        clsPrefix: "xs-plugin-pullup-"
      },
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
  methods: {
    selPullUp() {
      console.log("上拉刷新数据");
      this.PageIndex++;
      this.getList(false);
    },
    getList() {
      if (this.loading) {
      } else {
        this.loading = true;
        setTimeout(() => {
          this.listArr.unshift(
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
          );
          console.log(this.scrollerStatus.pullupStatus);
          this.scrollerStatus.pullupStatus = false;
          this.$nextTick(() => {
            this.loading = false;
            this.$refs.scroller.reset();
          });
        }, 1000);
      }
    }
  },
  mounted() {
    console.log(this.$route.query);
    console.log("当前页面API：" + this.$route.path);
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  overflow: auto;
  background: #f3f3f3;

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
}
</style>
<template>
    <div class="container">
       <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
      <scroller lock-x height="-90px" @on-scroll-bottom="getList" ref="scrollerBottom">
        <div class="scroller_box">
          <div class="details">
            <div class="title">
                  <h1>{{details.title}}</h1>
                  <p>发布时间：{{details.date}} 作者：{{details.author}}</p>
              </div>
              <div class="content" v-html="details.text">
              </div>
          </div>
          <div class="comment">
              <h2><span>以下为评论</span></h2>
              <ul>
                  <li v-for="(item,index) in listArr">
                      <div class="top">{{item.lou}} <span>{{item.date}}</span></div>
                      <p>{{item.p}}</p>
                  </li>
              </ul>
              <div class="more">
                  <span  v-show="!loading">{{searchVal.uptext}}</span>
                  <load-more tip="loading" v-show="loading"></load-more>
              </div>
          </div>
        </div>
      </scroller>
        <div class="text_input">
              <div class="tops">
                  <div class="left" :style="{width:commentShow?100+'%':'75%'}">
                      <textarea v-model="commentVal" :style="{height:commentShow?'150px':'25px'}" placeholder="我也来说两句..." @focus="commentShow=true" @blur="commentShow=false"></textarea>
                  </div>
                  <div class="right" v-show="!commentShow">
                      <i :class="{active:details.islikeone}" class="iconfont icon-dianzan" @click="setWenz(true)"></i>
                      <i :class="{active:details.isfavorone}" class="iconfont icon-shoucang" @click="setWenz(false)"></i>
                  </div>
              </div>
              <div class="submit_btn" @click="submitComment" v-show="commentShow">确定发表</div>
          </div>
    </div>
</template>
<script>
import { LoadMore, Toast } from "vux";
export default {
  components: {
    LoadMore,
    Toast
  },
  data() {
    return {
      details: {
        title: "正常成人膳食指南 6项权威解答",
        islikeone: false,
        isfavorone: false,
        date: "2018-05-14 17:14",
        author: "admin",
        text: ` <p>      一直以来人们都非常关注饮食对健康的影响，那么到底
吃什么？怎么吃才能够有益机体健康呢？今天小福菌给大家
带来2018膳食指南，告诉你吃什么最健康！</p>
                <img src="/static/images/zx.jpg" alt="">
                <p>
                          通过对小鼠研究发现，每天摄入西红柿或能降低一半小
鼠皮肤癌的发生，研究者揭示了进行营养干预如何改变个体
患皮肤的风险。西红柿与癌症关联背后的理论或许是西红柿
中的类胡萝卜素，这种化合物能够让西红柿着色，同时其还
能够保护机体抵御紫外线带来的皮肤损伤。
                </p>
                <p>      研究还表明，当开发不同的预防性策略时我们的确需要
考虑性别，在男性机体中能够发挥作用的物质有时候或许在
女性机体中并没有什么作用，反之亦然。</p>
                <p>
                          大量摄入新鲜水果或和糖尿病发生率降低直接相关，同
时还能够降低糖尿病患者并发症的发生率。
                </p>`
      },
      loading: false,
      searchVal: {
        id: "",
        pageNum: 0,
        pageSize: 10,
        uptext: "滑动查看更多"
      },
      commentShow: false,
      commentVal: "",
      listArr: []
    };
  },
  methods: {
    getList(time) {
      var _this = this;
      if (this.loading) {
        // do nothing
      } else {
        this.loading = true;
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/NewsInfo/GetNewsInfoComments",
            type: "get",
            data: this.searchVal,
            success: function(data) {
              //成功的处理
              console.log(data);
              _this.setData(data.Data);
            },
            error: function() {
              //错误处理
            }
          });
        }, time || 800);
      }
    },
    setData(data) {
      if (data.length == 0) {
        this.searchVal.uptext = "没有更多数据了";
        this.searchVal.pageNum--;
        this.loading = false;
        return;
      }
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        data[i].src = data[i].src || "/static/images/searchm.jpg";

        this.listArr.push(data[i]);
      }

      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      this.loading = false;
    },
    submitComment() {
      // 发表评论
      if (this.commentVal !== "") {
        var _this = this;
        var d = {
          NewsInfoId: this.$route.query.id,
          CommentsStr: this.commentVal
        };
        d = JSON.stringify(d);
        this.$http({
          url: "/api/NewsInfo/SubmitNewsInfoComments",
          type: "post",
          data: d,
          success(data) {
            console.log(data);
          },
          error() {}
        });
        this.listArr.push({
          lou: "4楼",
          p: this.commentVal,
          date: "5月22日"
        });
        this.commentVal = "";
        // 显示文字
        this.$vux.toast.show({
          text: "发表成功",
          type: "success"
        });
      } else {
        this.$vux.toast.show({
          text: "评论不能为空",
          type: "warn"
        });
        return false;
      }
    },
    setWenz(isX) {
      var _this = this;
      var d = { id: this.$route.query.id };
      d = JSON.stringify(d);
      if (isX) {
        if (this.details.islikeone) {
          this.$vux.toast.show({
            text: "您已经点过赞了",
            type: "warn"
          });
          return;
        }

        // 点赞
        this.$http({
          url: "/api/NewsInfo/DoLike",
          type: "post",
          data: d,
          success(data) {
            _this.details.islikeone = true;
            _this.$vux.toast.show({
              text: data.Message,
              type: "success"
            });
          },
          error() {}
        });
      } else {
        // 收藏
        this.$http({
          url: "/api/NewsInfo/DoCollect",
          type: "post",
          data: d,
          success(data) {
            if (data.Message == "已取消收藏") {
              _this.details.isfavorone = false;
            } else {
              _this.details.isfavorone = true;
            }
            _this.$vux.toast.show({
              text: data.Message,
              type: "success"
            });
          },
          error() {}
        });
      }
    },
    getDetails() {
      var _this = this;
      this.searchVal.id = this.$route.query.id;
      this.$http({
        url: "/api/NewsInfo/GetNewsInfoDetails",
        type: "get",
        data: { id: this.$route.query.id },
        success(data) {
          _this.details.islikeone = data.Data.islikeone;
          _this.details.isfavorone = data.Data.isfavorone;
          _this.details.title = data.Data.title;
          _this.details.date = data.Data.date;
          _this.details.author = data.Data.auth;
          _this.details.text = data.Data.text;
        },
        error() {}
      });
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    console.log("详细数据格式：", this.details);
    console.log("评论数据格式：", this.listArr);
    this.getDetails();
    this.getList(1);
  }
};
</script>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;

  .scroller_box {
    height: 100%;
    box-sizing: border-box;
  }
  .details {
    padding: 0 20px;
    .title {
      text-align: center;
      h1 {
        font-size: 18px;
        color: #545454;
        padding-top: 15px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        color: #b3b3b3;
      }
    }

    .content {
      color: #666666;
      font-size: 14px;
      line-height: 26px;
      text-indent: 2em;

      p {
        margin-bottom: 10px;
      }
    }
  }
  .comment {
    padding: 0 20px;
    h2 {
      margin-top: 10px;
      font-size: 14px;
      color: #bfbfbf;
      font-weight: 500;
      background: url("/static/images/y.jpg") no-repeat center;
      text-align: center;
      span {
        padding: 0 5px;
        background: #fff;
      }
    }

    ul {
      li {
        padding: 15px 0 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        .top {
          height: auto;
          overflow: hidden;
          color: #bfbfbf;
          font-size: 12px;
          margin-bottom: 15px;
          span {
            float: right;
          }
        }
        p {
          font-size: 14px;
          color: #666;
        }
      }
    }
    .more {
      text-align: center;
      padding: 10px 0;
      color: #a4a4a4;
      font-size: 12px;
    }
  }

  .text_input {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #f6f6f6;
    padding-top: 8px;
    padding-bottom: 3px;
    line-height: 25px;
    .tops {
      height: auto;
      overflow: hidden;
    }
    .submit_btn {
      margin: 15px auto;
    }

    .left {
      float: left;
      box-sizing: border-box;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 2px;
      width: 75%;
      textarea {
        height: 25px;
        width: 100%;
        background: #ffffff;
        resize: none;
        height: 100%;
        transition: all 0.5s;
      }
    }
    .right {
      float: right;
      width: 25%;
      text-align: center;

      .iconfont {
        font-size: 22px;
        padding: 0 5px;
        box-sizing: border-box;
        color: #333;

        &.active {
          color: #8dc13b;
        }
      }
    }
  }
}
</style>

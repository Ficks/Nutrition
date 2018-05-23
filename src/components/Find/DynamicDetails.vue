<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
        <div class="details_dt">
          <div class="top">
            <div class="imgs"><img src="/static/images/tx.jpg" alt=""></div>
            <div class="wz">
              <h1>lok666</h1>
              <p>1分钟前</p>
            </div>
          </div>
          <div class="wz_box">
            <img src="/static/images/dt.jpg" alt="">
            <p>#饮食行为分享#今天又去吃好吃的了！</p>
          </div>
        </div>
        
        <div class="pldz_btn">
          <div class="btns">
            <i class="iconfont icon-pinglun"></i>
            评论
          </div>
          <div class="btns">
            <i class="iconfont icon-dianzan1"></i>
            点赞
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log("当前页面API：" + this.$route.path);
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  overflow: hidden;

  .details_dt {
    padding: 15px 35px 50px 35px;
    box-sizing: border-box;
  }

  .top {
    .imgs {
      float: left;
      img {
        width: 42px;
      }
    }
    .wz {
      float: left;
      padding-left: 10px;

      h1 {
        font-size: 15px;
        color: #7a7a7a;
        font-weight: 500;
      }
      p {
        font-size: 12px;
        color: #b9b9b9;
      }
    }
  }
  .wz_box {
    img {
      max-width: 100%;
      margin: 10px 0 20px;
    }
    p {
      font-size: 14px;
      color: #666;
    }
  }

  .pldz_btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #c9c9c9;

    .btns {
      float: left;
      width: 50%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #f0f0f0;
      font-size: 15px;
      color: #707070;
      position: relative;

      i {
        font-size: 20px;
        color: #707070;
        position: relative;
        top: 2px;
      }

      &:first-child:after {
        content: "";
        position: absolute;
        right: 0;
        top: 4px;
        height: 32px;
        width: 1px;
        background: #a7a7a7;
      }

      &:active {
        background: #ddd;
      }
    }
  }
}
</style>

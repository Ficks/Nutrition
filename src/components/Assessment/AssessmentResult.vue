<template>
    <div class="container">
        <div class="header" >
            <div class="left" @click="$router.history.go(-2)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
        
        <div class="box">
            <div class="top"><i class="iconfont icon-danxuankuang-xuanzhong"></i></div>
            <div class="title">本次测评得分</div>
            <div class="score">{{score}}</div>
            <div class="p">{{text}}</div>

            <div class="bom">
                <div class="p">成功完成测评，积分+1</div>
                <div class="submit_btn" @click="share">分享给好友</div>
                <div class="submit_btn back" @click="$router.history.go(-2)">返回</div>
            </div>
        </div>

        <div class="fenx" @click="isFx=false"  v-show="isFx">
        <div class="img"><img src="/static/images/fx.png" alt=""></div>
        <p>请点击右上角 <br>将它发送给指定朋友<br>或分享到朋友圈</p>
      </div>
      <div class="nav_bom_zoom" @click="isFx=false"  v-show="isFx"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      score: 0,
      text: "",
      isFx: false
    };
  },
  methods: {
    getScore() {
      this.score = this.$route.query.score;
      this.text = this.$route.query.text;
    },
    share() {
      this.isFx = true;
    }
  },
  mounted() {
    this.getScore();
  }
};
</script>
<style scoped lang="less">
.container {
  text-align: center;

  .box {
    .top {
      margin: 30px auto 0 auto;
      i {
        font-size: 100px;
        color: #ef7d1d;
      }
    }
    .title {
      font-size: 16px;
      color: #666666;
    }
    .score {
      font-size: 40px;
      color: #545454;
    }
    .p {
      font-size: 14px;
      color: #959595;
      margin-top: 5px;
    }
  }

  .bom {
    position: fixed;
    bottom: 90px;
    left: 0;
    right: 0;
    .submit_btn {
      margin: 0 auto;
      margin-top: 10px;
    }
    .back {
      background: #d1d1d1;
    }
  }

  .fenx {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;

    .img {
      width: 100%;
      height: auto;
      overflow: hidden;
      img {
        width: 25%;
        float: right;
        padding-right: 20px;
      }
    }
    p {
      text-align: center;
      color: #fff;
    }
  }
  .nav_bom_zoom {
    z-index: 999;
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>


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
            <div class="p">评语内容文本评语内容文本评语内容文本</div>

            <div class="bom">
                <div class="p">成功完成测评，积分+1</div>
                <div class="submit_btn">分享给好友</div>
                <div class="submit_btn back" @click="$router.history.go(-2)">返回</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      score: 0
    };
  },
  methods: {
    getScore() {
      this.score = this.$route.query.score;
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
}
</style>


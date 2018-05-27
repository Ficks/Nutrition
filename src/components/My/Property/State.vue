<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
        <scroller lock-x height="-45px" ref="scrollerBottom">
            <div class="scroller_box state_box">
                <div class="state">
                    <i class="iconfont icon-chenggong"></i>
                </div>
                <h1>提交成功</h1>
                <p>{{stateText}}</p>
                <div class="submit_btn"><router-link to="/My/Property">完成</router-link></div>
            </div>
        </scroller>
    </div>
</template>
<script>
export default {
  data() {
    return {
      stateText: ""
    };
  },
  methods: {
    init() {
      if (this.$route.query.state == 0) {
        this.stateText = "审核通过后，款项将返回支付账户";
        console.log(this.stateText);
      } else {
        this.stateText = "";
      }
    }
  },
  mounted() {
    this.init();
    console.log("当前页面API：" + this.$route.path);
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  overflow: auto;

  .state_box {
    text-align: center;
    .state {
      margin-top: 130px/2;
      i {
        font-size: 80px;
        color: #3dca99;
      }
    }
    h1 {
      font-size: 20px;
      font-weight: 500;
      color: #1a1a1a;
      margin: 15px 0 5px;
    }
    p {
      color: #b7b7b7;
      font-size: 15px;
    }
  }
  .submit_btn {
    border: 1px solid #242d4d;
    background: none;
    margin-top: 150/2px;
    border-radius: 20px;
    overflow: hidden;
    a {
      display: block;
      color: #242d4d;
    }
  }
}
</style>
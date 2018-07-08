<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">支付{{success==0?"失败":"成功"}}</div>
      </div>
        <scroller lock-x height="-45px" ref="scrollerBottom">
          <!-- 支付成功 -->
            <div class="scroller_box state_box" v-if="success==1">
                <div class="state">
                    <i class="iconfont icon-chenggong"></i>
                </div>
                <h1>支付成功</h1>
                <div class="submit_btn bg" @click="toChat">去咨询营养师</div>
                <!-- <div class="submit_btn" @click="$router.back(-1)">完成</div> -->
            </div>
            <!-- 支付失败 -->
            <div class="scroller_box state_box" v-else>
                <div class="state">
                    <i class="iconfont icon-shibai sbl"></i>
                </div>
                <h1>支付失败</h1>
                <p>支付失败，请重新支付或返回~</p>
                <div class="submit_btn bg">重新支付</div>
                <div class="submit_btn" @click="$router.back(-1)">返回</div>
            </div>
        </scroller>
    </div>
</template>
<script>
export default {
  data() {
    return {
      success: this.$route.query.success
    };
  },
  methods: {
    toChat() {
      this.$router.push({
        path: "/Consultation/Chat",
        query: {
          name: this.$route.query.name,
          id: this.$route.query.id
        }
      });
    }
  },
  mounted() {
    console.log(this.success);
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

        &.sbl {
          color: #fba858;
        }
      }
    }
    h1 {
      font-size: 20px;
      font-weight: 500;
      color: #1a1a1a;
      margin: 15px 0 5px;
    }
    p {
      color: #666;
      font-size: 15px;
    }
  }
  .submit_btn {
    border: 1px solid #242d4d;
    background: none;
    margin: 0 auto;
    &.bg {
      margin-bottom: 20px;
      margin-top: 190/2px;
      border-color: #8dc13b;
      background: #8dc13b;

      color: #fff;
    }
    border-radius: 20px;
    overflow: hidden;
    display: block;
    color: #242d4d;
  }
}
</style>
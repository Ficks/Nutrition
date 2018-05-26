<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
        <div class="balance">
            <ul>
                <li>
                    <h2>100.00</h2>
                    <p>余额(元)</p>
                </li>
            </ul>
        </div>
        <scroller lock-x height="-237px"  @on-scroll-bottom="getList" ref="scrollerBottom">
            <div class="scroller_box xxxx">
                <ul>
                    <li>
                        <p>2018-04-16 18:22:00</p>
                        <span>提现时间</span>
                    </li>
                    <li>
                        <p>2018-04-16 18:22:00</p>
                        <span>预计到账时间</span>
                    </li>
                </ul>
                <p>特殊原因可能有延期，请谅解</p>
            </div>
        </scroller>

        <div class="submit_btn"><router-link to="/My/Property/State">确认提现</router-link></div>
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
<style lang="less" scoped>
.container {
  height: 100%;
  overflow: auto;

  .balance {
    height: auto;
    overflow: hidden;
    background: #8dc13b;
    padding-bottom: 30px;
    padding-top: 20px;

    li {
      float: left;
      width: 100%;
      text-align: center;
      color: #fff;

      h2 {
        font-weight: 500;
        font-size: 30px;
      }
      p {
        font-size: 15px;
      }
    }
  }

  .xxxx {
    padding: 0 15px;
    li {
      padding: 20px 0;
      text-align: center;
      border-bottom: 1px solid #dbdbdb;

      p {
        font-size: 16px;
        color: #1a1a1a;
        margin-top: 0;
        margin-bottom: 10px;
      }
      span {
        color: #666666;
        font-size: 14px;
      }
    }
    p {
      font-size: 15px;
      color: #666666;
      text-align: center;
      margin-top: 12px;
    }
  }
  .submit_btn {
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
    border-radius: 45px;
    height: 44px;
    line-height: 44px;
    margin: 0 auto;

    a {
      display: block;
      color: #fff;
    }
  }
}
</style>
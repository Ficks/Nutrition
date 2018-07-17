<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
        <div class="balance">
            <ul>
                <li>
                    <h2>{{$route.query.ye || ''}}</h2>
                    <p>余额(元)</p>
                </li>
            </ul>
        </div>
        <scroller lock-x height="-158px" ref="scrollerBottom">
            <div class="scroller_box xxxx">
                <ul>
                    <li>
                        <p>{{startTime}}</p>
                        <span>提现时间</span>
                    </li>
                    <li>
                        <p>每周二为系统结算日 请合理规划提现时间</p>
                        <span>预计到账时间</span>
                    </li>
                </ul>
                <p>特殊原因可能有延期，请谅解</p>
                <div class="submit_btn" @click="submit">确认提现</div>
            </div>
        </scroller>

        
    </div>
</template>
<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: ""
    };
  },
  methods: {
    submit() {
      this.$http({
        url: "/api/Financial/CashRequest",
        type: "post",
        success: data => {
          console.log(data);
        },
        error: error => {}
      });

      //state 0 是退款 1是提现
      this.$router.push({
        path: "/My/Property/State",
        query: {
          state: 1
        }
      });
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    var myDate = new Date();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds(); //获取当前秒数(0-59)
    var jin = this.$getDate(0);
    this.startTime = `${jin} ${h}:${m}:${s}`;
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
    border-radius: 45px;
    height: 44px;
    line-height: 44px;
    margin-top: 50px;

    a {
      display: block;
      color: #fff;
    }
  }
}
</style>
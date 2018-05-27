<template>
    <div class="container">
      <div class="header" v-if="$route.path=='/My/Property'">
        <div class="left" @click="$router.push({path:'/My'})"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
        <div class="balance" v-if="$route.path=='/My/Property'">
            <ul>
                <li>
                    <h2>500.00</h2>
                    <p>账户余额(元)</p>
                </li>
                <li>
                    <h2>1000</h2>
                    <p>积分余额</p>
                </li>
            </ul>
        </div>
        <scroller lock-x height="-237px"  @on-scroll-bottom="getList" ref="scrollerBottom" v-if="$route.path=='/My/Property'">
            <div class="scroller_box">
                <ul class="detailed">
                    <li v-for="(item,index) in listArr">
                        <div class="top">
                            {{item.name}}
                           <span class="right">￥{{item.price}}</span>
                        </div>
                        <div class="bom">
                            {{item.date}}
                            <div class="btns right">
                                <span class="sr" v-if="item.type==1">收入</span>
                                <span class="tk" @click="refund(item)" v-if="item.type==0">退款</span>
                                <span class="zc" v-if="item.type==0">支出</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <load-more tip="loading" v-show="loading"></load-more>
            </div>
        </scroller>

        <div class="submit_btn" v-if="$route.path=='/My/Property'"><router-link to="/My/Property/PutForward">余额提现</router-link></div>
        
        <div class="view" v-if="$route.path!='/My/Property'">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { LoadMore } from "vux";
export default {
  components: {
    LoadMore
  },
  data() {
    return {
      loading: false,
      listArr: [
        {
          name: "咨询服务",
          price: 100,
          date: "2018.04.16 18:00:21",
          type: 1
        },
        {
          name: "咨询支付",
          price: 100,
          date: "2018.04.16 18:00:21",
          type: 0
        },
        {
          name: "咨询支付",
          price: 100,
          date: "2018.04.16 18:00:21",
          type: 0
        },
        {
          name: "咨询支付",
          price: 100,
          date: "2018.04.16 18:00:21",
          type: 0
        },
        {
          name: "咨询支付",
          price: 100,
          date: "2018.04.16 18:00:21",
          type: 0
        }
      ]
    };
  },
  methods: {
    getList() {
      console.log(this.$route.path);
      if (this.loading) {
        // do nothing
      } else {
        this.loading = true;
        setTimeout(() => {
          this.listArr.push(
            {
              name: "咨询服务",
              price: 100,
              date: "2018.04.16 18:00:21",
              type: 1
            },
            {
              name: "咨询支付",
              price: 100,
              date: "2018.04.16 18:00:21",
              type: 0
            },
            {
              name: "咨询支付",
              price: 100,
              date: "2018.04.16 18:00:21",
              type: 0
            },
            {
              name: "咨询支付",
              price: 100,
              date: "2018.04.16 18:00:21",
              type: 0
            },
            {
              name: "咨询支付",
              price: 100,
              date: "2018.04.16 18:00:21",
              type: 0
            }
          );
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          this.loading = false;
        }, 2000);
      }
    },
    refund() {
      // 退款
      this.$router.push({
        path: "/My/Property/Refund"
      });
    }
  },
  mounted() {
    if (this.$route.path == "/My/Property") {
      console.log("当前页面API：" + this.$route.path);
      console.log("当前页面数据列表", this.listArr);
    }
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
      width: 50%;
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

  .detailed {
    padding: 0 15px;
    li {
      border-bottom: 1px solid #dbdbdb;
      padding: 20px 0;

      .top {
        margin-bottom: 15px;
        color: #1a1a1a;
        font-size: 16px;

        span {
          font-size: 16px;
        }
      }
      .bom {
        color: #666;
        font-size: 14px;

        span {
          font-size: 16px;
          color: #242d4d;

          &.tk {
            color: #8dc13b;
            margin-left: 10px;
          }
        }
      }
      .right {
        float: right;
      }
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
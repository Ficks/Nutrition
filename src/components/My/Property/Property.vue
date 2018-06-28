<template>
    <div class="container">
      <div class="header" v-if="$route.path=='/My/Property'">
        <div class="left" @click="$router.push({path:'/My'})"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
        <div class="balance" v-if="$route.path=='/My/Property'">
            <ul>
                <li @click="searchOn(2)" :class="{active:searchVal.currencyId==2}">
                    <h2>{{yeData.xj}}</h2>
                    <p>账户余额(元)</p>
                </li>
                <li @click="searchOn(1)"  :class="{active:searchVal.currencyId==1}">
                    <h2>{{yeData.jf}}</h2>
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
                            {{item.date | dateTimeGsh}}
                            <div class="btns right">
                                <span class="sr" v-if="item.price>0">收入</span>
                                <span class="tk" @click="refund(item)" v-if="item.price<0 && searchVal.currencyId==2">退款</span>
                                <span class="zc" v-if="item.price<0">支出</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <p class="lgss">{{searchVal.uptext}}</p>
                <load-more tip="loading" v-show="loading"></load-more>
            </div>
        </scroller>

        <div class="submit_btn" @click="priceTx" v-if="$route.path=='/My/Property'">余额提现</div>
        
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
      searchVal: {
        pageNum: 0,
        pageSize: 10,
        currencyId: 2,
        uptext: "获取更多数据"
      },
      yeData: {
        xj: 0,
        jf: 0
      },
      loading: false,
      listArr: []
    };
  },
  methods: {
    searchOn(type) {
      this.searchVal.currencyId = type;
      this.searchVal.pageNum = 0;
      this.listArr = [];
      this.getList(1);
    },
    setData(data) {
      console.log("data");
      console.log(data);
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.listArr.push(data[i]);
        }
      } else {
        this.searchVal.pageNum--;
        this.searchVal.uptext = "没有更多数据了";
      }
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      this.loading = false;
    },
    getList(time) {
      if (this.loading) {
        // do nothing
      } else {
        this.loading = true;
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/Financial/GetIncomeAndExpendDetail",
            type: "get",
            data: this.searchVal,
            success: data => {
              this.setData(data.Data.Data);
            },
            error: error => {}
          });
        }, time || 800);
      }
    },
    refund() {
      // 退款
      this.$router.push({
        path: "/My/Property/Refund"
      });
    },
    getYe() {
      this.$http({
        url: "/api/Financial/GetWalletDetail",
        type: "get",
        data: {
          currencyId: ""
        },
        success: data => {
          for (let i = 0; i < data.Data.length; i++) {
            if (data.Data[i].currencyid == 2) {
              this.yeData.xj = data.Data[i].balance;
            } else if (data.Data[i].currencyid == 1) {
              this.yeData.jf = data.Data[i].balance;
            }
          }
        },
        error: error => {}
      });
    },
    priceTx() {
      if (this.yeData.xj == 0) {
        this.$vux.toast.show({
          type: "warn",
          text: "没有余额可以提现哦",
          width: "12em"
        });
        return;
      }
      this.$route.push({
        path: "/My/Property/PutForward"
      });
    }
  },
  mounted() {
    this.getYe();
    this.getList(1);
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

    li.active {
      color: #666;
    }
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
.lgss {
  font-size: 14px;
  color: #ccc;
  padding: 20px 0;
  text-align: center;
}
</style>
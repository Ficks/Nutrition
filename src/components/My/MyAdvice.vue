<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right" @click="searchOn">搜索</div>
      </div>
        <div class="search">
            <div class="input">
              <input type="text" v-model="searchVal.value" placeholder="搜索营养师姓名">
              <i class="iconfont icon-sousuo" @click="getList"></i>
            </div>
        </div>
        <div class="box_wr">
            <scroller lock-x height="-95px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
            <div class="box search_list">
                <div class="list_me" v-for="(item,index) in listArr" @click.stop="toPathDetails(item)">
                    <div class="tx"><img :src="item.HeadUrl" alt=""></div>
                    <div class="box_wz">
                        <div class="list_ts">
                            <h3>{{item.Name}}
                                <span :class="{jiesu:item.IsEnd==0}">{{item.IsEnd==0?"已结束":"咨询中"}}</span>
                            </h3>
                        </div>
                        <div class="list_ts">
                            <p>{{item.Company}}
                              <span @click="refund(true)" v-if="item.Status==0">重新下单</span>
                              <span @click.stop="refund(item)" v-if="item.Status===1">退款</span>
                              <span @click="refund(true)" v-if="item.Status===3">重新下单</span>
                              <span @click.stop="refund(true)" v-if="item.Status===4">已退款</span>
                            </p>
                        </div>
                        <div class="list_ts">
                            <p>擅长：{{item.GoodAt}}</p>
                        </div>
                    </div>
                </div>
                <p class="more_s"  v-show="!searchVal.onFetching">{{searchVal.uptext}}</p>
                <load-more tip="loading" v-show="searchVal.onFetching"></load-more>
            </div>
            </scroller>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem, LoadMore, Panel } from "vux";
export default {
  components: {
    Tabbar,
    TabbarItem,
    LoadMore,
    Panel
  },
  data() {
    return {
      navBottom: -300,
      searchVal: {
        value: "",
        onFetching: false,
        uptext: "滑动查看更多",
        pageNum: 0,
        pageSize: 10
      },
      listArr: []
    };
  },
  methods: {
    refund(item) {
      // 退款
      console.log(item);
      if (item === true) return;
      if (item.Status !== 1) {
        // 0 等待支付 1支付成功 2支付失败 3退款中 4已退款
        return;
      }

      this.$router.push({
        path: "/My/Property/Refund",
        query: {
          id: item.OrderId
        }
      });
    },
    openAlt(isTrue) {
      if (isTrue) {
        this.navBottom = 0;
      } else {
        this.navBottom = -300;
      }
    },
    searchOn() {
      this.searchVal.pageNum = 0;
      this.listArr = [];
      this.getList(1);
    },
    getList(time) {
      if (this.searchVal.onFetching) {
        // do nothing
      } else {
        this.searchVal.onFetching = true;
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/Consultation/UserConsultationList",
            type: "get",
            data: this.searchVal,
            success: data => {
              console.log(data);
              this.setData(data.Data.Data);
            },
            error: error => {}
          });
        }, time || 800);
      }
    },
    setData(data) {
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
      this.searchVal.onFetching = false;
    },
    toPathDetails(item) {
      if (item.IsEnd == 1) {
        //   营养师详情
        this.$router.push({
          path: "/Consultation/ConsultationDetails",
          query: {
            id: item.DietitianId
          }
        });
      } else if (item.IsEnd == 0) {
        //   聊天
        this.$router.push({
          path: "/Consultation/Chat",
          query: {
            name: item.name
          }
        });

        this.$router.push({
          path: "/Consultation/Chat",
          query: {
            name: item.name,
            DietitianId: item.DietitianId
          }
        });
      }
    }
  },
  mounted() {
    this.getList(1);
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  background: #f3f3f3;

  .header {
    text-align: center;
    font-size: 17px;

    span {
      margin: 0 25px;
      position: relative;
      display: inline-block;
      overflow: hidden;

      &.active::after {
        content: "";
        display: block;

        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
        height: 5px;
        width: 100%;
        border-radius: 2.5px;
      }

      a {
        display: block;
      }
    }
  }

  .search {
    width: 100%;
    height: 50px;
    background: #f9f9f9;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: hidden;

    .input {
      position: relative;
      margin-top: 10px;
      background: #e7e7e7;
      border-radius: 5px;
      input {
        color: #a1a1a1;
        padding-left: 25px;
      }
      i {
        position: absolute;
        left: 5px;
        top: 6px;
        color: #a1a1a1;
      }
    }
  }

  .box_wr {
    // padding-bottom: 80px;

    .more_s {
      text-align: center;
      padding-top: 10px;
      font-size: 14px;
      color: #666;
    }
  }

  .search_list {
    padding: 0 15px;
    height: 100%;
  }

  .list_me {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 20px 0;
    border-bottom: 1px solid #dfdfdf;
    position: relative;

    .tx {
      position: absolute;
      left: 0;
      top: 25px;
      width: 66px;
      height: 66px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .list_ts {
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    .box_wz {
      padding-left: 76px;
      box-sizing: border-box;
      width: 100%;

      h3 {
        font-size: 18px;
        color: #666666;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span {
          float: right;
          display: block;
          width: 150/2px;
          height: 44/2px;
          line-height: 44/2px;
          border-radius: 5px;
          color: #fff;
          background: #8dc13b;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          margin-right: 8px;

          &.jiesu {
            background: #949494;
          }
        }
      }
      p {
        font-size: 15px;
        color: #a3a3a3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 2px 0;

        span {
          background: #f00;
          float: right;
          display: block;
          width: 150/2px;
          height: 44/2px;
          line-height: 44/2px;
          border-radius: 5px;
          color: #fff;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          margin-right: 8px;

          &.jiesu {
            background: #949494;
          }
        }
      }
      .left {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #a3a3a3;
        width: 60%;
        span {
          font-size: 18px;
          color: #ef7d1d;
        }
      }
      .right {
        float: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color: #666666;
        position: relative;
        top: 5px;
      }
    }
  }
}
</style>
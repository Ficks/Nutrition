<template>
    <div class="container">
        <!-- 底部导航 -->
    <Menu :index="3"></Menu>
        
        <div class="header">
            <div class="title">
                营养师列表
            </div>
            <div class="right" @click="getList">搜索</div>
        </div>
        <div class="search">
            <div class="input">
              <input type="text" v-model="searchVal.value" placeholder="输入姓名来搜索营养师">
              <i class="iconfont icon-sousuo" @click="getList"></i>
            </div>
        </div>
        <div class="search_type">
            <ul>
                <li @click="searchVal.region=!searchVal.region" :class="{rotate:searchVal.region}">地域 <i class="iconfont icon-xiala" style="transiform"></i></li>
                <li @click="searchVal.praise=!searchVal.praise" :class="{rotate:searchVal.praise}">好评度 <i class="iconfont icon-xiala"></i></li>
                <li @click="searchVal.familiarity=!searchVal.familiarity" :class="{rotate:searchVal.familiarity}">熟悉度 <i class="iconfont icon-xiala"></i></li>
            </ul>
        </div>
        <div class="box_wr">
            <scroller lock-x height="-185px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
            <div class="box search_list">
                <div class="list_me" v-for="(item,index) in listArr" @click="toPathDetails">
                    <div class="tx"><img :src="item.src" alt=""></div>
                    <div class="box_wz">
                        <div class="list_ts">
                            <h3>{{item.name}} <span>{{item.praise}}%五星好评</span></h3>
                        </div>
                        <div class="list_ts">
                            <p>{{item.company}}</p>
                        </div>
                        <div class="list_ts">
                            <p>擅长：{{item.technology}}</p>
                        </div>
                        <div class="list_ts bom">
                            <div class="left">
                                <span>￥{{item.money}}/次 </span>
                                {{item.number}}人咨询过
                            </div>
                            <div class="right">
                                {{item.time}}
                            </div>
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
import { LoadMore, Panel } from "vux";
import Menu from "../Common/Menu.vue";
export default {
  components: {
    LoadMore,
    Panel,
    Menu
  },
  data() {
    return {
      searchVal: {
        value: "",
        pageNum: 0,
        pageSize: 10,
        region: false, //地域
        praise: 0, //好评度
        familiarity: 0, //熟悉度
        onFetching: false,
        uptext: "滑动查看更多"
      },
      listArr: [
        {
          name: "用户名",
          src: "/static/images/ystx.jpg",
          praise: "98",
          company: "中南大学医学院",
          technology: "病后营养调理、健身营养调理",
          money: 50,
          number: 1000,
          time: "9:00 ~ 11:00"
        },
        {
          name: "用户名",
          src: "/static/images/ystx.jpg",
          praise: "98",
          company: "中南大学医学院",
          technology: "病后营养调理、健身营养调理",
          money: 50,
          number: 1000,
          time: "9:00 ~ 11:00"
        },
        {
          name: "用户名",
          src: "/static/images/ystx.jpg",
          praise: "98",
          company: "中南大学医学院",
          technology: "病后营养调理、健身营养调理",
          money: 50,
          number: 1000,
          time: "9:00 ~ 11:00"
        },
        {
          name: "用户名",
          src: "/static/images/ystx.jpg",
          praise: "98",
          company: "中南大学医学院",
          technology: "病后营养调理、健身营养调理",
          money: 50,
          number: 1000,
          time: "9:00 ~ 11:00"
        },
        {
          name: "用户名",
          src: "/static/images/ystx.jpg",
          praise: "98",
          company: "中南大学医学院",
          technology: "病后营养调理、健身营养调理",
          money: 50,
          number: 1000,
          time: "9:00 ~ 11:00"
        },
        {
          name: "用户名",
          src: "/static/images/ystx.jpg",
          praise: "98",
          company: "中南大学医学院",
          technology: "病后营养调理、健身营养调理",
          money: 50,
          number: 1000,
          time: "9:00 ~ 11:00"
        }
      ]
    };
  },
  methods: {
    setData(data) {
      if (data.length > 0) {
        console.log(data);
      } else {
        this.searchVal.pageNum--;
      }
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      this.searchVal.onFetching = false;
    },
    getList(time) {
      if (this.searchVal.onFetching) {
        // do nothing
      } else {
        this.searchVal.onFetching = true;
        setTimeout(() => {
          var _this = this;
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/Consultation/DietitianList",
            type: "get",
            data: this.searchVal,
            success: function(data) {
              _this.setData(data.Data.Data);
            },
            error: function() {
              //错误处理
            }
          });
        }, time || 800);
      }
    },
    toPathDetails(url) {
      this.$router.push({
        path: "/Consultation/ConsultationDetails"
      });
    }
  },
  mounted() {
    this.getList(1);
    console.log("当前页面API：" + this.$route.path);
    console.log("当前页面数据列表", this.listArr);
    console.log("当前页面筛选数据", this.searchVal);
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
    background: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: hidden;

    .input {
      position: relative;
      margin-top: 10px;
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

  .search_type {
    height: auto;
    overflow: hidden;
    background: #fff;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    li {
      float: left;
      width: 33.333%;
      text-align: center;
      height: 33px;
      line-height: 33px;
      text-align: center;
      font-size: 12px;
      color: #666;
      i {
        font-size: 12px;
        color: #727272;
        display: inline-block;
        transition: all 0.5s;
      }
      &.rotate {
        color: #8dc13b;
        i {
          transform: rotate(180deg);
          color: #8dc13b;
        }
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
          font-size: 13px;
        }
      }
      p {
        font-size: 15px;
        color: #a3a3a3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 2px 0;
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
      .bom {
        margin-top: 10px;
      }
    }
  }
}
</style>
<template>
    <div class="container">
        <!-- 底部导航 -->
        <tabbar class="nav_bom">
            <tabbar-item link="/">
            <div class="list" slot="label">
                <i class="iconfont icon-shouye"></i>
                <span>首页</span>
                </div>
            </tabbar-item>
            <tabbar-item link="/Find">
            <div class="list" slot="label">
                <i class="iconfont icon-faxian"></i>
                <span>发现</span>
                </div>
            </tabbar-item>
            <tabbar-item>
            <div class="list add" slot="label" @click="openAlt(true)">
                <i class="iconfont icon-tianjia"></i>
                </div>
            </tabbar-item>
            <tabbar-item link="/Consultation" selected>
            <div class="list" slot="label">
                <i class="iconfont icon-tuwenzixun"></i>
                <span>咨询</span>
                </div>
            </tabbar-item>
            <tabbar-item link="/My">
            <div class="list" slot="label">
                <i class="iconfont icon-wode-F"></i>
                <span>我的</span>
                </div>
            </tabbar-item>
        </tabbar>
        <div class="nav_bom_alt" :style="{bottom:navBottom+'px'}">
            <ul>
            <li>
                <router-link to="/">
                <i class="iconfont icon-zaocan1"></i>
                <span>早餐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                <i class="iconfont icon-wucan"></i>
                <span>中餐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                <i class="iconfont icon-wancan"></i>
                <span>晚餐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                <i class="iconfont icon-lingshi"></i>
                <span>加餐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                <i class="iconfont icon-buhang"></i>
                <span>步行</span>
                </router-link>
            </li>
            </ul>
            <div class="close" @click="openAlt(false)">
                <i class="iconfont icon-tianjia"></i>
            </div>
        </div>
        <div class="nav_bom_zoom" @click="navBottom=-300" v-show="navBottom===0"></div>

        <div class="header">
            <div class="title">
                营养师列表
            </div>
            <div class="right" @click="getList">搜索</div>
        </div>
        <div class="search">
            <div class="input">
              <input type="text" v-model="searchVal.value" placeholder="输入文字搜索食谱">
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
            <scroller lock-x height="-205px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
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
        region: false, //地域
        praise: false, //好评度
        familiarity: false, //熟悉度
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
    openAlt(isTrue) {
      if (isTrue) {
        this.navBottom = 0;
      } else {
        this.navBottom = -300;
      }
    },
    getList() {
      if (this.searchVal.onFetching) {
        // do nothing
      } else {
        this.searchVal.onFetching = true;
        setTimeout(() => {
          this.listArr.push(
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
          );
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          this.searchVal.onFetching = false;
        }, 2000);
      }
    },
    toPathDetails(url) {
      this.$router.push({
        path: "/Consultation/ConsultationDetails"
      });
    }
  },
  mounted() {
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
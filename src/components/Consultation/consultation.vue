<template>
    <div class="container">
        <!-- 底部导航 -->
    <Menu :index="3"></Menu>
        
        <div class="header">
            <div class="title">
                咨询师列表
            </div>
            <div class="right" @click="searchOn">搜索</div>
        </div>
        <div class="search">
            <div class="input">
              <input type="text" v-model="searchVal.DietitianName" placeholder="输入姓名来搜索咨询师">
              <i class="iconfont icon-sousuo" @click="getList"></i>
            </div>
        </div>
        <div class="search_type">
            <ul>
                <!-- <li @click="searchOn(1)" :class="{rotate:searchVal.region==2}">地域 <i class="iconfont icon-xiala" style="transiform"></i></li> -->
                <li @click="searchOn(2)" :class="{rotate:searchVal.praise==1}">好评度 <i class="iconfont icon-xiala"></i></li>
                <li @click="searchOn(3)" :class="{rotate:searchVal.familiarity==1}">熟悉度 <i class="iconfont icon-xiala"></i></li>
            </ul>
        </div>
        <div class="box_wr">
            <scroller lock-x height="-185px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
            <div class="box search_list">
                <div class="list_me" v-for="(item,index) in listArr" @click="toPathDetails(item)">
                    <div class="tx"><img :src="item.HeadUrl" alt=""></div>
                    <div class="box_wz">
                        <div class="list_ts">
                            <h3>{{item.Name}} <span>{{item.Praise}}%五星好评</span></h3>
                        </div>
                        <div class="list_ts">
                            <p>{{item.Company}}</p>
                        </div>
                        <div class="list_ts">
                            <p>擅长：{{item.GoodAt}}</p>
                        </div>
                        <div class="list_ts bom">
                            <div class="left">
                                <span>￥{{item.Price}}/次 </span>
                                {{item.ServiceTimes}}人咨询过
                            </div>
                            <div class="right">
                                {{item.BeginWorkHour+':'+item.BeginWorkMinue}}
                                ~
                                {{item.EndWorkHour+':'+item.EndWordMinue}}
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
        DietitianName: "",
        pageNum: 0,
        pageSize: 10,
        region: 2, //地域
        praise: 2, //好评度
        familiarity: 2, //熟悉度
        onFetching: false,
        uptext: "滑动查看更多"
      },
      listArr: []
    };
  },
  methods: {
    searchOn(num) {
      if (num == 1) {
        this.searchVal.region = this.searchVal.region == 1 ? 2 : 1;
      } else if (num == 2) {
        this.searchVal.praise = this.searchVal.praise == 1 ? 2 : 1;
      } else if (num == 3) {
        this.searchVal.familiarity = this.searchVal.familiarity == 1 ? 2 : 1;
      }
      this.searchVal.pageNum = 0;
      this.listArr = [];
      this.getList(1);
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
    getList(time) {
      if (this.searchVal.onFetching) {
        // do nothing
      } else {
        this.searchVal.onFetching = true;
        console.log(this.searchVal);
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/Consultation/DietitianList",
            type: "get",
            data: this.searchVal,
            success: data => {
              this.setData(data.Data.Data);
            },
            error: function() {
              //错误处理
            }
          });
        }, time || 800);
      }
    },
    toPathDetails(item) {
      this.$router.push({
        path: "/Consultation/ConsultationDetails",
        query: {
          id: item.DietitianId
        }
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
      width: 50%;
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
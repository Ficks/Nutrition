<template>
  <div class="container">
    <Menu :index="0"></Menu>
    <!-- 顶部 -->
    <div class="top top_on">
      <div class="search">
        <span>{{city || '定位中'}}</span>
        <div class="input">
          <div class="inpus">
            <router-link to="/Tool/Recipes">搜索食材或菜谱</router-link>
          </div>
          <i class="iconfont icon-sousuo"></i>
        </div>
        <router-link to="/My/PersonalFiles">
          <i class="iconfont icon-dangan2"></i>
        </router-link>
      </div>
    </div>
    <scroller lock-x height="-105px" ref="scrollerBottom">
      <div class="scroller_box">
        <div class="top top_er">
          <div class="cont">
            <div class="left">
              <div class="qd" @click="signInFn">
                <i class="iconfont icon-qiandao"></i>
                <span>{{qiandao}}</span>
              </div>
            </div>
            <div class="center">
              <div class="box">
                <span>今日膳食得分</span>
                <h2>{{score}}</h2>
                <router-link to="/My/PersonalData">完善个人档案></router-link>
              </div>
            </div>
            <div class="right">
              <div class="share" @click="share">
                <i class="iconfont icon-fenxiang"></i>
                <span>分享</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 九宫格 -->
        <div class="grid_m">
          <grid :cols="3" :show-lr-borders="false">
            <grid-item link="/Tool">
              <i class="iconfont icon-gongjuxiang"></i>
              <span>基本工具</span>
            </grid-item>
            <grid-item link="/Allocation">
              <i class="iconfont icon-shanshitiaopei"></i>
              <span>膳食调配</span>
            </grid-item>
            <grid-item link="/Assessment">
              <i class="iconfont icon-pinggubaogaodayin"></i>
              <span>膳食评估</span>
            </grid-item>
            <grid-item link="/self">
              <i class="iconfont icon-shuxie"></i>
              <span>自我评估</span>
            </grid-item>
            <grid-item link="/Find">
              <i class="iconfont icon-shequdongtai"></i>
              <span>社区交流</span>
            </grid-item>
            <grid-item link="/Consultation">
              <i class="iconfont icon-kefuzixunhui"></i>
              <span>人工咨询</span>
            </grid-item>
            <grid-item link="/My/PersonalFiles" class="bor_none">
              <i class="iconfont icon-dangan"></i>
              <span>个人档案</span>
            </grid-item>
            <grid-item link="/My/WalkIntoUs" class="bor_none">
              <i class="iconfont icon-guanyuwomen"></i>
              <span>使用说明</span>
            </grid-item>
            <grid-item link="/My/Partner" class="bor_none">
              <i class="iconfont icon-hezuo"></i>
              <span>合伙合作</span>
            </grid-item>
          </grid>
        </div>
        <!-- 膳食推荐 -->
        <div class="recommend" v-if="!isTNB">
          <div class="box">
            <h2>
              膳食推荐
              <span @click="getDietRecommend">换一批</span>
            </h2>
            <tab
              custom-bar-width="27px"
              v-model="reIndex"
              prevent-default
              @on-before-index-change="recommend"
            >
              <tab-item selected>早餐</tab-item>
              <tab-item>中餐</tab-item>
              <tab-item>晚餐</tab-item>
            </tab>
            <!-- <div class="recommend_box" @click="mastri">
            <div class="li_t" v-for="(item,index) in recommendData" :key="index">
              <div class="tab-swiper vux-center" v-show="index===reIndex">
                  <ul>
                    <li v-for="jtem in item[0]">
                      <h3>{{jtem.name}}</h3>
                      <span>{{jtem.kcal}}</span>
                    </li>
                    <li class="default" v-if="item[1].length>0">
                      <h3>加餐</h3>
                    </li>
                    <li v-for="jtem in item[1]">
                      <h3>{{jtem.name}}</h3>
                      <span>{{jtem.kcal}}</span>
                    </li>
                  </ul>
                </div>
            </div>
            </div>-->

            <div class="recommend_box" @click="mastri">
              <div class="li_t" v-for="(item,index) in recommendData" :key="index">
                <div class="tab-swiper vux-center" v-show="index===reIndex">
                  <ul>
                    <li v-for="jtem in item.dishes">
                      <h3>{{jtem.name}}</h3>
                      <span>{{jtem.kcal}}kcal/{{jtem.unit}}g*{{jtem.number}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 糖尿病膳食推荐 -->
        <div class="recommend" v-else>
          <div class="box">
            <h2>膳食推荐</h2>
            <div class="recommend_box">
              <ul>
                <li v-for="item in recommendData[0].dishes">
                  <h3>{{item.name}}</h3>
                  <span>{{item.kcal}}kcal/{{item.unit}}g*{{item.number}}</span>
                </li>
              </ul>
              <div class="more">
                <router-link :to="{path:'/Index/Recommend',query:{id:KeyId}}">查看更多></router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- 营养咨询 -->
        <div class="yinyanzx">
          <h2>
            咨询师
            <span>
              <router-link to="/Consultation">更多></router-link>
            </span>
          </h2>
          <ul>
            <li v-for="(item,index) in nutCon" @click="toDetails(item)">
              <div class="img">
                <img :src="item.HeadUrl" alt="">
              </div>
              <h3>{{item.Name}}</h3>
              <h4>{{item.Company}}</h4>
            </li>
          </ul>
        </div>
      </div>
    </scroller>
    <div class="fenx" @click="isFx=false" v-show="isFx">
      <div class="img">
        <img src="/static/images/fx.png" alt="">
      </div>
      <p>请点击右上角
        <br>将它发送给指定朋友
        <br>或分享到朋友圈
      </p>
    </div>
    <div class="nav_bom_zoom" @click="isFx=false" v-show="isFx"></div>
  </div>
</template>
<script>
import { Grid, GridItem, Tab, TabItem, Swiper, SwiperItem } from "vux";
import Menu from "../Common/Menu.vue";
export default {
  components: {
    Grid,
    GridItem,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Menu
  },
  data() {
    return {
      city: "",
      score: 0,
      qiandao: "签到",
      isFx: false,
      searchVal: "",
      reIndex: 0,
      isTNB: false,
      KeyId: "",
      // 早中晚餐推荐
      recommendData: [],
      // 营养咨询
      nutCon: []
    };
  },
  methods: {
    mastri() {
      this.$router.push({
        path: "/Index/RecommendZzw",
        query: {
          id: this.KeyId
        }
      });
    },
    // 膳食推荐table
    recommend(index) {
      this.reIndex = index;
    },
    getSignInFn() {
      this.$http({
        url: "/api/HealthyArchive/GetPersonalHealthyScore",
        type: "get",
        success: data => {
          console.log(data);
          if (data.Data.issign) {
            this.qiandao = "已签到";
          }
          this.score = data.Data.score;
          this.isTNB = data.Data.isdiabetes; //糖尿病
        },
        error: error => {}
      });
    },
    // 签到
    signInFn() {
      // 显示文字
      if (this.qiandao == "签到") {
        this.$http({
          url: "/api/User/Sign",
          type: "get",
          success: data => {
            console.log(data);
            this.$vux.toast.text(
              "今日签到成功，奖励积分（+" + data.Data + "）"
            );
            this.qiandao = "已签到";
          },
          error: error => {}
        });
      }
      // this.$vux.toast.text("今天已经签过啦，改天再来吧~");
    },
    // 分享
    share() {
      this.isFx = true;
    },
    getDietRecommend() {
      // 膳食推荐，早中晚餐
      console.log("膳食推荐，早中晚餐推荐数据格式：", this.recommendData);
      this.$http({
        url: "/api/HealthyDiet/GetRecommendMenu",
        type: "get",
        success: data => {
          if (!data.Data) {
            return;
          }
          this.recommendData = data.Data.Value;
          console.log("查看如果是糖尿病用户的数据");
          this.KeyId = data.Data.Key;
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
        },
        error: error => {}
      });
    },
    getNutritionConsultation() {
      // 推荐营养咨询
      this.$http({
        url: "/api/Consultation/DietitianList",
        type: "get",
        data: {
          pageNum: 1,
          pageSize: 3,
          DietitianName: "",
          praise: 1,
          familiarity: 1
        },
        success: data => {
          console.log("data");
          console.log(data);
          this.nutCon = data.Data.Data;
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
        },
        error: function() {
          //错误处理
        }
      });
    },
    toDetails(item) {
      // 跳转到咨询师详情
      this.$router.push({
        path: "/Consultation/ConsultationDetails",
        query: {
          id: item.DietitianId
        }
      });
    }
  },
  mounted() {
    var _this = this;
    this.getSignInFn(); //获取用户是否签到和健康得分
    this.getDietRecommend();
    this.getNutritionConsultation();

    getLocation();
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        // _this.$vux.toast.text("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      var latlon = position.coords.latitude + "," + position.coords.longitude;
      _this.$http({
        url: "/api/User/GeoDecoding",
        type: "get",
        data: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        success: data => {
          _this.city = data.Data.result.address_component.city;
        },
        error: error => {}
      });
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          // _this.$vux.toast.text("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          // _this.$vux.toast.text("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          // _this.$vux.toast.text("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          // _this.$vux.toast.text("An unknown error occurred.");
          break;
      }
    }
  }
};
</script>
<style scoped lang="less">
.top.top_on {
  height: 50px;
  padding: 0 !important;
}
.top.top_er {
  box-sizing: border-box;
  height: 180px;
}
.fenx {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1000;

  .img {
    width: 100%;
    height: auto;
    overflow: hidden;
    img {
      width: 25%;
      float: right;
      padding-right: 20px;
    }
  }
  p {
    text-align: center;
    color: #fff;
  }
}
.nav_bom_zoom {
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
}
.scroller_box {
  height: 100%;
  padding-bottom: 80px !important;
  box-sizing: border-box;
}
.container {
  box-sizing: border-box;
  height: 100%;
  overflow: auto;

  .grid_m {
    padding: 15px;

    a {
      padding: 10px;

      i {
        display: block;
        height: 33px;
      }

      &:nth-child(4) {
        i {
          font-size: 27px;
        }
      }
    }
  }
}
.top {
  height: 217px;
  background: #8dc13b;
  color: #fff;

  .search {
    padding: 10px 0;
    height: 30px;
    line-height: 30px;
    span {
      display: block;
      float: left;
      font-size: 14px;
      width: 18%;
      text-align: center;
      line-height: 30px;
      padding-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    input {
      width: 100%;
      height: 30px;
      padding: 6px 12px;
      box-sizing: border-box;
      border-radius: 7px;
      border: 0;
      padding-left: 30px;
    }
    a {
      color: #fff;
    }
    i {
      width: 12%;
      line-height: 30px;
      display: block;
      padding-top: 2px;
      font-size: 25px;
      float: right;
      text-align: center;
    }
    .input {
      position: relative;
      width: 70%;
      float: left;

      .inpus {
        width: 100%;
        padding-left: 30px;
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
        background: #fff;
        border-radius: 5px;
        font-size: 14px;
        a {
          display: block;
          color: #bfbfbf;
        }
      }
      i {
        position: absolute;
        left: 0;
        top: -2px;
        color: #bfbfbf;
        padding-top: 2px;
        font-size: 20px;
      }
    }
  }

  .cont {
    .center {
      float: left;
      width: 40%;
      padding-top: 10px;

      .box {
        margin: 0 auto;
        width: 145px;
        height: 145px;
        border-radius: 50%;
        text-align: center;
        background: radial-gradient(
          circle,
          #8dc13b,
          #8dc13b,
          rgba(255, 255, 255, 1) 100%
        );

        span {
          font-size: 14px;
          padding-top: 20px;
          position: relative;
          top: 6px;
          display: block;
        }
        h2 {
          font-size: 50px;
          font-weight: 500;
        }
        a {
          font-size: 12px;
          position: relative;
          color: #fff;
          top: -7px;
        }
      }
    }

    .left,
    .right {
      text-align: center;
      padding-top: 40px;
      float: left;
      width: 30%;
      i {
        display: block;
        font-size: 35px;
      }
    }
  }
}

.grid_m {
  position: relative;
  padding: 35px;
  box-sizing: border-box;

  .weui-grids {
    &::before {
      display: none;
    }
    .weui-grid {
    }
    .bor_none {
      &::after {
        display: none;
      }
    }
  }

  a {
    text-align: center;
    color: #666666;
    font-size: 14px;
    i {
      display: block;
      color: #8dc13b;
      font-size: 30px;
    }
  }
}

.recommend {
  padding: 5px;
  background: #f4f4f4;
  overflow: hidden;

  .box {
    background: #fff;
    border-radius: 5px;
    height: 100%;
    padding: 0 17px;
    padding-bottom: 10px;
    box-sizing: border-box;
    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #3e3e3e;
      padding: 10px 0;

      span {
        float: right;
        font-size: 14px;
        color: #858585;
      }
    }

    .vux-tab .vux-tab-item,
    .vux-tab .vux-tab-item.vux-tab-selected {
      color: #666666;
    }
  }

  .more {
    text-align: center;
    font-size: 14px;

    a {
      color: #666666;
      padding: 5px 10px;
    }
  }
}

.recommend_box {
  ul {
    padding-top: 10px;
    height: auto;
    overflow: hidden;
    li {
      position: relative;
      height: auto;
      overflow: hidden;
      line-height: 30px;
      h3 {
        padding-left: 15px;
        float: left;
        padding-right: 10px;
        background: #fff;
        font-size: 14px;
        color: #666666;
        font-weight: 500;
      }
      span {
        color: #666666;
        float: right;
        font-size: 14px;
      }

      &:after {
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 12px;
        background: #242d4d;
        line-height: 35px;
      }

      &.default {
        background: url("/static/images/y.jpg") no-repeat center;
        &::after {
          display: none;
        }
      }
    }
  }
}
.yinyanzx {
  padding: 0 20px;
  h2 {
    font-size: 16px;
    font-weight: 600;
    color: #3e3e3e;
    padding: 10px 0;

    span {
      float: right;
      a {
        font-size: 14px;
        color: #858585;
      }
    }
  }
  ul {
    height: auto;
    overflow: hidden;

    li {
      float: left;
      width: 33.33%;
      padding: 0 15px;
      box-sizing: border-box;
      a {
        display: block;
      }
      .img {
        font-size: 0;
        box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.2);
      }
      h3 {
        font-weight: 500;
        font-size: 14px;
        color: #4e4e4e;
        margin-top: 8px;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h4 {
        font-size: 12px;
        font-weight: 500;
        color: #aaaaaa;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
<style lang="less">
.box {
  .vux-tab-bar-inner {
    background: #f59f32 !important;
  }
}
</style>



<template>
  <div>
    <!-- 底部导航 -->
      <tabbar class="nav_bom">
          <tabbar-item link="/" selected>
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
          <tabbar-item link="/Consultation">
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
    <!-- 顶部 -->
      <div class="top">
          <div class="search">
            <span>长沙市</span>
            <div class="input">
              <input type="text" v-model="searchVal" placeholder="搜索食材或菜谱">
              <i class="iconfont icon-sousuo" @click="search"></i>
            </div>
            <router-link to="/PersonalFiles"><i class="iconfont icon-dangan1"></i></router-link>
          </div>
          <div class="cont">
            <div class="left">
              <div class="qd" @click="signInFn">
                <i class="iconfont icon-qiandao"></i>
                <span>{{qiandao}}</span>
              </div>
            </div>
            <div class="center">
              <div class="box">
                <span>健康得分</span>
                <h2>100</h2>
                <router-link to="/PersonalFiles">完善个人档案></router-link>
              </div>
            </div>
            <div class="right">
              <div class="share"  @click="share">
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
                <i class="iconfont icon-ziwopinggu"></i>
                <span>自我评估</span>
            </grid-item>
            <grid-item link="/Find">
                <i class="iconfont icon-shequdongtai"></i>
                <span>社区交流</span>
            </grid-item>
            <grid-item link="/">
                <i class="iconfont icon-kefuzixunhui"></i>
                <span>人工咨询</span>
            </grid-item>
            <grid-item link="/" class="bor_none">
                <i class="iconfont icon-dangan"></i>
                <span>个人档案</span>
            </grid-item>
            <grid-item link="/" class="bor_none">
                <i class="iconfont icon-guanyuwomen"></i>
                <span>走进我们</span>
            </grid-item>
            <grid-item link="/" class="bor_none">
                <i class="iconfont icon-hezuo"></i>
                <span>合伙合作</span>
            </grid-item>
          </grid>
      </div>
      <!-- 膳食推荐 -->
      <div class="recommend">
        <div class="box">
          <h2>膳食推荐<span @click="isDisease()">换一批</span></h2>

          <tab custom-bar-width="27px" v-model="reIndex"  prevent-default @on-before-index-change="recommend">
            <tab-item selected>
              早餐
            </tab-item>
            <tab-item>
              中餐
            </tab-item>
            <tab-item>
              晚餐
            </tab-item>
          </tab>
          <div class="recommend_box">
            <swiper v-model="reIndex" :show-dots="false">
              <swiper-item v-for="(item,index) in recommendData" :key="index">
                <div class="tab-swiper vux-center">
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
              </swiper-item>
            </swiper>
          </div>
        </div>
      </div>

      <!-- 糖尿病膳食推荐 -->
      <div class="recommend none">
        <div class="box">
          <h2>膳食推荐</h2>
          <div class="recommend_box">
            <ul v-for="(item,index) in recommendData">
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
            <div class="more">
              <router-link to="/">查看更多></router-link>
            </div>
          </div>
        </div>
      </div>
    <!-- 营养咨询 -->
      <div class="yinyanzx">
        <h2>营养咨询<span>更多></span></h2>
        <ul>
          <li v-for="(item,index) in nutCon">
            <router-link to="/">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <h3>{{item.name}}</h3>
              <h4>{{item.fname}}</h4>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import {
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Tab,
  TabItem,
  Swiper,
  SwiperItem
} from "vux";
export default {
  components: {
    Tabbar,
    TabbarItem,
    Grid,
    GridItem,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      qiandao: "签到",
      searchVal: "",
      reIndex: 0,
      // 早中晚餐推荐
      recommendData: [
        // 早餐
        [
          [
            {
              name: "早餐",
              kcal: "114kcal/1.0"
            },
            {
              name: "酸奶",
              kcal: "75kcal/1.0瓶"
            },
            {
              name: "煮鸡蛋",
              kcal: "11kcal/1.0个"
            }
          ],
          [
            {
              name: "加餐",
              kcal: "114kcal/1.0"
            }
          ]
        ],
        // 中餐
        [
          [
            {
              name: "中餐",
              kcal: "114kcal/1.0"
            },
            {
              name: "酸奶",
              kcal: "75kcal/1.0瓶"
            },
            {
              name: "煮鸡蛋",
              kcal: "11kcal/1.0个"
            }
          ],
          [
            {
              name: "加餐",
              kcal: "114kcal/1.0"
            }
          ]
        ],
        // 晚餐
        [
          [
            {
              name: "晚餐",
              kcal: "114kcal/1.0"
            },
            {
              name: "酸奶",
              kcal: "75kcal/1.0瓶"
            },
            {
              name: "煮鸡蛋",
              kcal: "11kcal/1.0个"
            }
          ],
          [
            {
              name: "加餐",
              kcal: "114kcal/1.0"
            }
          ]
        ]
      ],
      // 营养咨询
      nutCon: [
        {
          img: "/static/images/ys.jpg",
          name: "陈医生",
          fname: "中南医学院博士"
        },
        {
          img: "/static/images/ys.jpg",
          name: "陈医生",
          fname: "中南医学院博士"
        },
        {
          img: "/static/images/ys.jpg",
          name: "陈医生",
          fname: "中南医学院博士"
        }
      ],
      navBottom: -300
    };
  },
  methods: {
    search() {
      this.$router.push({
        path: "/Tool/Recipes",
        query: {
          search: this.searchVal
        }
      });
    },
    // 膳食推荐table
    recommend(index) {
      this.reIndex = index;
    },
    // 签到
    signInFn() {
      // 显示文字
      if (this.qiandao == "签到") {
        this.$vux.toast.text("今日签到成功，奖励积分（+1）");
        this.qiandao = "已签到";
      }
      // this.$vux.toast.text("今天已经签过啦，改天再来吧~");
    },
    // 分享
    share() {
      this.$vux.toast.text("分享好友成功，奖励积分（+10）");
    },
    openAlt(isTrue) {
      if (isTrue) {
        this.navBottom = 0;
      } else {
        this.navBottom = -300;
      }
    },
    // 判断是否为糖尿病患者
    isDisease() {
      // this.recommendData = [];
      console.log("判断是否为糖尿病患者是的话改变成糖尿病患者的推荐食物");
    },
    getDietRecommend() {
      // 膳食推荐，早中晚餐
      console.log("膳食推荐，早中晚餐推荐数据格式：", this.recommendData);
    },
    getNutritionConsultation() {
      // 推荐营养咨询
      console.log("推荐营养咨询数据格式：", this.nutCon);
    }
  },
  mounted() {
    // 判断是否为糖尿病患者首页推荐食谱不同
    this.isDisease();

    this.getDietRecommend();
    this.getNutritionConsultation();
  }
};
</script>
<style scoped lang="less">
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
      float: right;
      text-align: center;
    }
    .input {
      position: relative;
      width: 70%;
      float: left;

      i {
        position: absolute;
        left: 0;
        top: 0;
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
      font-size: 14px;
      color: #858585;
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
        box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.2);
      }
      h3 {
        font-weight: 500;
        font-size: 14px;
        color: #4e4e4e;
        margin-top: 8px;
        margin-bottom: 4px;
      }
      h4 {
        font-size: 12px;
        font-weight: 500;
        color: #aaaaaa;
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



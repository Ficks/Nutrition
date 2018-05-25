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
            <tabbar-item link="/Find" selected>
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

        <div class="header">
            <span><router-link to="/Find">资讯</router-link></span>
            <span class="active"><router-link to="/Dynamic">动态</router-link></span>

            <div class="right"><router-link to="/Dynamic/Release"><i class="iconfont icon-xiangji"></i></router-link></div>
        </div>
        <div @click="toPathDetails" class="swiper_wr" v-if="listArr.length>0">
         <swiper ref="swiper" :aspect-ratio="1/1" height="190px" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex" :show-dots="false">
              <swiper-item class="swiper-demo-img" v-for="(item, index) in listArr" :key="index">
                <div class="box_getht">
                  <div class="imgs_m">
                    <img v-if="item.src!=''" :src="item.src">
                  </div>
                  <p>{{item.text}}</p>
                  <div class="time">{{item.time}}</div>
                </div>
              </swiper-item>
          </swiper>
        </div>

        <div class="gnbtn">
            <span><i  @click="noLove"  class="iconfont icon-shanchu"></i></span>
            <span><i @click="love" class="iconfont icon-shoucang1"></i></span>
          </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem, Swiper, SwiperItem } from "vux";
import { setTimeout, clearTimeout } from "timers";
export default {
  components: {
    Tabbar,
    TabbarItem,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      navBottom: -300,
      swiperItemIndex: 0,
      listArr: [
        {
          src: "/static/images/ys.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/dt.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/ys.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/dt.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/ys.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/dt.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/ys.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/dt.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/ys.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/dt.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/ys.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        },
        {
          src: "/static/images/dt.jpg",
          text: "#饮食行为分享#今天又去吃好吃的了！",
          time: "1小时前"
        }
      ],
      searchVal: {
        value: "",
        onFetching: false,
        uptext: "滑动查看更多"
      }
    };
  },
  methods: {
    onSwiperItemIndexChange(index) {
      console.log("demo item change", index);
      let box = document
        .getElementsByClassName("vux-swiper-item")
        [index].getElementsByClassName("box_getht")[0];
      this.$refs.swiper.xheight = box.offsetHeight + "px";
      if (this.listArr.length >= 10) {
        if (index > this.listArr.length - 3) {
          // 请求加入列表
          this.listArr.push(
            {
              src: "/static/images/ys.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/dt.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/ys.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/dt.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/ys.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/dt.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/ys.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/dt.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/ys.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/dt.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/ys.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            },
            {
              src: "/static/images/dt.jpg",
              text: "#饮食行为分享#今天又去吃好吃的了！",
              time: "1小时前"
            }
          );
        }
      }
    },
    openAlt(isTrue) {
      if (isTrue) {
        this.navBottom = 0;
      } else {
        this.navBottom = -300;
      }
    },
    toPathDetails(url) {
      this.$router.push({
        path: "/Dynamic/DynamicDetails"
      });
    },
    love() {
      // 喜欢收藏
      this.swiperItemIndex++;
    },
    noLove() {
      // 不喜欢跳过
      this.swiperItemIndex++;
    }
  },
  mounted() {
    setTimeout(() => {
      let box = document
        .getElementsByClassName("vux-swiper-item")
        [this.swiperItemIndex].getElementsByClassName("box_getht")[0];
      this.$refs.swiper.xheight = box.offsetHeight + "px";
      console.log("当前页面API：" + this.$route.path);
      console.log("数据列表格式：", this.listArr);
    }, 100);
    // console.log("当前页面数据列表", this.listArr);
  }
};
</script>
<style>
.vux-swiper {
  transition: all 0.5s;
}
</style>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  height: 100%;
  padding-top: 45px;
  padding-bottom: 80px;
  overflow: auto;
  background: #e3e3e3;
  .header {
    z-index: 999;
    position: fixed;
    top: 0;
    text-align: center;
    font-size: 17px;
    .right {
      right: 10px;
    }
    span {
      margin: 0 25px;
      position: relative;
      display: inline-block;
      overflow: hidden;
      a {
        display: block;
      }
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

  .swiper_wr {
    width: 90%;
    margin: 0 auto;
    box-shadow: 3px 0 4px rgba(0, 0, 0, 0.35);
    background: #fff;
    border-radius: 5px;
    padding: 22px;
    box-sizing: border-box;
    margin-top: 22px;
    padding-bottom: 40px;

    .imgs_m {
      width: 100%;
      text-align: center;
      img {
        max-width: 100%;
      }
    }

    p {
      color: #666;
      font-size: 14px;
      margin-top: 17px;
      margin-bottom: 14px;
    }
    .time {
      font-size: 12px;
      color: #a8a8a8;
    }
  }

  .gnbtn {
    text-align: center;
    width: 100%;
    margin-top: 22px;

    i {
      display: inline-block;
      width: 77px;
      height: 77px;
      line-height: 77px;
      text-align: center;
      border-radius: 50%;
      overflow: hidden;
      background: #fff;
      margin: 0 40px;
      font-size: 40px;
      color: #ef7d1d;
      box-shadow: 3px 0 8px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>

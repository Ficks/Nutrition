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

            <div class="right"><router-link to="/"><i class="iconfont icon-xiangji"></i></router-link></div>
        </div>
        <div class="swiper_wr">
         <swiper :aspect-ratio="300/800" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex" :show-dots="false">
              <swiper-item class="swiper-demo-img" v-for="(item, index) in listArr" :key="index">
                <img :src="item">
              </swiper-item>
          </swiper>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem, Swiper, SwiperItem } from "vux";
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
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",

        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg",
        "/static/images/ys.jpg"
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
        path: "/Find/FindDetails"
      });
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    // console.log("当前页面数据列表", this.listArr);
  }
};
</script>
<style scoped lang="less">
.container {
  .header {
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
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.4);
  }
}
</style>

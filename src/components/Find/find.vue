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
            <span class="active"><router-link to="/Find">资讯</router-link></span>
            <span><router-link to="/Dynamic">动态</router-link></span>
        </div>

        <div class="box_wr">
            <scroller lock-x height="-100px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
            <div class="box search_list">
                <panel :list="listArr" type="1" @on-click-item="toPathDetails"></panel>
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
        uptext: "滑动查看更多"
      },
      listArr: [
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示..."
        },
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示..."
        },
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示..."
        },
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示..."
        },
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示..."
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
              title: "资讯标题",
              src: "/static/images/searchm.jpg",
              desc: "资讯内容缩略显示...",
              url: "/Tool/SearchList/Details"
            },
            {
              title: "资讯标题",
              src: "/static/images/searchm.jpg",
              desc: "资讯内容缩略显示...",
              url: "/Tool/SearchList/Details"
            },
            {
              title: "资讯标题",
              src: "/static/images/searchm.jpg",
              desc: "资讯内容缩略显示...",
              url: "/Tool/SearchList/Details"
            },
            {
              title: "资讯标题",
              src: "/static/images/searchm.jpg",
              desc: "资讯内容缩略显示...",
              url: "/Tool/SearchList/Details"
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
        path: "/Find/FindDetails"
      });
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    console.log("当前页面数据列表", this.listArr);
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  .search_list {
    height: 100%;
  }
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

  .box_wr {
    // padding-bottom: 80px;

    .more_s {
      text-align: center;
      padding-top: 10px;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>

<style lang="less">
.search_list {
  .weui-panel__bd a {
    margin-top: 10px;
    background: #fff;
    border-radius: 8px;

    .weui-media-box_appmsg,
    .weui-media-box__hd {
      width: 120px;
      height: auto;
      border: 2px solid #ededed;
    }
  }
  .weui-media-box__title {
    color: #545454;
    font-size: 16px;
    font-weight: bold;
  }

  .weui-media-box__desc {
    margin-top: 10px;
    color: #8d8d8d;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>

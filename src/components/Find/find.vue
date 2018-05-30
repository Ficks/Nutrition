<template>
    <div class="container">
        <!-- 底部导航 -->
        
    <Menu :index="1"></Menu>
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

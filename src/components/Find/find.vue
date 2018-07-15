<template>
    <div class="container">
        <!-- 底部导航 -->
        
    <Menu :index="1"></Menu>
        <div class="header">
            <span class="active"><router-link to="/Find">资讯</router-link></span>
            <span><router-link to="/Dynamic">动态</router-link></span>
        </div>
        <div class="search">
            <div class="input">
              <input type="text" v-model="searchVal.name" placeholder="根据关键字进行搜索">
              <i class="iconfont icon-sousuo" @click="getList"></i>
              <span @click="searchOn">搜索</span>
            </div>
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
        name: "",
        pageNum: 0,
        pageSize: 10,
        onFetching: false,
        module: 1,
        uptext: "滑动查看更多"
      },
      listArr: []
    };
  },
  methods: {
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
            url: "/api/NewsInfo/GetNewsList",
            type: "get",
            data: this.searchVal,
            success: data => {
              console.log(data);
              this.setData(data.Data);
            },
            error() {}
          });
        }, time || 800);
      }
    },
    setData(data) {
      if (data.length == 0) {
        this.searchVal.uptext = "没有更多数据了";
        this.searchVal.pageNum--;
        this.searchVal.onFetching = false;
        return;
      }
      for (let i = 0; i < data.length; i++) {
        data[i].src = this.$HTTPURL + data[i].src;
        this.listArr.push(data[i]);
      }
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      this.searchVal.onFetching = false;
    },
    toPathDetails(item) {
      this.$router.push({
        path: "/Find/FindDetails",
        query: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    this.getList(1);
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
      border-radius: 5px;
      padding-right: 60px;
      input {
        color: #a1a1a1;
        padding-left: 25px;
      }
      span {
        position: absolute;
        top: 0;
        display: block;
        right: 0;
        background: #8dc13b;
        color: #fff;
        font-size: 12px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        z-index: 999;
      }
      i {
        position: absolute;
        left: 5px;
        top: 6px;
        color: #a1a1a1;
      }
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

<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right" @click="searchOn">搜索</div>
      </div>
        <div class="search">
            <div class="input">
              <input type="text" v-model="searchVal.dishName" placeholder="输入文字搜索食谱">
              <i class="iconfont icon-sousuo" @click="getList"></i>
            </div>
        </div>
        <scroller lock-x height="-85px" @on-scroll-bottom="getList"  ref="scrollerBottom">
          <div class="box scroller_box">
              <panel :list="listArr" type="1" @on-click-item="toPathDetails"></panel>
              <p class="more_s"  v-show="!searchVal.onFetching">{{searchVal.uptext}}</p>
              <load-more tip="loading" v-show="searchVal.onFetching"></load-more>
          </div>
        </scroller>
    </div>
</template>
<script>
import { LoadMore, Panel } from "vux";
import { setTimeout } from "timers";

export default {
  components: {
    LoadMore,
    Panel
  },
  data() {
    return {
      title: "",
      searchVal: {
        dishesType: 1,
        dishName: "",
        pageNum: 0,
        pageSize: "10",
        onFetching: false,
        uptext: "滑动查看更多"
      },
      listArr: []
    };
  },
  methods: {
    apiFn() {
      // 请求那个接口
      if (this.$route.path === "/Tool/Recipes") {
        // 菜谱检索
        this.searchVal.dishesType = 1;
      } else if (this.$route.path === "/Tool/MaterialRetrieval") {
        // 食材检索
        this.searchVal.dishesType = 3;
      } else if (this.$route.path === "/Tool/OtherRetrieval") {
        // 其他食品检索
        this.searchVal.dishesType = 2;
      } else if (
        this.$route.path === "/My/PersonalFiles/AllergicFood/Details"
      ) {
        this.searchVal.dishesType = "";
        // 过敏食物筛选
      }

      console.log("当前页面API：" + this.$route.path);
      console.log("列表数据格式：", this.listArr);
      console.log("这个页面可以变成添加过敏食物的列表页");

      this.getList(1);
    },
    toPathDetails(item) {
      this.$router.push({
        path: "/Tool/SearchList/Details",
        query: {
          path: this.$route.path,
          id: item.id,
          src: item.src,
          typevalue: this.$route.query.typevalue || ""
        }
      });
    },
    searchOn() {
      this.searchVal.pageNum = 0;
      this.listArr = [];
      this.getList(1);
    },
    setData(data) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          console.log("----------------------------");
          console.log(data);
          data[i].src = this.$HTTPURL + data[i].src;
          data[i].desc =
            data[i].desc.length > 50
              ? data[i].desc.substr(0, 50) + "..."
              : data[i].desc;
          this.listArr.push(data[i]);
        }
      } else {
        this.searchVal.uptext = "没有更多数据了";
        this.searchVal.pageNum--;
      }

      this.searchVal.onFetching = false;
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
    },
    getList(time) {
      var _this = this;
      if (this.searchVal.onFetching) {
        // do nothing
      } else {
        this.searchVal.onFetching = true;
        console.log(this.searchVal);
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/HealthyDiet/GetDishesList",
            type: "get",
            data: this.searchVal,
            success: function(data) {
              //成功的处理
              console.log(data);
              _this.setData(data.Data);
            },
            error: function() {
              //错误处理
            }
          });
        }, time || 800);
      }
    }
  },
  mounted() {
    this.apiFn(); //判断需要搜索什么
    // this.$nextTick(() => {
    //   this.$refs.scrollerBottom.reset({ top: 0 });
    // });
  }
};
</script>
<style lang="less" scoped>
.container {
  background: #f3f3f3;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
}
.search {
  width: 100%;
  height: 40px;
  background: #fff;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: hidden;

  .input {
    position: relative;
    margin-top: 5px;
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

.box {
  padding: 0 15px;

  .weui-panel {
    background: none;
  }
  .more_s {
    text-align: center;
    padding: 10px 0;
    color: #a4a4a4;
    font-size: 12px;
  }
}

.scroller_box {
  height: 100%;
}
</style>
<style lang="less">
.scroller_box {
  .weui-panel__bd a {
    margin-top: 10px;
    background: #fff;
    border-radius: 8px;

    .weui-media-box_appmsg,
    .weui-media-box__hd {
      width: 120px;
      height: auto;
      border: 1px solid #ededed;
    }
  }
  .weui-media-box__title {
    color: #757575;
    font-size: 16px;
  }

  .weui-media-box__desc {
    margin-top: 10px;
    color: #a4a4a4;
    font-size: 14px;
  }
}
</style>

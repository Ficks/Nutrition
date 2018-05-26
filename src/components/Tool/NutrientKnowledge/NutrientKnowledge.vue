<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right"></div>
      </div>
        <scroller lock-x height="-45px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
        <div class="box search_list scroller_box">
            <panel :list="listArr" type="1" @on-click-item="toPathDetails"></panel>
            <p class="more_s"  v-show="!searchVal.onFetching">{{searchVal.uptext}}</p>
            <load-more tip="loading" v-show="searchVal.onFetching"></load-more>
        </div>
        </scroller>
    </div>
</template>
<script>
import { LoadMore, Panel } from "vux";

export default {
  components: {
    LoadMore,
    Panel
  },
  data() {
    return {
      title: "",
      searchVal: {
        value: "",
        onFetching: false,
        uptext: "滑动查看更多"
      },
      listArr: [
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示...",
          link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
        },
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示...",
          link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
        },
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示...",
          link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
        },
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示...",
          link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
        },
        {
          title: "资讯标题",
          src: "/static/images/searchm.jpg",
          desc: "资讯内容缩略显示...",
          link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
        }
      ]
    };
  },
  methods: {
    apiFn() {
      console.log("当前页面API：" + this.$route.path);
      console.log("当前页面数据列表", this.listArr);
    },
    toPathDetails(item) {
      console.log(item);
      this.$router.push({
        path: item.link
      });
    },
    getList() {
      console.log(this.$route.path);
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
              link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
            },
            {
              title: "资讯标题",
              src: "/static/images/searchm.jpg",
              desc: "资讯内容缩略显示...",
              link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
            },
            {
              title: "资讯标题",
              src: "/static/images/searchm.jpg",
              desc: "资讯内容缩略显示...",
              link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
            },
            {
              title: "资讯标题",
              src: "/static/images/searchm.jpg",
              desc: "资讯内容缩略显示...",
              link: "/Tool/NutrientKnowledge/NutrientKnowledgeDetails"
            }
          );
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          this.searchVal.onFetching = false;
        }, 2000);
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
  background: #f9f9f9;
  height: 100%;
}
.scroller_box {
  padding-bottom: 1px;
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
  //   padding: 0 15px;

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

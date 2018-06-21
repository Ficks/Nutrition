<template>
    <div class="container">
        <div class="header"  v-if="this.$route.matched.length===1">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
      <scroller lock-x height="-45px" ref="scrollerBottom" v-if="this.$route.matched.length===1">
        <div class="list_md">
            <ul>
                <li v-for="(item,index) in listArr" @click="toDetails(item)">
                    <div class="left">
                        <h3>{{item.title}}</h3>
                        <p>共{{item.length}}题</p>
                    </div>
                    <div class="right">
                        <i class="iconfont icon-chanpinxiangqing_qianwang"></i>
                    </div>
                </li>
            </ul>
        </div>
      </scroller>
        <div class="view"  v-if="this.$route.matched.length!==1">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      searchVal: {
        qType: 1,
        pageNum: 1,
        pageSize: 100
      },
      listArr: []
    };
  },
  methods: {
    getList() {
      var _this = this;
      if (this.$route.path == "/self") {
        this.searchVal.qType = 2;
      }
      console.log(this.searchVal);
      this.$http({
        url: "/api/Questionnaire/GetQuestionnaireList",
        type: "get",
        data: this.searchVal,
        success(data) {
          _this.setData(data.Data);
        },
        error() {}
      });
    },
    setData(data) {
      console.log(data);
      this.listArr = data;
    },
    toDetails(item) {
      this.$router.push({
        path: this.$route.path + "/AssessmentAnswer",
        query: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped lang="less">
.view {
  height: 100%;
}
.container {
  height: 100%;
  overflow: hidden;
  background: #f9f9f9;

  .list_md {
    li {
      height: auto;
      overflow: hidden;
      padding: 10px 0;
      border-bottom: 1px solid #e6e6e6;

      &:active {
        background: #ddd;
      }
    }
    .left {
      float: left;
      padding-left: 13px;
      box-sizing: border-box;
    }
    .right {
      float: right;
      box-sizing: border-box;
      color: #8b8b8b;
      padding-right: 13px;
      padding-top: 8px;
      i {
        font-size: 12px;
      }
    }

    h3 {
      font-size: 16px;
      color: #555;
      font-weight: 500;
      margin-bottom: 7px;
    }
    p {
      font-size: 13px;
      color: #aeaeae;
    }
  }
}
</style>


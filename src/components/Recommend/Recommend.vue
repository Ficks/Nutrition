<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right"></div>
      </div>
        <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="box search_list scroller_box">
            <p class="wxts">温馨提示：本食谱仅作为饮食参考，疾病相关请咨询医生</p>
            <ul class="list_re" v-for="(item,index) in listArr">
                <li v-for="(jtem,jindex) in item.dishes" @click="toPathDetails(jtem)">
                    <div class="img">
                        <img :src="$HTTPURL+jtem.src" alt="">
                    </div>
                    <h3>{{jtem.name}}</h3>
                    <p>{{jtem.kcal}}kcal/{{jtem.unit}}g*{{jtem.number}}</p>
                </li>
            </ul>
            <load-more tip="loading" v-show="searchVal.onFetching"></load-more>
        </div>
        </scroller>
    </div>
</template>
<script>
import { LoadMore } from "vux";

export default {
  components: {
    LoadMore
  },
  data() {
    return {
      title: "",
      searchVal: {
        value: "",
        onFetching: false,
        uptext: "滑动查看更多"
      },
      listArr: []
    };
  },
  methods: {
    apiFn() {
      console.log("当前页面API：" + this.$route.path);
      console.log("当前页面数据列表", this.listArr);
    },
    toPathDetails(item) {
      this.$router.push({
        path: "/Tool/SearchList/Details",
        query: {
          id: item.id,
          typevalue: ""
        }
      });
    }
  },
  mounted() {
    this.apiFn(); //判断需要搜索什么
    // this.$nextTick(() => {
    //   this.$refs.scrollerBottom.reset({ top: 0 });
    // });

    this.$http({
      url: "/api/HealthyDiet/GetMenuDietDetail",
      type: "get",
      data: {
        id: this.$route.query.id
      },
      success: data => {
        console.log(data);
        this.listArr = data.Data;
      },
      error: error => {}
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  background: #f9f9f9;
  height: 100%;

  .list_re {
    height: auto;
    overflow: hidden;
    padding: 0 13px;
    box-sizing: border-box;
    li {
      margin-top: 10px;
      text-align: center;
      width: 50%;
      box-sizing: border-box;
      padding: 0 15px;
      float: left;

      .img {
        background: #fff;
      }
      img {
        max-width: 100%;
      }

      h3 {
        font-size: 15px;
        color: #494949;
        font-weight: 500;
        padding: 5px 0 2px;
      }
      p {
        font-size: 13px;
        color: #666666;
      }
    }
  }
}
.scroller_box {
  padding-bottom: 1px;
  box-sizing: border-box;
}
.wxts {
  text-align: center;
  font-size: 12px;
  color: #666666;
  margin-top: 10px;
}
</style>

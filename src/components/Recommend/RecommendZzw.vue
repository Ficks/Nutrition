<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right"></div>
      </div>
        <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="box search_list scroller_box">
            <div class="breakfast">
              <div class="tl">
                <div class="g">
                  <div class="b">
                    <i class="iconfont icon-zaocan"></i> 早餐
                  </div>
                </div>
              </div>
              <ul class="list_re">
                  <li v-for="(item,index) in listArr[0].dishes" @click="toPathDetails(item)">
                      <div class="img">
                          <img :src="$HTTPURL+item.thumbnail" alt="">
                      </div>
                      <h3>{{item.name}}</h3>
                      <p>{{item.kcal}}kcal</p>
                  </li>
              </ul>
            </div>

            <div class="chinese_ood">
              <div class="tl">
                <div class="g">
                  <div class="b">
                    <i class="iconfont icon-wucan"></i> 午餐
</div></div>              </div>
              <ul class="list_re">
                  <li v-for="(item,index) in listArr[1].dishes" @click="toPathDetails(item)">
                      <div class="img">
                          <img :src="$HTTPURL+item.thumbnail" alt="">
                      </div>
                      <h3>{{item.name}}</h3>
                      <p>{{item.kcal}}kcal</p>
                  </li>
              </ul>
            </div>

            <div class="dinner">
              <div class="tl">
                <div class="g">
                  <div class="b">
                    <i class="iconfont icon-wancan"></i> 晚餐
                  </div>
                </div>
              </div>
              <ul class="list_re">
                  <li v-for="(item,index) in listArr[2].dishes" @click="toPathDetails(item)">
                      <div class="img">
                          <img :src="$HTTPURL+item.thumbnail" alt="">
                      </div>
                      <h3>{{item.name}}</h3>
                      <p>{{item.kcal}}kcal</p>
                  </li>
              </ul>
            </div>
            
        </div>
        </scroller>
    </div>
</template>
<script>
export default {
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
          dishes: {}
        },
        {
          dishes: {}
        },
        {
          dishes: {}
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
        path: "/Tool/SearchList/Details",
        query: {
          id: item.id,
          typevalue: item.type
        }
      });
    },
    getList() {
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
  },
  mounted() {
    this.getList();
    setTimeout(() => {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
    });
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
  .scroller_box {
    padding-bottom: 30px;
    height: 100%;
  }

  .list_re {
    height: auto;
    overflow: hidden;
    padding: 0 5px;
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

  .tl {
    padding: 0 20px;
    margin-top: 10px;

    .g {
      background: url("/static/images/y.jpg") no-repeat center;

      .b {
        background: #f9f9f9;
        width: 60px;
        font-size: 15px;
        color: #494949;
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

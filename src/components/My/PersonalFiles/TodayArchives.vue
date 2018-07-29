<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right"></div>
      </div>
      <scroller lock-x height="-45px"   ref="scrollerBottom">
        <div class="box scroller_box">
          <h2>{{date}}</h2>
          <ul>
              <li>
                  <div class="left">营养素</div>
                  <div class="center"></div>
                  <div class="right">预计所需</div>
              </li>
              <li v-for="(item,index) in listArr">
                  <div class="left">{{item.name}}</div>
                  <div class="center">
                      <div class="kdc">
                          <div :class="{over:item.bfb>100}" class="jdt" :style="{width:item.bfb+'%'}">
                            <template v-if="item.bfb<100">{{item.bfb>25?item.spedVal+item.unit:''}}</template>
                            <template v-else>{{item.bfbc}}</template>
                          </div>
                      </div>
                  </div>
                  <div class="right">{{item.totalVal+item.unit}}</div>
              </li>
          </ul>
          <h2 class="tl">各餐摄入组成</h2>
          <ul>
              <li>
                  <div class="left">餐次</div>
                  <div class="center"></div>
                  <div class="right">参考比例</div>
              </li>
              <li v-for="(item,index) in mealArr">
                  <div class="left">{{item.type | name}}</div>
                  <div class="center">
                      <div class="kdc">
                          <div :class="{over:item.bfb>90}" class="jdt" :style="{width:item.bfb+'%'}"></div>
                      </div>
                  </div>
                  <div class="right">{{item.proposalratio}}</div>
              </li>
          </ul>
        </div>
      </scroller>
    </div>
</template>
<script>
export default {
  filters: {
    name(item) {
      if (item == 1) {
        return "早餐";
      } else if (item == 2) {
        return "中餐";
      } else if (item == 3) {
        return "晚餐";
      }
    }
  },
  data() {
    return {
      date: "",
      listArr: [],
      mealArr: []
    };
  },
  methods: {
    getBfb(item) {
      if (item.totalVal == 0 || item.spedVal == 0) {
        return 0;
      }
      var num = parseFloat(item.spedVal) / parseFloat(item.totalVal) * 100;
      num = num.toString();
      if (num.indexOf(".") !== -1) {
        num = num.substring(0, num.indexOf(".") + 2);
      } else {
        num = num;
      }
      return num;
      // return Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2);
    },
    getCg(item) {
      var num = item - 100;
      num = num.toString();
      if (num.indexOf(".") !== -1) {
        num = num.substring(0, num.indexOf(".") + 2);
      } else {
        num = num;
      }
      return "超过" + num + "%";

      // return "超过" + Math.round(num * Math.pow(10, 2)) / Math.pow(10, 1) + "%";
    },
    setData(data) {
      this.listArr = data.nutrient;
      this.mealArr = data.meal;
      for (let i = 0; i < this.listArr.length; i++) {
        var v = this.listArr[i];
        v.bfb = this.getBfb(v);
        if (v.bfb > 100) {
          v.bfbc = this.getCg(v.bfb);
        }
      }
      for (let i = 0; i < this.mealArr.length; i++) {
        var v = this.mealArr[i];
        v.bfb = this.getBfb(v);
        if (v.bfb > 100) {
          v.bfbc = this.getCg(v.bfb);
        }
      }
    }
  },
  mounted() {
    var url = "/api/HealthyArchive/GetDailyNutrientIntakeAndMealRatio";
    var id = "";
    // 判断是否只读
    if (this.$route.query.id != "") {
      url = "/api/HealthyArchive/GetDailyNutrientIntakeAndMealRatioByUserId";
      id = this.$route.query.id;
    } else {
      url = "/api/HealthyArchive/GetDailyNutrientIntakeAndMealRatio";
    }
    this.$http({
      url: "/api/HealthyArchive/GetDailyNutrientIntakeAndMealRatio",
      type: "get",
      data: { id: id },
      success: data => {
        //成功的处理
        this.setData(data.Data);
      },
      error: function() {
        //错误处理
      }
    });
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  background: #f9f9f9;
}
.box {
  box-sizing: border-box;
  padding: 20px;
}
h2 {
  text-align: center;
  font-size: 17px;
  color: #8dc13b;
  font-weight: 500;
  margin-bottom: 10px;

  &.tl {
    margin-top: 25px;
    margin-bottom: 7px;
  }
}
ul {
  li {
    height: auto;
    overflow: hidden;
    margin: 15px 0;
    .left {
      float: left;
      width: 25%;
      font-size: 16px;
      color: #494949;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .center {
      width: 50%;
      float: left;
      .kdc {
        width: 100%;
        height: 25px;
        background: #fff;
        border-radius: 5px;
        position: relative;
        overflow: hidden;

        .jdt {
          position: absolute;
          height: 100%;
          border-radius: 5px;
          width: 50%;
          background: #8dc13b;
          text-align: center;
          color: #fff;
          font-size: 14px;
          line-height: 25px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          max-width: 100% !important;
        }
        .over {
          background: rgba(255, 48, 0, 1);
        }
      }
    }
    .right {
      text-align: right;
      width: 25%;
      float: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 15px;
      color: #666666;
    }
  }
}

@media screen and(max-width: 350px) {
  ul li .left {
    width: 30%;
  }
  ul li .center {
    width: 40%;
  }
  ul li .right {
    width: 30%;
  }
}
</style>


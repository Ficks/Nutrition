<template>
    <div class="container">
      <div class="header" v-if="$route.path==='/My/PersonalFiles'">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right"></div>
      </div>
      <scroller lock-x height="-45px"   ref="scrollerBottom" v-if="$route.path==='/My/PersonalFiles'">
        <div class="box scroller_box">
          <h2>{{$getDate(-31)}} ~ {{$getDate(0)}}</h2>
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
                        
                          <div :class="{over:item.bfb>90}" class="jdt" :style="{width:item.bfb+'%'}">
                            {{item.bfbc}}
                          </div>
                      </div>
                  </div>
                  <div class="right">{{item.totalVal+item.unit}}</div>
              </li>
          </ul>
        </div>
      </scroller>
      <div class="view"  v-if="$route.path!=='/My/PersonalFiles'">
        <router-view></router-view>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      listArr: []
    };
  },
  methods: {
    getBfb(item) {
      if (item.totalVal == 0 || item.spedVal == 0) {
        return 0;
      }
      var num = parseFloat(item.spedVal) / parseFloat(item.totalVal) * 100;
      return Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2);
    },
    getCg(item) {
      var num = item - 100;
      return "超过" + Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2) + "%";
    },
    setData(data) {
      this.listArr = data;
      for (let i = 0; i < this.listArr.length; i++) {
        var v = this.listArr[i];
        v.bfb = this.getBfb(v);
        if (v.bfb > 100) {
          v.bfbc = this.getCg(v.bfb);
        }
      }
    }
  },
  mounted() {
    var url = "/api/HealthyArchive/GetDailyNutrientIntake";
    var id = "";
    // 判断是否只读
    if (this.$route.query.id != "") {
      url = "/api/HealthyArchive/GetDailyNutrientIntakeByUserId";
      id = this.$route.query.id;
    } else {
      url = "/api/HealthyArchive/GetDailyNutrientIntake";
    }

    this.$http({
      url: "/api/HealthyArchive/GetDailyNutrientIntake",
      type: "get",
      data: {
        id: id,
        start: this.$getDate(-31),
        end: this.$getDate(1)
      },
      success: data => {
        //成功的处理
        console.log(data);
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
}
ul {
  li {
    height: auto;
    overflow: hidden;
    margin: 15px 0;
    .left {
      float: left;
      width: 20%;
      font-size: 16px;
      color: #494949;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .center {
      width: 60%;
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
      width: 20%;
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


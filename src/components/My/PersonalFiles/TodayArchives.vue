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
              <li v-for="(item,index) in listArr[0]">
                  <div class="left">{{item.title}}</div>
                  <div class="center">
                      <div class="kdc">
                          <div :class="{over:fomatFloat(item)>100}" class="jdt" :style="{width:fomatFloat(item)+'%'}">
                            <template v-if="fomatFloat(item)<100">{{item.spedValName}}</template>
                            <template v-else>{{fomatFloat(item,true)}}</template>
                          </div>
                      </div>
                  </div>
                  <div class="right">{{item.valueName}}</div>
              </li>
          </ul>
          <h2 class="tl">各餐摄入组成</h2>
          <ul>
              <li>
                  <div class="left">餐次</div>
                  <div class="center"></div>
                  <div class="right">参考比例</div>
              </li>
              <li v-for="(item,index) in listArr[1]">
                  <div class="left">{{item.title}}</div>
                  <div class="center">
                      <div class="kdc">
                          <div :class="{over:fomatFloat(item)>100}" class="jdt" :style="{width:fomatFloat(item)+'%'}"></div>
                      </div>
                  </div>
                  <div class="right">{{item.valueName}}</div>
              </li>
          </ul>
        </div>
      </scroller>
    </div>
</template>
<script>
export default {
  data() {
    return {
      date: "",
      listArr: [
        [
          {
            title: "热量",
            spedVal: "650",
            spedValName: "650kcal",
            valueName: "1000kcal",
            value: "1000"
          },
          {
            title: "蛋白质",
            spedVal: "1.02",
            spedValName: "1.02g",
            valueName: "2.05g",
            value: "2.05"
          },
          {
            title: "脂肪",
            spedVal: "6.22",
            spedValName: "6.22g",
            valueName: "7.05g",
            value: "7.05"
          },
          {
            title: "碳水",
            spedVal: "4.22",
            spedValName: "4.22g",
            valueName: "6.05g",
            value: "6.05"
          },
          {
            title: "膳食纤维",
            spedVal: "3.2",
            spedValName: "3.2mg",
            valueName: "5.05mg",
            value: "5.05"
          }
        ],
        [
          {
            title: "早餐",
            spedVal: "10",
            valueName: "20%",
            value: "20"
          },
          {
            title: "中餐",
            spedVal: "40",
            valueName: "50%",
            value: "50"
          },
          {
            title: "晚餐",
            spedVal: "40",
            valueName: "30%",
            value: "30"
          }
        ]
      ]
    };
  },
  methods: {
    fomatFloat(item, isT) {
      if (isT) {
        var num = parseFloat(item.spedVal) / parseFloat(item.value) * 100;
        num = num - 100;
        return (
          "超过" + Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2) + "%"
        );
      } else {
        var num = parseFloat(item.spedVal) / parseFloat(item.value) * 100;
        return Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2);
      }
    }
  },
  mounted() {
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    this.date = year + "-" + month + "-" + date;
    console.log("当前页面API" + this.$route.path);
    console.log("数据格式：", this.listArr);
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


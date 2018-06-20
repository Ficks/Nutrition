<template>
    <div class="container">
      <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
      </div>
     
      <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="box scroller_box">
           <div class="select" @click="select.show=true">
              {{select.value | getVal}}
              <i class="iconfont icon-xiala"></i>
          </div>
            <ul>
                <li v-for="(item,index) in listArr">
                    <div class="left">{{item.name}}</div>
                    <div class="right">{{item.value+item.unit}}</div>
                </li>
            </ul>
        </div>
      </scroller>

        <div class="nav_bom_zoom" v-show="select.show" @click="select.show=false"></div>
        <div class="afxm"  :style="{bottom:select.show?0:-200+'px'}">
            <h3>请选择</h3>
            <ul>
                <li @click="setSelect(1)">正常成人值</li>
                <li @click="setSelect(2)">婴幼儿值</li>
                <li @click="setSelect(3)">青少年值</li>
                <li @click="setSelect(4)">老年人值</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  filters: {
    getVal(val) {
      if (val == 1) {
        return "正常成人值";
      } else if (val == 2) {
        return "婴幼儿值";
      } else if (val == 3) {
        return "青少年值";
      } else if (val == 4) {
        return "老年人值";
      }
    }
  },
  data() {
    return {
      select: {
        value: 1,
        show: false
      },
      listArr: []
    };
  },
  methods: {
    setSelect(val) {
      var _this = this;
      this.select.value = val;
      this.select.show = false;
      this.$http({
        url: "/api/HealthyArchive/GetNutrientStandard",
        type: "get",
        data: {
          ageType: this.select.value
        },
        success: function(data) {
          //成功的处理
          _this.setData(data.Data);
        },
        error: function() {
          //错误处理
        }
      });
      //   获取数据
    },
    setData(data) {
      this.listArr = data;
    }
  },
  mounted() {
    this.setSelect(1);
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  background: #f9f9f9;
}

.box {
  padding: 0 20px;
  padding-bottom: 30px;
  li {
    height: auto;
    overflow: hidden;
    line-height: 45px;

    .left {
      float: left;
      color: #494949;
      font-size: 16px;
      font-weight: 550;
    }
    .right {
      float: right;
      color: #666;
      font-weight: 550;
      font-size: 16px;
    }
  }
}
.afxm {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
  transition: all 0.5s;

  h3 {
    padding: 10px;
    font-size: 16px;
    color: #333;
  }
  .sle {
    position: relative;
    left: -15px;
    margin-top: 30px;
    height: 50px;
  }
  .vuels {
    text-align: center;
  }

  ul {
    li {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 14px;
      border-bottom: #ddd 1px solid;
      color: #666;

      &:hover {
        background: #ddd;
      }
    }
  }
}
.select {
  width: 60%;
  margin: 20px auto;
  margin-bottom: 30px;
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background: #8dc13b;
  position: relative;

  &:active {
    background: #ddd;
  }

  .iconfont {
    position: absolute;
    right: 10px;
    font-size: 18px;
  }
}
</style>


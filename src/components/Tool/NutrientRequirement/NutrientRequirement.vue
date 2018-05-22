<template>
    <div class="container">
      <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
      </div>
      <div class="select" @click="select.show=true">
          {{select.value}}
          <i class="iconfont icon-xiala"></i>
      </div>
        <div class="box">
            <ul>
                <li v-for="(item,index) in arrList">
                    <div class="left">{{item.title}}</div>
                    <div class="right">{{item.valueName}}</div>
                </li>
            </ul>
        </div>


        <div class="nav_bom_zoom" v-show="select.show" @click="select.show=false"></div>
        <div class="afxm"  :style="{bottom:select.show?0:-200+'px'}">
            <h3>请选择</h3>
            <ul>
                <li @click="setSelect('正常成人值')">正常成人值</li>
                <li @click="setSelect('婴幼儿值')">婴幼儿值</li>
                <li @click="setSelect('青少年值')">青少年值</li>
                <li @click="setSelect('老年人值')">老年人值</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      select: {
        value: "正常成人值",
        show: false
      },
      arrList: [
        {
          title: "热量",
          valueName: "1000kcal"
        },
        {
          title: "蛋白质",
          valueName: "2.05g"
        },
        {
          title: "脂肪",
          valueName: "2.05g"
        },
        {
          title: "碳水",
          valueName: "2.05g"
        },
        {
          title: "膳食纤维",
          valueName: "2.05g"
        },
        {
          title: "维生素A",
          valueName: "2.05g"
        },
        {
          title: "维生素B",
          valueName: "2.05g"
        },
        {
          title: "钙",
          valueName: "2.05g"
        },
        {
          title: "铁",
          valueName: "2.05g"
        },
        {
          title: "锌",
          valueName: "2.05g"
        },
        {
          title: "镁",
          valueName: "2.05g"
        },
        {
          title: "碘",
          valueName: "2.05g"
        }
      ]
    };
  },
  methods: {
    setSelect(val) {
      this.select.value = val;
      this.select.show = false;

      //   获取数据
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  background: #f9f9f9;
}
.box {
  padding: 0 20px;
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


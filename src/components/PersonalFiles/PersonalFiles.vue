<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right"></div>
      </div>
      <scroller lock-x height="-45px"   ref="scrollerBottom">
        <div class="box scroller_box">
          <h2>2018-05-01~2018-06-01</h2>
          <ul>
              <li>
                  <div class="left">营养素</div>
                  <div class="center"></div>
                  <div class="right">预计所需</div>
              </li>
              <li v-for="(item,index) in arrList">
                  <div class="left">{{item.title}}</div>
                  <div class="center">
                      <div class="kdc">
                          <div class="jdt" :style="{width:(parseInt(item.spedVal)/parseInt(item.value))*100+'%'}">
  {{item.spedValName}}
                          </div>
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
import { Scroller } from "vux";
export default {
  components: {
    Scroller
  },
  data() {
    return {
      arrList: [
        {
          title: "热量",
          spedVal: "650",
          spedValName: "650kcal",
          valueName: "1000kcal",
          value: "1000k"
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
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "7.05g"
        },
        {
          title: "碳水",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "7.05g"
        },
        {
          title: "膳食纤维",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "7.05mg"
        },
        {
          title: "维生素A",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "7.05g"
        },
        {
          title: "维生素B",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "7.05g"
        },
        {
          title: "钙",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "10.0mg"
        },
        {
          title: "铁",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "7.05g"
        },
        {
          title: "锌",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "7.05g"
        },
        {
          title: "镁",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "7.05g"
        },
        {
          title: "碘",
          spedVal: "",
          spedValName: "",
          valueName: "",
          value: "10.0mg"
        }
      ]
    };
  },
  methods: {},
  mounted() {}
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


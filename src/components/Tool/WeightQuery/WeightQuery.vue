<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
      <scroller lock-x height="-103px" ref="scrollerBottom">
        <div class="scroller_box">
            <div class="list ">
              <ul>
                  <li v-for="(item,index) in arr" @click="setList(index)"><div>{{item.title}}<span>{{item.value || "请选择"}}{{item.value>0?item.dw:""}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></span></div></li>
              </ul>
          </div>
          <div class="box" v-if="bmi!==''">
            <p>BMI为</p>
            <h1>{{bmi}}</h1>
            <div class="tps">
                {{bmitps}}
            </div>
            <div class="list_tb">
                <ul>
                    <li>
                        <span>分类</span>
                        <span>BMI范围</span>
                    </li>
                    <li>
                        <span>偏瘦</span>
                        <span><=18.4</span>
                    </li>
                    <li>
                        <span>正常</span>
                        <span>18.5~23.9</span>
                    </li>
                    <li>
                        <span>过重</span>
                        <span>24.0~27.9</span>
                    </li>
                    <li>
                        <span>肥胖</span>
                        <span>>=28.0</span>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </scroller>
        
          <div class="submit_btn" @click="search">确认查询</div>

      <div class="nav_bom_zoom" v-show="zoom" @click="closeAll"></div>
      <div class="afxm"  :style="{bottom:arr[0].show?0:-200+'px'}">
          <h3>选择{{arr[0].title}}</h3>
          <div class="vuels">{{arr[0].title}}：{{arr[0].value}} {{arr[0].dw}}</div>
          <div class="sle">
            <range v-model="arr[0].value"  :min="0" :max="210"></range>
          </div>
      </div>
      <div class="afxm"  :style="{bottom:arr[1].show?0:-200+'px'}">
          <h3>选择{{arr[1].title}}</h3>
          <div class="vuels">{{arr[1].title}}：{{arr[1].value}} {{arr[1].dw}}</div>
          <div class="sle">
            <range v-model="arr[1].value"  :min="0" :max="600"></range>
          </div>
      </div>
      <div class="afxm"  :style="{bottom:arr[2].show?0:-200+'px'}">
          <h3>选择{{arr[2].title}}</h3>
          <ul>
            <li @click="setValue('是',2)">是</li>
            <li @click="setValue('否',2)">否</li>
          </ul>
      </div>
    </div>
</template>
<script>
import { Popup, Rater, Range } from "vux";
export default {
  components: {
    Rater,
    Range
  },
  data() {
    return {
      zoom: false,
      bmi: "",
      //   bmitps: [
      //     "1BMI偏高了，亲需要加强锻炼哦~",
      //     "2BMI偏高了，亲需要加强锻炼哦~",
      //     "3BMI偏高了，亲需要加强锻炼哦~",
      //     "4BMI偏高了，亲需要加强锻炼哦~"
      //   ],
      arr: [
        {
          title: "身高",
          value: 0,
          dw: "cm",
          show: false
        },
        {
          title: "体重",
          value: 0,
          dw: "kg",
          show: false
        },
        {
          title: "是否成年",
          value: "",
          show: false
        }
      ]
    };
  },
  computed: {
    bmitps() {
      if (this.bmi <= 18.4) {
        return "BMI偏瘦，亲需要多吃点~";
      } else if (this.bmi >= 18.5 && this.bmi < 23.9) {
        return "BMI正常，真棒~";
      } else if (this.bmi >= 24.0 && this.bmi < 27.9) {
        return "BMI偏高了，亲需要加强锻炼哦~";
      } else {
        return "BMI冲出云端了，亲需要加强锻炼并减肥哦~";
      }
    }
  },
  methods: {
    search() {
      // 查询所需要的kcal
      this.bmi = "29.4";
    },
    setList(index) {
      this.arr[index].show = true;
      this.zoom = true;
    },
    closeAll() {
      // 关闭所有弹窗
      for (let i = 0; i < this.arr.length; i++) {
        this.arr[i].show = false;
      }
      this.zoom = false;
    },
    setValue(val, i) {
      // 设置值
      this.arr[i].value = val;
      this.arr[i].show = false;
      this.zoom = false;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  box-sizing: border-box;
  .scroller_box {
    padding-bottom: 20px;
    height: 100%;
    box-sizing: border-box;
  }
}
.list {
  ul {
    li {
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      color: #555555;
      border-bottom: 1px solid #e3e3e3;
      div {
        padding: 0 15px;
      }
      span {
        float: right;
        font-size: 13px;
        color: #aeaeae;
      }

      &:active {
        background: #ddd;
      }
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
.box {
  margin-top: 45px;
  text-align: center;
  p {
    font-size: 14px;
    color: #555555;
  }
  h1 {
    font-size: 30px;
    color: #555555;
    margin-top: 5px;
  }
}

.list_tb {
  width: 70%;
  margin: 0 auto;
  li {
    height: auto;
    overflow: hidden;
    background: #eee;
    height: 28px;
    line-height: 28px;
    span {
      width: 50%;
      text-align: center;
      display: block;
      font-weight: bold;
      float: left;
      font-size: 14px;
      color: #808080;
    }
    &:nth-child(odd) {
      background: #acca7d;
    }
  }
}

.tps {
  font-size: 14px;
  color: #8dc13b;
  margin: 20px 0 30px;
}

.submit_btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  margin: 0 auto;
}
</style>



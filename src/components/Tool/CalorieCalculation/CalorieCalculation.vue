<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in arr" @click="setList(index)"><div>{{item.title}}<span>{{item.value || "请选择"}}{{item.value>0?item.dw:""}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></span></div></li>
            </ul>
        </div>
        <div class="box" v-if="kcal!==''">
          <p>计算后预计每日所需能量</p>
          <h1>{{kcal}}</h1>
        </div>
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
          <div class="vuels">{{arr[2].title}}：{{arr[2].value}} {{arr[2].dw}}</div>
          <div class="sle">
            <range v-model="arr[2].value"  :min="0" :max="150"></range>
          </div>
      </div>
      <div class="afxm"  :style="{bottom:arr[3].show?0:-200+'px'}">
          <h3>选择{{arr[3].title}}</h3>
          <ul>
            <li @click="setValue('男',3)">男</li>
            <li @click="setValue('女',3)">女</li>
          </ul>
      </div>
      <div class="afxm"  :style="{bottom:arr[4].show?0:-200+'px'}">
          <h3>选择{{arr[4].title}}</h3>
          <ul>
            <li @click="setValue('轻度',4)">轻度</li>
            <li @click="setValue('中度',4)">中度</li>
            <li @click="setValue('重度',4)">重度</li>
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
      kcal: "",
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
          title: "年龄",
          value: 0,
          dw: "岁",
          show: false
        },
        {
          title: "性别",
          value: "请选择",
          show: false
        },
        {
          title: "劳力水平",
          value: "",
          show: false
        }
      ]
    };
  },
  methods: {
    search() {
      // 查询所需要的kcal
      this.kcal = "1000kcal";
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

.submit_btn {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
}
</style>



<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
      <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="scroller_box">
          <div class="list">
              <ul>
                  <li v-for="(item,index) in arr" @click="setList(index)">
                    <div v-if="index!==2">{{item.title}}<span>{{item.value || item.yue || "请选择"}}{{item.value>0?item.dw:""}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></span></div>
                    <div v-else>年龄<span>{{item.value===0?item.yue===0?"请选择":item.yue+'个月':item.value+"岁"}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></span></div>
                  </li>
              </ul>
          </div>
          <div class="box" v-if="kcal!=0">
            <p>计算后预计每日所需能量</p>
            <h1>{{kcal}}kcal</h1>
          </div>
        </div>
      </scroller>
          <div class="submit_btn" @click="search">确认查询</div>

      <div class="nav_bom_zoom" v-show="zoom" @click="closeAll"></div>
      <div class="afxm"  :style="{bottom:arr[0].show?0:-200+'px'}">
          <h3>选择{{arr[0].title}}</h3>
          <div class="vuels">{{arr[0].title}}：{{arr[0].value}} {{arr[0].dw}}</div>
          <div class="sle">
            <range v-model="arr[0].value"  :min="50" :max="210"></range>
          </div>
      </div>
      <div class="afxm"  :style="{bottom:arr[1].show?0:-200+'px'}">
          <h3>选择{{arr[1].title}}</h3>
          <div class="vuels">{{arr[1].title}}：{{arr[1].value}} {{arr[1].dw}}</div>
          <div class="sle">
            <range v-model="arr[1].value"  :min="0" :max="150"></range>
          </div>
      </div>
      <div class="afxm"  :style="{bottom:arr[2].show?0:-300+'px'}">
          <h3>选择{{arr[2].title}} <span class="span_btn" v-show="arr[2].value==0" @click="yuefs.value=true">选择月份</span> </h3>
          <div class="vuels">{{arr[2].title}}：{{arr[2].value}} {{arr[2].dw}}</div>
          <div class="sle">
            <range v-model="arr[2].value"  :min="0" :max="110"></range>
          </div>
          <!-- <div class="btn" @click="yuefs.value=true">选择月份</div> -->
      </div>
      <div class="afxm"  :style="{bottom:arr[3].show?0:-200+'px'}">
          <h3>选择{{arr[3].title}}</h3>
          <ul>
            <li @click="setValue('1',3,'男')">男</li>
            <li @click="setValue('2',3,'女')">女</li>
          </ul>
      </div>
      <div class="afxm"  :style="{bottom:arr[4].show?0:-200+'px'}">
          <h3>选择{{arr[4].title}}</h3>
          <ul>
            <li @click="setValue('1',4,'轻度')">轻度</li>
            <li @click="setValue('2',4,'中度')">中度</li>
            <li @click="setValue('3',4,'重度')">重度</li>
          </ul>
      </div>
      <div class="afxm"  :style="{bottom:arr[5].show?0:-400+'px'}">
          <h3>选择{{arr[5].title}}</h3>
          <ul>
            <li @click="setValue('0',5,'否')"><span style="color:red">否</span></li>
            <li @click="setValue('1',5,'早孕期')">早孕期</li>
            <li @click="setValue('2',5,'中孕期')">中孕期</li>
            <li @click="setValue('3',5,'晚孕期')">晚孕期</li>
            <li @click="setValue('4',5,'哺育期')">哺育期</li>
          </ul>
      </div>
      <div class="afxm"  :style="{bottom:yuefs.value?0:-800+'px'}">
          <h3>选择月份</h3>
          <ul class="textcenter">
            <li @click="yuefsGm(item)" v-for="item in 11">{{item}}月份</li>
            <li @click="yuefs.value=false" class="cancel">取消</li>
          </ul>
      </div>
    </div>
</template>
<script>
import { Popup, Rater, Range, Actionsheet } from "vux";
export default {
  components: {
    Rater,
    Range,
    Actionsheet
  },
  data() {
    return {
      yuefs: {
        value: false
      },
      zoom: false,
      kcal: "",
      arr: [
        {
          title: "身高",
          value: 0,
          val: true,
          dw: "cm",
          show: false
        },
        {
          title: "体重",
          value: 0,
          val: true,
          dw: "kg",
          show: false
        },
        {
          title: "年龄",
          value: 0,
          yue: 0,
          val: true,
          dw: "岁",
          show: false
        },
        {
          title: "性别",
          value: "请选择",
          val: "",
          show: false
        },
        {
          title: "劳力水平",
          value: "",
          val: "",
          show: false
        },
        {
          title: "孕妇选项",
          value: "",
          val: "",
          show: false
        }
      ]
    };
  },
  methods: {
    // 选择月份
    yuefsGm(val) {
      this.arr[2].yue = val;
      this.arr[2].show = false;
      this.zoom = this.arr[2].show = this.yuefs.value = false;
    },
    search() {
      // 查询所需要的kcal
      for (let i = 0; i < this.arr.length - 1; i++) {
        if (this.arr[i].val == "") {
          this.$vux.toast.show({
            type: "warn",
            text: "请完成选项后查询",
            width: "11em"
          });
          return;
        }
      }

      var d = {
        Height: this.arr[0].value,
        Weight: this.arr[1].value,
        Age: this.arr[2].value,
        Gender: this.arr[3].val,
        LaborLevel: this.arr[4].val,
        PregPeriod: this.arr[5].val
      };
      if (this.arr[2].value === 0 && this.arr[2].yue !== 0) {
        d.Age = this.arr[2].yue / 12;
      }
      this.$http({
        url: "/api/HealthyArchive/CalKcalNeed",
        type: "post",
        data: JSON.stringify(d),
        success: data => {
          if (data.Data == 0) {
            this.$vux.toast.show({
              type: "warn",
              text: "抱歉，没查询到信息",
              width: "12em"
            });
          }
          this.kcal = data.Data;
        },
        error: error => {}
      });
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
    setValue(val, i, v) {
      // 设置值
      this.arr[i].val = val;
      this.arr[i].value = v;
      this.arr[i].show = false;
      this.zoom = false;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.container {
  overflow: hidden;
  height: 100%;
}
.list {
  ul {
    width: 100%;
    li {
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      color: #555555;
      border-bottom: 1px solid #e3e3e3;
      div {
        padding: 0 15px;
        width: 100%;
        box-sizing: border-box;
        position: relative;
      }
      span {
        float: right;
        font-size: 13px;
        color: #aeaeae;
        display: block;
        position: absolute;
        top: 0;
        right: 15px;
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
  max-height: 100%;
  overflow: auto;
  z-index: 999;
  background: #fff;
  transition: all 0.5s;
  .btn {
    width: 200px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    margin: 0 auto;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
    background: #8dc13b;
    color: #fff;

    &:active {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    }
  }
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
.span_btn {
  float: right;
  background: #8dc13b;
  color: #fff;
  font-size: 14px;
  padding: 3px 7px;
  font-size: 12px;
}
.textcenter {
  text-align: center;

  .cancel {
    border-top: 10px solid #eee;
    box-sizing: content-box;
    border-bottom: 0;
  }
}
</style>



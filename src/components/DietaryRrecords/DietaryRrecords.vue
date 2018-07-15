<template>
    <div class="container">
        <div class="header">
          <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
          <div class="title" @click="setDate">{{date}} <i class="iconfont icon-xiala1"></i></div>
        </div>
      <scroller lock-x height="-45px"  ref="scrollerBottom">
          <div class="scroller_b">
              <div class="list">
                  <div class="tl"><i class="iconfont icon-zaocan1"></i>早餐</div>
                  <ul>
                      <li>辣椒炒肉<span>651kcal <i class="iconfont icon-shanchu1" @click="removeFn()"></i></span></li>
                      <li>辣椒炒肉<span>651kcal <i class="iconfont icon-shanchu1" @click="removeFn()"></i></span></li>
                  </ul>
              </div>
              <div class="list">
                  <div class="tl"><i class="iconfont icon-wucan"></i>午餐</div>
                  <ul>
                      <li>辣椒炒肉<span>651kcal <i class="iconfont icon-shanchu1" @click="removeFn()"></i></span></li>
                      <li>辣椒炒肉<span>651kcal <i class="iconfont icon-shanchu1" @click="removeFn()"></i></span></li>
                  </ul>
              </div>
              <div class="list">
                  <div class="tl"><i class="iconfont icon-wancan"></i>晚餐</div>
                  <ul>
                      <li>辣椒炒肉<span>651kcal <i class="iconfont icon-shanchu1" @click="removeFn()"></i></span></li>
                      <li>辣椒炒肉<span>651kcal <i class="iconfont icon-shanchu1" @click="removeFn()"></i></span></li>
                  </ul>
              </div>
              <div class="list">
                  <div class="tl"><i class="iconfont icon-buhang"></i>运动</div>
                  <ul>
                      <li>辣椒炒肉<span>651kcal <i class="iconfont icon-shanchu1" @click="removeFn()"></i></span></li>
                      <li>辣椒炒肉<span>651kcal <i class="iconfont icon-shanchu1" @click="removeFn()"></i></span></li>
                  </ul>
              </div>
          </div>
      </scroller>
      <actionsheet v-model="remove.value" :menus="remove.menu" @on-click-menu-delete="onDelete" show-cancel></actionsheet>
    </div>
</template>

<script>
import { Datetime, Actionsheet } from "vux";
export default {
  components: {
    Actionsheet,
    Datetime
  },
  data() {
    return {
      date: this.$getDate(0),
      remove: {
        value: false,
        menu: {
          "title.noop": "确定删除这一条饮食记录?",
          delete: '<span style="color:red">删除</span>'
        }
      }
    };
  },
  methods: {
    setDate() {
      // 设置日期
      this.$vux.datetime.show({
        value: this.date, // 其他参数同 props
        startDate: this.$getDate(-15),
        endDate: this.$getDate(0),
        onConfirm: value => {
          this.date = value;
          this.getList();
        },
        onHide() {},
        onShow() {}
      });
    },
    getList() {},
    removeFn() {
      this.remove.value = true;
    },
    onDelete() {
      // 删除
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.container {
  background: #f3f3f3;
  height: 100%;

  .icon-xiala1 {
    font-size: 14px;
    font-weight: 500;
    position: relative;
    top: -1px;
  }
  .scroller_b {
    padding-bottom: 30px;
  }
  .list {
    padding: 0 15px;
    box-sizing: border-box;
    background: #fff;
    margin-top: 25/2px;
    .tl {
      height: 40px;
      line-height: 40px;
      color: #7d7d7d;
      font-size: 32/2px;
      border-bottom: 1px solid #dcdcdc;

      .iconfont {
        color: #ef7d1d;
        margin-right: 10px;
        font-size: 30px;
      }
    }

    ul {
      height: auto;
      overflow: hidden;
      width: 100%;

      li {
        height: 40px;
        overflow: hidden;
        width: 100%;
        line-height: 40px;
        color: #717171;

        span {
          float: right;
          color: #8dc13b;

          i {
            font-size: 20px;
            color: #d81e06;
          }
        }
      }
    }
  }
}
</style>


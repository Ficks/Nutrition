<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
        <scroller lock-x height="-45px" ref="scrollerBottom">
            <div class="scroller_box refund_box">
                <div class="lt wz" @click="show=true">
                    咨询结果不满意
                    <span>{{d.value==''?'请选择':d.valName}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></span>
                </div>
                <div class="wz">
                    请输入文字描述
                </div>
                <div class="textarea_box">
                    <textarea v-model="d.text" placeholder="请在此输入退款原因描述..."></textarea>
                </div>
                <div class="submit_btn" @click="submit">提交评价</div>
            </div>
        </scroller>
        <Actionsheet v-model="show" :menus="menus" @on-click-menu="reason" show-cancel></Actionsheet>
    </div>
</template>
<script>
import { Actionsheet, Toast } from "vux";

export default {
  components: {
    Actionsheet,
    Toast
  },
  data() {
    return {
      d: {
        value: "",
        valName: "",
        text: ""
      },
      show: false,
      menus: {
        "0": "营养师不回复",
        "1": "咨询体验差",
        "2": "营养师不专业",
        "3": "咨询结果未带来帮助"
      }
    };
  },
  methods: {
    reason(key, val) {
      this.d.value = key;
      this.d.valName = val;
    },
    submit() {
      //state 0 是退款 1是提现

      if (this.d.value === "" || this.d.text === "") {
        this.$vux.toast.show({
          text: "请选择不满意理由并描述！",
          type: "text",
          width: "15em"
        });
        return false;
      }

      this.$http({
        url: "/api/Financial/OrderRefund",
        type: "post",
        data: {
          orderId: "00000000-0000-0000-0000-000000000000",
          reason: "string"
        },
        success: data => {},
        error: error => {}
      });
      this.$router.push({
        path: "/My/Property/State",
        query: {
          state: 0
        }
      });
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
  }
};
</script>
<style lang="less" scoped>
.container {
  background: #f3f3f3;
  height: 100%;
  overflow: auto;

  .refund_box {
    padding: 0 15px;
    box-sizing: border-box;

    .lt {
      border-bottom: 1px solid #e3e3e3;
    }
    .wz {
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      color: #555555;

      span {
        font-size: 13px;
        color: #aeaeae;
        float: right;

        i {
          font-size: 12px;
          color: #8a8a8a;
        }
      }
    }

    textarea {
      height: 426/2px;
      background: #fff;

      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #f3f3f3;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #f3f3f3;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #f3f3f3;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #f3f3f3;
      }
    }
  }
}
</style>
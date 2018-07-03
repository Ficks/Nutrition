<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
        <scroller lock-x height="-45px" ref="scrollerBottom">
            <div class="scroller_box refund_box">
                <div class="lt wz" @click="show=true">
                    本次咨询满意度
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
        "1": "非常不满意",
        "2": "不满意",
        "3": "满意",
        "4": "非常满意"
      }
    };
  },
  methods: {
    reason(key, val) {
      if (key == "cancel") return;
      this.d.value = key;
      this.d.valName = val;
    },
    submit() {
      //state 0 是退款 1是提现
      if (this.d.value === "") {
        this.$vux.toast.show({
          text: "请选择咨询满意度",
          type: "warn",
          width: "11em"
        });
        return false;
      }

      this.$http({
        url: "/api/Consultation/DietitianEvaluate",
        type: "get",
        data: {
          orderid: this.$route.query.id,
          score: this.d.value,
          content: this.d.text
        },
        success: data => {
          if (data.Code !== 20000) {
            this.$vux.toast.show({
              type: "warn",
              text: data.Error || data.Message,
              width: "13em"
            });
            return;
          }
          this.$router.push({
            path: "/Consultation/ChatYes"
          });
        },
        error: data => {}
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
        color: rgba(186, 186, 186, 1);
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgba(186, 186, 186, 1);
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgba(186, 186, 186, 1);
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: rgba(186, 186, 186, 1);
      }
    }
  }
}
</style>
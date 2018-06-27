<template>
    <div class="container">
        <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
    <scroller lock-x height="-45px" ref="scrollerBottom">
      <div class="scroller_box">
          <div class="logo">
            <img src="/static/images/logo.jpg" alt="">
        </div>
        <div class="login">
            <div class="list">
                <i class="iconfont icon-shouji"></i>
                <div class="abs">
                <input type="text" placeholder="请输入手机号码" v-model="tel">
                </div>
            </div>
            <div class="list">
                <i class="iconfont icon-suo"></i>
                <div class="abs">
                <input type="password" placeholder="请输入密码" v-model="password">
                </div>
            </div>

            <div class="submit_btn" @click="submit">登录</div>
        </div>
      </div>
    </scroller>
      
    </div>
</template>
<script>
import { Toast } from "vux";
export default {
  components: {
    Toast
  },
  data() {
    return {
      tel: "",
      password: ""
    };
  },
  methods: {
    submit() {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.tel)) {
        this.$vux.toast.show({
          text: "请输入正确的手机号码",
          type: "warn",
          width: "12em"
        });
        return false;
      }
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!uPattern.test(this.password)) {
        this.$vux.toast.show({
          text: "请输入4到16位（字母，数字，下划线，减号）",
          type: "warn",
          width: "12em"
        });
        return false;
      }

      this.$http({
        url: "/api/Consultation/DietitianLogin",
        type: "get",
        data: { mobile: this.tel, password: this.password },
        success: data => {
          //成功的处理
          if (data.Code == 20000) {
            this.$router.push({
              path: "/Dietitian/DietitianList"
            });
          } else {
            this.$vux.toast.show({
              type: "error",
              text: data.Error,
              width: "11em"
            });
          }
        },
        error: function() {
          //错误处理
        }
      });
    }
  },
  mounted() {
    this.$http({
      url: "/api/Consultation/DietitianLogin",
      type: "get",
      data: { mobile: "123456789", password: "xy123456" },
      success: data => {
        //成功的处理
        if (data.Code == 20000) {
          this.$router.push({
            path: "/Dietitian/DietitianList"
          });
        } else {
          this.$vux.toast.show({
            type: "error",
            text: data.Error,
            width: "11em"
          });
        }
      },
      error: function() {
        //错误处理
      }
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  background: #fff;

  .logo {
    width: 30%;
    margin: 35px auto;
  }

  .login {
    padding: 0 50px;
    box-sizing: border-box;
    .list {
      position: relative;
      i {
        position: absolute;
        left: 0;
        top: 0;
        line-height: 50px;
        color: #1a1a1a;
        font-size: 20px;
      }

      .abs {
        padding-left: 20px;
        width: 100%;
        box-sizing: border-box;
      }
      input {
        background: #fff;
        height: 90/2px;
        border-bottom: 1px solid #ddd;
        border-radius: 0;
      }
    }
  }

  .submit_btn {
    width: 100%;
    border-radius: 20px;
    font-size: 36/2px;
    line-height: 90/2px;
    height: 90/2px;
  }
}
</style>



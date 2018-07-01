<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Settings from "@/config/settings.js";
import { setTimeout } from "timers";
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    // $.ajax({
    //   url: "http://www.xyys.ltd/api/WeChat/MoniWeChatLogin",
    //   type: "get",
    //   data: {
    //     referid: "1",
    //     openid: "2",
    //     nickname: "3",
    //     headurl: "4"
    //   },
    //   success: function(data) {
    //     //成功的处理
    //     var d = {
    //       userid: data.Data.userid,
    //       Token: data.Token
    //     };
    //     _this.$store.commit("setLogin", d);
    //   },
    //   error: function() {
    //     //错误处理
    //   }
    // });
  }
};
</script>

<style lang="less">
// @import "~vux/src/styles/1px.less";
@media screen and(max-width: 320px) {
  .weui-grid {
    padding: 20px 0 !important;
  }
}
</style>
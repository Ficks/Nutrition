<template>
    <div class="container">
        <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
    <scroller lock-x height="-95px" @on-scroll-bottom="getList" ref="scrollerBottom">
      <div class="scroller_box bsxz">
         <div class="list_w">
           <div class="tx"><img src="/" alt=""></div>
           <div class="wz">
             <h2></h2>
             <p></p>
             <p></p>
           </div>
           <div class="btns">
             <div class="btn_m">新消息</div>
             <div class="btn_m">用户资料</div>
           </div>
         </div>
      </div>
    </scroller>
      
    </div>
</template>
<script>
export default {
  data() {
    return {
      listArr: [
        {
          name: "用户名",
          startTime: "04-15 15:21:00",
          endTime: "04-16 15:21:00"
        },
        {
          name: "用户名",
          startTime: "04-15 15:21:00",
          endTime: "04-16 15:21:00"
        },
        {
          name: "用户名",
          startTime: "04-15 15:21:00",
          endTime: "04-16 15:21:00"
        }
      ]
    };
  },
  methods: {
    getList() {
      // 列表
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  background: #fff;
}
</style>



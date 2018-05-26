<template>
    <div class="container">
         <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
      <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="content scroller_box">
          <h1 class="text-center">图文页面，内容待定</h1>
        </div>
      </scroller>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  box-sizing: border-box;
  .scroller_box {
    height: 100%;
    box-sizing: border-box;
  }
}
</style>


<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
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
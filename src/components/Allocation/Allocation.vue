<template>
    <div class="view">
      <div class="header"  v-if="$route.path==='/Allocation'">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right"></div>
      </div>
    <!-- 九宫格 -->
      <scroller lock-x height="-45px" ref="scrollerBottom" v-if="$route.path==='/Allocation'">
        <div class="grid_m scroller_box">
            <grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false">
              <template v-for="(item,index) in $router.options.routes" v-if="item.path===$route.path">
                  <grid-item :link="jtem.path" v-for="(jtem,index) in item.children" v-if="!jtem.hidden">
                      <i :class="jtem.icon"></i>
                      <span>{{jtem.name}}</span>
                  </grid-item>
              </template>
            </grid>
        </div>
      </scroller>
      <div class="view" v-if="$route.path!=='/Allocation'">
        <router-view></router-view>
      </div>
    </div>
</template>
<script>
import { Grid, GridItem } from "vux";
export default {
  components: {
    Grid,
    GridItem
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.view {
  height: 100%;
}
.grid_m {
  position: relative;
  box-sizing: border-box;
  padding-top: 30px;

  .weui-grids {
    &::before {
      display: none;
    }
    .weui-grid {
      &::after {
        display: none;
      }
    }
  }

  a {
    text-align: center;
    color: #666666;
    font-size: 14px;
    i {
      display: block;
      color: #8dc13b;
      font-size: 30px;
    }

    span {
      padding-top: 5px;
      display: block;
    }
  }
}
</style>

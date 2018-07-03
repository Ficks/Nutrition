<template>
    <div class="header_box">
        <!-- 底部导航 -->
      <tabbar class="nav_bom" v-model="index">
          <tabbar-item link="/">
          <div class="list" slot="label">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
            </div>
          </tabbar-item>
          <tabbar-item link="/Find">
          <div class="list" slot="label">
            <i class="iconfont icon-faxian"></i>
            <span>发现</span>
            </div>
          </tabbar-item>
          <tabbar-item>
          <div class="list add" slot="label" @click="openAlt(true)">
            <i class="iconfont icon-tianjia"></i>
            </div>
          </tabbar-item>
          <tabbar-item link="/Consultation">
          <div class="list" slot="label">
            <i class="iconfont icon-tuwenzixun"></i>
            <span>咨询</span>
            </div>
          </tabbar-item>
          <tabbar-item link="/My">
          <div class="list" slot="label">
            <i class="iconfont icon-wode-F"></i>
            <span>我的</span>
            </div>
          </tabbar-item>
      </tabbar>
      <div class="nav_bom_alt" :style="{bottom:navBottom+'px'}">
        <ul>
          <li>
            <router-link :to="{path:'/Tool/Recipes',query:{typevalue:1}}">
            <i class="iconfont icon-zaocan1"></i>
            <span>早餐</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{path:'/Tool/Recipes',query:{typevalue:2}}">
            <i class="iconfont icon-wucan"></i>
            <span>中餐</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{path:'/Tool/Recipes',query:{typevalue:3}}">
            <i class="iconfont icon-wancan"></i>
            <span>晚餐</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{path:'/Tool/Recipes',query:{typevalue:4}}">
            <i class="iconfont icon-lingshi"></i>
            <span>加餐</span>
            </router-link>
          </li>
          <li>
            <router-link to="/AddMotion">
            <i class="iconfont icon-buhang"></i>
            <span>运动</span>
            </router-link>
          </li>
        </ul>
        <div class="close" @click="openAlt(false)">
            <i class="iconfont icon-tianjia"></i>
        </div>
      </div>
      <div class="nav_bom_zoom" @click="navBottom=-300" v-show="navBottom===0"></div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  props: ["index"],
  components: {
    Tabbar,
    TabbarItem
  },
  computed: {},
  data() {
    return {
      navBottom: -300
    };
  },
  methods: {
    openAlt(isTrue) {
      if (isTrue) {
        this.navBottom = 0;
      } else {
        this.navBottom = -300;
      }
    }
  },
  mounted() {}
};
</script>

<style>
.header_box {
  position: fixed;
  z-index: 999;
  bottom: 0;
}
</style>

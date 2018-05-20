<template>
  <div>
      <tabbar class="nav_bom">
          <tabbar-item link="/" selected>
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
          <div class="list add" slot="label">
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
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>

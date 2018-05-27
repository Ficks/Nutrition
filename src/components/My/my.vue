<template>
    <div class="container">
        <!-- 底部导航 -->
        <tabbar class="nav_bom">
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
            <tabbar-item link="/My" selected>
            <div class="list" slot="label">
                <i class="iconfont icon-wode-F"></i>
                <span>我的</span>
                </div>
            </tabbar-item>
        </tabbar>
        <div class="nav_bom_alt" :style="{bottom:navBottom+'px'}">
            <ul>
            <li>
                <router-link to="/">
                <i class="iconfont icon-zaocan1"></i>
                <span>早餐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                <i class="iconfont icon-wucan"></i>
                <span>中餐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                <i class="iconfont icon-wancan"></i>
                <span>晚餐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                <i class="iconfont icon-lingshi"></i>
                <span>加餐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                <i class="iconfont icon-buhang"></i>
                <span>步行</span>
                </router-link>
            </li>
            </ul>
            <div class="close" @click="openAlt(false)">
                <i class="iconfont icon-tianjia"></i>
            </div>
        </div>
        <div class="nav_bom_zoom" @click="navBottom=-300" v-show="navBottom===0"></div>

        <div class="header">
            <div class="title">个人中心</div>
        </div>
        <div class="top_box">
          <div class="imgs">
            <img src="/static/images/tx.jpg" alt="">
          </div>
          <div class="wz">
            <h1>lok666</h1>
            <p>男 27岁</p>
          </div>
        </div>
        <div class="my_box">
            <scroller lock-x height="-210px"  ref="scrollerBottom">
            <div class="my_list scroller_box">
              <ul>
                <li><router-link to="/My/TodayArchives">今日档案<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/PersonalFiles">个人档案<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Collection">我的收藏<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Property">收支明细<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/MyAdvice">我的咨询<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
              </ul>
              <ul>
                <li><router-link to="/My/WalkIntoUs">走进我们<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Partner">合作伙伴<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="">营养师用户<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
              </ul>
            </div>
            </scroller>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  components: {
    Tabbar,
    TabbarItem
  },
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
  mounted() {
    console.log("当前页面API：" + this.$route.path);
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;

  .top_box {
    padding: 30px 25px;
    padding-top: 10px;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    background: #8dc13b;

    .imgs {
      width: 70px;
      height: 70px;
      overflow: hidden;
      border-radius: 50%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .wz {
      float: left;
      margin-left: 15px;
      color: #fff;

      h1 {
        font-size: 18px;
        padding: 5px 0;
        font-weight: 500;
      }
      p {
        font-size: 18px;
      }
    }
  }

  .my_list {
    ul {
      height: auto;
      overflow: hidden;
      padding: 0 15px;
      padding-bottom: 20px;

      li {
        height: 95/2px;
        line-height: 95/2px;
        border-bottom: 1px solid #e3e3e3;
        a {
          display: block;
          color: #555555;
          font-size: 15px;

          i {
            float: right;
            color: #8b8b8b;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>

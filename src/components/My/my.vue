<template>
    <div class="container">
        <!-- 底部导航 -->
        <Menu :index="4"></Menu>
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
                <li><router-link to="/My/PersonalFiles">我的资料<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Collection">我的收藏<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Property">收支明细<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/MyAdvice">我的咨询<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
              </ul>
              <ul>
                <li><router-link to="/My/WalkIntoUs">走进我们<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Partner">合作伙伴<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/Dietitian">营养师用户<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
              </ul>
            </div>
            </scroller>
        </div>
    </div>
</template>
<script>
import Menu from "../Common/Menu.vue";
export default {
  components: {
    Menu
  },
  data() {
    return {};
  },
  methods: {},
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

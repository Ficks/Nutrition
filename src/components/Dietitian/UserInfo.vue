<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
        <div class="my_box">
            <scroller lock-x height="-45px"  ref="scrollerBottom">
            <div class="my_list scroller_box">
              <ul>
                <li><router-link :to="{path:'/My/PersonalData',query:{id:$route.query.id}}">用户资料<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link :to="{path:'/My/TodayArchives',query:{id:$route.query.id}}">今日档案<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link :to="{path:'/My/PersonalFiles',query:{id:$route.query.id}}">个人档案<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
              </ul>
            </div>
            </scroller>
        </div>
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

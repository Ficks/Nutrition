<template>
    <div class="container">
        <!-- 底部导航 -->
        <Menu :index="4"></Menu>
        <div class="header">
            <div class="title">个人中心</div>
        </div>
        <div class="top_box">
          <div class="imgs">
            <img :src="getLogin.headurl" alt="">
          </div>
          <div class="wz">
            <h1>{{getLogin.username}}</h1>
            <p>{{details.sexname+' '+details.age}}</p>
          </div>
        </div>
        <div class="my_box">
            <scroller lock-x height="-210px"  ref="scrollerBottom">
            <div class="my_list scroller_box">
              <ul>
                <li><router-link to="/My/TodayArchives">今日档案<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/PersonalFiles">个人档案<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/PersonalData">我的资料<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Collection">我的收藏<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Property">收支明细<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/MyAdvice">我的咨询<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
              </ul>
              <ul>
                <li><router-link to="/My/WalkIntoUs">使用说明<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li><router-link to="/My/Partner">合作伙伴<i class="iconfont icon-chanpinxiangqing_qianwang"></i></router-link></li>
                <li @click="isLogin">咨询师<i class="iconfont icon-chanpinxiangqing_qianwang"></i></li>
              </ul>
            </div>
            </scroller>
        </div>
    </div>
</template>
<script>
import Menu from "../Common/Menu.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Menu
  },
  computed: {
    ...mapGetters(["getLogin"])
  },
  data() {
    return {
      details: {
        name: "",
        sexname: "",
        age: ""
      }
    };
  },
  methods: {
    isLogin() {
      this.$http({
        url: "/api/Consultation/IsDietitianLogin",
        type: "get",
        success: data => {
          if (data.Code == 20000) {
            this.$router.push({
              path: "/Dietitian/DietitianList"
            });
          } else {
            this.$router.push({
              path: "/Dietitian"
            });
          }
        },
        error: error => {}
      });
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    this.$http({
      url: "/api/HealthyArchive/GetPersonalHealthyArchive",
      type: "get",
      success: data => {
        //成功的处理
        console.log(data);
        this.details = data.Data;
        if (this.details.age < 1) {
          this.details.age = Math.round(this.details.age * 12) + "个月";
        } else {
          this.details.age += "岁";
        }
      },
      error: function() {
        //错误处理
      }
    });
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
        color: #555;
        font-size: 15px;
        a {
          display: block;
          color: #555555;
          font-size: 15px;
        }
        i {
          float: right;
          color: #8b8b8b;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

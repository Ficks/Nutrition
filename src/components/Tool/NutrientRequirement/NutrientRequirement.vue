<template>
    <div class="container">
      <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
      </div>
     
      <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="box scroller_box">
            <p class="userinfotip" v-if="!userInfo">用户信息不完善，请前往 <router-link to="/My/PersonalData">个人中心</router-link> 完善信息</p>
            <ul v-if="userInfo">
                <li v-for="(item,index) in listArr">
                    <div class="left">{{item.name}}</div>
                    <div class="right">{{item.value+item.unit}}</div>
                </li>
            </ul>
        </div>
      </scroller>

    </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: true,
      listArr: []
    };
  },
  methods: {
    getList() {
      this.$http({
        url: "/api/HealthyArchive/GetNutrientStandard",
        type: "get",
        success: data => {
          //成功的处理
          if (data.Code == 9005) {
            this.userInfo = false;
          } else {
            this.setData(data.Data);
          }
        },
        error: function() {
          //错误处理
        }
      });
      //   获取数据
    },
    setData(data) {
      this.listArr = data;
    }
  },
  mounted() {
    this.$vux.toast.show({
      type: "text",
      text: "默认查询本人，如需查询其他人，请更新个人资料",
      width: "11em"
    });
    this.getList();
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  background: #f9f9f9;
}

.box {
  padding: 0 20px;
  padding-bottom: 30px;
  li {
    height: auto;
    overflow: hidden;
    line-height: 45px;

    .left {
      float: left;
      color: #494949;
      font-size: 16px;
      font-weight: 550;
    }
    .right {
      float: right;
      color: #666;
      font-weight: 550;
      font-size: 16px;
    }
  }
}
.afxm {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
  transition: all 0.5s;

  h3 {
    padding: 10px;
    font-size: 16px;
    color: #333;
  }
  .sle {
    position: relative;
    left: -15px;
    margin-top: 30px;
    height: 50px;
  }
  .vuels {
    text-align: center;
  }

  ul {
    li {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 14px;
      border-bottom: #ddd 1px solid;
      color: #666;

      &:hover {
        background: #ddd;
      }
    }
  }
}
.select {
  width: 60%;
  margin: 20px auto;
  margin-bottom: 30px;
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background: #8dc13b;
  position: relative;

  &:active {
    background: #ddd;
  }

  .iconfont {
    position: absolute;
    right: 10px;
    font-size: 18px;
  }
}
.userinfotip {
  color: #666;
  font-size: 14px;
  padding: 20px;
  box-sizing: border-box;
}
</style>


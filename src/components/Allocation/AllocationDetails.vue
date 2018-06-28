<template>
    <div class="container">
       <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
      <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="scroller_box">
          <div class="details">
              <div class="title">
                  <h1>{{details.title}}</h1>
                  <p>发布时间：{{details.date}} 作者：{{details.author}}</p>
              </div>
              <div class="content" v-html="details.text">
              </div>
          </div>
        </div>
      </scroller>
    </div>
</template>
<script>
export default {
  data() {
    return {
      details: {}
    };
  },
  methods: {
    getDetails() {
      // 判断是那个权限
      var t = 1;
      if (this.$route.path == "/Allocation/NormalDdult") {
        t = 1;
      } else if (this.$route.path == "/Allocation/Baby") {
        t = 2;
      } else if (this.$route.path == "/Allocation/YoungPeople") {
        t = 3;
      } else if (this.$route.path == "/Allocation/Aged") {
        t = 4;
      } else if (this.$route.path == "/Allocation/PregnantWoman") {
        t = 5;
      } else if (this.$route.path == "/Allocation/Vegetarian") {
        t = 6;
      } else if (this.$route.path == "/Allocation/Disease") {
        t = 7;
      } else if (this.$route.path == "/Allocation/FamilyDinner") {
        t = 8;
      } else if (this.$route.path == "/My/WalkIntoUs") {
        t = 9;
      } else if (this.$route.path == "/My/Partner") {
        t = 10;
      } else if (this.$route.path == "/Tool/DietaryReference") {
        t = 11;
      }

      this.$http({
        url: "/api/NewsInfo/GetNewsDetailData",
        type: "get",
        data: { type: t },
        success: data => {
          //成功的处理
          console.log(data);
          this.details = data.Data;
        },
        error: function() {
          //错误处理
        }
      });
      setTimeout(() => {
        this.$refs.scrollerBottom.reset({ top: 0 });
      });
    }
  },
  mounted() {
    this.getDetails();
  }
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  .scroller_box {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
  }
  .details {
    padding: 0 20px;
    .title {
      text-align: center;
      h1 {
        font-size: 18px;
        color: #545454;
        margin-top: 15px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        color: #b3b3b3;
      }
    }

    .content {
      color: #666666;
      font-size: 14px;
      line-height: 26px;
      text-indent: 2em;

      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>

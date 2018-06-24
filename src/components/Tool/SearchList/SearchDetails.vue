<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{title}}</div>
        <div class="right"></div>
      </div>
      <scroller lock-x height="-45px"   ref="scrollerBottom">
        <div class="scroller_box">
          <div class="top">
            <div class="twbm">
                  <div class="img">
                      <img :src="details.src" alt="">
                  </div>
                  <div class="wz">
                      <h1>{{details.title}}</h1>
                      <p>{{details.kcal}}</p>
                  </div>
              </div>
              <div class="desc">
                  <p>禁忌：<span v-for="item in details.taboo">{{item.Value}}</span></p>
                  <p>适宜：<span>{{details.suitable}}</span></p>
              </div>
          </div>
          <h2 class="title_hb">
              描述
          </h2>
          <div class="describe">
              <p><i class="iconfont icon-jieyibiaozhi1"></i>{{details.describe}}</p>
          </div>
          <h2 class="title_hb">
              所含营养素
              <span>每100g</span>
          </h2>
          <div class="box_list">
              <ul>
                  <li v-for="item in details.nutrientarr">
                      {{item.name}}
                      <span>{{item.value+item.unit}}</span>
                  </li>
              </ul>
          </div>
          <h2 class="title_hb" v-if="$route.query.path==='/Tool/MaterialRetrieval'">
              微量元素
          </h2>
          <div class="box_list" v-if="$route.query.path==='/Tool/MaterialRetrieval'">
              <ul>
                  <li v-for="item in details.taboo">
                      {{item.title}}
                      <span>{{item.value}}</span>
                  </li>
              </ul>
          </div>
          <div class="submit_btn" @click="openBom(true)" v-if="title!='过敏食物添加'">添加到今日饮食</div>
          <div class="submit_btn" @click="openBom(true)" v-else>添加到过敏食物</div>
        </div>
      </scroller>
        

      <div class="nav_bom_zoom" @click="openBom(false)" v-show="detailsFix===0"></div>
      <div class="details_fix" :style="{bottom:detailsFix+'px'}">
        <div class="top">
          {{date}}
          <span @click="openBom(false)">取消</span>
        </div>
        <div class="twbm">
            <div class="img">
                <img :src="details.src" alt="">
            </div>
            <div class="wz">
                <h1>{{details.title}}</h1>
                <p>{{details.kcal}} <span @click="openBom(false)">详情></span></p>
            </div>
        </div>
        
        <div class="s">
          <div class="z">
            <span>{{details.kcal}}</span>
            {{grams+`g(${grams / 50}两)`}}
          </div>
          <div class="kdc">
            <range v-model="grams"  :min="1" :max="1000"></range>
          </div>
        </div>

        <div class="submit_btn" @click="addJrys">完成</div>
      </div>
    </div>
</template>
<script>
import { Rater, Range, Toast } from "vux";

export default {
  components: {
    Rater,
    Range,
    Toast
  },
  data() {
    return {
      title: "",
      api: "/api/HealthyDiet/AddToTodaysDiet",
      detailsFix: -500,
      grams: 100,
      date: "",
      details: {}
    };
  },
  methods: {
    getDetails() {
      var _this = this;
      var api = this.$route.query.path;

      console.log("当前页面API：" + this.$route.path);
      console.log("详情页面数据：", this.details);
      console.log("这个页面可以变成添加过敏食物的页面");
      if (api === "/Tool/Recipes") {
        this.title = "食谱大全";
      } else if (api === "/Tool/MaterialRetrieval") {
        this.title = "食材大全";
      } else if (api === "/My/PersonalFiles/AllergicFood") {
        this.title = "过敏食物添加";
      } else {
        this.title = "其他食品";
      }
      // 获取信息

      this.$http({
        url: "/api/HealthyDiet/GetDishesDetail",
        type: "get",
        data: { id: this.$route.query.id },
        success: function(data) {
          //成功的处理
          _this.setData(data.Data);
        },
        error: function() {
          //错误处理
        }
      });
    },
    setData(data) {
      // 设置详情
      this.details = data;
      this.details.src = this.$route.query.src;
    },
    // 打开底部
    openBom(isTrue) {
      if (this.title == "过敏食物添加") {
        this.api = "/api/HealthyDiet/AddToAllergyFood";
        this.addJrys();
        return;
      }
      if (isTrue) {
        // 添加食物
        this.detailsFix = 0;
      } else {
        this.detailsFix = -500;
      }
    },
    // 加入饮食
    addJrys() {
      var _this = this;
      var d = { id: this.details.id };
      if (this.title != "过敏食物添加") {
        d.grams = this.grams;
      }
      this.detailsFix = -500;
      this.$http({
        url: this.api,
        type: "post",
        data: JSON.stringify(d),
        success: function(data) {
          console.log(data);
          //成功的处理
          _this.$vux.toast.show({
            text: data.Message,
            width: "10em"
          });
        },
        error: function() {
          //错误处理
        }
      });
    }
  },
  mounted() {
    this.getDetails();
    var date = new Date();
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    var r = date.getDate();
    this.date = year + "-" + mouth + "-" + r;
  }
};
</script>
<style lang="less">
.container {
  height: 100%;
  background: #f9f9f9;
  box-sizing: border-box;

  .scroller_box {
    height: 100%;
    padding-bottom: 40px;
    box-sizing: border-box;
  }
  .top {
    box-sizing: border-box;
    padding: 0 20px;

    .desc {
      padding: 10px 0;
      line-height: 26px;
      color: #494949;
      font-size: 16px;

      span {
        margin-right: 8px;
        color: #666666;
      }
    }
  }

  .title_hb {
    text-align: left;
    background: #cedfb3;
    font-size: 16px;
    color: #494949;
    height: 33px;
    line-height: 33px;
    padding: 0 20px;
    span {
      float: right;
      font-weight: 500;
    }
  }
  .describe {
    height: auto;
    overflow: hidden;
    padding: 20px 0;
    i {
      font-size: 50px;
      display: block;
      float: left;
      padding-left: 30px;
      color: #ef7d1d;
      padding-right: 20px;
      height: 90px;
      padding-top: 17px;
    }
    p {
      padding-right: 50px;
      color: #666666;
      font-size: 16px;
      line-height: 26px;
    }
  }

  .box_list {
    padding: 10px 20px;
    box-sizing: border-box;

    ul {
      height: auto;
      overflow: hidden;
    }

    li {
      line-height: 35px;
      font-size: 16px;
      color: #494949;

      span {
        float: right;
        color: #666666;
      }
    }
  }

  .twbm {
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 15px 0;
    box-sizing: border-box;

    .img {
      width: 120px;
      height: auto;
    }
    .wz {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      min-width: 0;
      padding-left: 20px;

      h1 {
        font-weight: 500;
        color: #494949;
        font-size: 17px;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        word-wrap: break-word;
        word-break: break-all;
      }
      p {
        font-size: 14px;
        color: #666666;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        word-wrap: break-word;
        word-break: break-all;
        margin-top: 10px;
      }
    }
  }
  .details_fix {
    transition: all 0.5s;
    position: fixed;
    padding: 15px;
    box-sizing: border-box;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    overflow: hidden;

    .top {
      position: relative;
      text-align: center;
      font-size: 15px;
      color: #8dc13b;
      span {
        position: absolute;
        right: 0;
        font-size: 15px;
        color: #666666;
      }
    }
    .img {
      border: 1px solid #ededed;
    }
    .wz {
      p {
        span {
          float: right;
          font-size: 15px;
          color: #a5a5a5;
        }
      }
    }
    .s {
      margin-top: 10px;
      margin-bottom: 50px;

      .z {
        position: relative;
        text-align: center;
        height: 40px;
        font-size: 15px;
        line-height: 40px;
        color: #8dc13b;
        margin-bottom: 20px;

        span {
          position: absolute;
          left: 0;
          color: #666666;
          font-size: 15px;
        }
      }
      .kdc {
        position: relative;
        left: -15px;
      }
    }
  }
}
</style>

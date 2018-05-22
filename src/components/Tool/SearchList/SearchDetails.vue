<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{title}}</div>
        <div class="right"></div>
      </div>
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
                <p>禁忌：<span>{{details.taboo}}</span></p>
                <p>适宜：<span>{{details.suitable}}</span></p>
            </div>
        </div>
        <h2 class="title_hb">
            描述
        </h2>
        <div class="describe">
            <p><i class="iconfont icon-jieyibiaozhi1"></i>辣椒炒肉，这道色香味俱全的菜肴，是湖南人每家每户必吃的招牌土菜，是最具代表性的湘菜之一。</p>
        </div>
        <h2 class="title_hb">
            所含营养素
            <span>每100g</span>
        </h2>
        <div class="box_list">
            <ul>
                <li v-for="item in details.nutrientArr">
                    {{item.title}}
                    <span>{{item.value}}</span>
                </li>
            </ul>
        </div>
        <h2 class="title_hb" v-if="$route.query.path==='/Tool/MaterialRetrieval'">
            微量元素
        </h2>
        <div class="box_list" v-if="$route.query.path==='/Tool/MaterialRetrieval'">
            <ul>
                <li v-for="item in details.traceElementArr">
                    {{item.title}}
                    <span>{{item.value}}</span>
                </li>
            </ul>
        </div>
        <div class="submit_btn" @click="openBom(true)">添加到今日饮食</div>

      <div class="nav_bom_zoom" @click="openBom(false)" v-show="detailsFix===0"></div>
      <div class="details_fix" :style="{bottom:detailsFix+'px'}">
        <div class="top">
          2018-05-22
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
            <span>54.0kcal</span>
            {{datakcal+`g(${datakcal / 50}两)`}}
          </div>
          <div class="kdc">
            <range v-model="datakcal"  :min="1" :max="1000"></range>
          </div>
        </div>

        <div class="submit_btn" @click="addJrys">完成</div>
      </div>
    </div>
</template>
<script>
import { Rater, Range } from "vux";

export default {
  components: {
    Rater,
    Range
  },
  data() {
    return {
      title: "",
      detailsFix: -500,
      datakcal: 100,
      details: {
        title: "辣椒炒肉辣椒炒肉辣椒炒肉",
        src: "/static/images/searchm.jpg",
        kcal: "131kcal(100g)",
        taboo: "糖尿病、冠心病",
        suitable: "一般人群",
        describe:
          "辣椒炒肉，这道色香味俱全的菜肴，是湖南人每家每户必吃的招牌土菜，是最具代表性的湘菜之一。",
        nutrientArr: [
          {
            title: "热量",
            value: "131kcal"
          },
          {
            title: "蛋白质",
            value: "2.05g"
          },
          {
            title: "脂肪",
            value: "7.05g"
          },
          {
            title: "碳水化合物",
            value: "6.05g"
          },
          {
            title: "6.05g",
            value: "5.05mg"
          }
        ],
        traceElementArr: [
          {
            title: "热量2",
            value: "131kcal"
          },
          {
            title: "蛋白质3",
            value: "2.05g"
          },
          {
            title: "脂肪4",
            value: "7.05g"
          },
          {
            title: "碳水化合物5",
            value: "6.05g"
          },
          {
            title: "666",
            value: "5.05mg"
          }
        ]
      }
    };
  },
  methods: {
    getDetails() {
      var api = this.$route.query.path;
      console.log(api);
      if (api === "/Tool/Recipes") {
        this.title = "食谱大全";
      } else if (api === "/Tool/MaterialRetrieval") {
        this.title = "食材大全";
      } else {
        this.title = "其他食品";
      }
      // 获取信息
      console.log(this.$route.query.path);
    },
    // 打开底部
    openBom(isTrue) {
      if (isTrue) {
        this.detailsFix = 0;
      } else {
        this.detailsFix = -500;
      }
    },
    // 加入饮食
    addJrys() {
      this.detailsFix = -500;
    }
  },
  mounted() {
    this.getDetails();
  }
};
</script>
<style lang="less">
.container {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background: #f9f9f9;
  .top {
    box-sizing: border-box;
    padding: 0 20px;

    .desc {
      padding: 10px 0;
      line-height: 26px;
      color: #494949;
      font-size: 16px;

      span {
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
      height: 80px;
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

<template>
    <div class="container">
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
            
            <p><i class="iconfont icon-jieyibiaozhi1"></i>辣椒炒肉，这道色香味俱全的菜肴，
是湖南人每家每户必吃的招牌土菜，
是最具代表性的湘菜之一。</p>
        </div>
        <h2 class="title_hb">
            所含营养素
            <span>每100g</span>
        </h2>
        <div class="box_list">
            <ul>
                <li v-for="item in details.arr">
                    {{item.title}}
                    <span>{{item.value}}</span>
                </li>
            </ul>
        </div>
        
        <div class="submit">
            添加到今日饮食
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      details: {
        title: "辣椒炒肉辣椒炒肉辣椒炒肉",
        src: "/static/images/searchm.jpg",
        kcal: "131kcal(100g)",
        taboo: "糖尿病、冠心病",
        suitable: "一般人群",
        describe:
          "辣椒炒肉，这道色香味俱全的菜肴，是湖南人每家每户必吃的招牌土菜，是最具代表性的湘菜之一。",
        arr: [
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
        ]
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less">
.container {
  height: 100%;
  background: #f9f9f9;
  .top {
    box-sizing: border-box;
    padding: 0 20px;
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
    }
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
  .submit {
    width: 80%;
    margin: 0 auto;
    height: 37px;
    line-height: 37px;
    background: #8dc13b;
    text-align: center;
    color: #fff;
    font-size: 16px;
    border-radius: 6px;
    margin-top: 10px;
  }
}
</style>

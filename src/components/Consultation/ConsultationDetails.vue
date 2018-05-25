<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>

        <scroller lock-x height="-125px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
            <div class="srcoll_box">
              <div class="info">
                <div class="top">
                  <div class="img">
                    <img :src="details.src" alt="">
                  </div>
                  <div class="wz">
                    <h1>{{details.name}}</h1>
                    <h2>{{details.experience}}</h2>
                    <p>{{details.company}}</p>
                  </div>
                </div>
                <div class="bom">
                  <div class="bom_list">
                    <div class="ws"><span>{{details.serviceNum}}</span>次</div>
                    <p>服务次数</p>
                  </div>
                  <div class="bom_list">
                    <div class="ws"><span>{{details.fabulousNum}}</span>次</div>
                    <p>点赞次数</p>
                  </div>
                </div>
            </div>

              <div class="content">
                <div class="list">
                  <h2>擅长领域</h2>
                  <p>{{details.technology}}</p>
                </div>
                <div class="list">
                  <h2>医学教育背景</h2>
                  <p>{{details.education}}</p>
                </div>

                <div class="pt_title">
                  患者评价<span>({{listArrLen}})</span>
                </div>
                <div class="pj_box" v-for="(item,index) in listArr">
                  <div class="pj_list">
                    <div class="pj_xq">
                      <div class="xt">{{index+1}}楼<span>{{item.accord}}</span></div>
                      <div class="xt date">{{item.date}}</div>
                    </div>
                      <p>{{item.text}}</p>
                  </div>
                </div>
              </div>

            <load-more tip="loading" v-show="loading"></load-more>
            </div>
        </scroller>
        

        <div class="fixbom submit">
            图文咨询（50元/次）
            <p>单次咨询为12小时</p>
        </div>
    </div>
</template>
<script>
import { Scroller, LoadMore } from "vux";
import { setTimeout } from "timers";
export default {
  components: {
    Scroller,
    LoadMore
  },
  data() {
    return {
      loading: false,
      details: {
        src: "/static/images/ystx.jpg",
        name: "陈博士",
        experience: "十年经验",
        company: "中南大学医学院",
        serviceNum: "10000",
        fabulousNum: "10000",
        technology:
          "进行膳食调查和评价、人体营养状况测定和评价营养咨询和教育、膳食指导和评估、食品营养评价社  区营养管理和营养干预、",
        education:
          "进行膳食调查和评价、人体营养状况测定和评价营养咨询和教育、膳食指导和评估、食品营养评价社区营养管理和营养干预、"
      },
      listArrLen: 300,
      listArr: [
        {
          accord: "很满意",
          date: "5月15日",
          text: "陈医生的解答很有耐心，非常好的平台！感谢！"
        },
        {
          accord: "很满意",
          date: "5月15日",
          text: "陈医生的解答很有耐心，非常好的平台！感谢！"
        },
        {
          accord: "很满意",
          date: "5月15日",
          text: "陈医生的解答很有耐心，非常好的平台！感谢！"
        }
      ]
    };
  },
  methods: {
    getList() {
      // 获取评论列表
      if (this.loading) {
        // do nothing
      } else {
        this.loading = true;
        setTimeout(() => {
          this.listArr.push(
            {
              accord: "很满意",
              date: "5月15日",
              text: "陈医生的解答很有耐心，非常好的平台！感谢！"
            },
            {
              accord: "很满意",
              date: "5月15日",
              text: "陈医生的解答很有耐心，非常好的平台！感谢！"
            },
            {
              accord: "很满意",
              date: "5月15日",
              text: "陈医生的解答很有耐心，非常好的平台！感谢！"
            }
          );
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          this.loading = false;
        }, 2000);
      }
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    console.log("详情数据：", this.details);
    console.log("评论列表数据：", this.listArr);
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .info {
    height: auto;
    overflow: hidden;
    padding: 10px 40px 20px 40px;
    background: #8dc13b;
    .top {
      height: auto;
      overflow: hidden;
    }
    .img {
      width: 75px;
      height: 75px;
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
      margin-left: 12px;
      color: #fff;
      font-size: 16px;
      box-sizing: border-box;

      h1 {
        font-size: 18px;
        font-weight: 500;
      }
      h2 {
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 8px;
      }
      p {
        font-size: 16px;
      }
    }

    .bom {
      width: 100%;
      height: auto;
      margin-top: 25px;
      overflow: hidden;
      color: #fff;

      .bom_list {
        text-align: center;
        width: 50%;
        float: left;
        font-size: 15px;

        span {
          font-size: 18px;
        }
      }
    }
  }

  .content {
    padding: 0 20px;
    box-sizing: border-box;

    .list {
      padding: 15px 0;
      border-bottom: 1px solid #e6e6e6;
      h2 {
        font-size: 16px;
        color: #545454;
        font-weight: 500;
        margin-bottom: 15px;
      }
      p {
        font-size: 15px;
        color: #666;
      }
    }

    .pt_title {
      border-bottom: 1px solid #e6e6e6;
      height: 40px;
      color: #545454;
      line-height: 40px;
      font-size: 14px;
      span {
        color: #ef7d1d;
      }
    }

    .pj_box {
      .pj_list {
        padding: 15px 0;
        border-bottom: 1px solid #e6e6e6;
        .pj_xq {
          margin-bottom: 15px;
          height: auto;
          overflow: hidden;
          div {
            float: left;
            font-size: 15px;
            color: #545454;
            span {
              color: #8dc13b;
              font-size: 13px;
            }
          }
          .date {
            color: #666666;
            float: right;
            font-size: 13px;
          }
        }

        p {
          font-size: 15px;
          color: #666666;
        }
      }
    }
  }

  .fixbom {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    height: 60px;
    background: #8dc13b;
    padding-top: 10px;
    box-sizing: border-box;

    p {
      font-size: 13px;
      color: #ddd;
    }
  }
}
</style>
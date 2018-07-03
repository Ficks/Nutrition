<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="back"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>

        <scroller lock-x height="-125px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
            <div class="srcoll_box">
              <div class="info">
                <div class="top">
                  <div class="img">
                    <img :src="details.HeadImg" alt="">
                  </div>
                  <div class="wz">
                    <h1>{{details.Name}}</h1>
                    <h2>{{details.Experience}}经验</h2>
                    <p>{{details.Company}}</p>
                  </div>
                </div>
                <div class="bom">
                  <div class="bom_list">
                    <div class="ws"><span>{{details.ServiceTimes}}</span>次</div>
                    <p>服务次数</p>
                  </div>
                  <div class="bom_list">
                    <div class="ws"><span>{{details.PraiseCount}}</span>次</div>
                    <p>点赞次数</p>
                  </div>
                </div>
            </div>

              <div class="content">
                <div class="list">
                  <h2>擅长领域</h2>
                  <p>{{details.GoodAt}}</p>
                </div>
                <div class="list">
                  <h2>医学教育背景</h2>
                  <p>{{details.EducationalBackground}}</p>
                </div>

                <div class="pt_title">
                  患者评价<span>({{searchVal.len}})</span>
                </div>
                <div class="pj_box" v-for="(item,index) in listArr">
                  <div class="pj_list">
                    <div class="pj_xq">
                      <div class="xt">{{index+1}}楼 <span>{{item.Score | haoping}}</span></div>
                      <div class="xt date">{{item.CreateDate | mouthTimeGsh}}</div>
                    </div>
                      <p>{{item.Content}}</p>
                  </div>
                </div>
              </div>
            
            <p class="lgss">{{searchVal.uptext}}</p>
            <load-more tip="loading" v-show="loading"></load-more>
            </div>
        </scroller>
        
        <actionsheet v-model="payment.value" :menus="payment.menu" @on-click-menu="paymentFn" show-cancel></actionsheet>

        <div class="fixbom submit" @click="payment.value=true">
            图文咨询（{{details.Price}}元/次）
            <p>单次咨询为12小时</p>
        </div>
    </div>
</template>
<script>
import { LoadMore, Actionsheet, Loading } from "vux";
import { setTimeout, setInterval } from "timers";
export default {
  components: {
    LoadMore,
    Actionsheet,
    Loading
  },
  filters: {
    haoping(item) {
      if (item == 1) {
        return "一星差评";
      } else if (item == 2) {
        return "两星差评";
      } else if (item == 3) {
        return "三星中评";
      } else if (item == 4) {
        return "四星好评";
      } else if (item == 5) {
        return "五星好评";
      }
    }
  },
  data() {
    return {
      loading: false,
      searchVal: {
        pageNum: 0,
        pageSize: 10,
        len: 300,
        uptext: "滑动获取更多评论"
      },
      payment: {
        value: false,
        menu: {
          "payment.noop": "请选择支付方式",
          price: "",
          integral: ""
        }
      },
      details: {
        src: "/static/images/ystx.jpg",
        name: "陈博士",
        price: 50,
        integral: 1000,
        experience: "十年经验",
        company: "中南大学医学院",
        serviceNum: "10000",
        fabulousNum: "10000",
        technology:
          "进行膳食调查和评价、人体营养状况测定和评价营养咨询和教育、膳食指导和评估、食品营养评价社  区营养管理和营养干预、",
        education:
          "进行膳食调查和评价、人体营养状况测定和评价营养咨询和教育、膳食指导和评估、食品营养评价社区营养管理和营养干预、"
      },
      listArr: []
    };
  },
  methods: {
    init() {
      this.payment.menu.price = `<span style='color:#8dc13b'>微信支付 (${
        this.details.Price
      }元)</span>`;
      this.payment.menu.integral = `积分支付 (${this.details.integral})`;
    },
    paymentFn(key) {
      // 向服务端发送支付请求
      if (key == "price") {
        console.log("发起微信支付");
        this.$http({
          url: "/api/WeChat/GetWCPayRequestParams",
          type: "post",
          data: JSON.stringify({ DietitianId: this.$route.query.id }),
          success: data => {
            console.log("调用了微信支付接口");
            console.log(data);
            // 调用微信支付
            if (data.Code !== 20000) {
              this.$vux.toast.show({
                type: "warn",
                text: data.Error || data.Message
              });
              return;
            }

            data = JSON.parse(data.Data);
            this.WeChatZf(data);
          },
          error: data => {
            console.log("微信支付错误");
            console.log(data);
          }
        });
      } else if (key == "integral") {
        // 积分支付
        this.$http({
          url: "/api/WeChat/JFPay",
          type: "post",
          data: JSON.stringify({
            DietitianId: this.details.Id
          }),
          success: data => {
            if (data.Code === 20000) {
              this.$router.push({
                path: "/Consultation/State",
                query: {
                  mode: 0,
                  success: 1,
                  name: this.details.Name,
                  id: this.details.UserId
                }
              });
            } else {
              this.$router.push({
                path: "/Consultation/State",
                query: {
                  mode: 1,
                  success: 0,
                  name: this.details.Name,
                  id: this.details.UserId
                }
              });
              this.$vux.toast.show({
                type: "error",
                text: data.Message
              });
            }
          },
          error: error => {}
        });
      }
    },
    WeChatZf(data) {
      var _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, //公众号名称，由商户传入
          timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, //随机串
          package: data.package,
          signType: data.signType, //微信签名方式：
          paySign: data.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            _this.$vux.toast.show({
              type: "success",
              text: "支付成功"
            });
            _this.timeAjax(data);
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            _this.$vux.toast.show({
              type: "warn",
              text: "您取消了支付"
            });
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            _this.$vux.toast.show({
              type: "warn",
              text: "支付失败，请重新支付"
            });
          }
        }
      );
    },
    timeAjax(dataJson) {
      // 轮询订单结果
      this.$http({
        url: "/api/WeChat/QueryOrder",
        type: "get",
        data: { ordercode: dataJson.ordercode },
        success: data => {
          if (data.Code === 20000) {
            this.$router.push({
              path: "/Consultation/State",
              query: {
                mode: 0,
                success: 1,
                name: this.details.Name,
                id: this.details.UserId
              }
            });
          } else if (data.Code === 9000) {
            this.$vux.toast.show({
              type: "warn",
              text: "支付失败：9000"
            });
          } else if (data.Code === 9004) {
            this.timeAjax(dataJson);
          }
        },
        error: data => {}
      });
    },
    back() {
      if (this.$route.query.back) {
        this.$router.push({
          path: this.$route.query.back
        });
      } else {
        this.$router.back(-1);
      }
    },
    getList(time) {
      // 获取评论列表
      if (this.loading) {
        // do nothing
      } else {
        this.loading = true;
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/Consultation/DietitianEvaluationList",
            type: "get",
            data: {
              DietitianId: this.$route.query.id,
              pageNum: this.searchVal.pageNum,
              pageSize: this.searchVal.pageSize
            },
            success: data => {
              this.setData(data.Data.Data);
            },
            error: function() {
              //错误处理
            }
          });
        }, time || 800);
      }
    },
    setData(data) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.listArr.push(data[i]);
        }
      } else {
        this.searchVal.pageNum--;
        this.searchVal.uptext = "没有更多评论了";
      }
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      this.loading = false;
    }
  },
  mounted() {
    this.init();
    this.$http({
      url: "/api/Consultation/DietitianDetail",
      type: "get",
      data: { DietitianId: this.$route.query.id },
      success: data => {
        if (data.Code !== 20000) {
          this.$vux.toast.show({
            text: data.Error + "<br>3秒后返回上一页",
            width: "11em",
            isShowMask: true,
            type: "warn"
          });
          setTimeout(() => {
            this.$router.back(-1);
          }, 3000);
          return;
        }
        this.details = data.Data;
        this.payment.menu.price = `<span style='color:#8dc13b'>微信支付 (${
          this.details.Price
        }元)</span>`;
        this.payment.menu.integral = `积分支付 (${this.details.JFPrice})`;
      },
      error: function() {
        //错误处理
      }
    });

    this.getList(1);
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

.lgss {
  text-align: center;
  padding: 10px 0;
  color: #ccc;
  font-size: 14px;
}
</style>
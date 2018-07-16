<template>
    <div class="warp">
      <div class="container" v-show="!detailsShow">
      <!-- 底部导航 -->
      <Menu :index="1"></Menu>
      <div class="header">
            <span><router-link to="/Find">资讯</router-link></span>
            <span class="active"><router-link to="/Dynamic">动态</router-link></span>

            <div class="right"><router-link to="/Dynamic/Release"><i class="iconfont icon-xiangji"></i></router-link></div>
        </div>
        <p v-if="listArr.length==0" class="tip">目前没有动态哦</p>
        <!-- Swiper -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- <div class="swiper-slide" v-for="(item,index) in listArr">
            <div class="imgs">
              <img v-if="item.picurl!=''" :src="$HTTPURL+'/'+item.picurl">
            </div>
            <p>{{item.text}}</p>
            <div class="time">{{item.datedesc}}</div>
          </div> -->
        </div>
      </div>
      <div class="gnbtn" v-if="listArr.length>0">
          <span><i  @click="noLove"  class="iconfont icon-shanchu"></i></span>
          <span><i @click="love" v-show="isLove===true" class="iconfont icon-dianzanshixin"></i></span>
          <span><i @click="love" v-show="isLove==''" class="iconfont icon-dianzankongxin1"></i></span>
      </div>
    </div>

    <div class="view_child" v-show="detailsShow">
      <Details ref="detailsBox" @hideDetails="detailsShow=false"></Details>
    </div>
    </div>
</template>
<script>
import Menu from "../Common/Menu.vue";
import Details from "./DynamicDetails.vue";
import { setTimeout } from "timers";

export default {
  components: {
    Menu,
    Details
  },
  data() {
    return {
      r: "",
      detailsShow: false,
      isLove: false,
      listArr: [],
      listArrBf: [],
      swiperBom: true,
      searchVal: {
        pageNum: 0,
        pageSize: 10,
        onFetching: false,
        uptext: "滑动查看更多"
      }
    };
  },
  methods: {
    newSwiper() {
      this.swiperBom = new Swiper(".swiper-container", {
        // loop: true,
        autoHeight: true,
        on: {
          click: () => {
            this.toPathDetails();
          },
          slideChange: () => {
            this.isLove = this.listArr[this.swiperBom.activeIndex].isLove;
            if (this.r !== "") {
              this.$http({
                url: "/api/User/DoLike",
                type: "get",
                data: {
                  id: this.listArr[this.r].id,
                  like: false
                },
                success: data => {
                  //成功的处理
                  setTimeout(() => {
                    this.listArr.splice(this.swiperBom.previousIndex, 1);
                    this.swiperBom.removeSlide(this.swiperBom.previousIndex);
                  }, 300);
                },
                error: function() {
                  //错误处理
                }
              });
              this.r = "";
            }
          },
          slideNextTransitionStart: () => {
            if (this.swiperBom.activeIndex === this.listArr.length - 3) {
              this.getList();
            }
            // if (this.listArr[this.swiperBom.previousIndex].isLove !== true) {
            //   this.$http({
            //     url: "/api/User/DoLike",
            //     type: "get",
            //     data: {
            //       id: this.listArr[this.swiperBom.previousIndex].id,
            //       like: false
            //     },
            //     success: data => {
            //       //成功的处理
            //       setTimeout(() => {
            //         this.listArr.splice(this.swiperBom.previousIndex, 1);
            //         this.swiperBom.removeSlide(this.swiperBom.previousIndex);
            //       }, 300);
            //     },
            //     error: function() {
            //       //错误处理
            //     }
            //   });
            // }
          }
        }
      });
    },

    setData(data) {
      if (!data) {
        return;
      }
      if (data.length > 0) {
        var strHtml = "";
        var strImg = "";
        for (let i = 0; i < data.length; i++) {
          data[i].isLove = "";
          this.listArr.push(data[i]);
          if (data[i].picurl !== "") {
            strImg = `
            <div class="imgs">
              <img src="${this.$HTTPURL + "/" + data[i].picurl}">
            </div>`;
          }

          strHtml += `<div class="swiper-slide">
          ${strImg}
            <p>${data[i].text}</p>
            <div class="time">${data[i].datedesc}</div>
          </div>`;
        }

        this.swiperBom.appendSlide(strHtml);
      } else {
        this.searchVal.pageNum--;
      }
    },
    getList() {
      this.searchVal.pageNum++;
      this.$http({
        url: "/api/User/GetMoment",
        type: "get",
        data: this.searchVal,
        success: data => {
          //成功的处理
          this.setData(data.Data);
        },
        error: function() {
          //错误处理
        }
      });
    },
    toPathDetails() {
      this.$refs.detailsBox.init(this.listArr[this.swiperBom.activeIndex].id);
      this.detailsShow = true;
      // this.$router.push({
      //   path: "/Dynamic/DynamicDetails",
      //   query: {
      //     id: this.listArr[this.swiperBom.activeIndex].id
      //   }
      // });
    },
    love() {
      // 喜欢收藏
      this.$http({
        url: "/api/User/DoLike",
        type: "get",
        data: { id: this.listArr[this.swiperBom.activeIndex].id, like: true },
        success: data => {
          //成功的处理
          if (data.Code === 20000) {
            this.$vux.toast.show({
              type: "success",
              text: data.Message
            });
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: data.Message
            });
          }
          this.isLove = true;
          this.listArr[this.swiperBom.activeIndex].isLove = true;
          if (this.swiperBom.activeIndex != this.listArr.length - 1) {
            var to = this.swiperBom.activeIndex + 1;
            this.swiperBom.slideTo(to);
          }
        },
        error: function() {
          //错误处理
        }
      });
    },
    noLove() {
      // 不喜欢跳过
      if (this.listArr.length === 1) {
        this.$http({
          url: "/api/User/DoLike",
          type: "get",
          data: {
            id: this.listArr[0].id,
            like: false
          },
          success: data => {
            //成功的处理
            this.listArr.splice(0, 1);
            this.swiperBom.removeSlide(0);
            if (this.listArr.length == 0) {
              $(".swiper-container").hide();
            }
          },
          error: function() {
            console.log("cuo l");
            //错误处理
          }
        });

        return;
      }
      this.r = this.swiperBom.activeIndex;
      var to = "";
      if (this.swiperBom.activeIndex == this.listArr.length - 1) {
        to = 0;
      } else {
        to = this.swiperBom.activeIndex + 1;
      }
      this.swiperBom.slideTo(to);
      if (this.listArr.length == 0) {
        $(".swiper-container").hide();
      }
    }
  },
  mounted() {
    this.getList();
    this.newSwiper();
    console.log("----------------");
  }
};
</script>
<style scoped lang="less">
.warp,
.view_child {
  height: 100%;
}
.container {
  box-sizing: border-box;
  height: 100%;
  padding-top: 45px;
  padding-bottom: 80px;
  overflow: auto;
  background: #e3e3e3;
  .tip {
    text-align: center;
    padding: 20px 0;
    color: #aaa;
  }
  .header {
    z-index: 999;
    position: fixed;
    top: 0;
    text-align: center;
    font-size: 17px;
    .right {
      right: 10px;
    }
    span {
      margin: 0 25px;
      position: relative;
      display: inline-block;
      overflow: hidden;
      a {
        display: block;
      }
      &.active::after {
        content: "";
        display: block;

        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
        height: 5px;
        width: 100%;
        border-radius: 2.5px;
      }
    }
  }

  .box_wr {
    // padding-bottom: 80px;

    .more_s {
      text-align: center;
      padding-top: 10px;
      font-size: 14px;
      color: #666;
    }
  }

  .gnbtn {
    text-align: center;
    width: 100%;
    margin-top: 22px;

    i {
      display: inline-block;
      width: 77px;
      height: 77px;
      line-height: 77px;
      text-align: center;
      border-radius: 50%;
      overflow: hidden;
      background: #fff;
      margin: 0 40px;
      font-size: 40px;
      color: #ef7d1d;
      box-shadow: 3px 0 8px rgba(0, 0, 0, 0.25);
    }
  }

  .swiper-container {
    width: 90%;
    margin: 0 auto;
    -webkit-box-shadow: 3px 0 4px rgba(0, 0, 0, 0.35);
    box-shadow: 3px 0 4px rgba(0, 0, 0, 0.35);
    background: #fff;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 22px;
  }

  .swiper-slide-active {
    overflow: auto !important;
  }
}
</style>

<style lang="less">
.swiper-slide {
  padding: 22px;
  box-sizing: border-box;

  .imgs {
    text-align: center;
    img {
      max-width: 100%;
    }
  }
  p {
    color: #666;
    font-size: 14px;
    margin-top: 17px;
    margin-bottom: 14px;
  }
  .time {
    font-size: 12px;
    color: #a8a8a8;
  }
}
</style>

<template>
    <div class="container">

        <!-- 底部导航 -->
    <Menu :index="1"></Menu>
        <div class="header">
            <span><router-link to="/Find">资讯</router-link></span>
            <span class="active"><router-link to="/Dynamic">动态</router-link></span>

            <div class="right"><router-link to="/Dynamic/Release"><i class="iconfont icon-xiangji"></i></router-link></div>
        </div>
        <div class="swiper_wr" @click="toPathDetails" v-if="listArr.length>0">
         <swiper ref="swiper" :aspect-ratio="1/1" height="190px" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex" :show-dots="false">
              <swiper-item  class="swiper-demo-img" v-for="(item, index) in listArr" :key="index">
                <div class="box_getht">
                  <div class="imgs_m">
                    <img v-if="item.picurl!=''" :src="item.picurl">
                  </div>
                  <p>{{item.text}}</p>
                  <div class="time">{{item.datedesc}}</div>
                </div>
              </swiper-item>
          </swiper>
        </div>

        <div class="gnbtn">
            <span><i  @click="noLove"  class="iconfont icon-shanchu"></i></span>
            <span><i @click="love" class="iconfont icon-shoucang1"></i></span>
          </div>
    </div>
</template>
<script>
import { Swiper, SwiperItem } from "vux";
import { setTimeout, clearTimeout } from "timers";
import Menu from "../Common/Menu.vue";

export default {
  components: {
    Swiper,
    SwiperItem,
    Menu
  },
  data() {
    return {
      swiperItemIndex: 0,
      listArr: [],
      searchVal: {
        pageNum: 0,
        pageSize: 15,
        onFetching: false,
        uptext: "滑动查看更多"
      }
    };
  },
  methods: {
    setData(data) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.listArr.push(data[i]);
        }
        console.log(this.listArr);
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
    onSwiperItemIndexChange(index) {
      let box = document
        .getElementsByClassName("vux-swiper-item")
        [index].getElementsByClassName("box_getht")[0];
      this.$refs.swiper.xheight = box.offsetHeight + 20 + "px";
      if (this.listArr.length >= 10) {
        if (index > this.listArr.length - 3) {
          // 请求加入列表
          this.getList();
        }
      }
    },
    toPathDetails() {
      this.$router.push({
        path: "/Dynamic/DynamicDetails",
        query: {
          id: this.listArr[this.swiperItemIndex].id
        }
      });
    },
    love() {
      // 喜欢收藏
      this.$http({
        url: "/api/User/DoLike",
        type: "get",
        data: { id: this.listArr[this.swiperItemIndex].id },
        success: data => {
          //成功的处理
        },
        error: function() {
          //错误处理
        }
      });
      this.swiperItemIndex++;
    },
    noLove() {
      // 不喜欢跳过
      this.swiperItemIndex++;
    }
  },
  mounted() {
    this.getList();
    // console.log("当前页面数据列表", this.listArr);
    setTimeout(() => {
      let box = document
        .getElementsByClassName("vux-swiper-item")
        [this.swiperItemIndex].getElementsByClassName("box_getht")[0];
      this.$refs.swiper.xheight = box.offsetHeight + 20 + "px";
    }, 100);
  }
};
</script>
<style>
.vux-swiper {
  transition: all 0.5s;
}
</style>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  height: 100%;
  padding-top: 45px;
  padding-bottom: 80px;
  overflow: auto;
  background: #e3e3e3;
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

  .swiper_wr {
    width: 90%;
    margin: 0 auto;
    box-shadow: 3px 0 4px rgba(0, 0, 0, 0.35);
    background: #fff;
    border-radius: 5px;
    padding: 22px;
    box-sizing: border-box;
    margin-top: 22px;
    padding-bottom: 40px;

    .imgs_m {
      width: 100%;
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
}
</style>

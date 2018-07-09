<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
        <scroller lock-x height="-45px" ref="scrollerBottom" @on-scroll-bottom="getList" >
          <div class="scroller_box">
            <div class="details_dt">
              <div class="top">
                <!-- <div class="imgs">
                  <img v-if="details.portrait!=''" :src="details.portrait" alt="">
                </div> -->
                
                <div class="wz" style="padding-left:0">
                  <!-- <h1>{{details.name}}</h1> -->
                  <h1>匿名用户</h1>
                  <p>{{details.datedesc}}</p>
                </div>
              </div>
              <div class="wz_box">
                <img v-if="details.picurl!=''" :src="$HTTPURL+details.picurl" alt="">
                <p>{{details.text}}</p>
                <p class="time">{{details.datedesc}}</p>
                <div class="dz">
                  <span @click="zanFn"><i :class="{'icon-dianzan1':zan==0,'icon-dianzan2':zan==1}" class="iconfont"></i>{{details.thumbsupcount}}</span>
                  <span @click="fixtext=0"><i class="iconfont icon-pinglun"></i>{{details.commentscount}}</span>
                </div>
                <div class="pl">
                  <ul>
                    <li v-for="(item,index) in listArr">
                      <div class="img_mm"><img :src="item.portrait" alt=""></div>
                      <div class="wz_pl">
                        <h3><span>{{item.commentdate | mouthTimeGsh}}</span> {{item.commentuser}}</h3>
                        <p>{{item.comments}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <p class="lgss">{{searchVal.uptext}}</p>
                <load-more tip="loading" v-show="searchVal.loading"></load-more>
              </div>
            </div>
          </div>
        </scroller>
        <div class="pldz_btn">
          <div class="btns" @click="fixtext=0">
            <i class="iconfont icon-pinglun"></i>
            评论
          </div>
          <div class="btns" @click="zanFn">
            <i :class="{'icon-dianzan1':zan==0,'icon-dianzan2':zan==1}" class="iconfont"></i>
            点赞
          </div>
        </div>

        <div class="bomz_s" v-show="fixtext==0" @click="fixtext=-500"></div>
        <div class="fix_pl" :style="{bottom:fixtext+'px'}">
          <div class="text">
            <textarea v-model="pl" placeholder="请输入您的评论!"></textarea>
          </div>
          <div class="btn" @click="submitPl">发表评论</div>
        </div>
    </div>
</template>
<script>
import { LoadMore, Loading } from "vux";
export default {
  components: {
    LoadMore,
    Loading
  },
  data() {
    return {
      searchVal: {
        loading: false,
        pageNum: 0,
        pageSize: 10,
        uptext: "滑动获取更多评论"
      },
      fixtext: -500,
      zan: 0,
      pl: "",
      details: {},
      listArr: []
    };
  },
  methods: {
    submitPl() {
      this.$http({
        url: "/api/User/SubmitMomentComments",
        type: "post",
        data: JSON.stringify({ Id: this.$route.query.id, Comments: this.pl }),
        success: data => {
          //成功的处理
          this.$vux.toast.show({
            type: "success",
            text: data.Message + "，正在审核"
          });
          this.fixtext = -500;
        },
        error: function() {
          //错误处理
        }
      });
    },
    zanFn() {
      if (this.zan == 0) {
        this.$http({
          url: "/api/User/DoLike",
          type: "get",
          data: { id: this.$route.query.id, like: true },
          success: data => {
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
            //成功的处理
            this.zan = 1;
            this.details.thumbsupcount++;
          },
          error: function() {
            //错误处理
          }
        });
      }
    },
    getList(time) {
      // 获取评论列表
      if (this.searchVal.loading) {
        // do nothing
      } else {
        this.searchVal.loading = true;
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/User/GetMomentComments",
            type: "get",
            data: {
              id: this.$route.query.id,
              pageNum: this.searchVal.pageNum,
              pageSize: this.searchVal.pageSize
            },
            success: data => {
              console.log("-------------------------");
              console.log(data);
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
      this.searchVal.loading = false;
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    this.$http({
      url: "/api/User/GetMomentDetails",
      type: "get",
      data: { id: this.$route.query.id },
      success: data => {
        //成功的处理
        console.log(data);
        this.details = data.Data;
        // this.$ref.scrollerBottom.reset();
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

  .details_dt {
    padding: 15px 35px 50px 35px;
    height: 100%;
    box-sizing: border-box;
  }

  .top {
    height: auto;
    overflow: hidden;
    .imgs {
      float: left;
      img {
        width: 42px;
      }
    }
    .wz {
      float: left;
      padding-left: 10px;
      padding-bottom: 10px;

      h1 {
        font-size: 15px;
        color: #7a7a7a;
        font-weight: 500;
      }
      p {
        font-size: 12px;
        color: #b9b9b9;
      }
    }
  }
  .wz_box {
    img {
      max-width: 100%;
      margin: 10px 0 20px;
    }
    p {
      font-size: 14px;
      color: #666;
    }

    .time {
      margin: 8px 0;
      color: #a8a8a8;
    }
    .dz {
      span {
        margin-right: 6px;
        color: #7b7b7b;
      }
    }
    .pl {
      li {
        margin-top: 10px;
        background: #eaeaea;
        position: relative;
        padding: 15/2px 0;
        box-sizing: border-box;
        height: auto;
        overflow: hidden;

        .img_mm {
          margin-top: 15/2px;
          position: absolute;
          left: 0;
          top: 0;
          width: 83/2px;
          height: 83/2px;
          overflow: hidden;
          margin-left: 15/2px;
          float: left;
          img {
            margin: 0;
            width: 83/2px;
            height: 83/2px;
          }
        }

        .wz_pl {
          width: 100%;
          padding-left: 55px;
          padding-right: 10px;
          box-sizing: border-box;
          float: left;

          h3 {
            margin-bottom: 5px;
            width: 100%;
            font-size: 14px;
            color: #5469a3;
            span {
              font-size: 13px;
              color: #666666;
              float: right;
            }
          }
        }
      }
    }
  }

  .pldz_btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #c9c9c9;

    .btns {
      float: left;
      width: 50%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #f0f0f0;
      font-size: 15px;
      color: #707070;
      position: relative;

      i {
        font-size: 20px;
        color: #707070;
        position: relative;
        top: 2px;
      }

      &:first-child:after {
        content: "";
        position: absolute;
        right: 0;
        top: 4px;
        height: 32px;
        width: 1px;
        background: #a7a7a7;
      }

      &:active {
        background: #ddd;
      }
    }
  }

  .fix_pl {
    position: fixed;
    bottom: 0;
    z-index: 991;
    height: 267px;
    background: #f6f6f6;
    width: 100%;
    padding-top: 18px;
    transition: all 0.5s;

    .text {
      padding: 0 20px;
      box-sizing: border-box;
      width: 100%;
    }
    textarea {
      height: 160px;
      background: #fff;
    }

    .btn {
      width: 80%;
      background: #8dc13b;
      color: #fff;
      text-align: center;
      height: 37px;
      line-height: 37px;
      border-radius: 5px;
      margin: 10px auto;
    }
    .cancel {
      color: #fff;
      margin-top: 10px;
      text-align: center;
      height: 30px;
      width: 30%;
      line-height: 30px;
      background: #ccc;
      border-radius: 5px;
      margin: 0 auto;
      font-size: 14px;
    }
  }

  .bomz_s {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgba(0, 0, 0, 0.2);
  }

  .lgss {
    text-align: center;
    padding: 10px 0;
  }
}
</style>

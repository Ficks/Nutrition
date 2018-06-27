<template>
    <div class="container">
        <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
      </div>
    <scroller lock-x height="-45px" @on-scroll-bottom="getList" ref="scrollerBottom">
      <div class="scroller_box bsxz">
         <div class="list_w" v-for="(item,index) in listArr">
           <div class="tx"><img :src="item.src" alt=""></div>
           <div class="wz">
             <h2>{{item.name}}</h2>
             <p>{{item.startTime}}</p>
             <p>{{item.endTime}}</p>
           </div>
           <div class="btns">
             <div class="btn_m xxx" @click="chat(item)" v-show="item.msg">新消息</div>
             <div class="btn_m" @click="userInfo(item)" :style="{'margin-top':item.msg?'8px':'20px'}">用户资料</div>
             <!-- <div class="btn_m end" :style="{'margin-top':item.msg?'8px':'20px'}">已结束</div> -->
           </div>
         </div>
         <p class="logss">{{searchVal.uptext}}</p>
          <load-more tip="loading" v-show="loading"></load-more>
      </div>
    </scroller>
      
    </div>
</template>
<script>
import { LoadMore } from "vux";
export default {
  components: {
    LoadMore
  },
  data() {
    return {
      searchVal: {
        pageNum: 0,
        pageSize: 10,
        uptext: "获取更多数据"
      },
      loading: false,
      listArr: [
        {
          name: "用户名",
          src: "/static/images/tx.jpg",
          startTime: "04-15 15:21:00",
          endTime: "04-16 15:21:00",
          msg: true
        },
        {
          name: "用户名",
          src: "/static/images/tx.jpg",
          startTime: "04-15 15:21:00",
          endTime: "04-16 15:21:00",
          msg: true
        },
        {
          name: "用户名",
          src: "/static/images/tx.jpg",
          startTime: "04-15 15:21:00",
          endTime: "04-16 15:21:00",
          msg: false
        }
      ]
    };
  },
  methods: {
    userInfo(item) {
      this.$router.push({
        path: "/Dietitian/UserInfo"
      });
    },
    chat(item) {
      this.$router.push({
        path: "/Dietitian/Chat",
        query: {
          name: item.name
        }
      });
    },
    getList(time) {
      // 列表
      if (this.loading) {
        // do nothing
      } else {
        this.loading = true;
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/Consultation/ConsultationList",
            type: "get",
            data: this.searchVal,
            success: data => {
              console.log(data);
              this.setData(data.Data);
            },
            error: error => {}
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
        this.searchVal.uptext = "没有更多数据了";
      }
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      this.loading = false;
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() + " ";
      h = date.getHours() + ":";
      m = date.getMinutes() + ":";
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  mounted() {
    console.log("当前页面API：", +this.$route.path);
    console.log("列表数据", this.listArr);
    this.getList(1);
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  background: #f9f9f9;
  .scroller_box {
    height: 100%;
  }
  .bsxz {
    padding: 0 15px;
    box-sizing: border-box;
  }
  .list_w {
    padding: 25px 0;
    height: auto;
    overflow: hidden;
    border-bottom: 1px solid #e4e4e4;
    .tx {
      float: left;
      width: 113/2px;
      height: 113/2px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .wz {
      float: left;
      padding-left: 8px;

      h2 {
        font-size: 18px;
        color: #666666;
        font-weight: 500;
      }
      p {
        font-size: 15px;
        color: #a3a3a3;
      }
    }
    .btns {
      float: right;
      padding-right: 10px;
      .btn_m {
        padding: 0 15px;
        background: #ef7d1d;
        color: #fff;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 5px;
        margin-top: 10px;
        font-size: 13px;
      }
      .xxx {
        background: #8dc13b;
      }
      .end {
        background: #949494;
      }
    }
  }
  .logss {
    font-size: 14px;
    color: #ccc;
    text-align: center;
    padding: 20px 0;
  }
}
</style>



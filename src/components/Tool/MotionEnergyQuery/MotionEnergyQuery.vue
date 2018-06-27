<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
      <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="list_wr scroller_box">
            <div class="list" v-for="(item,index) in listArr">
                <div class="left">
                    <i class="iconfont icon-buhang"></i>
                    <p>{{item.datedescc}}</p>
                </div>
                <div class="right">
                    <p>消耗{{item.kcal}}kcal</p>
                    <div class="sped_wr">
                        <div class="sped" :style="{width:(item.kcal/item.proposalkcal)*100+'%'}"></div>
                    </div>
                    <p class="f14">建议消耗{{item.proposalkcal}}kcal</p>
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
      listArr: []
    };
  },
  methods: {
    getList() {
      this.$http({
        url: "/api/HealthyArchive/GetTodaysSport",
        type: "get",
        data: {
          start: this.$getDate(-2),
          end: this.$getDate(1)
        },
        success: data => {
          console.log(data);
          this.listArr = data.Data;
        },
        error: data => {}
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  background: #f9f9f9;
}
.list_wr {
  padding: 15px;
  box-sizing: border-box;

  .list {
    background: #fff;
    border-radius: 5px;
    background: #a3c66b;
    padding: 20px 15px;
    height: auto;
    overflow: hidden;
    color: #fff;
    font-size: 16px;
    margin-bottom: 15px;

    .left {
      float: left;

      .iconfont {
        font-size: 50px;
      }

      p {
        margin-top: 5px;
      }
    }
    .right {
      float: right;
      text-align: center;
      width: 45%;
      padding-top: 20px;

      p.f14 {
        font-size: 14px;
      }

      .sped_wr {
        width: 100%;
        height: 7px;
        background: #c0c0c0;
        position: relative;
        border-radius: 4px;
        margin: 10px 0;
        overflow: hidden;

        .sped {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 50%;
          border-radius: 4px;
          background: #fff;
        }
      }
    }
  }
}
</style>


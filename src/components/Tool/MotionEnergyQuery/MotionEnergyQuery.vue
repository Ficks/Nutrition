<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
        <div class="list_wr">
            <div class="list" v-for="(item,index) in arr">
                <div class="left">
                    <i class="iconfont icon-buhang"></i>
                    <p>{{item.title}}</p>
                    <p>{{item.stepNumber}}步</p>
                </div>
                <div class="right">
                    <p>消耗{{item.consume}}</p>
                    <div class="sped_wr">
                        <div class="sped" :style="{width:(item.stepNumber/item.proposal)*100+'%'}"></div>
                    </div>
                    <p class="f14">建议运动量{{item.proposal}}步</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [
        {
          stepNumber: 1000,
          title: "今日步数",
          consume: "2000kcal",
          proposal: 10000
        },
        {
          stepNumber: 1000,
          title: "昨日步数",
          consume: "2000kcal",
          proposal: 10000
        },
        {
          stepNumber: 1000,
          title: "前日步数",
          consume: "2000kcal",
          proposal: 10000
        }
      ]
    };
  },
  methods: {},
  mounted() {}
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


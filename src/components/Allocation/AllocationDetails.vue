<template>
    <div class="container">
       <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
        <div class="details">
            <div class="title">
                <h1>正常成人膳食指南 6项权威解答</h1>
                <p>发布时间：2018-05-14 17:14 作者：admin</p>
            </div>
            <div class="content">
                <p>      一直以来人们都非常关注饮食对健康的影响，那么到底
吃什么？怎么吃才能够有益机体健康呢？今天小福菌给大家
带来2018膳食指南，告诉你吃什么最健康！</p>
                <img src="/static/images/zx.jpg" alt="">
                <p>
                          通过对小鼠研究发现，每天摄入西红柿或能降低一半小
鼠皮肤癌的发生，研究者揭示了进行营养干预如何改变个体
患皮肤的风险。西红柿与癌症关联背后的理论或许是西红柿
中的类胡萝卜素，这种化合物能够让西红柿着色，同时其还
能够保护机体抵御紫外线带来的皮肤损伤。
                </p>
                <p>      研究还表明，当开发不同的预防性策略时我们的确需要
考虑性别，在男性机体中能够发挥作用的物质有时候或许在
女性机体中并没有什么作用，反之亦然。</p>
                <p>
                          大量摄入新鲜水果或和糖尿病发生率降低直接相关，同
时还能够降低糖尿病患者并发症的发生率。
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getDetails() {
      console.log("当前页面API：" + this.$route.path);
    }
  },
  mounted() {
    this.getDetails();
  }
};
</script>

<style scoped lang="less">
.container {
  padding-bottom: 50px;
  box-sizing: border-box;

  .details {
    padding: 0 20px;
    .title {
      text-align: center;
      h1 {
        font-size: 18px;
        color: #545454;
        margin-top: 15px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        color: #b3b3b3;
      }
    }

    .content {
      color: #666666;
      font-size: 14px;
      line-height: 26px;
      text-indent: 2em;

      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>

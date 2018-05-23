<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right" @click="submit">完成</div>
        </div>
        <div class="text_fb">
            <textarea placeholder="写下你想分享的内容..." v-model="data.text">

            </textarea>
            <div class="upload">
                <i class="iconfont icon-tianjiajiahaowubiankuang"></i>
            </div>
            <div class="iconload">
                <i class="">#</i> 
                <i class="iconfont icon-dingwei"></i> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        text: "",
        upload: ""
      }
    };
  },
  methods: {
    submit() {
      console.log(this.data);
      this.$router.push({
        path: "/Dynamic"
      });
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  overflow: hidden;

  .text_fb {
    textarea {
      height: 115px;
      width: 100%;
      background: #fff;
    }
    .upload {
      margin-left: 15px;
      width: 87px;
      height: 87px;
      line-height: 87px;
      overflow: hidden;
      background: #e1e1e1;
      text-align: center;

      img {
        width: 100%;
        height: 100%;
      }
      i {
        font-size: 50px;
        color: #8a8a8a;
      }
    }

    .iconload {
      margin-left: 15px;
      margin-top: 10px;

      i {
        display: block;
        float: left;
        width: 23px;
        height: 23px;
        line-height: 23px;
        text-align: center;
        border-radius: 50%;
        margin-right: 10px;
        border: 1px solid #8e8e8e;
      }
    }
  }
}
</style>

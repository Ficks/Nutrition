<template>
    <div class="container">
        <div class="header" >
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
      <scroller lock-x height="-45px" ref="scrollerBottom">
        <div class="pad_wr">
          <div class="list_tm" v-for="(item,index) in listArr">
            <h3>{{`${index+1}、${item.title}`}}</h3>
              <ul>
                  <li v-for="(jtem,jindex) in item.arr">
                      <span class="btn_tm" @click="onchanges(index,jindex)">
                          <i v-show="item.abcd!==jindex" class="iconfont icon-danxuankuang-weixuanzhong"></i>
                          <i v-show="item.abcd===jindex" class="iconfont icon-danxuankuang-xuanzhong"></i>
                          <span>{{jtem.title}}</span>
                      </span>
                  </li>
              </ul>
          </div>
          <div class="submit_btn" @click="submit">提交答案</div>
        </div>
      </scroller>

    </div>
</template>
<script>
import { Toast } from "vux";
export default {
  components: {
    Toast
  },
  data() {
    return {
      listArr: [],
      score: 0
    };
  },
  methods: {
    getList() {
      this.$http({
        url: "/api/Questionnaire/GetQuestionsAndOptions",
        type: "get",
        data: { id: this.$route.query.id },
        success: data => {
          this.setData(data.Data);
        },
        error() {}
      });
    },
    setData(data) {
      for (let i = 0; i < data.length; i++) {
        data[i].abcd = "";
      }
      this.listArr = data;
    },
    onchanges(i, j) {
      var item = this.listArr[i];
      var jtem = item.arr[j];
      item.abcd = j;
      item.score = jtem.fraction;
      item.htjx = {
        questionid: item.id,
        optionid: jtem.id,
        score: jtem.fraction
      };
    },
    submit() {
      for (let i = 0; i < this.listArr.length; i++) {
        if (this.listArr[i].abcd == "") {
          this.$vux.toast.show({
            text: "请完成所有选项",
            type: "warn"
          });
          return;
        }
        this.score += this.listArr[i].score;
      }

      var arr = [];
      for (let i = 0; i < this.listArr.length; i++) {
        arr.push(this.listArr[i].htjx);
      }
      var d = {
        id: this.$route.query.id,
        optionlist: arr
      };

      console.log(d);
      this.$http({
        url: "/api/Questionnaire/SubmitQuestionnaire",
        type: "post",
        data: JSON.stringify(d),
        success: data => {
          console.log(data);
          if (data.Code === 20000) {
            this.$router.push({
              path: this.$route.matched[0].path + "/AssessmentResult",
              query: {
                score: data.Data.Score,
                text: data.Data.Description
              }
            });
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: data.Error || data.Message
            });
          }
        },
        error() {}
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
  box-sizing: border-box;
  overflow: auto;
  padding-bottom: 20px;
  .pad_wr {
    padding: 12px;
    box-sizing: border-box;
  }
  .list_tm {
    background: #eeeeee;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 15px;

    h3 {
      font-size: 16px;
      color: #545454;
      font-weight: 500;
    }

    ul {
      height: auto;
      overflow: hidden;

      li {
        float: left;
        width: 50%;
        color: #666666;
        font-size: 14px;
        margin-top: 5px;

        .iconfont {
          color: #8dc13b;
          font-size: 25px;
          position: relative;
          top: 3px;
        }
      }
    }
  }
}
</style>


<template>
    <div class="container">
        <div class="header" >
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
            <div class="right"></div>
        </div>
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

    </div>
</template>
<script>
export default {
  data() {
    return {
      listArr: [
        {
          title: "膳食营养评估题目示例？",
          score: 0, //本题获得分数
          abcd: "", //本题所选
          arr: [
            {
              title: "选项A",
              fraction: 10
            },
            {
              title: "选项B",
              fraction: 20
            },
            {
              title: "选项C",
              fraction: 30
            },
            {
              title: "选项D",
              fraction: 40
            }
          ]
        },
        {
          title: "膳食营养评估题目示例？",
          score: 0, //本题获得分数
          abcd: "", //本题所选
          arr: [
            {
              title: "选项A",
              fraction: 10
            },
            {
              title: "选项B",
              fraction: 20
            },
            {
              title: "选项C",
              fraction: 30
            },
            {
              title: "选项D",
              fraction: 40
            }
          ]
        },
        {
          title: "膳食营养评估题目示例？",
          score: 0, //本题获得分数
          abcd: "", //本题所选
          arr: [
            {
              title: "选项A",
              fraction: 10
            },
            {
              title: "选项B",
              fraction: 20
            },
            {
              title: "选项C",
              fraction: 30
            },
            {
              title: "选项D",
              fraction: 40
            }
          ]
        },
        {
          title: "膳食营养评估题目示例？",
          score: 0, //本题获得分数
          abcd: "", //本题所选
          arr: [
            {
              title: "选项A",
              fraction: 10
            },
            {
              title: "选项B",
              fraction: 20
            },
            {
              title: "选项C",
              fraction: 30
            },
            {
              title: "选项D",
              fraction: 40
            }
          ]
        },
        {
          title: "膳食营养评估题目示例？",
          score: 0, //本题获得分数
          abcd: "", //本题所选
          arr: [
            {
              title: "选项A",
              fraction: 10
            },
            {
              title: "选项B",
              fraction: 20
            },
            {
              title: "选项C",
              fraction: 30
            },
            {
              title: "选项D",
              fraction: 40
            }
          ]
        },
        {
          title: "膳食营养评估题目示例？",
          score: 0, //本题获得分数
          abcd: "", //本题所选
          arr: [
            {
              title: "选项A",
              fraction: 10
            },
            {
              title: "选项B",
              fraction: 20
            },
            {
              title: "选项C",
              fraction: 30
            },
            {
              title: "选项D",
              fraction: 40
            }
          ]
        }
      ],
      score: 0
    };
  },
  methods: {
    getList() {
      console.log("请求题目列表API：" + this.$route.path);
      console.log("题目列表格式：", this.listArr);
    },
    onchanges(i, j) {
      this.listArr[i].abcd = j;
      this.listArr[i].score = this.listArr[i].arr[j].fraction;
    },
    submit() {
      for (let i = 0; i < this.listArr.length; i++) {
        this.score += this.listArr[i].score;
      }
      this.$router.push({
        path: this.$route.matched[0].path + "/AssessmentResult",
        query: {
          score: this.score
        }
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


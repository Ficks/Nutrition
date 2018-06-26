<template>
    <div class="container">
        <div class="header_top" v-show="!child">
          <div class="header">
              <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
              <div class="title">{{$route.name}}</div>
              <div class="right" @click="submit">完成</div>
          </div>
          <scroller lock-x height="-45px"   ref="scrollerBottom">
          <div class="text_fb">
              <textarea placeholder="写下你想分享的内容..." v-model="data.text">

              </textarea>
              <div class="upload">
                  <i v-if="data.imgUrl==''" class="iconfont icon-tianjiajiahaowubiankuang"></i>
                  <img v-if="data.imgUrl!=''" :src="data.imgUrl" alt="">
                  <input class="upload_img" type="file" @change="addImg"> 
              </div>
              <div class="ht_list">
                <span @click="removeHt(index)" v-for="(item,index) in htYxArr">{{item}} <i class="iconfont icon-shanchu"></i></span>
              </div>
              <div class="iconload">
                  <span  @click="child=true"><i class="iconfont icon-huatishuohua"></i></span>
                  <span @click="setLocation"><i class="iconfont icon-weizhi"></i></span>
                  <span @click="setLocation" class="lo">{{this.data.location}}</span>
              </div>
          </div>
          </scroller>
        </div>
        <div class="childbox" v-show="child">
            <div class="header">
              <div class="left" @click="child=false"><i class="iconfont icon-fanhui"></i>返回</div>
              <div class="title">添加话题</div>
          </div>
          <scroller lock-x height="-45px"   ref="scrollerBottom">
            <div class="scroller_box">
                <ul class="add_ht">
                  <li @click="addHt(item)" v-for="item in htArr">{{item}}</li>
                </ul>
            </div>
          </scroller>
        </div>
    </div>
</template>
<script>
import { Toast, ConfirmPlugin } from "vux";
import { mapGetters } from "vuex";
import settings from "@/config/settings.js";
export default {
  components: {
    Toast,
    ConfirmPlugin
  },
  computed: {
    ...mapGetters(["getLogin"])
  },
  data() {
    return {
      server: settings.server,
      child: false,
      htArr: [
        "#膳食知识库#",
        "#琴棋书画#",
        "#关系维护#",
        "#观点#",
        "#有意思的事#",
        "#深刻的经历#",
        "#饮食行为分享#",
        "#运动分享#"
      ],
      htYxArr: [],
      data: {
        text: "",
        upload: "",
        location: "",
        picurl: "",
        imgUrl: "",
        imgs: [],
        imgData: {
          accept: "image/gif, image/jpeg, image/png, image/jpg"
        }
      }
    };
  },
  methods: {
    addImg(event) {
      let reader = new FileReader();
      let img1 = event.target.files[0];
      let type = img1.type; //文件的类型，判断是否是图片
      let size = img1.size; //文件的大小，判断图片的大小
      if (this.data.imgData.accept.indexOf(type) == -1) {
        this.$vux.toast.show({
          type: "warn",
          text: "图片格式只支持：gif、jpg、png、jpeg"
        });
        return false;
      }
      if (size > 3145728) {
        this.$vux.toast.show({
          type: "warn",
          text: "请选择3M以内的图片！"
        });
        return false;
      }
      var uri = "";
      let form = new FormData();
      form.append("file", img1, img1.name);
      this.$Axios
        .post(settings.server + "/api/User/UploadImg", form, {
          headers: {
            "Content-Type": "multipart/form-data",
            userid: this.getLogin.userid,
            Token: this.getLogin.Token
          }
        })
        .then(response => {
          this.data.picurl = response.data.Data;
          this.data.imgUrl = this.server + response.data.Data;
          console.log(this.data.imgUrl);
        })
        .catch(error => {
          this.$vux.toast.show({
            type: "error",
            text: "上传出错"
          });
        });
    },
    setLocation() {
      // prompt形式调用
      this.$vux.confirm.prompt("请输入您当前所在位置", {
        onCancel(data) {},
        onConfirm: data => {
          this.data.location = data;
        }
      });
    },
    submit() {
      if (this.data.text == "") {
        this.$vux.toast.show({
          type: "warn",
          text: "不能提交空的评论哦",
          width: "11em"
        });
      } else {
        this.$http({
          url: "/api/User/PostMoment",
          type: "post",
          data: JSON.stringify({
            text: this.data.text,
            picurl: this.data.picurl,
            topic: this.htYxArr.join(" "),
            location: this.data.location
          }),
          success: data => {
            if (data.Code == 20000) {
              this.$vux.toast.show({
                type: "success",
                text: "发布成功"
              });
              this.$router.push({
                path: "/Dynamic"
              });
            }
          },
          error: error => {
            console.log(error);
          }
        });
      }
    },
    addHt(item) {
      var isTrue = true;
      for (let i = 0; i < this.htYxArr.length; i++) {
        if (item == this.htYxArr[i]) {
          isTrue = false;
        }
      }
      if (isTrue) {
        this.child = false;
        this.htYxArr.push(item);
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "话题重复，请重新选择",
          width: "11em"
        });
      }
    },
    removeHt(index) {
      this.htYxArr.splice(index, 1);
      this.$vux.toast.show({
        type: "success",
        text: "删除成功"
      });
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.container {
  height: 100%;
  overflow: hidden;
  .ht_list {
    padding: 0 15px;
    box-sizing: border-box;

    span {
      color: #fff;
      font-size: 14px;
      margin-right: 8px;
      background: #bbb;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 10px;

      i {
        font-size: 12px;
      }
    }
  }
  .text_fb {
    padding-bottom: 20px;
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
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      i {
        font-size: 50px;
        color: #8a8a8a;
      }

      .upload_img {
        left: 0;
        top: 0;
        position: absolute;
        z-index: 99;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }

    .iconload {
      margin-left: 15px;
      margin-top: 10px;

      span {
        margin-right: 10px;

        i {
          font-size: 18px;
          color: #909090;
        }
      }
      .lo {
        margin-left: -10px;
      }
    }
  }

  .add_ht {
    padding: 0 15px;
    box-sizing: border-box;
    height: 105/2px;
    line-height: 105/2px;
    font-size: 34/2px;
    color: #6b6b6b;

    li {
      border-bottom: 1px solid #d0d0d0;
    }
  }
}
</style>
<style lang="less">
.vux-prompt {
  padding-top: 20px;
}
</style>


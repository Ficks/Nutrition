<template>
    <div class="container">
      <div class="top_view" v-show="!jbsTrue">
        <div class="header">
          <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
          <div class="title">{{$route.name}}</div>
        </div>
          <div class="my_box">
              <scroller lock-x height="-45px"  ref="scrollerBottom">
              <div class="my_list scroller_box">
                <ul>
                  <li>姓名<div class="input"><input :readonly="read" type="text" placeholder="请输入姓名" v-model="form.name"></div></li>
                  <li @click="actionsheetFn('sex')">性别<div class="right">{{form.sex.name==''?"请选择":form.sex.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="theMshow('age')">年龄<div class="right">{{form.age==''?"请选择":form.age+'岁'}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="theMshow('height')">身高<div class="right">{{form.height==''?"请选择":form.height}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="theMshow('weight')">体重<div class="right">{{form.weight==''?"请选择":form.weight}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                </ul>
                <ul>
                  <li @click="jbsFn">疾病史<div class="right">{{form.jbs==''?"请选择":form.jbs}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('ysxh')">饮食喜好<div class="right">{{form.ysxh.name==''?"请选择":form.ysxh.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('llsp')">劳力水平<div class="right">{{form.llsp.name==''?"请选择":form.llsp.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="gmswFn">过敏食物<div class="right">{{form.weight==''?"请选择":form.weight}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                </ul>
                <div class="gmsw">
                    <h3>过敏食物</h3>
                    <ul>
                        <li v-for="(item,index) in gmsw">{{item.name}} <i v-if="!read" @click="removeIndex=index;remove.value=true;" class="iconfont icon-shanchu"></i></li>
                    </ul>
                </div>
                <div class="submit_btn" v-if="!read" @click="submit">保存并返回</div>
              </div>
              </scroller>
          </div>
          <Actionsheet v-model="show" :menus="menus" @on-click-menu="reason" show-cancel></Actionsheet>
          <actionsheet v-model="remove.value" :menus="remove.menu" @on-click-menu-delete="removeGm" show-cancel></actionsheet>

        <div class="nav_bom_zoom" v-show="zoom" @click="closeAll"></div>
          <div class="afxm" :style="{bottom:formShow.age?0:-200+'px'}">
            <h3>选择年龄</h3>
            <div class="vuels">年龄：{{form.age}} 岁</div>
            <div class="sle">
              <range v-model="form.age"  :min="0" :max="150"></range>
            </div>
        </div>

        <div class="afxm" :style="{bottom:formShow.height?0:-200+'px'}">
            <h3>选择身高</h3>
            <div class="vuels">年龄：{{form.height}} cm</div>
            <div class="sle">
              <range v-model="form.height"  :min="0" :max="210"></range>
            </div>
        </div>

        <div class="afxm" :style="{bottom:formShow.weight?0:-200+'px'}">
            <h3>选择体重</h3>
            <div class="vuels">年龄：{{form.weight}} kg</div>
            <div class="sle">
              <range v-model="form.weight"  :min="0" :max="150"></range>
            </div>
        </div>

      </div>
      <div class="child_view" v-show="jbsTrue">
        <AddCase @addJbsBd="addJbs"></AddCase>
      </div>
    </div>
</template>
<script>
import { Actionsheet, Toast, Popup, Rater, Range } from "vux";
import AddCase from "./AddCase";
import { setTimeout } from "timers";
export default {
  components: {
    Actionsheet,
    Toast,
    Rater,
    Range,
    AddCase
  },
  data() {
    return {
      read: false, //是否只读
      jbsTrue: false, //是否正在添加疾病
      removeIndex: -1,
      remove: {
        value: false,
        menu: {
          "title.noop": "确定删除?",
          delete: '<span style="color:red">删除</span>'
        }
      },
      zoom: false,
      show: false,
      menus: null,
      menuKey: "",
      formShow: {
        age: false,
        height: false,
        weight: false
      },
      form: {
        name: "",
        sex: {
          value: "",
          name: ""
        },
        age: 0,
        height: 0,
        weight: 0,
        disease: "",
        jbs: "",
        ysxh: {
          value: "",
          name: ""
        },
        llsp: {
          value: "",
          name: ""
        }
      },
      menu: {
        sex: {
          "0": "女",
          "1": "男"
        },
        ysxh: {
          "0": "素菜",
          "1": "海鲜",
          "2": "牛羊猪肉",
          "3": "野味"
        },
        llsp: {
          "0": "轻度",
          "1": "中度",
          "2": "重度"
        }
      },
      gmsw: [
        {
          name: "蔬菜"
        },
        {
          name: "白菜"
        },
        {
          name: "包菜"
        },
        {
          name: "小菜"
        },
        {
          name: "素菜"
        },
        {
          name: "肥肉"
        }
      ]
    };
  },
  methods: {
    jbsFn() {
      if (this.read) {
        return;
      }
      this.jbsTrue = true;
    },
    gmswFn() {
      if (this.read) {
        return;
      }
      this.$router.push({ path: "/My/PersonalFiles/AllergicFood" });
    },
    closeAll() {
      // 关闭所有弹窗
      for (var key in this.formShow) {
        this.formShow[key] = false;
      }
      this.zoom = false;
    },
    theMshow(key) {
      if (this.read) {
        return;
      }
      this.formShow[key] = true;
      this.zoom = true;
    },
    reason(key, val) {
      if (this.read) {
        return;
      }
      console.log(key, val);
      this.form[this.menuKey].value = key;
      this.form[this.menuKey].name = val;
    },
    actionsheetFn(x) {
      if (this.read) {
        return;
      }
      this.menuKey = x;
      this.menus = this.menu[x];
      this.show = true;
    },
    removeGm() {
      this.gmsw.splice(this.removeIndex, 1);
      this.$vux.toast.show({
        text: "删除成功",
        type: "success"
      });
    },
    addJbs(item) {
      // 添加的疾病
      if (item !== "back") {
        this.form.jbs = item.name;
      }
      this.jbsTrue = false;
    },
    submit() {
      // 提交数据;
      console.log(this.form);
      this.$vux.toast.show({
        text: "保存成功",
        type: "success"
      });
      this.$router.push({
        path: "/My"
      });
    }
  },
  mounted() {
    // 判断是否只读
    if (this.$route.query.read == true) {
      this.read = true;
    }
    console.log("当前页面API：" + this.$route.path);
    console.log("个人数据：", this.form);
    console.log("过敏食物列表：", this.gmsw);

    // this.$http({
    //   url: "/api/HealthyArchive/GetPersonalHealthyArchive",
    //   type: "get",
    //   data: {
    //     referid: "1",
    //     openid: "2",
    //     nickname: "3",
    //     headurl: "4"
    //   },
    //   success: function(data) {
    //     console.log(data);
    //   },
    //   error: function(data) {
    //     console.log(data);
    //   }
    // });

    var d = this.$store.getters.getLogin;
    console.log("-----------------");
    console.log(d);
    $.ajax({
      url: "http://www.xyys.ltd/api/HealthyArchive/GetPersonalHealthyArchive",
      type: "get",
      // dataType: "jsonp",
      headers: {
        a: "1111",
        userid: d.userid,
        Token: d.Token,
        "Content-Type": "text/html;charset=utf-8"
      },
      success: function(data) {
        //成功的处理
        console.log(data);
      },
      error: function() {
        //错误处理
      }
    });
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;

  .top_box {
    padding: 30px 25px;
    padding-top: 10px;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    background: #8dc13b;

    .imgs {
      width: 70px;
      height: 70px;
      overflow: hidden;
      border-radius: 50%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .wz {
      float: left;
      margin-left: 15px;
      color: #fff;

      h1 {
        font-size: 18px;
        padding: 5px 0;
        font-weight: 500;
      }
      p {
        font-size: 18px;
      }
    }
  }

  .my_list {
    padding-bottom: 20px;
    ul {
      height: auto;
      overflow: hidden;
      padding: 0 15px;
      padding-bottom: 20px;

      li {
        position: relative;
        height: 95/2px;
        line-height: 95/2px;
        border-bottom: 1px solid #e3e3e3;
        display: block;
        color: #555555;
        font-size: 15px;

        i {
          color: #8b8b8b;
          font-size: 12px;
        }

        .input {
          position: absolute;
          width: 150px;
          right: 0;
          box-sizing: border-box;
          top: 0;
          font-size: 15px;

          input {
            font-size: 15px;
            text-align: right;
            background: none;

            &::-webkit-input-placeholder {
              /* WebKit browsers */
              color: #aeaeae;
            }
            &:-moz-placeholder {
              /* Mozilla Firefox 4 to 18 */
              color: #aeaeae;
            }
            &::-moz-placeholder {
              /* Mozilla Firefox 19+ */
              color: #aeaeae;
            }
            &:-ms-input-placeholder {
              /* Internet Explorer 10+ */
              color: #aeaeae;
            }
          }
        }

        .right {
          float: right;
          color: #aeaeae;
        }
      }
    }
  }

  .afxm {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    transition: all 0.5s;

    h3 {
      padding: 10px;
      font-size: 16px;
      color: #333;
    }
    .sle {
      position: relative;
      left: -15px;
      margin-top: 30px;
      height: 50px;
    }
    .vuels {
      text-align: center;
    }

    ul {
      li {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 14px;
        border-bottom: #ddd 1px solid;
        color: #666;

        &:hover {
          background: #ddd;
        }
      }
    }
  }

  .gmsw {
    h3 {
      font-size: 16px;
      padding-left: 15px;
      color: #333;
    }

    ul {
      padding: 0 30px;
      box-sizing: border-box;

      .iconfont {
        float: right;
      }
    }
  }

  .submit_btn {
  }
}
</style>

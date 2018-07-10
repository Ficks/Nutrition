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
                  <li>姓名<div class="input"><input :readonly="read" type="text" class="name_cor" placeholder="请输入姓名" v-model="form.name"></div></li>
                  <li @click="actionsheetFn('sex')">性别<div class="right">{{form.sex.name==''?"请选择":form.sex.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="theMshow('age')">年龄<div class="right">{{form.age===0?form.yue===0?"请选择":form.yue+"个月":form.age+'岁'}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>

                  <li @click="theMshow('height')">身高<div class="right">{{form.height==''?"请选择":form.height+'cm'}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="theMshow('weight')">体重<div class="right">{{form.weight==''?"请选择":form.weight+'kg'}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('mz')">民族<div class="right">{{form.mz.name==''?"请选择":form.mz.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('zy')">职业<div class="right">{{form.zy.name==''?"请选择":form.zy.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('hyzk')">婚姻状况<div class="right">{{form.hyzk.name==''?"请选择":form.hyzk.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('whcd')">文化程度<div class="right">{{form.whcd.name==''?"请选择":form.whcd.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('jtsr')">家庭年收入<div class="right">{{form.jtsr.name==''?"请选择":form.jtsr.name+"W"}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  
                </ul>
                <ul>
                  <li @click="jbsFn">疾病史<div class="right">{{form.jbs.name==null || form.jbs.name==''?read?"无":"请选择":form.jbs.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('yfxx')">孕妇选项<div class="right">{{form.yfxx.name==''?"请选择":form.yfxx.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('ysxh')">饮食喜好<div class="right">{{form.ysxh.name==''?"请选择":form.ysxh.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li @click="actionsheetFn('llsp')">劳力水平<div class="right">{{form.llsp.name==''?"请选择":form.llsp.name}}<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                  <li v-if="read!=true" @click="gmswFn">过敏食物<div class="right">去添加<i class="iconfont icon-chanpinxiangqing_qianwang"></i></div></li>
                </ul>
                <div class="gmsw">
                    <h3>过敏食物</h3>
                    <p v-if="gmsw.length==0">暂无添加过敏食物</p>
                    <ul>
                        <li v-for="(item,index) in gmsw">{{item.name}} <i v-if="!read" @click="removeIndex=index;remove.value=true;" class="iconfont icon-shanchu"></i></li>
                    </ul>
                </div>
                <ul style="margin-top:20px;" v-if="!read">
                  <li>开户行<input :readonly="read" type="text" class="yhzh" v-model="form.bank" placeholder="请输入开户行"></li>
                  <li>开户人<input :readonly="read" type="text" class="yhzh" v-model="form.account" placeholder="请输入开户人"></li>
                  <li>银行账号<input :readonly="read" type="text" class="yhzh" v-model="form.banaccount" placeholder="请输入银行账号"></li>
                </ul>
                <div class="submit_btn" v-if="!read" @click="submit">保存并返回</div>
              </div>
              </scroller>
          </div>
          <Actionsheet v-model="show" :menus="menus" @on-click-menu="reason" show-cancel></Actionsheet>
          <actionsheet v-model="remove.value" :menus="remove.menu" @on-click-menu-delete="removeGm" show-cancel></actionsheet>

        <div class="nav_bom_zoom" v-show="zoom" @click="closeAll"></div>
          <div class="afxm" :style="{bottom:formShow.age?0:-200+'px'}">
            <h3>选择年龄 <span class="span_btn" v-show="form.age==0" @click="yuefs.value=true">选择月份</span> </h3>
            <div class="vuels">年龄：{{form.age}} 岁</div>
            <div class="sle">
              <range v-model="form.age"  :min="0" :max="110"></range>
            </div>
        </div>

        <div class="afxm" :style="{bottom:formShow.height?0:-200+'px'}">
            <h3>选择身高</h3>
            <div class="vuels">身高：{{form.height}} cm</div>
            <div class="sle">
              <range v-model="form.height"  :min="50" :max="210"></range>
            </div>
        </div>

        <div class="afxm" :style="{bottom:formShow.weight?0:-200+'px'}">
            <h3>选择体重</h3>
            <div class="vuels">体重：{{form.weight}} kg</div>
            <div class="sle">
              <range v-model="form.weight"  :min="0" :max="150"></range>
            </div>
        </div>
        <div class="afxm"  :style="{bottom:yuefs.value?0:-800+'px'}">
          <h3>选择月份</h3>
          <ul class="textcenter">
            <li @click="yuefsGm(item)" v-for="item in 11">{{item}}月份</li>
            <li @click="yuefs.show=false" class="cancel">取消</li>
          </ul>
      </div>

      </div>
      <div class="child_view" v-show="jbsTrue">
        <AddCase @addJbsBd="addJbs" ref="childs"></AddCase>
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
      yuefs: {
        value: false
      },
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
        id: "",
        name: "",
        sex: {
          value: "",
          name: ""
        },
        age: 0,
        yue: "",
        height: 0,
        weight: 0,
        bank: "",
        account: "",
        banaccount: "",
        mz: {
          value: "",
          name: ""
        },
        zy: {
          value: "",
          name: ""
        },
        hyzk: {
          value: "",
          name: ""
        },
        whcd: {
          value: "",
          name: ""
        },
        jtsr: {
          value: "",
          name: ""
        },
        disease: "",
        jbs: {
          value: "",
          name: ""
        },
        yfxx: {
          value: "",
          name: ""
        },
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
          "0": "男",
          "1": "女"
        },
        mz: {
          "0": "汉族",
          "1": "其他"
        },
        zy: {
          "0": "国家公务员",
          "1": "专业技术人员",
          "2": "职员",
          "3": "企业管理者",
          "4": "工人",
          "5": "农民",
          "6": "学生",
          "7": "现役军人",
          "8": "个体经营者",
          "9": "无业人员",
          "10": "退（离）休人员",
          "11": "其他"
        },
        hyzk: {
          "0": "已婚一起生活",
          "1": "离异",
          "2": "已婚分居一月以上",
          "3": "鳏/寡居",
          "4": "单身，从未婚",
          "5": "未婚同居",
          "6": "其他"
        },
        whcd: {
          "0": "小学及以下",
          "1": "初中",
          "2": "高中/中专/高职",
          "3": "大专/大学",
          "4": "研究生及以上"
        },
        jtsr: {
          "0": "3万以下",
          "1": "3-8",
          "2": "8-15",
          "3": "15-30",
          "4": "30-50",
          "5": "50-100",
          "6": "100万以上"
        },
        yfxx: {
          "1": '<span style="color:#f00">否</span>',
          "2": "早孕期",
          "3": "中孕期",
          "4": "晚孕期",
          "5": "哺乳期"
        },
        ysxh: {
          "1": "素菜",
          "2": "海鲜",
          "3": "牛羊猪肉",
          "4": "野味"
        },
        llsp: {
          "1": "轻度",
          "2": "中度",
          "3": "重度"
        }
      },
      gmsw: []
    };
  },
  methods: {
    // 选择月份
    yuefsGm(val) {
      this.form.yue = val;
      this.zoom = this.formShow.age = this.yuefs.value = false;
    },
    jbsFn() {
      if (this.read) {
        return;
      }
      this.jbsTrue = true;

      this.$refs.childs.reset();
    },
    gmswFn() {
      var _this = this;
      if (this.read) {
        return;
      }
      this.$vux.confirm.show({
        title: "请先保存当前修改，跳转后资料会丢失",
        confirmText: "添加过敏食物",
        cancelText: "先去保存",
        // 组件除show外的属性
        onCancel() {},
        onConfirm() {
          _this.$router.push({ path: "/My/PersonalFiles/AllergicFood" });
        }
      });
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
      if (this.read || key == "cancel") {
        return;
      }
      if (val.indexOf("</span>") >= 0) {
        val = "否";
      }
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
      this.$http({
        url: "/api/HealthyDiet/DeleteAllergyFood",
        type: "post",
        data: JSON.stringify({ id: this.gmsw[this.removeIndex].id }),
        success: data => {
          this.gmsw.splice(this.removeIndex, 1);
          this.$vux.toast.show({
            text: "删除成功",
            type: "success"
          });
        },
        error: error => {}
      });
    },
    addJbs(item) {
      // 添加的疾病
      if (item !== "back") {
        this.form.jbs.name = item.Name;
        this.form.jbs.value = item.Id;
      }
      this.jbsTrue = false;
    },
    submit() {
      var arr = [this.form.bank, this.form.account, this.form.banaccount];
      var kLen = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
          kLen++;
        }
      }
      if (kLen !== 0 && kLen !== 3) {
        this.$vux.toast.show({
          text: "请填写：开户行 开户人 银行账号",
          type: "warn",
          width: "11em"
        });
        return;
      }
      // 提交数据;
      var d = {
        id: this.form.id,
        name: this.form.name,
        sexvalue: this.form.sex.value,
        age: this.form.age,
        height: this.form.height,
        weight: this.form.weight,
        // bank: this.form.bank,
        // account: this.form.account,
        // banaccount: this.form.banaccount,
        bankaccount: `${this.form.bank}-${this.form.account}-${
          this.form.banaccount
        }`,
        nation: this.form.mz.name, //民族
        occupation: this.form.zy.name, //职业
        marriage: this.form.hyzk.name, //婚姻
        education: this.form.whcd.name, //教育
        familyincome: this.form.jtsr.name, //收入
        jbsid: this.form.jbs.value,
        ysxhid: this.form.ysxh.value,
        llspid: this.form.llsp.value
      };

      if (d.age === 0 && this.form.yue !== 0) {
        d.Age = this.form.yue / 12;
        console.log(d.Age);
      }

      d = JSON.stringify(d);

      this.$http({
        url: "/api/HealthyArchive/UpdatePersonalHealthyArchive",
        type: "post",
        data: d,
        success: data => {
          //成功的处理
          this.$vux.toast.show({
            text: data.Message,
            type: "success"
          });
          this.$router.push({
            path: "/My"
          });
        },
        error: function() {
          //错误处理
        }
      });
    },
    setYfName(index) {
      if (index === 0) {
        return "否";
      } else if (index == 1) {
        return "早孕期";
      } else if (index == 2) {
        return "中孕期";
      } else if (index == 3) {
        return "晚孕期";
      } else if (index == 4) {
        return "哺乳期";
      }
    },
    setData(data) {
      this.form.id = data.Data.id;
      this.form.name = data.Data.name;
      if (data.Data.age < 1) {
        this.form.age = 0;
        this.form.yue = Math.round(data.Data.age * 12);
      } else {
        this.form.age = data.Data.age;
      }
      this.form.sex.name = data.Data.sexname;
      this.form.sex.value = data.Data.sexvalue;
      this.form.height = data.Data.height;
      this.form.weight = data.Data.weight;
      this.form.bank = data.Data.bank;
      this.form.account = data.Data.account;
      this.form.banaccount = data.Data.banaccount;
      this.form.mz.name = data.Data.nation;
      this.form.zy.name = data.Data.occupation;
      this.form.hyzk.name = data.Data.marriage;
      this.form.whcd.name = data.Data.education;
      this.form.jtsr.name = data.Data.familyincome;
      this.form.jbs.value = data.Data.jbsid;
      this.form.jbs.name = data.Data.jbsname;
      this.form.yfxx.value = data.Data.hyzt;
      this.form.yfxx.name = this.setYfName(data.Data.hyzt);
      this.form.ysxh.value = data.Data.ysxhid;
      this.form.ysxh.name = data.Data.ysxhname;
      this.form.llsp.value = data.Data.llspid;
      this.form.llsp.name = data.Data.llspname;
      this.gmsw = data.Data.alleryarr;
      var arr = [];
      if (data.Data.bankaccount) {
        arr = data.Data.bankaccount.split("-");
      }
      this.form.bank = arr[0] || "";
      this.form.account = arr[1] || "";
      this.form.banaccount = arr[2] || "";
    }
  },
  mounted() {
    var url = "/api/HealthyArchive/GetPersonalHealthyArchive";
    // var d = this.$store.getters.getLogin;
    var id = "";
    // 判断是否只读
    if (this.$route.query.id) {
      url = "/api/HealthyArchive/GetPersonalHealthyArchiveByUserId";
      id = this.$route.query.id;
      this.read = true;
    } else {
      url = "/api/HealthyArchive/GetPersonalHealthyArchive";
    }
    this.$http({
      url: url,
      type: "get",
      data: { id: id },
      success: data => {
        //成功的处理
        this.setData(data);
      },
      error: function() {
        //错误处理
      }
    });
  }
};
</script>
<style scoped lang="less">
.yhzh {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: none;
  padding-left: 50px;
  text-align: right;
  color: #aeaeae;
}
.container {
  height: 100%;
  .name_cor {
    color: #aeaeae;
  }
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
          width: 100%;
          right: 0;
          box-sizing: border-box;
          top: 0;
          font-size: 15px;

          input {
            padding-left: 100px;
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
    p {
      text-align: center;
      color: #ddd;
      padding: 20px 0;
      font-size: 14px;
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

  .span_btn {
    float: right;
    background: #8dc13b;
    color: #fff;
    font-size: 14px;
    padding: 3px 7px;
    font-size: 12px;
  }
  .textcenter {
    text-align: center;

    .cancel {
      border-top: 10px solid #eee;
      box-sizing: content-box;
      border-bottom: 0;
    }
  }
}
</style>

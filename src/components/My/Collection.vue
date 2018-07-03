<template>
    <div class="container">
      <div class="header">
        <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
        <div class="title">{{$route.name}}</div>
        <div class="right"><span @click="editRemove">{{operation?"删除":"编辑"}}</span><span v-show="operation" @click="operation=false">取消</span></div>
      </div>
        <scroller lock-x height="-45px"  @on-scroll-bottom="getList"  ref="scrollerBottom">
        <div class="box search_list scroller_box">
            <div class="sclb">
                <div class="sclb__bd">
                    <a href="javascript:void(0);" @click="operationFn(item)" v-for="(item,index) in listArr">
                        <div v-if="item.src"  class="left">
                            <img :src="$HTTPURL+item.src" alt="" class="weui-media-box__thumb">
                        </div>
                        <div class="right">
                            <h4>{{item.title}}</h4>
                            <p>{{item.desc}}</p>
                        </div>
                        <div class="abs" v-show="operation">
                            <i :class="{'icon-danxuankuang-xuanzhong':item.edit,'icon-danxuankuang-weixuanzhong':!item.edit}" class="iconfont"></i>
                        </div>
                    </a>
                </div>
            </div>
            <p class="more_s"  v-show="!searchVal.onFetching">{{searchVal.uptext}}</p>
            <load-more tip="loading" v-show="searchVal.onFetching"></load-more>
        </div>
        </scroller>
        <actionsheet v-model="remove.value" :menus="remove.menu" @on-click-menu-delete="onDelete" show-cancel></actionsheet>
    </div>
</template>
<script>
import { LoadMore, Actionsheet, Loading, Toast } from "vux";

export default {
  components: {
    LoadMore,
    Actionsheet,
    Loading,
    Toast
  },
  data() {
    return {
      title: "",
      operation: false,
      remove: {
        value: false,
        menu: {
          "title.noop": "确定删除?",
          delete: '<span style="color:red">删除</span>'
        }
      },
      searchVal: {
        pageNum: 0,
        pageSize: 10,
        onFetching: false,
        uptext: "滑动查看更多"
      },
      listArr: []
    };
  },
  methods: {
    onDelete() {
      this.$http({
        url: "/api/NewsInfo/DoCollect",
        type: "post",
        data: JSON.stringify({ id: 1 }),
        success: data => {
          console.log(data);
        },
        error: data => {}
      });
      //   删除
      this.$vux.loading.show({
        text: "Loading"
      });
      var removeArr = [];
      for (let i = 0; i < this.listArr.length; i++) {
        if (this.listArr[i].edit) {
          removeArr.push(i);
        }
      }
      // 给下标排序然后再删除
      removeArr.sort((a, b) => {
        return b - a;
      });
      for (let i = 0; i < removeArr.length; i++) {
        this.listArr.splice(removeArr[i], 1);
      }
      this.operation = false;
      this.$vux.loading.hide();
      this.$vux.toast.show({
        text: "删除成功",
        type: "success"
      });
    },
    getList(time) {
      var _this = this;
      if (this.searchVal.onFetching) {
        // do nothing
      } else {
        this.searchVal.onFetching = true;
        setTimeout(() => {
          this.searchVal.pageNum++;
          this.$http({
            url: "/api/NewsInfo/GetFavoriteNewsList",
            type: "get",
            data: this.searchVal,
            success: function(data) {
              //成功的处理
              _this.setData(data.Data);
            },
            error: function() {
              //错误处理
            }
          });
        }, time || 800);
      }
    },
    setData(data) {
      if (data.length === 0) {
        this.searchVal.pageNum--;
      } else {
        for (let i = 0; i < data.length; i++) {
          data[i].edit = false;
          this.listArr.push(data[i]);
        }
      }
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      this.searchVal.onFetching = false;
      console.log(data);
    },
    editRemove() {
      if (this.operation) {
        //   使用删除组件
        this.remove.value = true;
      } else {
        //   编辑
        this.operation = true;
      }
    },
    operationFn(item) {
      if (this.operation) {
        // 选中或取消
        item.edit = !item.edit;
      } else {
        // 进入详情
        this.$router.push({
          path: "/Find/FindDetails",
          query: {
            id: item.id
          }
        });
      }
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    console.log("当前页面数据列表", this.listArr);
    this.getList(1);
  }
};
</script>
<style lang="less" scoped>
.header span {
  margin-left: 10px;
}
.sclb:first-child {
  margin-top: 0;
}
.sclb {
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
.sclb__bd {
  padding: 0 20px;
  a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 15px 0;
    position: relative;
    border-radius: 8px;
    border-bottom: 1px solid #eee;

    .abs {
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -13px;
      i {
        font-size: 26px;
        color: #8dc13b;
      }
    }
    .left {
      margin-right: 0.8em;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      width: 120px;
      height: auto;
      border: 2px solid #ededed;

      img {
        width: 100%;
        max-height: 100%;
        vertical-align: top;
      }
    }
    .right {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      min-width: 0;
      padding-right: 50px;

      h4 {
        font-weight: 400;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        word-wrap: break-word;
        word-break: break-all;
        color: #757575;
        font-size: 16px;
      }
      p {
        color: #999999;
        font-size: 13px;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: 10px;
        color: #a4a4a4;
        font-size: 14px;
      }
    }
  }
}
.container {
  background: #f9f9f9;
  height: 100%;
}
.scroller_box {
  padding-bottom: 1px;
  box-sizing: border-box;
}
.search {
  width: 100%;
  height: 40px;
  background: #fff;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: hidden;

  .input {
    position: relative;
    margin-top: 5px;
    input {
      color: #a1a1a1;
      padding-left: 25px;
    }
    i {
      position: absolute;
      left: 5px;
      top: 6px;
      color: #a1a1a1;
    }
  }
}

.box {
  //   padding: 0 15px;

  .weui-panel {
    background: none;
  }
  .more_s {
    text-align: center;
    padding: 10px 0;
    color: #a4a4a4;
    font-size: 12px;
  }
}
</style>
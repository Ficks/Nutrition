<template>
    <div class="container">
          <div class="header">
              <div class="left" @click="back"><i class="iconfont icon-fanhui"></i>返回</div>
              <div class="title">添加疾病</div>
          </div>
          <div class="search">
              <div class="input">
              <input type="text" v-model="searchVal" placeholder="输入文字搜索疾病">
              <i class="iconfont icon-sousuo"></i>
              </div>
          </div>
          <scroller lock-x height="-95px" ref="scrollerBottom">
              <div class="scroller_box list_mds">
                  <ul>
                      <li @click="addJb(item)" v-for="(item,index) in list">{{item.Name}}</li>
                  </ul>
              </div>            
          </scroller>
    </div>
</template>
<script>
export default {
  data() {
    return {
      searchVal: "",
      loading: false,
      listArr: []
    };
  },
  computed: {
    list() {
      if (this.searchVal == "") {
        return this.listArr;
      } else {
        var arr = [];
        for (let i = 0; i < this.listArr.length; i++) {
          if (this.listArr[i].name.indexOf(this.searchVal) !== -1) {
            arr.push(this.listArr[i]);
          }
        }
        return arr;
      }
    }
  },
  methods: {
    back() {
      this.$emit("addJbsBd", "back");
    },
    // 加入疾病
    addJb(item) {
      this.$emit("addJbsBd", item);
    }
  },
  mounted() {
    var _this = this;
    this.$http({
      url: "/api/HealthyArchive/GetDiseaseList",
      type: "get",
      success: function(data) {
        //成功的处理
        _this.listArr = data.Data.Data;
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
  background: #fff;

  .list_mds {
    padding: 0 15px;
    box-sizing: border-box;
    ul {
      li {
        height: 90px/2;
        line-height: 90px/2;
        border-bottom: 1px solid #efefef;
        font-size: 32/2px;
        color: #757575;
      }
    }
  }

  .search {
    width: 100%;
    height: 50px;
    background: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: hidden;
    border-bottom: 1px solid #efefef;

    .input {
      position: relative;
      margin-top: 10px;
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
}
</style>



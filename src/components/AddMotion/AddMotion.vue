<template>
    <div class="container">
        <div class="header">
            <div class="left" @click="$router.back(-1)"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="title">{{$route.name}}</div>
        </div>
        <div class="search">
            <div class="input">
            <input type="text" v-model="searchVal" placeholder="输入文字搜索运动">
            <i class="iconfont icon-sousuo"></i>
            </div>
        </div>
        <scroller lock-x height="-95px" ref="scrollerBottom">
            <div class="scroller_box list_mds">
                <ul>
                    <li @click="addJr(true,item)" v-for="(item,index) in list">{{item.name}} <span>运动强度：<em>{{item.iten}}</em></span></li>
                </ul>
            </div>            
        </scroller>

        <div class="nav_bom_zoom" @click="addJr(false)" v-show="addBom===0"></div>
        <div class="details_fix" :style="{bottom:addBom+'px'}">
            <div class="top">
            {{$getDate(0)}}
            <span @click="addJr(false)">取消</span>
            </div>
            <div class="twbm">
                
            </div>
            
            <div class="s">
                <div class="z">
                    <span>运动强度：{{addData.iten}}</span>
                    {{addData.min+`min`}}
                </div>
                <div class="kdc">
                    <range v-model="addData.min"  :min="1" :max="500"></range>
                </div>
            </div>

            <div class="submit_btn" @click="addJrys">完成</div>
        </div>
    </div>
</template>
<script>
import { Rater, Range, Toast } from "vux";
export default {
  components: {
    Rater,
    Range,
    Toast
  },
  data() {
    return {
      searchVal: "",
      search: {
        name: "",
        pageNum: 1,
        pageSize: 100
      },
      loading: false,
      addBom: -500,
      addData: {
        id: "",
        min: 0,
        iten: ""
      },
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
    addJr(isTrue, item) {
      if (isTrue) {
        this.addBom = 0;
      } else {
        this.addBom = -500;
      }
      this.addData.min = 0;
      if (item) {
        this.addData.id = item.id;
        this.addData.iten = item.iten;
      }
    },
    // 加入运动
    addJrys() {
      this.$http({
        url: "/api/HealthyArchive/AddTodaySports",
        type: "post",
        data: JSON.stringify(this.addData),
        success: data => {
          console.log(data);
          if (data.Code === 20000) {
            this.$vux.toast.show({
              text: data.Message,
              type: "success"
            });
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: data.Message,
              width: "50%"
            });
          }
        },
        error: function(data) {
          console.log(data);
        }
      });
      this.addBom = -500;
    },
    getList() {
      this.$http({
        url: "/api/HealthyArchive/GetSportsItemList",
        type: "get",
        data: this.search,
        success: data => {
          console.log(data);
          this.listArr = data.Data.Data;
        },
        error: function(data) {
          console.log(data);
        }
      });
    }
  },
  mounted() {
    console.log("当前页面API：" + this.$route.path);
    console.log("数据列表一次性请求完", this.listArr);
    console.log("添加运动发送给后台的数据：", this.addData);
    this.getList();
  }
};
</script>
<style scoped lang="less">
.container {
  height: 100%;

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

        span {
          float: right;
          font-size: 28/2px;
          color: #a4a4a4;
        }
        em {
          width: 30px;
          display: inline-block;
          font-style: normal;
        }
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

  .details_fix {
    transition: all 0.5s;
    position: fixed;
    padding: 15px;
    box-sizing: border-box;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    overflow: hidden;

    .top {
      position: relative;
      text-align: center;
      font-size: 15px;
      color: #8dc13b;
      span {
        position: absolute;
        right: 0;
        font-size: 15px;
        color: #666666;
      }
    }
    .img {
      border: 1px solid #ededed;
    }
    .wz {
      p {
        span {
          float: right;
          font-size: 15px;
          color: #a5a5a5;
        }
      }
    }
    .s {
      margin-top: 10px;
      margin-bottom: 50px;

      .z {
        position: relative;
        text-align: center;
        height: 40px;
        font-size: 15px;
        line-height: 40px;
        color: #8dc13b;
        margin-bottom: 20px;

        span {
          position: absolute;
          left: 0;
          color: #666666;
          font-size: 15px;
        }
      }
      .kdc {
        position: relative;
        left: -15px;
      }
    }
  }
}
</style>



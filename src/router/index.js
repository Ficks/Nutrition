import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Index from '@/components/Index/index.vue'
// 发现
import Find from '@/components/Find/find.vue'
// 咨询
import Consultation from '@/components/Consultation/consultation.vue'
// 我的
import My from '@/components/My/my.vue'
// 基本工具
import Tool from '@/components/Tool/Tool.vue'
// 基本工具--搜索列表
import SearchList from '@/components/Tool/SearchList/SearchList.vue'
// 基本工具--搜索列表详情
import SearchDetails from '@/components/Tool/SearchList/SearchDetails.vue'
// 基本工具--卡路里需求计算
import CalorieCalculation from '@/components/Tool/CalorieCalculation/CalorieCalculation.vue'
// 基本工具--营养素需求查询
import NutrientRequirement from '@/components/Tool/NutrientRequirement/NutrientRequirement.vue'
// 基本工具--运动耗能查询
import MotionEnergyQuery from '@/components/Tool/MotionEnergyQuery/MotionEnergyQuery.vue'
// 基本工具--营养素知识
import NutrientKnowledge from '@/components/Tool/NutrientKnowledge/NutrientKnowledge.vue'
import NutrientKnowledgeDetails from '@/components/Tool/NutrientKnowledge/NutrientKnowledgeDetails.vue'
// 基本工具--饮食分量参考
import DietaryReference from '@/components/Tool/DietaryReference/DietaryReference.vue'
// 基本工具--体重标准查询
import WeightQuery from '@/components/Tool/WeightQuery/WeightQuery.vue'

// 个人档案
import PersonalFiles from '@/components/PersonalFiles/PersonalFiles.vue'
import PersonalData from '@/components/PersonalFiles/PersonalData.vue'
import TodayArchives from '@/components/PersonalFiles/TodayArchives.vue'



Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: Index
  }, {
    path: '/Find',
    name: '发现',
    component: Find
  }, {
    path: '/Consultation',
    name: '咨询',
    component: Consultation
  }, {
    path: '/My',
    name: '我的',
    component: My
  }, {
    path: '/Tool',
    name: '基本工具',
    component: Tool,
    children: [{
      path: '/Tool/Recipes',
      name: '菜谱检索',
      component: SearchList,
      icon: "iconfont icon-xitongcaipu"
    },
    {
      path: '/Tool/MaterialRetrieval',
      name: '食材检索',
      component: SearchList,
      icon: "iconfont icon-yumi"
    },
    {
      path: '/Tool/OtherRetrieval',
      name: '其他食品检索',
      component: SearchList,
      icon: "iconfont icon-jinkouniunai"
    },
    {
      path: '/Tool/SearchList/Details',
      hidden: true,
      name: 'SearchDetails',
      component: SearchDetails
    },
    {
      path: '/Tool/CalorieCalculation',
      name: '卡路里需求计算',
      component: CalorieCalculation,
      icon: "iconfont icon-qialuli"
    },
    {
      path: '/Tool/NutrientRequirement',
      name: '营养素需求查询',
      component: NutrientRequirement,
      icon: "iconfont icon-yingyangbaojian"
    },
    {
      path: '/Tool/MotionEnergyQuery',
      name: '运动耗能查询',
      component: MotionEnergyQuery,
      icon: "iconfont icon-yundong"
    },
    {
      path: '/Tool/NutrientKnowledge',
      name: '营养素知识',
      component: NutrientKnowledge,
      icon: "iconfont icon-zhishi"
    },
    {
      path: '/Tool/NutrientKnowledge/NutrientKnowledgeDetails',
      hidden: true,
      name: '咨询详情',
      component: NutrientKnowledgeDetails
    },
    {
      path: '/Tool/DietaryReference',
      name: '饮食分量参考',
      component: DietaryReference,
      icon: "iconfont icon-mianshi"
    },
    {
      path: '/Tool/WeightQuery',
      name: '体重标准查询',
      component: WeightQuery,
      icon: "iconfont icon-tizhong"
    },
    ]

  }, {
    path: '/PersonalFiles',
    name: '个人档案',
    component: PersonalFiles
  }, {
    path: '/PersonalData',
    name: '修改个人档案',
    component: PersonalData
  }, {
    path: '/TodayArchives',
    name: '今日档案',
    component: TodayArchives
  }, {
    path: '/AllergicFood',
    name: '过敏食物筛选',
    component: SearchList
  }, {
    path: '/AllergicFood/Details',
    name: '过敏食物添加',
    component: SearchDetails
  },]




})

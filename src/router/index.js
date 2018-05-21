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
// 基本工具--饮食分量参考
import DietaryReference from '@/components/Tool/DietaryReference/DietaryReference.vue'
// 基本工具--体重标准查询
import WeightQuery from '@/components/Tool/WeightQuery/WeightQuery.vue'




Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/Find',
    name: 'Find',
    component: Find
  }, {
    path: '/Consultation',
    name: 'Consultation',
    component: Consultation
  }, {
    path: '/My',
    name: 'My',
    component: My
  }, {
    path: '/Tool',
    name: 'Tool',
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

  }, ]




})

import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Index from '@/components/Index/Index.vue'
// 发现
import Find from '@/components/Find/Find.vue'
import FindDetails from '@/components/Find/FindDetails.vue'
// 动态
import Dynamic from '@/components/Find/Dynamic.vue'
import DynamicDetails from '@/components/Find/DynamicDetails.vue'
import Release from '@/components/Find/Release.vue'
// 咨询
import Consultation from '@/components/Consultation/Consultation.vue'
// 我的
import My from '@/components/My/My.vue'
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


// 膳食调配
import Allocation from '@/components/Allocation/Allocation.vue';
import AllocationDetails from '@/components/Allocation/AllocationDetails.vue';

// 评估
import Assessment from '@/components/Assessment/Assessment.vue';
import AssessmentAnswer from '@/components/Assessment/AssessmentAnswer.vue';
import AssessmentResult from '@/components/Assessment/AssessmentResult.vue';


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
      path: '/Find/FindDetails',
      name: '资讯详情',
      component: FindDetails
    },
    {
      path: '/Dynamic',
      name: '动态',
      component: Dynamic
    }, {
      path: '/Dynamic/DynamicDetails',
      name: '动态详情',
      component: DynamicDetails
    }, {
      path: '/Dynamic/Release',
      name: '发布动态',
      component: Release
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
      path: '/Allocation',
      name: '膳食调配',
      component: Allocation,
      children: [{
        path: '/Allocation/NormalDdult',
        name: '正常成人膳食',
        component: AllocationDetails,
        icon: "iconfont icon-nanren"
      }, {
        path: '/Allocation/Baby',
        name: '婴幼儿膳食',
        component: AllocationDetails,
        icon: "iconfont icon-yingerertongxiaohaibaby"
      }, {
        path: '/Allocation/YoungPeople',
        name: '儿童及青春期膳食',
        component: AllocationDetails,
        icon: "iconfont icon-xuesheng"
      }, {
        path: '/Allocation/Aged',
        name: '老年人膳食',
        component: AllocationDetails,
        icon: "iconfont icon-laoren"
      }, {
        path: '/Allocation/PregnantWoman',
        name: '孕妇及乳母膳食',
        component: AllocationDetails,
        icon: "iconfont icon-yunfu"
      }, {
        path: '/Allocation/Vegetarian',
        name: '素食者膳食',
        component: AllocationDetails,
        icon: "iconfont icon-baicai"
      }, {
        path: '/Allocation/Disease',
        name: '疾病及职业膳食',
        component: AllocationDetails,
        icon: "iconfont icon-zhiyebingweihaishigubaogao"
      }, {
        path: '/Allocation/FamilyDinner',
        name: '家庭配餐',
        component: AllocationDetails,
        icon: "iconfont icon-mianshi"
      }]
    }, {
      path: '/PersonalFiles',
      name: '个人档案',
      component: PersonalFiles,
      children: [{
        path: '/PersonalFiles/PersonalData',
        name: '修改个人档案',
        component: PersonalData
      }, {
        path: '/PersonalFiles/TodayArchives',
        name: '今日档案',
        component: TodayArchives
      }, {
        path: '/PersonalFiles/AllergicFood',
        name: '过敏食物筛选',
        component: SearchList
      }, {
        path: '/PersonalFiles/AllergicFood/Details',
        name: '过敏食物添加',
        component: SearchDetails
      }]
    }, {
      path: '/Assessment',
      name: '膳食评估',
      component: Assessment,
      children: [{
        path: '/Assessment/AssessmentAnswer',
        name: '评估问卷',
        component: AssessmentAnswer
      }, {
        path: '/Assessment/AssessmentResult',
        name: '评估结果',
        component: AssessmentResult
      }]
    }, {
      path: '/self',
      name: '自我评估',
      component: Assessment,
      children: [{
        path: '/self/AssessmentAnswer',
        name: '评估问卷',
        component: AssessmentAnswer
      }, {
        path: '/self/AssessmentResult',
        name: '评估结果',
        component: AssessmentResult
      }]
    },
  ]




})

import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Index from '@/components/Index/Index.vue'

// 糖尿病患者推荐
import Recommend from '@/components/Recommend/Recommend.vue';
import RecommendZzw from '@/components/Recommend/RecommendZzw.vue';




// 发现
import Find from '@/components/Find/Find.vue'
import FindDetails from '@/components/Find/FindDetails.vue'
// 动态
import Dynamic from '@/components/Find/Dynamic.vue'
import DynamicDetails from '@/components/Find/DynamicDetails.vue'
import Release from '@/components/Find/Release.vue'
// 咨询
import Consultation from '@/components/Consultation/Consultation.vue'
import ConsultationDetails from '@/components/Consultation/ConsultationDetails.vue'
import ConsultationState from '@/components/Consultation/State.vue'
import Chat from '@/components/Consultation/Chat.vue'
import ChatRefund from '@/components/Consultation/Refund.vue'
import ChatYes from '@/components/Consultation/ChatYes.vue'

// 我的
import My from '@/components/My/My.vue'
// 个人档案
import PersonalFiles from '@/components/My/PersonalFiles/PersonalFiles.vue'
import PersonalData from '@/components/My/PersonalFiles/PersonalData.vue'
import TodayArchives from '@/components/My/PersonalFiles/TodayArchives.vue'
// 我的收藏
import Collection from '@/components/My/Collection.vue'
// 收支明细
import Property from '@/components/My/Property/Property.vue'
// 提现
import PutForward from '@/components/My/Property/PutForward.vue'
// 退款
import Refund from '@/components/My/Property/Refund.vue'
import PropertyState from '@/components/My/Property/State.vue'
import MyAdvice from '@/components/My/MyAdvice.vue'



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



// 膳食调配
import Allocation from '@/components/Allocation/Allocation.vue';
import AllocationDetails from '@/components/Allocation/AllocationDetails.vue';

// 评估
import Assessment from '@/components/Assessment/Assessment.vue';
import AssessmentAnswer from '@/components/Assessment/AssessmentAnswer.vue';
import AssessmentResult from '@/components/Assessment/AssessmentResult.vue';

// 营养师登录
import Dietitian from '@/components/Dietitian/Dietitian.vue';
import DietitianList from '@/components/Dietitian/DietitianList.vue';
import UserInfo from '@/components/Dietitian/UserInfo.vue';

// 添加运动
import AddMotion from '@/components/AddMotion/AddMotion.vue';

import chatDemo from '@/components/chat/demo.vue'



Vue.use(Router)

export default new Router({
  routes: [{
    path: '/demo',
    name: "chat",
    component: chatDemo
  }, {
    path: '/',
    name: '首页',
    component: Index
  }, {
    path: '/Index/Recommend',
    name: "糖尿病患者食谱",
    component: Recommend
  }, {
    path: '/Index/RecommendZzw',
    name: "膳食推荐",
    component: RecommendZzw
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
    path: '/Consultation/ConsultationDetails',
    name: '营养师详情',
    component: ConsultationDetails
  },
  {
    path: '/Consultation/State',
    name: '支付结果',
    component: ConsultationState
  }, {
    path: '/Consultation/Chat',
    name: '聊天',
    component: Chat
  }, {
    path: '/Consultation/ChatRefund',
    name: '评价营养师',
    component: ChatRefund
  },
  {
    path: '/Consultation/ChatYes',
    name: '评价成功',
    component: ChatYes
  }, {
    path: '/My',
    name: '我的',
    component: My
  }, {
    path: '/My/PersonalFiles',
    name: '个人档案',
    component: PersonalFiles,
    children: [{
      path: '/My/PersonalData',
      name: '我的资料',
      component: PersonalData
    }, {
      path: '/My/TodayArchives',
      name: '今日档案',
      component: TodayArchives
    }, {
      path: '/My/PersonalFiles/AllergicFood',
      name: '过敏食物筛选',
      component: SearchList
    }]
  }, {
    path: '/My/Collection',
    name: '我的收藏',
    component: Collection
  }, {
    path: '/My/Property',
    name: '收支明细',
    component: Property,
    children: [{
      path: '/My/Property/PutForward',
      name: '余额提现',
      component: PutForward
    }, {
      path: '/My/Property/Refund',
      name: '退款原因',
      component: Refund
    }, {
      path: '/My/Property/State',
      name: '提交成功',
      component: PropertyState
    }]
  }, {
    path: '/My/MyAdvice',
    name: '我的咨询',
    component: MyAdvice
  }, {
    path: '/My/WalkIntoUs',
    name: '走进我们',
    component: AllocationDetails
  }, {
    path: '/My/Partner',
    name: '合作伙伴',
    component: AllocationDetails
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
      component: AllocationDetails,
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
  {
    path: '/Dietitian',
    name: "营养师登录",
    component: Dietitian
  }, {
    path: '/Dietitian/DietitianList',
    name: "咨询列表",
    component: DietitianList
  },
  {
    path: '/Dietitian/Chat',
    name: "聊天",
    component: Chat
  },
  {
    path: '/Dietitian/UserInfo',
    name: "用户资料类型",
    component: UserInfo
  }, {
    path: '/AddMotion',
    name: "添加运动",
    component: AddMotion
  }
  ]
})

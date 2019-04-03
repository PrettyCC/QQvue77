
import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index.vue'
import rm_detail from './components/rm/rm_detail.vue'
import tran_detail from './components/rm/tran_detail.vue'
import register from './components/user/register.vue'
import login from './components/user/login.vue'
import collect from './components/rm/collect_detail.vue'
//1.引入组件
Vue.use(Router)
//2.为test组件配置访问路径 /Test
export default new Router({
  routes: [{path:'/',component:Index},
    {path:'/index',component:Index},
    {path:'/rm_detail',component:rm_detail},
    {path:'/tran_detail',component:tran_detail},
    {path:'/register',component:register},
    {path:'/login',component:login},
    {path:'/collect',component:collect}
  ]
})

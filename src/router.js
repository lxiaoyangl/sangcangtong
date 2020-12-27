import Vue from 'vue'
import Router from 'vue-router'

import warehouse from "@/routes/warehouse";
import supply_chain_finance from "@/routes/supply_chain_finance";
import logistics from "@/routes/logistics";

import SetDictionary from "@/views/set/dictionary";
import SetParams from "@/views/set/params";
import SetArea from "@/views/set/areas";

import SetMenus from "@/views/set/menus";
import SetRole from "@/views/set/role";
import SetUser from "@/views/set/user";
import SetDepartMent from "@/views/set/departMent";
import SetNotice from "@/views/set/notice";

const ManageCtt = () => import('@/views/set/manage/ctt')
const Warehouse = () => import('@/views/set/warehouse')

const SetMaterials = () => import('@/views/set/materials')
const SetMaterialsInfo = () => import('@/views/set/materialsInfo')

const SetCustomer = () => import('@/views/set/customer')

const Loginlog = () => import('@/views/set/loginlog')
const Operalog = () => import('@/views/set/operalog')
const SetWatchData = () => import('@/views/set/watchData')
const SetWatchPc = () => import('@/views/set/watchPc')

Vue.use(Router)

export default new Router({
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect:'/login'
		},
		//登录
		{
			path: '/Login',
			name: 'Login',
			component: ()=>import("@/views/login/login.vue"),
		},
		{
			path: '/Basis',
			name: 'Basis',
			component: ()=>import("@/views/basis/basis.vue"),
			children:[
				//主页
				{
					path: '/Home',
					name: 'Home',
					component: ()=>import("@/views/home/home.vue")
				},
				{
					path: '/set/manage/ctt',
					name: '合同管理',
					title: '运维管理系统',
					component: ManageCtt,
					children: []
				},
				{
					path: '/set/system/warehouse',
					name: '仓库管理',
					title: '运维管理系统',
					component: Warehouse,
					children: []
				},
				{
					path: '/set/system/materials',
					name: '物资管理',
					component: SetMaterials,
					children: []
				},
				{
					path: '/set/system/materialsInfo',
					name: '物资信息管理',
					component: SetMaterialsInfo,
					children: []
				},
				{
					path: '/set/system/customer',
					name: '客户基本信息管理',
					component: SetCustomer,
					children: []
				},
				{
					path: '/set/system/dictionary',
					name: '字典管理',
					title: '运维管理系统',
					component: SetDictionary,
					children: []
				},
				{
					path: '/set/system/params',
					name: '参数管理',
					title: '运维管理系统',
					component: SetParams,
					children: []
				},
				{
					path: '/set/system/areas',
					name: '地区管理',
					title: '运维管理系统',
					component: SetArea,
					children: []
				},
				{
					path: '/set/access/menus',
					name: '资源管理',
					title: '运维管理系统',
					component: SetMenus,
					children: []
				},
				{
					path: '/set/access/role',
					name: '角色管理',
					title: '运维管理系统',
					component: SetRole,
					children: []
				},
				{
					path: '/set/access/user',
					name: '用户管理',
					title: '运维管理系统',
					component: SetUser,
					children: []
				},
				{
					path: '/set/access/department',
					name: '部门管理',
					title: '运维管理系统',
					component: SetDepartMent,
					children: []
				},
				{
					path: '/set/system/notice',
					name: '通知公告',
					title: '运维管理系统',
					component: SetNotice,
					children: []
				},
				{
					path: '/set/log/login',
					name: '登录日志',
					title: '运维管理系统',
					component: Loginlog,
					children: []
				},
				{
					path: '/set/log/operation',
					name: '操作日志',
					title: '运维管理系统',
					component: Operalog,
					children: []
				},
				{
					path: '/set/watch/data',
					name: '数据监控',
					title: '运维管理系统',
					component: SetWatchData,
					children: []
				},
				{
					path: '/set/watch/service',
					name: '服务监控',
					title: '运维管理系统',
					component: SetWatchPc,
					children: []
				},
				...warehouse,
				
				...supply_chain_finance,

				...logistics,
			]
		},
	]
})

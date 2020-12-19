import Vue from 'vue'
import Router from 'vue-router'

import warehouse from "@/routes/warehouse";
import supply_chain_finance from "@/routes/supply_chain_finance";
import logistics from "@/routes/logistics";

import SetMenus from "@/views/set/menus";
import SetUser from "@/views/set/user";

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
					path: '/set/access/menus',
						name: '资源管理',
					title: '运维管理系统',
					component: SetMenus,
					children: []
				},
				{
					path: '/set/access/user',
						name: '用户管理',
					title: '运维管理系统',
					component: SetUser,
					children: []
				},
				...warehouse,
				
				...supply_chain_finance,

				...logistics,
			]
		},
	]
})

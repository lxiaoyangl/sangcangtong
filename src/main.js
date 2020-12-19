import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import "./style/main.less"
import "./style/all.less"
import 'font-awesome/css/font-awesome.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入公共函数
import fn from "./plugins/fn";
Vue.prototype.$fn = fn;

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

// 全局注册组件
import BasisPage from "./components/basis_page";
Vue.component('BasisPage',BasisPage);
import BasisDetail from "./components/basis_detail";
Vue.component('BasisDetail',BasisDetail);
import BasisDialog from "./components/basis_dialog";
Vue.component('BasisDialog',BasisDialog);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

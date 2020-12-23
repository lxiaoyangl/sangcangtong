"use strict";

import Vue from 'vue';
import axios from 'axios';
import { clearpop } from '@/utils'
import { getPermissionUrl } from './permission'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
      // if(/^userLogin/.test(config.url)) {
          config.headers.token = JSON.parse(sessionStorage.getItem('login-userinfo')).token;
      // }
      return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
      if (/^1/.test(response.data.status)){
          if(/查询成功/.test(response.data.msg)){
              return response;
          }
          ElementUI.Message.success(response.data.msg);
          return response;
      }
      if (/401/.test(response.data.status)){
          let str = location.href;
          location.href = str.split('#')[0];
          return response;
      }
      ElementUI.Message.error(response.data.data)
      return Promise.reject(response);
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

function _commonApi(type, url, params){
    const config = {
        method: type,
        url: getPermissionUrl(url) + url,
        headers: {
            token: ''
        },
        traditional: true
    }
    if ('/login/userLogin' !== url) {
        config.headers.token = JSON.parse(sessionStorage.getItem('login-userinfo')).token;
    }
    if (type === 'post') {
        config.data = params
    } else {
        config.params = params
    }
    return axios(config).then((res) => {
        const sussArr = [100, 101, 102, 103, 104]
        if (sussArr.indexOf(res.data.status) > -1) {
        return res.data.data
        } else {
            // 骚操作批量删除添加
            if (res.data.status !== 202 && res.data.status !== 201) { clearpop(res.data.data || res.data.msg, 'error') }
            if (res.data.status === 401) {
                // Cookies.remove('tokenb')
                // store.dispatch('setToken', '')
                location.href = '/#/login'
            }
            return Promise.reject(res)
        }
      })
}

export function postApi(url, params){return _commonApi('post', url, params)}
export function getApi(url, params){return _commonApi('get', url, params)}

Vue.use(Plugin)

export default Plugin;

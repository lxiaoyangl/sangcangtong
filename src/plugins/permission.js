import config from "Public/config.js";

// 配置权限地址
const loginUrl = [
  '/login/userLogin',
  '/login/loginByUserId'
]
const busfrontUrl = [
  '/company/baseList',
  '/warehouse/baseList',
  '/column/baseBatchDel',
  '/column/baseAdd',
  '/column/baseEdit',
  '/column/baseTree',
  '/journalism/baseList?&_pageList',
  '/journalism/baseDel',
  '/journalism/baseBatchDel',
  '/journalism/baseAdd',
  '/journalism/baseEdit',
  '/feedbackRecord/baseList?&_pageList',
  '/feedbackRecord/baseDel',
  '/feedbackRecord/baseBatchDel',
  '/feedbackRecord/baseAdd',
  '/feedbackRecord/baseEdit',
  '/cooperationRecord/baseList?&_pageList',
  '/cooperationRecord/baseDel',
  '/cooperationRecord/baseBatchDel',
  '/cooperationRecord/baseAdd',
  '/cooperationRecord/baseEdit'
]

// 判断API是否为权限地址接口
export function getPermissionUrl (url) {
  for (var i = 0; i < loginUrl.length; i++) {
    if (loginUrl[i] === url) {
      return config.loginUrl
    }
  }
  for (var j = 0; j < busfrontUrl.length; j++) {
    if (busfrontUrl[j] === url) {
      return config.busfrontUrl
    }
  }
  return config.serverUrl
}

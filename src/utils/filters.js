import {timestampToTime} from './time'

// 图片路径标准化
const imgPath = (data) => {
  if (!data) {
    return './src/assets/img/images/logo.png'
  }
  if (data.startsWith('http')) {
    return data
  }
  return '' + '/' + data
}
// Vue plugin
const MyPlugin = {
  install (Vue) {
    // 格式化时间1529025433999=>2018-06-15(例)
    Vue.prototype.timestampToTime = timestampToTime
    Vue.filter('timestampToTime', timestampToTime)
    // 图片显示
    Vue.filter('imgPath', imgPath)
  }
}
export default MyPlugin


import {Message, MessageBox} from 'element-ui'

/**
 * 可叠加消息提示框(普通不翻译)
 * @param {string, Object} mes 消息或Toast配置
 */
export const clearpop = (mes, type = 'err') => {
  Message({
    message: mes,
    position: 'bottom',
    type: type
  })
}
/**
 * 确认删除
 * @param {function} fn 确认删除回掉
 */
export const sureDelete = (fn) => {
  MessageBox('确认该操作, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: true,
    type: 'warning'
  }).then(() => {
    if (fn && typeof fn === 'function') {
      fn()
    }
  }).catch((err) => {
    console.log(err)
    Message({
      type: 'info',
      message: '已取消'
    })
  })
}
/**
 * 获取两个对象中变化的内容
 * @param {object} oldO 确认删除回掉
 * @param {object} newO 确认删除回掉
 * @param {function} callback 确认删除回掉
 */
export const getChangeData = (oldO, newO, callback) => {
  let result = {}
  var _oldO = JSON.parse(oldO)
  for (var key in _oldO) {
    if (newO.hasOwnProperty(key)) {
      if (newO[key] !== _oldO[key]) {
        result[key] = newO[key]
      }
    }
    let _key = key.toLowerCase()
    if (_key.indexOf('id') > -1) { // 保留id,价格分成
      result[key] = newO[key] === undefined ? _oldO[key] : newO[key]
    }
  }
  // if (Object.keys(result).length < 2) {
  //   clearpop('未做修改', 'error')
  //   return {}
  // }
  if (callback && typeof callback === 'function') {
    callback(result)
  }
  return result
}
/**
 * 转换为树形数据
 * @param {Array} data 确认删除回掉
 */
export const toTreeData = (data, isMenu = false) => {
  // 排序
  data.sort((a, b) => {
    return a.orderNumber - b.orderNumber
  })

  if (!data || data.length < 1) {
    return []
  }
  let map = {}
  let treeData = []
  data.forEach((v) => {
    map[v.id] = v
  })
  data.forEach((child) => {
    const mapItem = map[child.parentId]
    if (mapItem) {
      if (isMenu) {
        if (child.menuType === 3) {
          (mapItem.children || (mapItem.children = [])).push(child)
        }
      } else {
        (mapItem.children || (mapItem.children = [])).push(child)
      }
    } else {
      treeData.push(child)
    }
  })
  // localStorage.setItem('treeMenus', JSON.stringify(treeData))
  return treeData
}
/**
 * 获取当前页面有效的按钮
 * @param {String} data 路由
 */
export const getValidButton = (path) => {
  try {
    var menus = JSON.parse(localStorage.menusb)
    var curMenusId = ''
    for (var i = 0; i < menus.length; i++) {
      if (menus[i].path === path) {
        curMenusId = menus[i].id
      }
    }
    var buttons = []
    for (var j = 0; j < menus.length; j++) {
      if (menus[j].parentId === curMenusId) {
        buttons.push(menus[j])
      }
    }
    return buttons
  } catch (e) {
    return []
  }
}
/**
 * 获取当前有效数据
 */
export const getValidData = (data, key, value) => {
  var newData = []
  for (var i = 0; i < data.length; i++) {
    if (data[i][key] === value) {
      newData.push(data[i])
    }
  }
  return newData
}
/**
 * 删除所有的数据后处理
 * @param {Object} data 确认删除回掉
 * @param {Function} fn 确认删除回掉
 */
export const deleteAllNext = (data, fn) => {
  if (data && data.records && data.records.length === 0) {
    if (data.current !== 1) {
      let pageNo = --data.current
      pageNo = pageNo < 1 ? 1 : pageNo
      fn({pageNo})
    }
  }
}
/**
 * 公共的基础导出方法
 * @param data
 * @param url
 */
export const baseExport = (data, url) => {
  window.open(__config.serverUrl + url + `?queryJson=${encodeURI(JSON.stringify(data))}&token=${Cookies.get('token')}`)
}
/**
 * 获取第一个叶子菜单
 * @param data
 * @param url
 */
export const getFirstMenu = (menus) => {
  function getFirstChild(val) {
    if (val[0].children) {
      return getFirstChild(val[0].children)
    } else {
      return val[0]
    }
  }

  return getFirstChild(menus)
}

/**
* 从sessionstorage 获取登录人信息
*  @param  key
*/

export const getUserInfo = (key = 'login-userinfo') => {
  let str = sessionStorage.getItem(key);
  if(!str)return {}
  return  JSON.parse(str)
}



export const state = [
  { label: '所有', value: ''},
  { label: '启用', value: 1 },
  { label: '停用', value: 0 }
]
export const state1 = [
  { label: '所有', value: ''},
  { label: '可见', value: 1 },
  { label: '隐藏', value: 0 }
]
export const state2 = [
  { label: '启用', value: '1' },
  { label: '停用', value: '0' }
]
export const toTreePackage = (data, name = '全部') => {
  return [{
    treeCode: '',
    treeParentCode: '',
    orderNumber: '',
    children: data,
    name
  }]
}
export const formatData = (datas) => {
  var newData = []
  for (var i = 0; i < datas.length; i++) {
    newData.push({
      label: datas[i].labels,
      value: datas[i].keyValue
    })
  }
  return newData
}

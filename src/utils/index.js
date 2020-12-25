export * from './base'
export * from './time'
export * from './data'

/**
 * 权限
 * @param {*} key
 */
export function hasPermission (key) {
    return sessionStorage.getItem('right-arr').indexOf(key) !== -1 || false
}

/**
 * 获取字典数据列表
 * @param dictType  字典类型
 */
export function getDictDataList (dictType) {
    const type = window.SITE_CONFIG['dictList'].find((element) => (element.dictType === dictType))
    if (type) {
        return type.dataList
    } else {
        return []
    }
}

/**
 * 获取字典名称
 * @param dictType  字典类型
 * @param dictValue  字典值
 */
export function getDictLabel (dictType, dictValue) {
    const type = window.SITE_CONFIG['dictList'].find((element) => (element.dictType === dictType));
    if (type) {
        const val = type.dataList.find((element) => (element.dictValue === dictValue + ''));
        if (val) {
            return val.dictLabel
        } else {
            return dictValue
        }
    } else {
        return dictValue
    }
}
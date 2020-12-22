import { postApi, getApi } from './axios'

export function login(params) { return postApi('/login/userLogin', params) }
export function loginByUserId(params) { return postApi('/login/loginByUserId', params) }
export function modifyPas(params) { return postApi('/user/changeUserPassword', params) }

export function loadDictList(params) { return getApi('/dictionaryDirectory/all', params) }

export function setRoleAdd(params) { return postApi('/role/baseAdd', params) }
export function setRoleEdit(params) { return postApi('/role/baseEdit', params) }
export function setRoleList(params) { return postApi('/role/baseList?&_pageList&column=createTime&order=desc', params) }
export function setRoleDelete(params) { return postApi('/role/baseDel', params) }
export function setRoleBatchDelete(params) { return postApi('/role/baseBatchDel', params) }

export function setDepartmentAdd(params) { return postApi('/department/baseAdd', params) }
export function setDepartmentEdit(params) { return postApi('/department/baseEdit', params) }
export function setDepartmentList(params) { return postApi('/department/baseList', params) }
export function setDepartmentDelete(params) { return postApi('/department/baseDel', params) }
export function setDepartmentBatchDelete(params) { return postApi('/department/baseBatchDel', params) }
export function setDepartmentBaseTree(params) { return postApi('/department/baseTree', params) }

// export function setUserAdd(params) { return postApi('/user/baseAdd', params) }
export function setUserAdd(params) { return postApi('/user/addUser', params) }
export function setUserEdit(params) { return postApi('/user/baseEdit', params) }
export function setUserList(params) { return postApi('/user/baseList?&_pageList&column=createTime&order=desc', params) }
export function setUserListAll(params) { return postApi('/user/baseList?column=updateTime&order=desc&column=createTime&order=desc', params) }
export function setUserDelete(params) { return postApi('/user/baseDel', params) }
export function setUserBatchDelete(params) { return postApi('/user/baseBatchDel', params) }
export function setNoticeUserList(params) { return postApi('/noticeUser/baseList', params) }

export function setMenuAdd(params) { return postApi('/menu/baseAdd', params) }
export function setMenuEdit(params) { return postApi('/menu/baseEdit', params) }
export function setMenuList(params) { return postApi('/menu/baseList', params) }
export function setMenuDelete(params) { return postApi('/menu/baseDel', params) }
export function setMenuBatchDelete(params) { return postApi('/menu/baseBatchDel', params) }
export function setMenuBaseTree(params) { return postApi('/menu/baseTree', params) }

export function setDirectoryCatalogAdd(params) { return postApi('/dictionaryDirectory/addDictionaryDirectory', params) }
export function setDirectoryCatalogEdit(params) { return postApi('/dictionaryDirectory/baseEdit', params) }
export function setDirectoryCatalogList(params) { return postApi('/dictionaryDirectory/baseList?&_pageList&column=createTime&order=desc', params) }
export function setDirectoryCatalogDelete(params) { return postApi('/dictionaryDirectory/baseDel', params) }
export function setDirectoryCatalogBatchDelete(params) { return postApi('/dictionaryDirectory/baseBatchDel', params) }
export function setDirectoryCatalogAll(params) { return postApi('/dictionaryDirectory/baseList', params) }

export function setDictionaryDataAdd(params) { return postApi('/dictionaryData/baseAdd', params) }
export function setDictionaryDataEdit(params) { return postApi('/dictionaryData/baseEdit', params) }
export function setDictionaryDataList(params) { return postApi('/dictionaryData/baseList', params) }
export function setDictionaryDataDelete(params) { return postApi('/dictionaryData/baseDel', params) }
export function setDictionaryDataBatchDelete(params) { return postApi('/dictionaryData/baseBatchDel', params) }

export function setAreaAdd(params) { return postApi('/area/baseAdd', params) }
export function setAreaEdit(params) { return postApi('/area/baseEdit', params) }
export function setAreaList(params) { return postApi('/area/baseList?&_pageList', params) }
export function setAreaListAll(params) { return postApi('/area/baseList', params) }
export function setAreaDelete(params) { return postApi('/area/baseDel', params) }
export function setAreaBatchDelete(params) { return postApi('/area/baseBatchDel', params) }

export function setRoleMenuList(params) { return postApi('/roleMenu/baseList', params) }
export function setRoleMenuBatchEdit(params) { return postApi('/roleMenu/addRoleMenu', params) }

export function setRoleUserList(params) { return postApi('/roleUser/queryUserByRoleId', params) }
export function setRoleNoUserList(params) { return postApi('/roleUser/queryNoUserByRoleId', params) }
export function setRoleUserDelete(params) { return postApi('/roleUser/delRoleUser', params) }
export function setRoleUserBatchDelete(params) { return postApi('/roleUser/delRoleUser', params) }
export function setRoleUserBatchAdd(params) { return postApi('/roleUser/baseBatchAdd', params) }

export function setOperalogList(params) { return postApi('/operationLog/baseList?&_pageList&column=operationTime&order=desc', params) }
export function setOperalogDelete(params) { return postApi('/operationLog/baseDel', params) }
export function setOperalogBatchDelete(params) { return postApi('/operationLog/baseBatchDel', params) }

export function setLoginLogList(params) { return postApi('/loginLog/baseList?&_pageList&column=loginTime&order=desc', params) }
export function setLoginLogDelete(params) { return postApi('/loginLog/baseDel', params) }
export function setLoginLogBatchDelete(params) { return postApi('/loginLog/baseBatchDel', params) }

export function setNoticeAdd(params) { return postApi('/notice/addNotice', params) }
export function setNoticeEdit(params) { return postApi('/notice/baseEdit', params) }
export function setNoticeList(params) { return postApi('/notice/baseList?&_pageList&column=createTime&order=desc', params) }
export function setNoticeDelete(params) { return postApi('/notice/baseDel', params) }
export function setNoticeBatchDelete(params) { return postApi('/notice/baseBatchDel', params) }
export function noticeUserList(params) { return postApi('/noticeUser/baseList?&_pageList&column=createTime&order=desc', params) }// &column=noticeState&order=asc&
export function noticeUserEdit(params) { return postApi('/noticeUser/baseEdit', params) }
export function getNoticeDetail(params) { return getApi('/notice/baseQueryById', params) }
export function setNoticeUserDelete(params) { return postApi('/noticeUser/baseDel', params) }

export function setParameterAdd(params) { return postApi('/parameter/addParameter', params) }
export function setParameterEdit(params) { return postApi('/parameter/baseEdit', params) }
export function setParameterList(params) { return postApi('/parameter/baseList?&_pageList&column=createTime&order=desc', params) }
export function setParameterDelete(params) { return postApi('/parameter/baseDel', params) }
export function setParameterBatchDelete(params) { return postApi('/parameter/baseBatchDel', params) }

export function setserverInfo(params) { return postApi('/monitor/serverInfo', params) }


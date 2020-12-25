
import { postApi, getApi } from './axios'
// export const login = (params) => { return postApi('/login/userLogin', params) }
// export const getNoticeDetail = (params) => { return getApi('/notice/baseQueryById', params) }

// ---------------------门户管理-----------------------------------
// 栏目管理
export const portalColumnList = (params) => { return postApi('/column/baseList', params) }// 栏目分页
export const portalColumnDel = (params) => { return postApi('/column/baseDel', params) }// 删除栏目
export const portalColumnDels = (params) => { return postApi('/column/baseBatchDel', params) }// 批量删除栏目
export const portalColumnAdd = (params) => { return postApi('/column/baseAdd', params) }// 新增栏目
export const portalColumnEdit = (params) => { return postApi('/column/baseEdit', params) }// 编辑栏目
export const portalColumnTree = (params) => { return postApi('/column/baseTree', params) }// 栏目树
// 新闻管理
export const portalNewsList = (params) => { return postApi('/journalism/baseList?&_pageList', params) }// 新闻分页
export const portalNewsDel = (params) => { return postApi('/journalism/baseDel', params) }// 删除新闻
export const portalNewsDels = (params) => { return postApi('/journalism/baseBatchDel', params) }// 批量删除新闻
export const portalNewsAdd = (params) => { return postApi('/journalism/baseAdd', params) }// 新增新闻
export const portalNewsEdit = (params) => { return postApi('/journalism/baseEdit', params) }// 编辑新闻
// 意见反馈
export const portalFeedbackList = (params) => { return postApi('/feedbackRecord/baseList?&_pageList', params) }// 意见反馈分页
export const portalFeedbackDel = (params) => { return postApi('/feedbackRecord/baseDel', params) }// 删除意见反馈
export const portalFeedbackDels = (params) => { return postApi('/feedbackRecord/baseBatchDel', params) }// 批量删除意见反馈
export const portalFeedbackAdd = (params) => { return postApi('/feedbackRecord/baseAdd', params) }// 新增意见反馈
export const portalFeedbackEdit = (params) => { return postApi('/feedbackRecord/baseEdit', params) }// 编辑意见反馈
// 合作加盟
export const portalPartnershipList = (params) => { return postApi('/cooperationRecord/baseList?&_pageList', params) }// 合作加盟分页
export const portalPartnershipDel = (params) => { return postApi('/cooperationRecord/baseDel', params) }// 删除合作加盟
export const portalPartnershipDels = (params) => { return postApi('/cooperationRecord/baseBatchDel', params) }// 批量删除合作加盟
export const portalPartnershipAdd = (params) => { return postApi('/cooperationRecord/baseAdd', params) }// 新增合作加盟
export const portalPartnershipEdit = (params) => { return postApi('/cooperationRecord/baseEdit', params) }// 编辑合作加盟

// ---------------------运维-----------------------------------
// 客户管理
export const setCustomerList = (params) => { return postApi('/company/baseList?&_pageList', params) }// 客户分页
export const setCustomerDel = (params) => { return postApi('/company/baseDel', params) }// 删除客户
export const setCustomerDels = (params) => { return postApi('/company/baseBatchDel', params) }// 批量删除客户
export const setCustomerAdd = (params) => { return postApi('/company/baseAdd', params) }// 新增客户
export const setCustomerEdit = (params) => { return postApi('/company/baseEdit', params) }// 编辑客户
export const setCompanyData = (params) => { return postApi('/company/baseList', params) }// 客户分页

export const setCompanyGoodsList = (params) => { return postApi('/company/getMaterialByCompanyId', params) }// 查询已关联
export const setCompanyGoodsDel = (params) => { return postApi('/companyMaterial/baseDel', params) }// 批量已关联
export const setCompanyGoodsAdds = (params) => { return postApi('/companyMaterial/baseBatchAdd', params) }// 批量增加

// 仓库管理
export const setWarehouseList = (params) => { return postApi('/warehouse/baseList?&_pageList', params) }// 仓库分页
export const setWarehouseDel = (params) => { return postApi('/warehouse/baseDel', params) }// 删除仓库
export const setWarehouseDels = (params) => { return postApi('/warehouse/baseBatchDel', params) }// 批量删除仓库
export const setWarehouseAdd = (params) => { return postApi('/warehouse/baseAdd', params) }// 新增仓库
export const setWarehouseEdit = (params) => { return postApi('/warehouse/baseEdit', params) }// 编辑仓库
// 物资目录管理
export const setMaterialsList = (params) => { return postApi('/catalog/baseList', params) }// 物资目录分页
export const setMaterialsDel = (params) => { return postApi('/catalog/baseDel', params) }// 删除物资目录
export const setMaterialsDels = (params) => { return postApi('/catalog/baseBatchDel', params) }// 批量删除物资目录
export const setMaterialsAdd = (params) => { return postApi('/catalog/baseAdd', params) }// 新增物资目录
export const setMaterialsEdit = (params) => { return postApi('/catalog/baseEdit', params) }// 编辑物资目录
export const setMaterialsTree = (params) => { return postApi('/catalog/baseTree', params) }// 物资目录树
// 物资信息管理
export const setmaterialsInfoList = (params) => { return postApi('/material/baseList?&_pageList', params) }// 物资信息分页
export const setMaterialsInfoDel = (params) => { return postApi('/material/baseDel', params) }// 删除物资信息
export const setMaterialsInfoDels = (params) => { return postApi('/material/baseBatchDel', params) }// 批量删除物资信息
export const setMaterialsInfoAdd = (params) => { return postApi('/material/baseAdd', params) }// 新增物资信息
export const setMaterialsInfoEdit = (params) => { return postApi('/material/baseEdit', params) }// 编辑物资信息

// -------------------------------字典查询--------------------------------
export const selectDictionary = (params) => { return postApi('/dictionaryData/baseList', params) }// 查询字典
export const selectParameter = (params) => { return postApi('/parameter/baseList', params) }// 查询参数

export default [
  // 仓储协同，业务操作，入库预报
  {
    path: '/warehouse/Incoming/homePage',
    name: 'Incoming_homePage',
    component: () => import("@/views/warehouse/operating/incoming/homePage.vue")
  },
  {
    path: '/warehouse/Incoming/list',
    name: 'Incoming_list',
    component: () => import("@/views/warehouse/operating/incoming/list.vue")
  },
  {
    path: '/warehouse/Incoming/add',
    name: 'Incoming_add',
    component: () => import("@/views/warehouse/operating/incoming/add.vue")
  },
  {
    path: '/warehouse/Incoming/audit',
    name: 'Incoming_audit',
    component: () => import("@/views/warehouse/operating/incoming/audit.vue")
  },
  {
    path: '/warehouse/Incoming/detail',
    name: 'Incoming_detail',
    component: () => import("@/views/warehouse/operating/incoming/detail.vue")
  },
  // 仓储协同，业务操作，出库预报
  {
    path: '/warehouse/out_stock/homePage',
    name: 'out_stock_homePage',
    component: () => import("@/views/warehouse/operating/out_stock/homePage.vue")
  },
  {
    path: '/warehouse/out_stock/list',
    name: 'out_stock_list',
    component: () => import("@/views/warehouse/operating/out_stock/list.vue")
  },
  {
    path: '/warehouse/out_stock/add',
    name: 'out_stock_add',
    component: () => import("@/views/warehouse/operating/out_stock/add.vue")
  },
  /*{
    path: '/warehouse/out_stock/edit',
    name: 'out_stock_edit',
    component: () => import("@/views/warehouse/operating/out_stock/edit.vue")
  },*/
  {
    path: '/warehouse/out_stock/audit',
    name: 'out_stock_audit',
    component: () => import("@/views/warehouse/operating/out_stock/audit.vue")
  },
  {
    path: '/warehouse/out_stock/detail',
    name: 'out_stock_detail',
    component: () => import("@/views/warehouse/operating/out_stock/detail.vue")
  },
  // 仓储协同，业务操作，过户预报
  {
    path: '/warehouse/transfer/list',
    name: 'transfer_list',
    component: () => import("@/views/warehouse/operating/transfer/list.vue")
  },
  {
    path: '/warehouse/transfer/homePage',
    name: 'transfer_homePage',
    component: () => import("@/views/warehouse/operating/transfer/homePage.vue")
  },
  {
    path: '/warehouse/transfer/add',
    name: 'transfer_add',
    component: () => import("@/views/warehouse/operating/transfer/add.vue")
  },
  // 仓储协同，业务操作，结算确认
  {
    path: '/warehouse/bill_confirm/list',
    name: 'bill_confirm_list',
    component: () => import("@/views/warehouse/operating/bill_confirm/list.vue")
  },


  // 仓储协同，业务查询，实时库存查询
  {
    path: '/warehouse/search/in_stock/list',
    name: 'search_in_stock_list',
    component: () => import("@/views/warehouse/search/in_stock/list.vue")
  },
  // 仓储协同，业务查询，入库查询
  {
    path: '/warehouse/search/incoming/list',
    name: 'search_incoming_list',
    component: () => import("@/views/warehouse/search/incoming/list.vue")
  },
  // 仓储协同，业务查询，出库查询
  {
    path: '/warehouse/search/out_stock/list',
    name: 'search_out_stock_list',
    component: () => import("@/views/warehouse/search/out_stock/list.vue")
  },
  // 仓储协同，业务查询，过户查询
  {
    path: '/warehouse/search/transfer/list',
    name: 'search_transfer_list',
    component: () => import("@/views/warehouse/search/transfer/list.vue")
  },
  // 仓储协同，业务查询，费用明细查询
  {
    path: '/warehouse/search/cost/list',
    name: 'search_cost_list',
    component: () => import("@/views/warehouse/search/cost/list.vue")
  },
  // 仓储协同，业务查询，结算单查询
  {
    path: '/warehouse/search/bill/list',
    name: 'search_bill_list',
    component: () => import("@/views/warehouse/search/bill/list.vue")
  },
  // 仓储协同，业务查询，质押流水查询
  {
    path: '/warehouse/search/pledge/list',
    name: 'search_pledge_list',
    component: () => import("@/views/warehouse/search/pledge/list.vue")
  },
  // 仓储协同，业务查询，解押流水查询
  {
    path: '/warehouse/search/release/list',
    name: 'search_release_list',
    component: () => import("@/views/warehouse/search/release/list.vue")
  },
  // 仓储协同，业务查询，库存汇总查询
  {
    path: '/warehouse/search/summary/list',
    name: 'search_summary_list',
    component: () => import("@/views/warehouse/search/summary/list.vue")
  },
  // 仓储协同，业务查询，合同查询
  {
    path: '/warehouse/search/contract/list',
    name: 'search_contract_list',
    component: () => import("@/views/warehouse/search/contract/list.vue")
  },

  // 仓储协同，入仓库位编排列表
  {
    path: '/warehouse/arrange_incoming/homePage',
    name: 'arrange_incoming_homePage',
    component: () => import("@/views/warehouse/arrange/incoming/homePage.vue")
  },
  // 仓储协同，入仓库位编排新增/修改
  {
    path: '/warehouse/arrange_incoming/add',
    name: 'arrange_incoming_add',
    component: () => import("@/views/warehouse/arrange/incoming/add.vue")
  },
]
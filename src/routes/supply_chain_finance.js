export default [
    // 供金协同，代采融资，融资申请管理
    {
        path: '/supply_chain_finance/financing/apply_manage/list',
        name: 'financing_apply_manage_list',
        component: ()=>import("@/views/supply_chain_finance/financing/apply_manage/list.vue")
    },
    {
        path: '/supply_chain_finance/financing/apply_manage/add',
        name: 'financing_apply_manage_add',
        component: ()=>import("@/views/supply_chain_finance/financing/apply_manage/add.vue")
    },
    // 供金协同，代采融资，融资项目管理
    {
        path: '/supply_chain_finance/financing/project_manage/list',
        name: 'financing_project_manage_list',
        component: ()=>import("@/views/supply_chain_finance/financing/project_manage/list.vue")
    },
    // 供金协同，代采融资，还款赎贷
    {
        path: '/supply_chain_finance/financing/repayment/list',
        name: 'financing_repayment_list',
        component: ()=>import("@/views/supply_chain_finance/financing/repayment/list.vue")
    },
    // 供金协同，代采融资，协议合同管理
    {
        path: '/supply_chain_finance/financing/agreement_manage/list',
        name: 'financing_agreement_manage_list',
        component: ()=>import("@/views/supply_chain_finance/financing/agreement_manage/list.vue")
    },
    {
        path: '/supply_chain_finance/financing/agreement_manage/add',
        name: 'financing_agreement_manage_add',
        component: ()=>import("@/views/supply_chain_finance/financing/agreement_manage/add.vue")
    },

    // 供金协同，结算管理，结算管理
    {
        path: '/supply_chain_finance/close_an_account/list',
        name: 'close_an_account_list',
        component: ()=>import("@/views/supply_chain_finance/close_an_account/list.vue")
    },

    // 供金协同，查询报表，融资申请查询
    {
        path: '/supply_chain_finance/query_report/financing_apply/list',
        name: 'query_report_financing_apply_list',
        component: ()=>import("@/views/supply_chain_finance/query_report/financing_apply/list.vue")
    },
    // 供金协同，查询报表，融资项目查询
    {
        path: '/supply_chain_finance/query_report/financing_project/list',
        name: 'query_report_financing_project_list',
        component: ()=>import("@/views/supply_chain_finance/query_report/financing_project/list.vue")
    },
]
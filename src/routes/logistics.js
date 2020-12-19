export default [
    // 物流协同，业务操作，运单预报
    {
        path: '/logistics/operating/waybill/list',
        name: 'logistics_operating_waybill_list',
        component: ()=>import("@/views/logistics/operating/waybill/list.vue")
    },
    {
        path: '/logistics/operating/waybill/add',
        name: 'logistics_operating_waybill_add',
        component: ()=>import("@/views/logistics/operating/waybill/add.vue")
    },
    // 物流协同，业务操作，派车确认
    {
        path: '/logistics/operating/send_car/list',
        name: 'logistics_operating_send_car_list',
        component: ()=>import("@/views/logistics/operating/send_car/list.vue")
    },
    // 物流协同，业务操作，运单跟踪
    {
        path: '/logistics/operating/waybill_tracking/list',
        name: 'logistics_operating_waybill_tracking_list',
        component: ()=>import("@/views/logistics/operating/waybill_tracking/list.vue")
    },
    // 物流协同，业务操作，结算确认
    {
        path: '/logistics/operating/bill_confirm/list',
        name: 'logistics_operating_bill_confirm_list',
        component: ()=>import("@/views/logistics/operating/bill_confirm/list.vue")
    },

    // 物流协同，业务查询，运单查询
    {
        path: '/logistics/search/waybill/list',
        name: 'logistics_search_waybill_list',
        component: ()=>import("@/views/logistics/search/waybill/list.vue")
    },
    // 物流协同，业务查询，派车单查询
    {
        path: '/logistics/search/send_car/list',
        name: 'logistics_search_send_car_list',
        component: ()=>import("@/views/logistics/search/send_car/list.vue")
    },
    // 物流协同，业务查询，运费明细查询
    {
        path: '/logistics/search/freight_detail/list',
        name: 'logistics_search_freight_detail_list',
        component: ()=>import("@/views/logistics/search/freight_detail/list.vue")
    },
    // 物流协同，业务查询，结算单查询
    {
        path: '/logistics/search/bill_confirm/list',
        name: 'logistics_search_bill_confirm_list',
        component: ()=>import("@/views/logistics/search/bill_confirm/list.vue")
    },
]
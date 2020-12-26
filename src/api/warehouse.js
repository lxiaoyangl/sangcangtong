import api from "./request";
import {getUserInfo, timestampToTime} from "@/utils";

let warehouse = {
  storage: {},
  transfer: {}
};
//入仓申请
warehouse.storage.addStorage = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/accept/apply/in/addStorage/CUSTOMER', data).then(res => {
    console.log('新增结果', res);
    // this.$message.success(res.data.data);
    that.go_back();
  }, err => {
    console.log('新增报错', err);

  }).finally(() => {
    that.loading = false;
  })
};
//入仓修改
warehouse.storage.updateStorage = function (that, data) {
  return api.post('/busmiddle-storage/busmiddle-storage/storage/accept/apply/in/updateStorage', data).then(res => {
    // this.$message.success(res.data.data);
    return res
  }, err => {
  }).finally(() => {
    that.loading = false;
  })
};

//出仓申请
warehouse.storage.addOutStorage = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/accept/apply/out/addStorage/CUSTOMER', data).then(res => {
    console.log('新增结果', res);
    // this.$message.success(res.data.data);
    that.go_back();
  }, err => {
    console.log('新增报错', err);

  }).finally(() => {
    this.loading = false;
  })
};
//入仓申请列表
warehouse.storage.inComingList = function (that, data) {
  let url = '/busmiddle-storage/busmiddle-storage/storage/accept/apply/in/baseList?_pageList';

  let timeKey = ['putInPlanDate_begin', 'putInPlanDate_end', 'deliverPlanDate_begin', 'deliverPlanDate_end'];

  for (let i = 0; i < timeKey.length; i++) {
    let row = timeKey[i]
    if (data[row]) {
      url += `&${row}=${timestampToTime(data[row])}`
    }
  }

  api.post(url, data).then(res => {
    that.table_data = [...res.data.data.records];
    that.page.total = res.data.data.total;
  }, err => {

  }).finally(() => {
    that.loading = false
  })
};

warehouse.storage.inComingSubmit = function (that, data) {
  return api.post('/busmiddle-storage/busmiddle-storage/storage/accept/apply/in/baseEdit', data).then(res => {
    return res;
  }, err => {
    console.log('获取信息失败', err);
  })
};

//出仓申请列表
warehouse.storage.outStockList = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/accept/apply/out/baseList?_pageList', data).then(res => {
    that.table_data = [...res.data.data.records];
    that.page.total = res.data.data.total;
  }, err => {

  }).finally(() => {
    that.loading = false
  })
};
//获取入仓申请物资信息 传orderNo
warehouse.storage.getMaterialList = function (that, data) {
  return api.post('/busmiddle-storage/busmiddle-storage/storage/accept/apply/in/material/baseList?_pageList', data).then(res => {
    return res;
  }, err => {
    console.log('获取信息失败', err);
  })
};

//入仓审核
warehouse.storage.inComingAudit = function (that, data) {
  return api.post('/busmiddle-storage/busmiddle-storage/common/storage/audit/log/audit', data).then(res => {
    return res
  }, err => {
    console.log('获取信息失败', err);
  })
};

//入仓状态统计
warehouse.storage.getIncomingCount = function (that, data) {
  return api.post('/busmiddle-storage/busmiddle-storage/storage/accept/apply/in/statsStatus', data).then(res => {
    return res
  }, err => {
    console.log('获取信息失败', err);
  })
};


//暂时
warehouse.transfer.addtransfer = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/transfer/apply/add/transfer/CUSTOMER', data).then(res => {
    console.log('新增结果', res);
    // this.$message.success(res.data.data);
    that.go_back();
  }, err => {
    console.log('新增报错', err);
  })
};

export default warehouse;
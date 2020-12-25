import api from "./request";

let warehouse = {
  storage: {},
  transfer: {}
};
//入仓申请
warehouse.storage.addStorage = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/apply/in/addStorage/CUSTOMER', data).then(res => {
    console.log('新增结果', res);
    // this.$message.success(res.data.data);
    that.go_back();
  }, err => {
    console.log('新增报错', err);

  }).finally(() => {
    that.loading = false;
  })
};
//出仓申请
warehouse.storage.addOutStorage = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/apply/out/addStorage/CUSTOMER', data).then(res => {
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
  api.post('/busmiddle-storage/busmiddle-storage/storage/apply/in/baseList?_pageList', data).then(res => {
    that.table_data = [...res.data.data.records];
    that.page.total = res.data.data.total;
  }, err => {

  }).finally(() => {
    that.loading = false
  })
};

//出仓申请列表
warehouse.storage.outStockList = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/apply/out/baseList?_pageList', data).then(res => {
    that.table_data = [...res.data.data.records];
    that.page.total = res.data.data.total;
  }, err => {

  }).finally(() => {
    that.loading = false
  })
};
//获取入仓申请物资信息 传orderNo
warehouse.storage.getMaterialList = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/apply/in/material/baseList?_pageList', data).then(res => {
    that.table_data = [...res.data.data.records];
    that.page.total = res.data.data.total;
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
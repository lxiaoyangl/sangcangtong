import api from "./request";

let warehouse = {
  storage:{},
  transfer:{

  }
};

warehouse.storage.addStorage = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/apply/in/addStorage/平台新建', data).then(res => {
    console.log('新增结果', res);
    // this.$message.success(res.data.data);
    that.go_back();
  }, err => {
    console.log('新增报错', err);

  })
};
warehouse.transfer.addtransfer = function (that, data) {
  api.post('/busmiddle-storage/busmiddle-storage/storage/transfer/apply/add/transfer/1', data).then(res => {
    console.log('新增结果', res);
    // this.$message.success(res.data.data);
    that.go_back();
  }, err => {
    console.log('新增报错', err);

  })
};
export default warehouse;
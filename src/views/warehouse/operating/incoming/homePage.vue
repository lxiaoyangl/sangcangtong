<template>
  <div class="homePage">
    <header>
      <div class="item">
        <i class="el-icon-tickets"></i>
        <div>
          <p>256</p>
          <p>当日待审核</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-circle-close"></i>
        <div>
          <p>256</p>
          <p>当日已拒绝</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-document"></i>
        <div>
          <p>256</p>
          <p>客户累计提单</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-document-checked"></i>
        <div>
          <p>256</p>
          <p>代办累计提单</p>
        </div>
      </div>
    </header>
    <div class="tabs">
      <div :class="{'tabs-ac':index === tabsAc}" v-for="(i,index) in tabsArr" :key="index" @click="changeTab(index)">
        {{i}}
        <span class="badeg">20</span>
      </div>
    </div>
    <div class="table_box">
      <el-table
          :data="table_data"
          style="width: 100%"
          height="100%"
          stripe
          header-row-class-name="table_header"
          @selection-change="table_selection_change"
      >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="orderNo"
            label="订单号"
            min-width="160">
        </el-table-column>
        <el-table-column
            prop="deliverName"
            label="客户名称"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="deliverPlanDate"
            label="计划入仓日期"
            min-width="160">
        </el-table-column>
        <el-table-column
            prop="shippingTypeName"
            label="运输方式"
            min-width="120">
        </el-table-column>

        <el-table-column
            prop="warehouseName"
            label="入仓名称"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="warehouseName"
            label="平台派车"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="deliverPlanDate"
            label="计划发货日期"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="orderState"
            label="订单状态"
            min-width="120">
          <!--<template slot-scope="scope">
              <span v-show="scope.row.orderState === 'orderState'">未提交</span>
              <span v-show="scope.row.orderState === 1">待审核</span>
              <span v-show="scope.row.orderState === 2">审核未通过</span>
              <span v-show="scope.row.orderState === 3">平台待审核</span>
              <span v-show="scope.row.orderState === 4">平台处理中</span>
              <span v-show="scope.row.orderState === 5">审核拒绝</span>
          </template>-->
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="checkRow(scope.row)" type="text" size="small">审核</el-button>
            <el-button @click="editRow(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column
            prop="updateUser"
            label="申请人"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="deliverName"
            label="货运联系人"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="deliverPhone"
            label="货运联系方式"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="申请日期"
            min-width="160">
        </el-table-column>-->
      </el-table>
    </div>
    <div class="table_box_pagination">
      <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="page.total"
          :current-page="page.page_num"
          :page-size="page.page_size"
          @current-change="page_num_change">
      </el-pagination>
    </div>
    <!--详情或者审核弹出窗-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="90%"
        >
      <audit
          :is-check="false"
          :order-no="orderNo"
          :table-row="tableRow"
          @onAudit="closeDialog"
      ></audit>
    </el-dialog>
    <!--详情或者审核弹出窗结束-->

  </div>
</template>

<script>
  import api_warehouse from "@/api/warehouse.js";
  import audit from './audit.vue'

  export default {
    name: "homePage",
    components: {
      audit
    },
    data() {
      return {
        tabsArr: ['待审核', '已拒绝', '已通过', '平台代办'],//tabs数组
        tabsAc: 0,//当前激活tab
        // 列表数据
        table_data: [],
        table_selection_arr: [], // 多选存储变量
        // 分页数据
        page: {
          total: 1,
          page_num: 1,
          page_size: 20,
        },
        // 表单数据
        form: {
          inp1: '',
          inp2: null,
          inp3: null,
        },
        orderNo: '',//订单号
        tableRow:{},//选中的表格数据
        dialogVisible: false,//是否显示弹出窗
      }
    },
    methods: {
      changeTab(index) {
        this.tabsAc = index;
      },
      // 数据查询
      get_data() {
        let senddata = {
          companyId: sessionStorage.getItem('companyId')
        };
        let url = '/applicationIn/baseList?_pageList&ascColumn=documentState,createTime';
        if (this.form.inp1 !== '') {
          senddata.documentNo = '*' + this.form.inp1 + '*';
        }
        if (this.form.inp2 !== null) {
          senddata.warehouseId = this.form.inp2;
        }
        if (this.form.inp3 !== null) {
          // senddata.loadingTime = this.$fn.timeChange(this.form.inp3[0]); // 计划装车时间
          // senddata.serviceTime = this.$fn.timeChange(this.form.inp3[1]); // 计划送达时间
          url = url + '&createTime_begin=' + this.$fn.timeChange(this.form.inp3[0]).substr(0, 10) + '&createTime_end=' + this.$fn.timeChange(this.form.inp3[1]).substr(0, 10)
        }
        this.loading = true;

        api_warehouse.storage.inComingList(this, {
          pageNo: this.page.page_num,
          pageSize: this.page.page_size,
          ...senddata
        });
      },
      // 多选改变函数
      table_selection_change(val) {
        this.table_selection_arr = [...val];
        console.log(this.table_selection_arr);
      },
      // 分页页码改变
      page_num_change(val) {
        this.page.page_num = val;
        this.get_data();
      },
      //点击审核
      checkRow(row) {
        this.orderNo = row.orderNo;
        this.tableRow = row;
        this.dialogVisible = true;
        //this.$router.push({name: 'Incoming_audit'});
      },
      //点击编辑
      editRow(row) {
        console.log(row);
      },
      //关闭弹出床
      closeDialog(){
        this.dialogVisible = false;
      },
    },
    mounted() {
      this.get_data();
    }
  }
</script>

<style scoped lang="less">
  * {
    box-sizing: border-box;
  }

  .flex {
    display: flex;
  }

  .flex-center {
    .flex;
    justify-content: center;
    align-items: center;
  }

  .flex-center-x {
    .flex;
    justify-content: center;
  }

  .flex-center-y {
    .flex;
    align-items: center;

  }

  .homePage {
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  header {
    .flex-center-y;
    height: 80px;

    .item {
      padding: 10px;
      .flex-center-y;
      margin-right: 10px;
      height: 80px;
      width: 220px;

      i {
        font-size: 30px;
        margin-right: 10px;
      }

      &:nth-child(1) {
        background: #409EFF;

        i {
          color: white;
        }
      }

      &:nth-child(2) {
        background: #BCBCBC;

        i {
          color: #F14254;
          font-weight: bold;
        }

        p:first-child {
          color: #F14254;
        }
      }

      &:nth-child(3) {
        background: #BCBCBC;

        i {
          color: white;
        }
      }

      &:nth-child(4) {
        background: #67C23A;

        i {
          color: white;
        }
      }

      p:first-child {
        color: white;
        font-size: 18px;
        font-weight: bold;
      }

      p:last-child {
        color: white;
        font-size: 14px;
      }
    }
  }

  .tabs {
    height: 40px;
    .flex-center-y;

    > div {
      position: relative;
      margin-right: 60px;
      cursor: pointer;

      .badeg {
        position: relative;
        color: red;
        top: -8px;
        font-size: 14px;
      }
    }

    .tabs-ac {
      font-weight: bold;
      color: #409EFF;

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: #409EFF;
        bottom: -5px;
      }
    }
  }

  .body {
    height: calc(100% - 80px);

    .el-tabs__content {
      height: calc(100% - 40px);
    }
  }

  .table_box {
    height: calc(100% - 160px);
    width: 100%;
  }
</style>
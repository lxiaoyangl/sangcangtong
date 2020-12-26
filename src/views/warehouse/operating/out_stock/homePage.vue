<template>
  <div class="homePage">
    <header>
      <div class="item">
        <i class="el-icon-tickets"></i>
        <div>
          <p>{{incommingCount.todayPendingNum}}</p>
          <p>当日待审核</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-circle-close"></i>
        <div>
          <p>{{incommingCount.todayRejectNum}}</p>
          <p>当日已拒绝</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-document"></i>
        <div>
          <p>{{incommingCount.customerNum}}</p>
          <p>客户累计提单</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-document-checked"></i>
        <div>
          <p>{{incommingCount.platfromNum}}</p>
          <p>代办累计提单</p>
        </div>
      </div>
    </header>

    <div class="filters">
      <div class="tabs">
        <div :class="{'tabs-ac':index === tabsAc}" v-for="(i,index) in tabsArr" :key="index" @click="changeTab(index)">
          {{i.name}}
          <span class="badeg">{{incommingCount[i.key] !== 0 ? incommingCount[i.key] : '' }}</span>
        </div>
      </div>
      <div class="search">
        <div class="normal-search">
          <span>出仓名称</span>
          <div class="d-input">
            <el-input v-model="form.warehouseName" placeholder="请输入出仓名称" size="mini" clearable></el-input>
          </div>

          <span>客户名称</span>
          <div class="d-input">
            <el-input v-model="form.customerName" placeholder="客户名称" size="mini" clearable></el-input>
          </div>

          <span>订单号</span>
          <div class="d-input">
            <el-input v-model="form.orderNo" placeholder="请输入订单号" size="mini" clearable></el-input>
          </div>

          <el-button type="success" @click="search" size="mini">查询</el-button>
          <el-button type="primary" @click="resetFilter" size="mini">重置</el-button>
          <el-button type="warning" @click="heightFilter" size="mini">高级筛选</el-button>

          <div class="add-new">
            <el-button type="success" @click="addNew" size="mini" v-show="tabsArr[tabsAc].type === 0">新建订单</el-button>
          </div>
        </div>
        <div class="height-search" v-show="isHeightSearch">
          <span>计划出仓时间</span>
          <el-date-picker class="time-picker" v-model="form.putOutPlanDate_begin" type="date" placeholder="选择开始时间" size="mini"></el-date-picker>
          <el-date-picker class="time-picker" v-model="form.putOutPlanDate_end" type="date" placeholder="选择结束时间" size="mini"></el-date-picker>
          <span>计划发货时间</span>
          <el-date-picker class="time-picker" v-model="form.deliverPlanDate_begin" type="date" placeholder="选择开始时间" size="mini"></el-date-picker>
          <el-date-picker class="time-picker" v-model="form.deliverPlanDate_end" type="date" placeholder="选择结束时间" size="mini"></el-date-picker>
        </div>
      </div>
    </div>

    <div class="table_box">
      <div class="table">
        <el-table
            :data="table_data"
            style="width: 100%"
            height="100%"
            border
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
              min-width="170">
          </el-table-column>
          <el-table-column
              prop="deliverName"
              label="客户名称"
              min-width="120">
          </el-table-column>
          <el-table-column
              prop="putOutPlanDate"
              label="计划出仓日期"
              :formatter="timeFormater"
              min-width="120">
          </el-table-column>
          <el-table-column
              prop="shippingTypeName"
              label="运输方式"
              min-width="100">
          </el-table-column>

          <el-table-column
              prop="warehouseName"
              label="出仓名称"
              min-width="120">
          </el-table-column>
          <el-table-column
              prop="warehouseName"
              label="平台派车"
              min-width="100">
          </el-table-column>
          <el-table-column
              prop="deliverPlanDate"
              label="计划发货日期"
              :formatter="timeFormater"
              min-width="120">
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注"
              min-width="120">

            <template slot-scope="scope">

              <el-tooltip effect="dark" :content="scope.row.remark" placement="top">
                <span>{{scope.row.remark}}</span>
              </el-tooltip>

            </template>

          </el-table-column>
          <el-table-column
              prop="orderState.description"
              label="订单状态"
              min-width="100">
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
              align="center"
              width="130">
            <template slot-scope="scope">
              <div class="tableButton">
                <el-tooltip effect="dark" content="审核" placement="top">
                  <el-button v-show="filterType == 1" @click="auditRow(scope.row)" type="primary" icon="el-icon-reading" circle></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="修改" placement="top">
                  <el-button v-show="filterType == 1 || filterType == 3" @click="editRow(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                </el-tooltip>

                <el-tooltip effect="dark" content="查看" placement="top">
                  <el-button v-show="filterType == 0 || filterType == 2 || filterType == 3" @click="checkRow(scope.row)" type="primary" icon="el-icon-search" circle></el-button>
                </el-tooltip>

                <el-tooltip effect="dark" content="提交" placement="top">
                  <el-button v-show="filterType == 0" @click="submitRow(scope.row)" type="primary" icon="el-icon-document-add" circle></el-button>
                </el-tooltip>
              </div>


            </template>
          </el-table-column>
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
    </div>

    <!--详情或者审核弹出窗-->
    <el-dialog
        :title="modalTitle"
        :visible.sync="dialogVisible"
        width="90%"
    >
      <audit
          :is-check="isCheckProp"
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
    name: "out_stock_homePage",
    components: {
      audit
    },
    data() {
      return {
        tabsArr: [
          {name: '待审核', key: 'pendingNum', type: 1},
          {name: '已拒绝', key: 'rejectNum', type: 3},
          {name: '已通过', key: 'acceptNum', type: 2},
          {name: '平台代办', key: 'platfromPendingNum', type: 0},
        ],//tabs数组
        tabsAc: 0,//当前激活tab
        //表格按钮权限
        tbRightsArr: [""],

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
          warehouseName: '',
          customerName: '',
          orderNo: '',
          putOutPlanDate_begin: '',
          putOutPlanDate_end: '',
          deliverPlanDate_begin: '',
          deliverPlanDate_end: '',
        },
        orderNo: '',//订单号
        tableRow: {},//选中的表格数据
        dialogVisible: false,//是否显示弹出窗,
        incommingCount: {},//头部入仓统计,

        isCheckProp: false,//是否为查看状态,
        isHeightSearch: false,//是否高级搜索;

      }
    },
    computed: {
      //筛选订单类型
      filterType() {
        return this.tabsArr[this.tabsAc].type;
      },
      modalTitle() {
        if (!this.tableRow.customerName) return ''
        return `订单号: ${this.tableRow.orderNo} - 客户名称: ${this.tableRow.customerName} - 订单状态: ${this.tableRow.orderState.description}`
      },
    },
    methods: {

      timeFormater(row, self, value) {
        if (value) {
          return value.slice(0, 11)
        }
        return value
      },

      //订单状态改变
      changeTab(index) {
        this.tabsAc = index;
        this.page.page_num = 1;
        this.get_data();
      },
      // 数据查询
      get_data(data) {
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
        let postData = {};
        if (data) {
          postData = {
            pageNo: this.page.page_num,
            pageSize: this.page.page_size,
            orderState: this.tabsArr[this.tabsAc].type,
            ...senddata,
            ...data,
          }
        } else {
          postData = {
            pageNo: this.page.page_num,
            pageSize: this.page.page_size,
            orderState: this.tabsArr[this.tabsAc].type,
            ...senddata
          }
        }

        api_warehouse.storage.outStockList(this, postData);
      },
      // 多选改变函数
      table_selection_change(val) {
        this.table_selection_arr = [...val];
        console.log(this.table_selection_arr);
      },
      ho(e, ee) {
        console.log(e, ee);
      },
      // 分页页码改变
      page_num_change(val) {
        this.page.page_num = val;
        this.get_data();
      },

      checkRow(row) {
        this.orderNo = row.orderNo;
        this.tableRow = row;
        this.dialogVisible = true;
        this.isCheckProp = true;
      },
      //点击审核
      auditRow(row) {
        this.orderNo = row.orderNo;
        this.tableRow = row;
        this.dialogVisible = true;
        this.isCheckProp = false;
        //this.$router.push({name: 'Incoming_audit'});
      },
      //点击编辑
      editRow(row) {
        sessionStorage.setItem("tableRow", JSON.stringify(row));
        sessionStorage.setItem("warehouse-incoming-edit", 'true');
        this.$router.push({name: 'out_stock_add'});
        console.log(row);
      },
      //点击提交
      submitRow(row) {
        console.log(row);
        this.$confirm('订单提交过后将不可修改, 是否继续').then(() => {
          let data = {
            id: row.id,
            orderState: 'PENDING'
          };
          api_warehouse.storage.outSrockSubmit(this, data).then((res) => {
            this.$message.info(res.data.msg);
            this.get_data();
            api_warehouse.storage.getOutStockCount().then(res => {
              this.incommingCount = res.data.data;
            });
          })
        })

      },
      //关闭弹出窗
      closeDialog(payload) {
        this.$message.info(payload.msg)
        this.dialogVisible = false;
        api_warehouse.storage.getOutStockCount().then(res => {
          this.incommingCount = res.data.data;
        });
        this.get_data();
      },

      //查询
      search() {
        this.page.page_num = 1;
        let data = this.form
        this.get_data(data);
      },

      //重置
      resetFilter() {
        for (let i in this.form) {
          this.form[i] = '';
        }

      },
      //高级筛选
      heightFilter() {
        this.isHeightSearch = !this.isHeightSearch
      },
      //新建订单
      addNew() {
        sessionStorage.setItem('warehouse-incoming-edit', 'false');
        this.$router.push({name: 'out_stock_add'});
      }
    },
    mounted() {
      this.get_data();
      api_warehouse.storage.getOutStockCount().then(res => {
        this.incommingCount = res.data.data;
      });
    }
  }
</script>

<style scoped lang="less">

  /deep/ .el-table {
    border-collapse: collapse;
    border-bottom: 1px solid #e0e0e0;

    th, td {
      padding: 10px 0;
      border: 1px solid #e0e0e0;
      border-collapse: collapse;
      position: relative;

    }

    th {
      color: #333;
      border-left: none;
      border-bottom: none;
      padding: 5px;
      background-color: #ecf5ff !important;

      &:first-child {
        border-left: none;
      }

      &:after {
        background-color: #fff;
      }

      .cell {
        margin: 8px 0;
      }

      .caret-wrapper {
        height: 20px;
      }

      .sort-caret.ascending {
        top: -2px;
      }

      .sort-caret.descending {
        bottom: 0;
      }
    }

    .el-table--border, .el-table--group {
      border: none;
      border-left: 1px solid #f0f0f0;
    }

    .el-table__fixed-right {
      border-right: 1px solid #f0f0f0;
    }

    td {
      padding: 6px;
      border-bottom: 1px solid #e0e0e0;
      border-left: none;
      border-top: none;

      &:after {
        background-color: #fff;
      }
    }

    .sort-caret.ascending {
      color: #d8d8d8;
    }

    tr {
      background-color: #fff !important;

      &:nth-child(2n) {
        background-color: #ecf5ff !important;
      }

      td:last-child, th:last-child {
        border-left: 1px solid #e0e0e0;;
      }
    }

    .cell {
      white-space: nowrap;

      .el-button {
        border: none;
        background-color: transparent;
        border-bottom: 1px solid;
        color: #409eff;
        border-radius: 0;
        padding: 5px 0;

        &:hover {
          color: #000;
        }
      }
    }
  }

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
    .flex;
    flex-flow: column;
    padding: 10px;
    background: #eaeaea;
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


  .filters {
    background: white;
    margin: 10px 0;
    padding: 10px;

    .search {
      span {
        font-size: 14px;
        font-weight: bold;
        margin-right: 20px;
      }

      .normal-search {
        > div {
          margin-right: 20px;
        }

        .d-input {
          width: 160px !important;
        }
      }

      .height-search {
        margin-top: 15px;

        .time-picker {
          margin-right: 20px;
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

    .normal-search {
      .flex-center-y;

      .add-new {
        margin-left: auto;
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
    flex: 1;

    .table {
      height: calc(100% - 50px);
    }
  }
</style>
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
        <i class="el-icon-document-checked"></i>
        <div>
          <p>{{incommingCount.todayAcceptNum}}</p>
          <p>当日通过</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-circle-close"></i>
        <div>
          <p>{{incommingCount.todayRejectNum}}</p>
          <p>当日拒绝</p>
        </div>
      </div>

      <div class="item">
        <i class="el-icon-document"></i>
        <div>
          <p>{{incommingCount.platfromNum + incommingCount.customerNum}}</p>
          <p>累计受理</p>
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

          <span>入仓名称</span>
          <div class="d-input">
            <!--            <el-input v-model="form.warehouseName" placeholder="请输入入仓名称" size="mini" clearable></el-input>-->
            <el-select clearable v-model="form.warehouseName" placeholder="仓库名称" filterable size="mini">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name">
              </el-option>
            </el-select>
          </div>

          <span>入仓订单号</span>
          <div class="d-input">
            <el-input v-model="form.orderApplyNo" placeholder="请输入订单号" size="mini" clearable></el-input>
          </div>

          <span>单据号</span>
          <div class="d-input">
            <el-input v-model="form.orderPlanNo" placeholder="请输入单据号" size="mini" clearable></el-input>
          </div>

          <el-button type="success" @click="search" size="mini">查询</el-button>
          <el-button type="primary" @click="resetFilter" size="mini">重置</el-button>
          <el-button type="warning" @click="heightFilter" size="mini">高级筛选</el-button>
          <el-button type="success" @click="addNew" size="mini" v-show="tabsArr[tabsAc].type === 0">新建库位编排</el-button>
        </div>
        <div class="height-search" v-show="isHeightSearch">
          <span>客户名称</span>
          <div class="d-input">
            <el-input v-model="form.customerName" placeholder="请输入单据号" size="mini" clearable></el-input>
          </div>
          <span>车牌号</span>
          <div class="d-input">
            <el-input v-model="form.carNum" placeholder="请输入单据号" size="mini" clearable></el-input>
          </div>
          <span>计划入仓时间</span>
          <el-date-picker class="time-picker" v-model="form.putInPlanDate_begin" type="date" placeholder="选择开始时间" size="mini"></el-date-picker>
          <el-date-picker class="time-picker" v-model="form.putInPlanDate_end" type="date" placeholder="选择结束时间" size="mini"></el-date-picker>
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
        >
          <el-table-column
              prop="orderPlanNo"
              label="单据号"
              width="170px">
          </el-table-column>
          <el-table-column
              prop="orderApplyNo"
              label="入仓订单号"
              width="170px">
          </el-table-column>
          <el-table-column
              prop="carNum"
              label="车牌号"
              width="120px">
          </el-table-column>
          <el-table-column
              prop="warehouseName"
              label="入仓名称"
              width="120px">
          </el-table-column>
          <el-table-column
              prop="putInPlanDate"
              label="计划入仓日期"
              :formatter="timeFormater"
              width="100px">
          </el-table-column>
          <el-table-column
              prop="customerName"
              label="客户名称"
              width="120px">
          </el-table-column>
          <el-table-column
              prop="shippingTypeName"
              label="运输方式"
              width="70px">
          </el-table-column>
          <el-table-column
              prop="contactPhone"
              label="联系电话"
              width="120px">
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
              label="单据状态"
              width="90">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="140">
            <template slot-scope="scope">
              <div class="tableButton">
                <el-tooltip effect="dark" content="审核" placement="top">
                  <el-button v-show="getTabelBtn(1)" @click="auditRow(scope.row)" type="primary" icon="el-icon-reading" circle></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="修改" placement="top">
                  <el-button v-show="getTabelBtn(0,3)" @click="editRow(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                </el-tooltip>

                <el-tooltip effect="dark" content="查看" placement="top">
                  <el-button v-show="getTabelBtn(0,2,3,4)" @click="checkRow(scope.row)" type="primary" icon="el-icon-search" circle></el-button>
                </el-tooltip>

                <el-tooltip effect="dark" content="提交" placement="top">
                  <el-button v-show="getTabelBtn(0,3)" @click="submitRow(scope.row)" type="primary" icon="el-icon-document-add" circle></el-button>
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
        :visible.sync="dialogVisible"
        width="90%"
    >
      <template slot="title">
        <div class='titleZise'>
          {{modalTitle.orderPlanNo}} - <span style="color: red">{{modalTitle.description}}</span> - {{modalTitle.customerName}}
        </div>
      </template>
      <audit
          :is-check="isCheckProp"
          :orderPlanNo="orderPlanNo"
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
  import {setCompanyData} from '@/plugins/apis'

  export default {
    name: "homePage",
    components: {
      audit
    },
    data() {
      return {
        tabsArr: [
          {name: '新建', key: 'platfromPendingNum', type: 0},
          {name: '待审核', key: 'pendingNum', type: 1},
          {name: '已拒绝', key: 'rejectNum', type: 3},
          {name: '已通过', key: 'acceptNum', type: 2},
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
          orderPlanNo: '',
          carNum:'',
          orderApplyNo:'',
          putInPlanDate_begin:'',
          putInPlanDate_end:'',
        },
        orderPlanNo: '',//订单号
        tableRow: {},//选中的表格数据
        dialogVisible: false,//是否显示弹出窗,
        incommingCount: {},//头部入仓统计,

        isCheckProp: false,//是否为查看状态,
        isHeightSearch: false,//是否高级搜索;

        //客户名称下拉数据
        cusNameArr: [],
        //仓库下拉数据
        options: [],

      }
    },
    computed: {
      //筛选订单类型
      filterType() {
        return this.tabsArr[this.tabsAc].type;
      },
      modalTitle() {
        if (!this.tableRow.orderPlanNo) return '';
        return {
          orderPlanNo: this.tableRow.orderPlanNo,
          description: this.tableRow.orderState.description,
          customerName: this.tableRow.customerName,
        }
      }
    },
    methods: {
      // 获取仓库数据
      get_warehouse_data() {
        // 获取仓库数据
        this.$fn.get_warehouse_data(this).then(res => {
          console.log('res', res);
          this.options = [...res.data.data];
        }, err => {
          console.log('err', err);
        })
      },
      //格式化表格日期
      timeFormater(row, self, value) {
        if (value) {
          return value.slice(0, 11)
        }
        return '--'
      },

      //判断列表操作栏因该展现哪些按钮
      getTabelBtn(...rest) {
        return rest.includes(this.tabsArr[this.tabsAc].type);
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

        api_warehouse.arrange.planInList(this, postData);
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
        this.orderPlanNo = row.orderPlanNo;
        this.tableRow = row;
        this.dialogVisible = true;
        this.isCheckProp = true;
      },
      //点击审核
      auditRow(row) {
        this.orderPlanNo = row.orderPlanNo;
        this.tableRow = row;
        this.dialogVisible = true;
        this.isCheckProp = false;
        //this.$router.push({name: 'Incoming_audit'});
      },
      //点击编辑
      editRow(row) {

        sessionStorage.setItem("tableRow", JSON.stringify(row));
        sessionStorage.setItem("warehouse-incoming-edit", 'true');
        this.$router.push({name: 'arrange_incoming_add'});
        console.log(row);
      },
      //点击提交
      submitRow(row) {
        console.log(row);
        this.$confirm('订单提交过后将不可修改, 是否继续').then(() => {
          let data = {
            id: row.id,
            orderState: '1'
          };
          api_warehouse.arrange.planInComingSubmit(this, data).then((res) => {
            this.$message.info(res.data.msg);
            this.get_data();
            api_warehouse.storage.getIncomingPlanCount().then(res => {
              this.incommingCount = res.data.data;
            });
          })
        })

      },
      //关闭弹出窗
      closeDialog(payload) {
        if (!payload) {
          this.dialogVisible = false;
          return
        }
        this.$message.info(payload.msg)
        this.dialogVisible = false;
        api_warehouse.storage.getIncomingPlanCount().then(res => {
          this.incommingCount = res.data.data;
        });
        this.get_data()
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
        this.$router.push({name: 'arrange_incoming_add'});
      }
    },
    mounted() {
      this.get_data();
      api_warehouse.storage.getIncomingPlanCount().then(res => {
        this.incommingCount = res.data.data;
      });

      //获取客户下拉数据
      setCompanyData({}).then((res) => {
        this.cusNameArr = res
      });
      // 获取仓库下拉数据
      this.get_warehouse_data();
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../style/views/warehouse/homePage/arrange.less";
</style>
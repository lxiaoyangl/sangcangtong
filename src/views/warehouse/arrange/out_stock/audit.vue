<template>
  <div class="container">
    <div class="base-info" style="width: 900px;">
      <p class="title">入仓基本信息</p>
      <div class="bi-content">
        <div class="bic-item" v-for="(i,index) in baseInfoArr" :key="index" :style="{width:i.width,visibility:i.hidden}">
          <span class="label">{{i.name}}:</span>
          <span class="value">{{i.value ? i.value : '--'}}</span>
        </div>
      </div>
      <div class="files">
        <div class="files-tip">附件</div>
        <div class="file-item">
          <div v-for="(i,index) in files" :key="index"><span :title="i.fileName">{{i.fileName}}</span> <a :href="i.filePath">下载</a></div>
        </div>
      </div>
    </div>

    <!--商品信息-->
    <div class="goods-list">
      <div class="base-info">
        <p class="title">入仓商品信息</p>
      </div>
      <el-table
          :data="table_data"
          style="width: 100%"
          height="100%"
          stripe
          header-row-class-name="table_header"
          @row-click="detail_table_selection_change"
      >
        <el-table-column
            prop="name"
            label="品名"
            width="160px">
        </el-table-column>
        <el-table-column
            prop="placeOrigin"
            label="产地"
            width="80px">
        </el-table-column>
        <el-table-column
            prop="textureMaterial"
            label="材质"
            width="80">
        </el-table-column>
        <el-table-column
            prop="specifications"
            label="规格"
            min-width="80">
        </el-table-column>

        <el-table-column
            prop="weightCoefficient"
            label="理重"
            min-width="40">
        </el-table-column>


        <el-table-column
            prop="inPlanNum"
            label="计划入仓数量"
            min-width="100px">
        </el-table-column>
        <el-table-column
            prop="numUnit"
            label="数量单位"
            min-width="70">
        </el-table-column>
        <el-table-column
            prop="inPlanWeight"
            label="计划入仓重量"
            min-width="100">
        </el-table-column>
        <el-table-column
            prop="weightUnit"
            label="重量单位"
            min-width="70">
        </el-table-column>

        <el-table-column
            prop="measureMethod"
            label="计量方式"
            min-width="70">
        </el-table-column>

      </el-table>
      <!--<div class="table_box_pagination">
        <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="page.total"
            :current-page="page.page_num"
            :page-size="page.page_size"
            @current-change="page_num_change">
        </el-pagination>
      </div>-->
    </div>

    <!--库位编排-->
    <div class="goods-list">
      <div class="base-info">
        <p class="title">{{c_single_M_tip}}</p>
      </div>
      <el-table
          :data="table_data_location"
          style="width: 100%"
          height="100%"
          stripe
          header-row-class-name="table_header"
      >

        <el-table-column
            prop="warehouseLocation"
            label="库区库位"
            min-width="100">
        </el-table-column>
        <el-table-column
            prop="inPlanNum"
            label="计划存放数量"
            min-width="70">
        </el-table-column>

        <el-table-column
            prop="inPlanWeight"
            label="计划存放重量"
            min-width="70">
        </el-table-column>

      </el-table>
      <!--<div class="table_box_pagination">
        <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="page.total"
            :current-page="page.page_num"
            :page-size="page.page_size"
            @current-change="page_num_change">
        </el-pagination>
      </div>-->
    </div>


    <div class="audit" v-if="!isCheck">
      <div class="base-info">
        <p class="title">审核操作</p>
      </div>
      <div class="btn-div">
        <el-button :type="isPass === true ? 'success' : 'info'" size="mini" @click="isPass = true">通过</el-button>
        <el-button :type="isPass === false ? 'danger' : 'info'" size="mini" @click="isPass = false">拒绝</el-button>
      </div>
      <div class="input-div">
        <el-input
            requeire
            type="textarea"
            placeholder="请输入理由"
            v-model="denyInfo">
        </el-input>
      </div>
      <div class="btn-div">
        <el-button type="primary" size="mini" @click="doAudit">确定</el-button>
        <el-button type="info" size="mini" @click="$emit('onAudit');">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api_warehouse from "@/api/warehouse.js";

  export default {
    name: "audit",
    props: ["isCheck", "orderPlanNo", "tableRow"],
    data() {
      return {
        prepPageParams: JSON.parse(sessionStorage.getItem("tableRow")),
        page: {
          total: 1,
          page_num: 1,
          page_size: 20,
        },
        table_data: [],
        table_data_location: [],
        denyInfo: '',//拒绝意见
        isPass: '',
        files: [],
        single_M_row: {},
      }
    },
    computed: {
      baseInfoArr() {
        let info = this.tableRow;
        console.log(info);
        if (!info) return [];
        return [
          {name: '单据号', key: 'orderPlanNo', value: info.orderPlanNo},
          {name: '运输方式', key: 'shippingTypeName', value: info.shippingTypeName},
          {name: '入仓订单号', key: 'orderApplyNo', value: info.orderApplyNo ? info.orderApplyNo : '--'},
          {name: '客户号', key: 'customerNo', value: info.customerNo},
          {name: '车牌号', key: 'carNum', value: info.carNum ? info.carNum : '--'},
          {name: '关联交易订单号', key: 'linkedOrderNo', value: info.linkedOrderNo ? info.linkedOrderNo : '--'},
          {name: '客户名称', key: 'customerName', value: info.customerName},
          {name: '司机', key: 'driver', value: info.driver},
          {name: '经办人', key: 'operatorName', value: info.operatorName},
          {name: '单据状态', key: 'orderState', value: info.orderState.description},
          {name: '证件信息', key: 'idCardType', value: info.idCardType + ': ' + info.idCardNum},
          {name: '经办时间', key: 'updateTime', value: info.updateTime},
          {name: '入仓名称', key: 'warehouseName', value: info.warehouseName},
          {name: '联系电话', key: 'contactPhone', value: info.contactPhone},
          {name: '最后修改人', key: 'updateUser', value: info.updateUser},
          {name: '计划入仓日期', key: 'putInPlanDate', value: info.putInPlanDate ? info.putInPlanDate.slice(0, 10) : '--'},
          {name: 'none', key: 'none', value: 'none', hidden: 'hidden'},
          {name: '最后修改时间', key: 'updateTime', value: info.updateTime},
          {name: '订单备注', key: 'remark', value: info.remark, width: '100%'},
        ]
      },
      c_single_M_tip() {
        if (!this.single_M_row || !this.single_M_row.name) {
          return ''
        } else {
          let row = this.single_M_row;
          return `${row.name}  【${row.specifications}】| ${row.inPlanWeight}${row.weightUnit} `
        }
      },
    },
    methods: {
      // 分页页码改变
      page_num_change(val) {
        this.page.page_num = val;
        this.get_data();
      },
      getList() {
        let data = {
          orderPlanNo: this.orderPlanNo,
          pageNo: this.page.page_num,
          pageSize: this.page.page_size,
        };
        api_warehouse.arrange.getMaterialList(this, data).then(res => {
          this.table_data = [...res.data.data.records];
          this.page.total = res.data.data.total;
        })
      },
      doAudit() {

        if (this.isPass === '') {
          this.$message.error("请选择同意或者拒绝");
          return
        }

        if (this.isPass === false) {
          if (!this.denyInfo) {
            this.$message.error("请输入拒绝申请理由");
            return
          }
        }

        this.$confirm("是否确定提交?").then(() => {
          let data = {
            orderNo: this.orderPlanNo,
            result: this.isPass === true ? 1 : 0,
            suggest: this.denyInfo,
            businessType: "PLAN_IN"
          }
          api_warehouse.storage.inComingPlanAudit(this, data).then((res) => {
            this.$emit('onAudit', res.data);
          });

        })
      },
      //获取附件信息
      getUploadList() {
        console.log(1);
        let data = {
          orderPlanNo: this.orderPlanNo,
          businessType: 'PUT_IN',
        };
        api_warehouse.storage.getStorageUploadFile(this, data).then((res) => {
          this.files = res.data.data;
        });
      },
      //点击商品信息
      detail_table_selection_change(row) {
        this.single_M_row = row;
        api_warehouse.arrange.getLocationList(this, {orderNo: row.orderNo}).then((res) => {
          this.table_data_location = res.data.data.records
        });
      },

    },
    mounted() {
      this.getList();
      this.getUploadList();
    },
    watch: {
      orderPlanNo(val) {
        this.table_data_location = [];
        this.getList();
        this.getUploadList();
        this.isPass = '';
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../style/views/warehouse/homePage/audit.less";
</style>
<template>
  <div class="container">
    <div class="base-info" style="width: 900px;">
      <p class="title">过户基本信息</p>
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
    <div class="goods-list">
      <div class="base-info">
        <p class="title">过户商品信息</p>
      </div>
      <el-table
          :data="table_data"
          style="width: 100%"
          height="100%"
          stripe
          header-row-class-name="table_header"
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
            width="80">
        </el-table-column>

        <el-table-column
            prop="transferPlanNum"
            label="计划过户数量"
            width="100px">
        </el-table-column>
        <el-table-column
            prop="numUnit"
            label="数量单位"
            width="70">
        </el-table-column>
        <el-table-column
            prop="transferPlanWeight"
            label="计划过户重量"
            width="100">
        </el-table-column>
        <el-table-column
            prop="weightUnit"
            label="重量单位"
            width="70">
        </el-table-column>
        <el-table-column
            prop="weightCoefficient"
            label="理重"
            width="40">
        </el-table-column>
        <el-table-column
            prop="measureMethod"
            label="计量方式"
            width="70">
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

      </el-table>
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
    props: ["isCheck", "orderNo", "tableRow"],
    data() {
      return {
        prepPageParams: JSON.parse(sessionStorage.getItem("tableRow")),
        page: {
          total: 1,
          page_num: 1,
          page_size: 20,
        },
        table_data: [],
        denyInfo: '',//拒绝意见
        isPass: '',
      }
    },
    computed: {
      baseInfoArr() {
        let info = this.tableRow;
        if (!info) return [];
        return [
          {name: '订单号', key: 'orderNo', value: info.orderNo},
          {name: '仓库名称', key: 'warehouseName', value: info.warehouseName},
          {name: '订单状态', key: 'orderState', value: info.orderState.description},

          {name: '过出方名称', key: 'transferOutName', value: info.transferOutName},
          {name: '过入方名称', key: 'transferInName', value: info.transferInName},
          {name: '计划过户日期', key: 'transferPlanDate', value: info.transferPlanDate.slice(0, 10)},


          {name: '最后修改人', key: 'updateUser', value: info.updateUser},
          {name: '最后修改时间', key: 'updateTime', value: info.updateTime},
          {name: '经办人', key: 'operatorName', value: info.operatorName},

          {name: '关联交易订单号', key: 'linkedOrderNo', value: info.linkedOrderNo},
          {name: '备注', key: 'remark', value: info.remark},
        ]
      }
    },
    methods: {
      // 分页页码改变
      page_num_change(val) {
        this.page.page_num = val;
        this.get_data();
      },
      getList() {
        let data = {
          orderNo: this.orderNo,
          pageNo: this.page.page_num,
          pageSize: this.page.page_size,
        };
        api_warehouse.storage.getMaterialTransferList(this, data).then(res => {
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
            orderNo: this.orderNo,
            result: this.isPass === true ? 1 : 0,
            suggest: this.denyInfo,
            businessType: "TRANSFER"
          }
          api_warehouse.storage.transferAudit(this, data).then((res) => {
            this.$emit('onAudit', res.data);
          });

        })
      },
      getUploadList() {
        console.log(1);
        let data = {
          orderNo: this.orderNo,
          businessType: 'TRANSFER',
        };
        api_warehouse.storage.getStorageUploadFile(this, data).then((res) => {
          this.files = res.data.data;
        });
      }
    },
    mounted() {
      this.getList();
      this.getUploadList();
    },
    watch: {
      orderNo(val) {
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
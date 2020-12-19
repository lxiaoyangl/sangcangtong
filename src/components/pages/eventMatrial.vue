<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="selectMaterialVisible"
               :before-close="close" class="large-dialog">
      <materialData :selectMaterialDatas="selectMaterialDatas" @materialChange="materialChange" :warehouseData="warehouseData">
        <div slot="footer">
          <div style="padding: 5px 15px">
            <span class="label-span">选定物资：</span>
            <span v-for="item in materialList" :key="item.id">
                {{item.materialName}}-{{item.demandNumber}}件
            </span>
          </div>
          <div style="padding: 0 15px;text-align: right">
            <el-button plain @click="close">取消</el-button>
            <el-button type="success" @click="recordDetail">调拨记录</el-button>
            <el-button type="primary" @click="outMaterial">划拨物资</el-button>
          </div>
        </div>
      </materialData>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="调拨记录" :visible.sync="visibleRecord"
               :before-close="()=>{visibleRecord=false}" >
      <el-table border :data="listData" height="calc(100vh - 300px)" highlight-current-row ref="multipleTable"
                v-loading="loading" style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column sortable prop="materialName" align="center" label="物资名称" min-width="120"></el-table-column>
        <el-table-column sortable prop="batch" align="center" label="批号" min-width="120"></el-table-column>
        <el-table-column sortable prop="outgoingNumber" align="center" label="出库数量" min-width="120"></el-table-column>
        <el-table-column sortable prop="warehouseName" align="center" label="所属仓库" min-width="120"></el-table-column>
        <el-table-column sortable prop="eventName" align="center" label="应急事件" min-width="120"></el-table-column>
        <el-table-column sortable prop="userName" align="center" label="出库人员" min-width="160"></el-table-column>
        <el-table-column sortable prop="outgoingDate" align="center" label="出库时间" min-width="160"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.pageParams.currentPage"
        :page-sizes="[15, 30, 50, 100]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.pageParams.total">
      </el-pagination>
      <div class="dialog-footer">
        <el-button plain @click="visibleRecord=false">取消</el-button>
        <el-button type="primary" @click="visibleRecord=false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import {  clearpop } from '@/utils'
import { materialStockOutBatch, materialOutList } from '@/axios/api'
import materialData from '@/components/pages/materialData'

export default {
  props: ['value', 'eventDetail', 'warehouseData'],
  data () {
    return {
      selectMaterialDatas: null,
      selectMaterialVisible: false,
      materialList: [],
      visibleRecord: false,
      loading: false,
      listData: [], // 列表
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      title: ''
    }
  },
  components: {
    materialData,
  },
  watch: {
    value: {
      handler(cur) {
        this.selectMaterialVisible = cur
        this.selectMaterialDatas = {}
        this.materialList = []
        this.title = `选定物资 ${this.warehouseData.name|| ''}`
      },
      deep: true
    }
  },
  methods: {
    materialChange(list) {
      this.materialList = list
    },
    // 查看调拨记录
    recordDetail() {
      this.getList().then(() => {
        this.visibleRecord = true
      })
    },
    getList() {
      this.loading = true
      let sendData = {
        eventId: this.eventDetail.id,
      }
      return materialOutList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
      })
    },
    // 划拨物资
    outMaterial() {
      if (!this.materialList || this.materialList.length < 1) {
        clearpop('选择划拨物资')
        return
      }
      const sendData = this.materialList.map((v) => {
        const { id, materialId, materialName, demandNumber, warehouseId, warehouseName, reasonId, reasonName, storageLocation, batch } = v
          return {
            materialId,
            materialName,
            outgoingNumber: demandNumber,
            warehouseId,
            warehouseName,
            reasonId,
            reasonName,
            storageLocation,
            stockId: id,
            batch,
            eventId: this.eventDetail.id,
            eventName: this.eventDetail.eventName
          }
      })
      materialStockOutBatch({list: sendData}).then(() => {
        this.close()
      })
    },
    close() {
      this.$emit('input', false)
    },
    // 分页插件
    handleCurrentChange (param) {
      this.formInline.pageNo = param
      this.getList()
    },
    handleSizeChange (param) {
      this.formInline.pageSize = param
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">

</style>

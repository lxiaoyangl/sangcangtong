<template>
  <div>
    <el-table border :data="listData" height="calc(100vh - 265px)" @selection-change="handleSelectionChange"
              @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable" style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column sortable prop="id" align="center" label="ID" min-width="100"></el-table-column>
      <el-table-column sortable prop="reportTime" align="center" label="上报时间" min-width="160"></el-table-column>
      <el-table-column sortable prop="eventName" align="center" label="事件名称" min-width="120"></el-table-column>
      <el-table-column sortable prop="province" align="center" label="事发区域" min-width="180">
        <template slot-scope="scope">
          {{scope.row.province}} {{scope.row.city}} {{scope.row.county}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="detailAddress" align="center" label="事发地址" min-width="180"></el-table-column>
      <slot></slot>
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
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: ['listData', 'pageParams'],
  data () {
    return {
      multipleSelection: [],
      curPageParams: this.pageParams
    }
  },
  created () {

  },
  watch: {
    pageParams(cur) {
      this.curPageParams = cur
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 分页插件
    handleCurrentChange (param) {
      this.curPageParams.pageNo = param
      this.$emit('handleSizeChange', this.curPageParams)
    },
    handleSizeChange (param) {
      this.curPageParams.pageSize = param
      this.$emit('handleSizeChange', this.curPageParams)
    },
  }
}
</script>

<style scoped lang="scss">

</style>

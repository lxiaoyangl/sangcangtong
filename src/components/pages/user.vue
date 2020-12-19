<template>
  <div>
    <el-table border :data="listData" :height="tableHeight" @selection-change="handleSelectionChange"
              @row-click="rowClick" highlight-current-row :class="{'mt10':!selectUser}" ref="multipleTable"
              style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- <el-table-column sortable prop="id" v-if="type!==2"
                       align="center" label="用户ID" min-width="100"></el-table-column> -->
      <el-table-column prop="username" align="center" label="登录名称" min-width="110"></el-table-column>
      <el-table-column prop="name" align="center" label="用户名称" min-width="110"></el-table-column>
      <el-table-column sortable
                       prop="companyName" align="center" label="公司名称" min-width="100"></el-table-column>
      <el-table-column sortable prop="phoneNumber" align="center" label="手机号码" min-width="140"></el-table-column>
      <el-table-column sortable  v-if="type!==2"
                       prop="createTime" align="center" label="创建时间" min-width="130"></el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="!selectUser"
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
  props: ['listData', 'pageParams', 'type', 'selectUser'],
  data () {
    return {
      multipleSelection: [],
      curPageParams: this.pageParams
    }
  },
  created () {

  },
  computed: {
    tableHeight () {
      // console.log(this.$route.path, 1)
      if (this.$route.path === '/set/access/role') {
        // return 'calc(100vh - 470px)'
      } else if (this.$route.path === '/set/system/notice') {
        return 'calc(100vh - 320px)'
      }
      return 'calc(100vh - 287px)'
    }
  },
  watch: {
    listData (cur) {
      if (cur) {
        this.multipleSelection = []
        this.$refs.multipleTable.clearSelection()
      }
    },
    pageParams (cur) {
      this.curPageParams = cur
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 分页插件
    handleCurrentChange (param) {
      this.curPageParams.pageNo = param
      this.$emit('handleSizeChange', this.curPageParams)
    },
    handleSizeChange (param) {
      this.curPageParams.pageSize = param
      this.$emit('handleSizeChange', this.curPageParams)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

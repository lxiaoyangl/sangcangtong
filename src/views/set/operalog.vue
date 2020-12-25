<template>
  <div class="relative" style="height:100%;">
    <!-- 搜索筛选  @keyup.native.enter="searchList" @change="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="操作人员">
        <el-input clearable placeholder="请输入操作人员" :maxlength="20" v-model.trim="formInline.userName"></el-input>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select clearable v-model="formInline.operationType" placeholder="请选择" >
          <el-option v-for="(item, index) in operationTypes" :key="index"
                     :label="item" :value="index + 1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
    </el-form>
    <!--列表-->
    <div class="content-box mt10">
      <div>
        <!-- <el-button type="success" icon="fa fa-sign-out" @click="exportFile">导出</el-button> -->
        <template v-for="item in permissionButtons">
          <el-button type="primary" v-if="item.name==='导出'" icon="el-icon-circle-plus-outline" @click="exportFile">导出</el-button>
        </template>
      </div>
      <el-table border :data="listData" height="calc(100% - 84px)" @selection-change="handleSelectionChange"
                @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable"
                v-loading="loading" style="width: 100%;">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column sortable prop="systemModule" align="center" label="系统模块" min-width="120"></el-table-column>
        <el-table-column sortable prop="operationType" align="center" label="操作类型" min-width="120">
          <template slot-scope="scope">
           {{operationTypes[scope.row.operationType - 1]}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="userName" align="center" label="操作人员" min-width="120"></el-table-column>
        <el-table-column sortable prop="organizationName" align="center" label="公司名称" min-width="120"></el-table-column>
        <el-table-column sortable prop="userIp" align="center" label="操作人主机" min-width="140"></el-table-column>
        <el-table-column sortable prop="userArea" align="center" label="操作地点" min-width="120"></el-table-column>
        <el-table-column sortable prop="requestAddress" align="center" label="请求地址" min-width="220"></el-table-column>
        <el-table-column sortable prop="requestMode" align="center" label="请求方式" min-width="120"></el-table-column>
        <el-table-column sortable prop="operationState" align="center" label="操作状态" min-width="120">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.operationState" :type="stateClass[scope.row.operationState]" effect="dark">
              {{states[scope.row.operationState]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="operationMethod" align="center" label="操作方法" min-width="120">
          <template slot-scope="scope">
            <el-tooltip  effect="dark"  v-if="scope.row.operationMethod" :content="scope.row.operationMethod" placement="top">
              <span class="theme">详细</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable prop="requestParameter" align="center" label="请求参数" min-width="120">
          <template slot-scope="scope">
            <el-tooltip  effect="dark"   v-if="scope.row.requestParameter" :content="scope.row.requestParameter"  placement="top">
              <span class="theme">详细</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable prop="returnParameter" align="center" label="返回参数" min-width="120">
          <template slot-scope="scope">
            <el-tooltip  effect="dark"  v-if="scope.row.returnParameter"  :content="scope.row.returnParameter" placement="top">
              <span class="theme">详细</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable prop="operationTime" align="center" label="操作时间" min-width="180"></el-table-column>
        <!-- <el-table-column fixed="right" align="center" label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                       class="el-icon-close">删除</el-button>
          </template>
        </el-table-column> -->
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
  </div>
</template>

<script type="text/ecmascript-6">
import { sureDelete, deleteAllNext, baseExport, getValidButton } from '@/utils'
import { setOperalogList, setOperalogDelete, setOperalogBatchDelete } from '@/plugins/api'

export default {
  data () {
    return {
      loading: false,
      formInline: {
        state: ''
      },
      listData: [], // 列表
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      states: ['失败', '成功'],
      stateClass: ['red', 'green'],
      multipleSelection: [],
      operationTypes: ['新增', '修改', '删除', '清空'],
      permissionButtons: []
    }
  },
  created () {
    this.permissionButtons = getValidButton(this.$route.path)
    this.getList()
  },
  methods: {
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        userName: `*${this.formInline.userName || ''}*`,
        ...data
      }
      setOperalogList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
        deleteAllNext(res, this.getList)
      })
    },
    // 删除
    deleteItem (data) {
      sureDelete(() => {
        const sendData = {
          id: data.id
        }
        setOperalogDelete(sendData).then(() => {
          this.getList()
        })
      })
    },
    // 批量删除
    batchDelete () {
      const sendData = {
        list: this.multipleSelection.map((v) => {
          return { id: v.id }
        })
      }
      if (sendData.list.length < 1) {
        return
      }
      sureDelete(() => {
        setOperalogBatchDelete(sendData).then(() => {
          this.getList()
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 导出
    exportFile () {
      const data = {
        ...this.formInline,
        userName: this.formInline.userName ? `*${this.formInline.userName || ''}*` : ''
      }
      baseExport(data, '/operationLog/baseExport')
    },
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    searchReset () {
      this.formInline = {
        state: '',
        pageNo: 1
      }
      this.searchList()
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
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

<style scoped>

</style>

<template>
  <div class="relative" style="height:100%;">
    <!-- 搜索筛选  @keyup.native.enter="searchList" @change="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="名称">
        <el-input clearable placeholder="请输入字典名称" :maxlength="50" v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input clearable placeholder="请输入字典类型" :maxlength="50" v-model.trim="formInline.dictionaryType"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select clearable v-model="formInline.dictionaryState" placeholder="请选择" >
          <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
    </el-form>
    <!--列表-->
    <div class="content-box mt10">
      <div>
        <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">添加</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
        <File :exportData="formInline" importUrl="/dictionaryDirectory/baseImport"
              :downUrl="'/字典目录.xlsx'" exportUrl="/dictionaryDirectory/baseExport"></File> -->
        <template v-for="item in permissionButtons">
          <el-button type="primary" v-if="item.name==='新增'" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
          <el-button :disabled="multipleSelection.length===0" v-if="item.name==='批量删除'" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
          <File :exportData="formInline" importUrl="/dictionaryDirectory/baseImport" v-if="item.name==='导入'"
              :downUrl="'/字典目录.xlsx'" exportUrl="/dictionaryDirectory/baseExport"></File>
        </template>
      </div>
      <el-table border :data="listData" height="calc(100% - 84px)" @selection-change="handleSelectionChange"
                @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable"
                v-loading="loading" style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column sortable prop="id" align="center" label="ID" min-width="110"></el-table-column> -->
        <el-table-column sortable prop="name" align="center" label="字典名称" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="dictionaryType" align="center" label="字典类型" min-width="160"></el-table-column>
        <el-table-column sortable prop="dictionaryState" align="center" label="状态" min-width="130">
          <template slot-scope="scope">
            <!-- <el-switch @change="updateState(scope.row)" :value="scope.row.dictionaryState === 1"></el-switch> -->
            <el-tag size="mini" :type="scope.row.dictionaryState===1?'':'danger'" effect="dark" v-if="dictionaryStateList[scope.row.dictionaryState]">
              {{dictionaryStateList[scope.row.dictionaryState].label}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="description" align="center" label="描述" min-width="160"></el-table-column>
        <el-table-column sortable prop="createTime" align="center" label="创建时间" min-width="180"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="160">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)"
                       class="el-icon-edit">编辑</el-button>
            <el-button type="success" size="mini" @click.stop="showDetail(scope.row)"
                       class="el-icon-document-copy">列表</el-button>
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                       class="el-icon-close">删除</el-button> -->
            <div class="tableButton">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle  @click.stop="modifyPrev(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="列表" placement="top">
              <el-button type="primary" icon="el-icon-plus" circle  @click.stop="showDetail(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button type="primary" icon="el-icon-delete" circle  @click.stop="deleteItem(scope.row)"></el-button>
            </el-tooltip>
            </div>
          </template>
        </el-table-column>
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
    <div v-if="editFormVisible">
      <el-dialog :close-on-click-modal="false"  :title="title" :visible.sync="editFormVisible" @click="editFormVisible=false">
        <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
          <el-form-item label="字典名称" prop="name">
            <el-input v-model.trim="editForm.name" auto-complete="off" :maxlength="50"
                      placeholder="请输入字典名称"></el-input>
          </el-form-item>
          <el-form-item label="字典类型" prop="dictionaryType">
            <el-input v-model.trim="editForm.dictionaryType" auto-complete="off" :maxlength="50"
                      placeholder="请输入字典类型"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="dictionaryState">
            <el-radio v-model="editForm.dictionaryState" :label="0">停用</el-radio>
            <el-radio v-model="editForm.dictionaryState" :label="1">启用</el-radio>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model.trim="editForm.description" type="textarea" :rows="2" :maxlength="100"
                      auto-complete="off" placeholder="请输入描述"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button plain @click="editFormVisible=false">取消</el-button>
          <el-button type="primary" v-if="editForm.type=='add'"
                     @click="addList('editForm')">保存
          </el-button>
          <el-button type="primary" v-if="editForm.type=='edit'"
                     @click="modifyList('editForm')">确认修改
          </el-button>
        </div>
      </el-dialog>
    </div>
    <DictionaryData :dictionaryType="dictionaryType" :dictionaryId="dictionaryId"
                    v-model="showDictionaryData"></DictionaryData>
  </div>
</template>

<script type="text/ecmascript-6">
import DictionaryData from '@/components/pages/dictionaryData'
import File from '@/components/file'
import { sureDelete, getChangeData, state, deleteAllNext, getValidButton } from '@/utils'
import { setDirectoryCatalogList, setDirectoryCatalogAdd, setDirectoryCatalogEdit, setDirectoryCatalogDelete, setDirectoryCatalogBatchDelete } from '@/plugins/api'

export default {
  data () {
    return {
      loading: false,
      formInline: {
        dictionaryState: ''
      },
      listData: [], // 列表
      editFormVisible: false,
      editForm: {}, // 添加编辑
      oldEditForm: {}, // 添加编辑
      title: '添加',
      rules: {
        name: [{required: true, message: '请输入字典名称', trigger: 'blur'}],
        dictionaryType: [{required: true, message: '请输入字典类型', trigger: 'blur'}]
      },
      states: state,
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      multipleSelection: [],
      dictionaryType: '',
      dictionaryId: 0,
      showDictionaryData: false,
      permissionButtons: [],
      dictionaryStateList: [{'label': '停用', 'value': 0}, {'label': '启用', 'value': 1}]
    }
  },
  components: {
    DictionaryData,
    File
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
        name: `*${this.formInline.name || ''}*`,
        dictionaryType: `*${this.formInline.dictionaryType || ''}*`,
        ...data
      }
      setDirectoryCatalogList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
        deleteAllNext(res, this.getList)
      })
    },
    showDetail (data) {
      const { id, dictionaryType } = data
      this.showDictionaryData = true
      this.dictionaryType = dictionaryType
      this.dictionaryId = id
    },
    // 添加之前
    addPrev () {
      this._initEditForm()
      this.editFormVisible = true
      this.title = '添加'
      this.editForm.type = 'add'
    },
    // 修改之前
    modifyPrev (item) {
      this.editForm = JSON.parse(JSON.stringify(item))
      this.oldEditForm = JSON.stringify(item)
      this.title = '修改'
      this.editForm.type = 'edit'
      this.editFormVisible = true
    },
    // 状态更新
    updateState (data) {
      let sendData = {
        id: data.id,
        dictionaryState: data.dictionaryState === 1 ? 0 : 1
      }
      setDirectoryCatalogEdit(sendData).then((res) => {
        this.$message({
          message: res,
          type: 'success'
        })
        this._initEditForm()
        this.getList()
      })
    },
    // 确认添加
    addList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          this.loading = true
          let sendData = this.editForm
          setDirectoryCatalogAdd(sendData).then((res) => {
            this.$message({
              message: res,
              type: 'success'
            })
            this._initEditForm()
            this.getList()
          }).catch((res) => {
            this.loading = false
            this.$message.error(res.data.data)
          })
        }
      })
    },
    // 确认修改
    modifyList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          getChangeData(this.oldEditForm, this.editForm, (sendData) => {
            setDirectoryCatalogEdit(sendData).then((res) => {
              this.$message({
                message: res,
                type: 'success'
              })
              this._initEditForm()
              this.getList()
            })
          })
        }
      })
    },
    // 删除
    deleteItem (data) {
      sureDelete(() => {
        const sendData = {
          id: data.id
        }
        setDirectoryCatalogDelete(sendData).then((res) => {
          this.$message({
            message: res,
            type: 'success'
          })
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
        setDirectoryCatalogBatchDelete(sendData).then((res) => {
          this.$message({
            message: res,
            type: 'success'
          })
          this.getList()
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 修改添加完初始化数据
    _initEditForm () {
      this.editFormVisible = false
      this.editForm = {
        dictionaryState: 1
      }
    },
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    searchReset () {
      this.formInline = {
        dictionaryState: '',
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

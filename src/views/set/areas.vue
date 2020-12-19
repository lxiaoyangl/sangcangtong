<template>
  <div>
    <!-- 搜索筛选 @keyup.native.enter="searchList" @change="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="编码">
        <el-input clearable placeholder="请输入行政区编码" :maxlength="20" v-model.trim="formInline.code"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input clearable placeholder="请输入行政区域名称" :maxlength="20" v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select clearable v-model="formInline.areaLevel" placeholder="请选择" >
          <el-option v-for="(item,index) in areaLevels" :key="index" :label="item" :value="index">
          </el-option>
        </el-select>
      </el-form-item>
     <!-- <el-form-item label="状态">
        <el-select clearable v-model="formInline.areaState" placeholder="请选择"
                   @change="searchList">
          <el-option v-for="item in states" :key="item.value"
                     :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>-->
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
    </el-form>
    <!--列表-->
    <div class="content-box mt10">
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">添加</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
      <!--  <el-button type="success" icon="fa fa-sign-out" @click="exportFile">导出</el-button>-->
      </div>
      <el-table border :data="listData" height="calc(100vh - 310px)" @selection-change="handleSelectionChange"
                @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable"
                v-loading="loading" style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column sortable prop="id" align="center" label="ID" min-width="100"></el-table-column>
        <el-table-column sortable prop="code" align="center" label="行政区编码" min-width="120"></el-table-column>
        <el-table-column sortable prop="name" align="center" label="行政区名称" min-width="120"></el-table-column>
        <el-table-column sortable prop="pinyin" align="center" label="拼音码" min-width="100"></el-table-column>
        <el-table-column sortable prop="parentCode" align="center" label="父级编码" min-width="120"></el-table-column>
        <el-table-column sortable prop="areaState" align="center" label="状态" min-width="120">
          <template slot-scope="scope">
            <el-switch @change="updateState(scope.row)" :value="scope.row.areaState === 1"></el-switch>
          </template>
        </el-table-column>
        <el-table-column sortable prop="areaLevel" align="center" label="行政区级别" min-width="120">
          <template slot-scope="scope">
            {{areaLevels[scope.row.areaLevel]}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" min-width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)"
                       class="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                       class="el-icon-close">删除</el-button>
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
        <el-form label-width="120px" ref="editForm" :model="editForm" :rules="rules">
          <el-form-item label="行政区编码" prop="code">
            <el-input v-model.trim="editForm.code" auto-complete="off" :maxlength="20"
                      placeholder="请输入行政区编码"></el-input>
          </el-form-item>
          <el-form-item label="行政区名称" prop="name">
            <el-input v-model.trim="editForm.name" auto-complete="off" :maxlength="50"
                      placeholder="请输入行政区名称"></el-input>
          </el-form-item>
          <el-form-item label="拼音码" prop="pinyin">
            <el-input v-model.trim="editForm.pinyin" auto-complete="off" :maxlength="50"
                      placeholder="请输入拼音码"></el-input>
          </el-form-item>
          <el-form-item label="父级编码" prop="parentCode">
            <el-input v-model.trim="editForm.parentCode" auto-complete="off" :maxlength="20"
                      placeholder="请输入父级编码"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="areaState">
            <el-radio v-model="editForm.areaState" :label="0">停用</el-radio>
            <el-radio v-model="editForm.areaState" :label="1">启用</el-radio>
          </el-form-item>
          <el-form-item label="行政区级别" prop="areaLevel">
            <el-select clearable v-model="editForm.areaLevel" placeholder="请选择">
              <el-option v-for="(item,index) in areaLevels" :key="index"
                         :label="item" :value="index">
              </el-option>
            </el-select>
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
</div>
</template>

<script type="text/ecmascript-6">
import { sureDelete, getChangeData, toTreeData, state, deleteAllNext } from '@/utils'
import { setAreaList, setAreaAdd, setAreaEdit, setAreaDelete, setAreaBatchDelete } from '@/axios/api'

export default {
  data () {
    return {
      loading: false,
      formInline: {
        areaState: ''
      },
      listData: [], // 列表
      editFormVisible: false,
      editForm: {}, // 添加编辑
      oldEditForm: {}, // 添加编辑
      title: '添加',
      rules: {
        code: [{required: true, message: '请输入行政区编码', trigger: 'blur'}],
        name: [{required: true, message: '请输入行政区名称', trigger: 'blur'}],
        areaLevel: [{required: true, message: '请选择行政区级别', trigger: 'blur'}]
      },
      states: state,
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      multipleSelection: [],
      areaLevels: ['省', '市', '区县', '乡镇']
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`,
        ...data
      }
      setAreaList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
        deleteAllNext(res, this.getList)
      })
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
        areaState: data.areaState === 1 ? 0 : 1
      }
      setAreaEdit(sendData).then(() => {
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
          setAreaAdd(sendData).then(() => {
            this._initEditForm()
            this.getList()
          })
        }
      })
    },
    // 确认修改
    modifyList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          getChangeData(this.oldEditForm, this.editForm, (sendData) => {
            setAreaEdit(sendData).then(() => {
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
        setAreaDelete(sendData).then(() => {
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
        setAreaBatchDelete(sendData).then(() => {
          this.getList()
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 导出
    exportFile () {

    },
    // 修改添加完初始化数据
    _initEditForm () {
      this.editFormVisible = false
      this.editForm = {
        areaState: 1
      }
    },
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    searchReset () {
      this.formInline = {
        areaState: '',
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

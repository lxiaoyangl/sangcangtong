<template>
  <div>
    <!-- 搜索筛选  @keyup.native.enter="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="名称">
        <el-input clearable placeholder="请输入名称" :maxlength="20" v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input clearable placeholder="请输入负责人" :maxlength="20" v-model.trim="formInline.personCharge"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input clearable placeholder="电话" :maxlength="20" v-model.trim="formInline.contactNumber"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
    </el-form>
    <!--列表-->
    <div class="content-box mt10">
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">添加</el-button>
      <!--  <el-button type="danger" icon="el-icon-delete" @click="batchDelete" :disabled="!multipleSelection.length">批量删除</el-button>-->
      <!--  <el-button type="success" icon="fa fa-sign-out" @click="exportFile">导出</el-button>-->
      </div>
      <el-table border :data="listData" row-key="id"  @selection-change="handleSelectionChange"
                default-expand-all highlight-current-row :lazy="false" :indent="20"
                @row-click="rowClick" class="mt10" height="calc(100vh - 272px)"
                :default-sort = "{prop: 'orderNumber', order: 'ascending'}"
                ref="multipleTable" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column type="index" width="60" label="序号"></el-table-column>
        <el-table-column prop="name" label="名称" min-width="180"></el-table-column>
        <el-table-column prop="personCharge" align="center" label="负责人" min-width="120"></el-table-column>
        <el-table-column prop="contactNumber" align="center" label="联系电话" min-width="160"></el-table-column>
        <el-table-column prop="mailbox" align="center" label="邮箱" min-width="160"></el-table-column>
        <el-table-column sortable prop="departmentState" align="center" label="状态" min-width="120">
          <template slot-scope="scope">
            <el-switch @change="updateState(scope.row)" :value="scope.row.departmentState === 1"></el-switch>
          </template>
        </el-table-column>
        <el-table-column sortable prop="createTime" align="center" label="创建时间" min-width="180"></el-table-column>
        <el-table-column align="center" label="操作" min-width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)"
                       class="el-icon-edit">编辑</el-button>
            <!-- <el-button type="success" size="mini" @click.stop="addCurrentPrev(scope.row)"
                       class="el-icon-plus">新增</el-button> -->
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                       class="el-icon-close">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="editFormVisible">
      <el-dialog :close-on-click-modal="false"  :title="title" :visible.sync="editFormVisible" @click="editFormVisible=false">
        <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
          <el-form-item label="上级组织" prop="parentId">
            <el-input v-model="editForm.parentName" @focus="selectTree" :maxlength="20"
                      readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="组织名称" prop="name">
            <el-input v-model.trim="editForm.name" auto-complete="off" :maxlength="50"
                      placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="personCharge">
            <el-input v-model.trim="editForm.personCharge" auto-complete="off" :maxlength="50"
                      placeholder="请输入负责人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactNumber">
            <el-input v-model.trim="editForm.contactNumber" :maxlength="11"
                      auto-complete="off" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mailbox">
            <el-input v-model.trim="editForm.mailbox" auto-complete="off" :maxlength="50"
                      placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="departmentState">
            <el-radio v-model="editForm.departmentState" :label="0">停用</el-radio>
            <el-radio v-model="editForm.departmentState" :label="1">启用</el-radio>
          </el-form-item>
          <el-form-item label="排序" prop="orderNumber">
            <el-input v-model.trim="editForm.orderNumber" type="number" :maxlength="50"
                      auto-complete="off" placeholder="请输入排序"></el-input>
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
    <TreeWrap v-model="showTrees" :treeDatas="treeDatas" :selectData="selectData"
              @sureSelectedTree="sureSelectedTree"></TreeWrap>
  </div>
</template>

<script type="text/ecmascript-6">
import { sureDelete, getChangeData, toTreeData, state, toTreePackage } from '@/utils'
import TreeWrap from '@/components/treeWrap'
import { setDepartmentList, setDepartmentAdd, setDepartmentEdit, setDepartmentDelete, setDepartmentBatchDelete, setDepartmentBaseTree } from '@/axios/api'

export default {
  data () {
    return {
      loading: false,
      formInline: {
        departmentState: ''
      },
      listData: [], // 列表
      editFormVisible: false,
      editForm: {}, // 添加编辑
      oldEditForm: {}, // 添加编辑
      title: '添加',
      rules: {
        name: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
        personCharge: [{required: true, message: '请输入部门负责人', trigger: 'blur'}],
        contactNumber: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
        ],
        mailbox: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '请输入有效的邮箱地址', trigger: 'blur'}
        ]
        // orderNumber: [{required: true, message: '请输入排序', trigger: 'blur'}]
      },
      states: state,
      multipleSelection: [],
      showTrees: false,
      treeDatas: null,
      selectData: {
        treeCode: 0,
        name: ''
      }
    }
  },
  components: {
    TreeWrap
  },
  created () {
    this.getList()
  },
  watch: {
    'editForm.contactNumber': function (curVal, oldVal) {
      if (curVal) {
        this.editForm.contactNumber = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join('') : ''
      }
    }
  },
  methods: {
    getList () {
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`,
        personCharge: `*${this.formInline.personCharge || ''}*`
      }
      setDepartmentList(sendData).then((res) => {
        this.listData = toTreeData(res)
      })
    },
    // 添加之前
    addPrev () {
      this._initEditForm()
      this.editFormVisible = true
      this.title = '添加'
      this.editForm.type = 'add'
    },
    addCurrentPrev (item) {
      this.addPrev()
      this.editForm.parentId = item.id
      this.editForm.parentName = item.name
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
        departmentState: data.departmentState === 1 ? 0 : 1
      }
      setDepartmentEdit(sendData).then(() => {
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
          setDepartmentAdd(sendData).then(() => {
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
            setDepartmentEdit(sendData).then(() => {
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
        setDepartmentDelete(sendData).then(() => {
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
        setDepartmentBatchDelete(sendData).then(() => {
          this.getList()
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 导出
    exportFile () {

    },
    // 修改添加完初始化数据
    _initEditForm () {
      this.editFormVisible = false
      this.editForm = {
        departmentState: 1,
        parentId: 0
      }
    },
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    searchReset () {
      this.formInline = {
        departmentState: '',
        pageNo: 1
      }
      this.searchList()
    },
    selectTree () {
      setDepartmentBaseTree({}).then((res) => {
        this.treeDatas = toTreePackage(res)
        this.showTrees = true
        const { parentId, parentName } = this.editForm
        this.selectData = {
          treeCode: parentId / 1 || 0,
          name: parentName
        }
      })
    },
    sureSelectedTree (data) {
      const { treeCode, name } = data
      this.editForm.parentId = treeCode
      this.editForm.parentName = name
    }
  }
}
</script>

<style scoped>

</style>

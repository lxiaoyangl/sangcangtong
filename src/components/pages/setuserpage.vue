<template>
  <div class="outer-box relative" style="height: calc(100vh - 169px)">
    <i class="icon-hide-left el-icon-caret-right"
       v-if="!showLeft"  @click="showLeft = true"></i>
    <transition name="slidLeft">
      <div class="left-box relative" v-if="showLeft" style="height: calc(100vh - 100px)">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>组织管理</span>
            <span class="box-card-right">
            <router-link to="/set/access/department">
               <i class="el-icon-edit-outline"></i>
            </router-link>
            <i class="el-icon-refresh" @click="getTreeDatas"></i>
          </span>
          </div>
          <div>
            <el-tree highlight-current default-expand-all :expand-on-click-node="false"
                     :current-node-key="0" node-key="treeCode" ref="tree" :indent="2"
                     :data="treeDatas" :props="treeProps" @node-click="handleTreeClick"></el-tree>
          </div>
        </el-card>
        <i class="icon-hide-left el-icon-caret-left" @click="showLeft = false"></i>
      </div>
    </transition>
    <div class="right-box" :class="{'full': !showLeft }">
      <!-- 搜索筛选 -->
      <el-form :inline="true" :model="formInline" class="search-box">
        <el-form-item label="用户名称">
          <el-input clearable :maxlength="50" placeholder="请输入用户名称"
                    @keyup.native.enter="searchList"
                    v-model.trim="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" v-if="!selectUser">
          <el-input clearable :maxlength="50" placeholder="请输入用户电话"
                    @keyup.native.enter="searchList" type="number"
                    v-model.trim="formInline.phoneNumber"></el-input>
        </el-form-item>
        <!--<el-form-item label="用户状态">
          <el-select clearable v-model="formInline.userState" placeholder="请选择"
                     @change="searchList">
            <el-option v-for="item in states" :key="item.value"
                       :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
        <el-button type="primary" v-if="!selectUser" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
      </el-form>
      <!--列表-->
      <div class="content-box">
        <div v-if="!selectUser">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="batchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
          <!--<el-button type="success" icon="fa fa-sign-out" @click="exportFile">导出</el-button>-->
        </div>
        <User :listData="listData" :selectUser="true" @handleSelectionChange="handleSelectionChange"
              :pageParams="pageParams" @handleSizeChange="handleSizeChange">
          <el-table-column sortable prop="userState" align="center" label="用户状态" min-width="120">
            <template slot-scope="scope">
              <el-switch @change="updateState(scope.row)" :value="scope.row.userState === 1"></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" min-width="180" v-if="!selectUser">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)"
                         class="el-icon-edit">编辑</el-button>
              <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                         class="el-icon-close">删除</el-button>
            </template>
          </el-table-column>
        </User>
        <slot name="footer"></slot>
      </div>
    </div>
    <div  v-if="editFormVisible" class="fixed-box show">
      <div class="fixed-container">
        <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
          <el-row :gutter="120">
            <el-col :span="12">
              <el-form-item label="用户名称" prop="name">
                <el-input v-model.trim="editForm.name" auto-complete="off" :maxlength="50"
                          placeholder="请输入用户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="归属组织" prop="departmentId">
                <el-input v-model="editForm.departmentName" @focus="selectTreeBefore" :maxlength="50"
                          readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="120">
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-select clearable v-model="editForm.sex" placeholder="请选择">
                  <el-option v-for="item in sexs" :key="item.keyValue"
                             :label="item.labels" :value="item.keyValue">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phoneNumber">
                <el-input v-model.trim="editForm.phoneNumber" auto-complete="off" :maxlength="50"
                          placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="120">
            <el-col :span="12">
              <el-form-item label="邮箱" prop="mailbox">
                <el-input v-model.trim="editForm.mailbox" auto-complete="off" :maxlength="50"
                          placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位" prop="postId">
                <el-select v-model="editForm.postId" placeholder="请选择"   @change="getChangeName">
                  <el-option v-for="item in postIds" :key="item.keyValue"
                             :label="item.labels" :value="item.keyValue">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="120">
            <el-col :span="12">
              <el-form-item label="登录账号" prop="username">
                <el-input v-model.trim="editForm.username" auto-complete="off" placeholder="请输入登录账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录密码" prop="password">
                <el-input v-model.trim="editForm.password" type="password"
                          auto-complete="off" placeholder="请输入登录账号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="120">
            <el-col :span="12">
              <el-form-item label="角色类型" prop="userType">
                <el-radio v-model="editForm.userType" :label="1">管理角色</el-radio>
                <el-radio v-model="editForm.userType" :label="2">普通角色</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户状态" prop="userState">
                <el-radio v-model="editForm.userState" :label="0">停用</el-radio>
                <el-radio v-model="editForm.userState" :label="1">启用</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" :rows="2" v-model="editForm.description" :maxlength="50"
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
      </div>
    </div>
    <TreeWrap v-model="showTrees" :treeDatas="treeDatas"  :selectData="selectData"
              @sureSelectedTree="sureSelectedTree"></TreeWrap>
  </div>
</template>
<script type="text/ecmascript-6">
import TreeWrap from '@/components/treeWrap'
import User from '@/components/pages/user'
import { sureDelete, getChangeData, state, toTreePackage, deleteAllNext } from '@/utils'
import { setUserListAll, setUserList, setUserAdd, setUserEdit, setUserDelete, setUserBatchDelete, setDepartmentBaseTree, setDictionaryDataList } from '@/plugins/api'

export default {
  props: ['selectUser'],
  data () {
    return {
      loading: false,
      formInline: {
        userState: ''
      },
      listData: [], // 列表
      editFormVisible: false,
      editForm: {}, // 添加编辑
      oldEditForm: {}, // 添加编辑
      title: '添加',
      rules: {
        name: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
        sex: [{required: true, message: '请选择性别', trigger: 'blur'}],
        phoneNumber: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        mailbox: [{required: true, message: '邮箱', trigger: 'blur'}],
        username: [{required: true, message: '登录账号', trigger: 'blur'}],
        password: [
          {required: true, message: '登录密码', trigger: 'blur'},
          {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, message: '6-18位数字密码组合', trigger: 'blur'}
        ],
        departmentId: [{required: true, message: '请选择归属组织', trigger: 'blur'}],
        userType: [{required: true, message: '请选择角色类型', trigger: 'blur'}],
        postId: [{required: true, message: '请选择岗位', trigger: 'blur'}]
      },
      posts: [],
      states: state,
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      multipleSelection: [],
      treeDatas: [],
      treeProps: {
        children: 'children',
        label: 'name'
      },
      showTrees: false,
      showLeft: true,
      selectData: {
        treeCode: 0,
        name: ''
      },
      postIds: [],
      sexs: []
    }
  },
  components: {
    TreeWrap,
    User
  },
  watch: {
    selectUser () {
      this.getList()
    }
  },
  created () {
    this.getList()
    this.getSelects()
    this.getTreeDatas()
  },
  methods: {
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`,
        phoneNumber: `*${this.formInline.phoneNumber || ''}*`,
        ...data
      }
      if (!this.selectUser) {
        setUserList(sendData).then((res) => {
          this.listData = res.records
          this.loading = false
          this.pageParams.currentPage = res.current
          this.pageParams.pageSize = res.size
          this.pageParams.total = res.total
          deleteAllNext(res, this.getList)
        })
      } else {
        setUserListAll(sendData).then((res) => {
          this.listData = res
        })
      }
    },
    getSelects () {
      setDictionaryDataList({
        dictionaryType: 'sys_sex'
      }).then((res) => {
        this.sexs = res
      })
      setDictionaryDataList({
        dictionaryType: 'sys_position'
      }).then((res) => {
        this.postIds = res
      })
    },
    getTreeDatas () {
      setDepartmentBaseTree({}).then((res) => {
        this.treeDatas = toTreePackage(res)
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
        userState: data.userState == 1 ? 0 : 1
      }
      setUserEdit(sendData).then(() => {
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
          setUserAdd(sendData).then(() => {
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
            setUserEdit(sendData).then(() => {
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
        setUserDelete(sendData).then(() => {
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
        setUserBatchDelete(sendData).then(() => {
          this.getList()
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('checkedUserId', val)
    },
    // 导出
    exportFile () {

    },
    // 修改添加完初始化数据
    _initEditForm () {
      this.editFormVisible = false
      this.editForm = {
        userState: 1,
        userType: 2
      }
    },
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    searchReset () {
      this.formInline = {
        userState: '',
        pageNo: 1
      }
      this.searchList()
      this.$refs.tree.setCurrentKey(0)
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 分页插件
    handleSizeChange (param) {
      const { pageSize, pageNo } = param
      this.formInline.pageSize = pageSize
      this.formInline.pageNo = pageNo
      this.getList()
    },
    selectTreeBefore () {
      const { departmentId, departmentName } = this.editForm
      this.selectData = {
        treeCode: departmentId,
        name: departmentName
      }
      this.showTrees = true
    },
    sureSelectedTree (data) {
      const { treeCode, name } = data
      this.editForm.departmentId = treeCode / 1
      this.editForm.departmentName = name
    },
    getChangeName (data) {
      const temp = this.postIds.filter(v => data === v.keyValue)
      if (temp && temp.length > 0) {
        this.editForm.postName = temp[0].labels
      }
    },
    handleTreeClick (data) {
      const { treeCode } = data
      this.formInline.departmentId = treeCode
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">

</style>

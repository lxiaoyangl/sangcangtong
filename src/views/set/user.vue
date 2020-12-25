<template>
  <div class="outer-box relative" style="height:100%;">
    <div class="right-box" :class="{'full': !showLeft }">
      <el-form :inline="true" :model="formInline" class="search-box">
        <el-form-item label="用户名称">
          <el-input clearable :maxlength="50" placeholder="请输入用户名称" v-model.trim="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input clearable :maxlength="50" placeholder="请输入用户电话"  type="number"
                    v-model.trim="formInline.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
          <ren-select v-model="formInline.userState" dict-type="warning_status" ></ren-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
      </el-form>
      <!--列表-->
      <div class="content-box mt10">
        <div>
          <template>
          <el-button type="primary" v-show="$hasPermission('新增')" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
          <el-button :disabled="multipleSelection.length===0" v-show="$hasPermission('批量删除')" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
        </template>
        </div>
        <User :listData="listData" @handleSelectionChange="handleSelectionChange"
              :pageParams="pageParams" @handleSizeChange="handleSizeChange">
          <el-table-column sortable prop="userState" align="center" label="用户状态" min-width="120">
            <template slot-scope="scope">
              {{ $getDictLabel("warning_status", scope.row.userState) }}
            </template>
          </el-table-column>
           <el-table-column sortable prop="lockState" align="center" label="是否锁定" min-width="120">
            <template slot-scope="scope">
              <el-tag size="mini" :type="scope.row.lockState===1?'':'danger'" effect="dark" v-if="lockStateList[scope.row.lockState]">
              {{lockStateList[scope.row.lockState].label}}
            </el-tag>
            <el-tag size="mini" type="danger" effect="dark" v-else>
              {{lockStateList[0].label}}
            </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="170">
            <template slot-scope="scope">
            <div class="tableButton">
              <el-tooltip v-if="scope.row.lockState === 1" effect="dark" content="解锁" placement="top">
                <el-button type="primary" icon="el-icon-unlock" circle  @click.stop="unLockFuc(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button type="primary" icon="el-icon-edit" circle  @click.stop="modifyPrev(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="重置密码" placement="top">
                <el-button type="primary" icon="el-icon-key" circle  @click.stop="initPasswordFuc(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="top">
                <el-button type="primary" icon="el-icon-delete" circle  @click.stop="deleteItem(scope.row)"></el-button>
              </el-tooltip>
            </div>
            </template>
          </el-table-column>
        </User>
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
              <el-form-item label="用户状态" prop="userState">
                <el-radio v-model="editForm.userState" :label="0">停用</el-radio>
                <el-radio v-model="editForm.userState" :label="1">启用</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="120">
            <el-col :span="12">
              <el-form-item label="性别" prop="sexId">
                <el-select clearable  @change="getChangeSex" v-model="editForm.sexId" placeholder="请选择">
                  <el-option v-for="item in sexs" :key="item.keyValue"
                             :label="item.labels" :value="item.keyValue">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phoneNumber">
                <el-input v-model.trim="editForm.phoneNumber" auto-complete="off" :maxlength="11"
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
              <el-form-item label="公司" prop="">
                <el-select v-model="editForm.companyId" placeholder="请选择"   @change="getChangeName" clearable>
                  <el-option v-for="item in companyDatas" :key="item.id"
                             :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="120">
            <el-col :span="12">
              <el-form-item label="登录账号" prop="username">
                <el-input v-model.trim="editForm.username" :disabled="editForm.type=='edit'"
                          auto-complete="off" placeholder="请输入登录账号" :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录密码" prop="password" v-if="editForm.type=='add'">
                <el-input v-model.trim="editForm.password" type="password"
                          auto-complete="off" placeholder="请输入登录账号" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="角色类型" prop="userType" v-else>
                <el-radio v-model="editForm.userType" label="1">管理角色</el-radio>
                <el-radio v-model="editForm.userType" label="2">普通角色</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="120">
            <el-col :span="12" v-if="editForm.type=='add'">
              <el-form-item label="角色类型" prop="userType">
                <el-radio v-model="editForm.userType" label="1">管理角色</el-radio>
                <el-radio v-model="editForm.userType" label="2">普通角色</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">

            </el-col>
          </el-row>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" :rows="2" v-model="editForm.description" :maxlength="100"
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
import { sureDelete, getChangeData, state, toTreePackage, deleteAllNext, getValidButton } from '@/utils'
import { setUserList, setUserAdd, setUserEdit, setUserDelete, setUserBatchDelete, setDepartmentBaseTree, setDictionaryDataList } from '@/plugins/api'
import { setCompanyData, selectParameter } from '@/plugins/apis'

export default {
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
          {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
        ],
        mailbox: [
          {required: true, message: '邮箱', trigger: 'blur'},
          {pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '请输入有效的邮箱地址', trigger: 'blur'}
        ],
        username: [{required: true, message: '登录账号', trigger: 'blur'}],
        password: [
          {required: true, message: '登录密码', trigger: 'blur'},
          {pattern: /^[a-zA-Z0-9]{8,20}$/, message: '请输入包含字母和数字且至少8位的密码', trigger: 'blur'}
        ],
        departmentId: [{required: true, message: '请选择归属组织', trigger: 'change'}],
        userType: [{required: true, message: '请选择角色类型', trigger: 'blur'}],
        companyId: [{required: true, message: '请选择公司', trigger: 'blur'}]
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
      columnNameProps: {
        checkStrictly: true,
        value: 'treeCode',
        label: 'name',
        children: 'children',
        disabled: 'disabled'
      },
      columnOptions: [],

      postIds: [], // 原岗位
      sexs: [{'labels': '女', 'keyValue': 0}, {'labels': '男', 'keyValue': 1}],
//      userStateList: [{'label': '停用', 'value': 0}, {'label': '启用', 'value': 1}],
      lockStateList: [{'label': '未锁定', 'value': 0}, {'label': '锁定', 'value': 1}],
      companyDatas: [],
      permissionButtons: []
    }
  },
  components: {
    TreeWrap,
    User
  },
  created () {
    this.permissionButtons = getValidButton(this.$route.path)
    this.getList()
    this.getSelects()
    this.getTreeDatas()
  },
  watch: {
    'editForm.phoneNumber': function (curVal, oldVal) {
      if (curVal) {
        this.editForm.phoneNumber = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join('') : ''
      }
    }
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
      setUserList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
        deleteAllNext(res, this.getList)
      })
    },
    getSelects () {
      // setDictionaryDataList({
      //   dictionaryType: 'sys_sex'
      // }).then((res) => {
      //   this.sexs = res
      // })
      setDictionaryDataList({
        dictionaryType: 'sys_position'
      }).then((res) => {
        this.postIds = res
      })
    },
    getTreeDatas () {
      setDepartmentBaseTree({}).then((res) => {
        this.treeDatas = toTreePackage(res)
        this.columnOptions = this.getTreeData(this.treeDatas)
      })
    },
    getChangeSex (data) {
      const temp = this.sexs.filter(v => data === v.keyValue)
      if (temp && temp.length > 0) {
        this.editForm.sex = temp[0].labels
      }
    },
    // 添加之前
    addPrev () {
      this._initEditForm()
      this.editFormVisible = true
      this.title = '添加'
      this.editForm.type = 'add'
      this.getCompanyDatas()
    },
    // 修改之前
    modifyPrev (item) {
      this.getColumnIdArr(item)
      this.editForm = JSON.parse(JSON.stringify(item))
      this.oldEditForm = JSON.stringify(item)
      this.title = '修改'
      this.editForm.type = 'edit'
      this.editFormVisible = true
      this.getCompanyDatas()
    },
    // 状态更新
    updateState (data) {
      let sendData = {
        id: data.id,
        userState: data.userState === 1 ? 0 : 1
      }
      setUserEdit(sendData).then((res) => {
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
          sendData.password = md5(sendData.password)
          setUserAdd(sendData).then((res) => {
            this.$message({
              message: res,
              type: 'success'
            })
            this._initEditForm()
            this.getList()
          }).catch((res) => {
            this.$message.error(res.data.data)
          })
        }
      })
    },
    // 确认修改
    modifyList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          this.editForm.columnId = this.editForm.columnId[this.editForm.columnId.length - 1]
          getChangeData(this.oldEditForm, this.editForm, (sendData) => {
            setUserEdit(sendData).then((res) => {
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
        setUserDelete(sendData).then((res) => {
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
        setUserBatchDelete(sendData).then((res) => {
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
    // 导出
    exportFile () {

    },
    // 修改添加完初始化数据
    _initEditForm () {
      this.editFormVisible = false
      this.editForm = {
        userState: 1,
        userType: '2'
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
      // const temp = this.postIds.filter(v => data === v.keyValue)
      // if (temp && temp.length > 0) {
      //   this.editForm.postName = temp[0].labels
      // }
      const temp = this.companyDatas.filter(v => data === v.id)
      if (temp && temp.length > 0) {
        this.editForm.companyName = temp[0].name
      }
    },
    handleTreeClick (data) {
      const { treeCode } = data
      this.formInline.departmentId = treeCode
      this.getList()
    },
    getCompanyDatas () {
      setCompanyData({}).then((res) => {
        this.companyDatas = res
      })
    },
    initPasswordFuc (row) {
      sureDelete(() => {
        selectParameter({keyName: 'defaultPassword'}).then((res) => {
          var defaultPassword = res[0].keyValue || 123456789
          const sendData = {
            id: row.id,
            password: md5(defaultPassword)
          }
          setUserEdit(sendData).then((res) => {
            this.$message({
              message: res,
              type: 'success'
            })
          })
        })
      })
    },
    unLockFuc (row) {
      const sendData = {
        id: row.id,
        lockState: 0,
        wrongTimes: 0
      }
      setUserEdit(sendData).then((res) => {
        this.getList()
        this.$message({
          message: res,
          type: 'success'
        })
      })
    },

    updateColumnName (val) {
      if (val.length > 0) {
        let casLabelVal = this.$refs['columnId'].getCheckedNodes()[0].pathLabels
        this.editForm.columnName = casLabelVal[casLabelVal.length - 1]
      } else {
        this.editForm.columnName = ''
      }
    },
    getColumnIdArr (row) {
      this.$nextTick(() => {
        this.editForm.columnId = this.changeDetSelect(row.columnId + '', this.columnOptions)
      })
    },
    // 回填
    changeDetSelect (key, treeData) {
      let arr = [] // 在递归时操作的数组
      let returnArr = [] // 存放结果的数组
      let depth = 0 // 定义全局层级
      // 定义递归函数
      function childrenEach (childrenData, depthN) {
        for (var j = 0; j < childrenData.length; j++) {
          depth = depthN // 将执行的层级赋值 到 全局层级
          arr[depthN] = childrenData[j].treeCode
          if (childrenData[j].treeCode === key) {
            returnArr = arr.slice(0, depthN + 1) // 将目前匹配的数组，截断并保存到结果数组，
            break
          } else {
            if (childrenData[j].children) {
              depth++
              childrenEach(childrenData[j].children, depth)
            }
          }
        }
        return returnArr
      }

      return childrenEach(treeData, depth)
    },
    // 最后一级不为空
    getTreeData (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }
      return data
    }
  }
}
</script>

<style scoped lang="scss">

</style>

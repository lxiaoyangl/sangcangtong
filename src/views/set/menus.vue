<template>
  <div style="height:100%;">
    <!-- 搜索筛选  @keyup.native.enter="searchList" @change="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="系统名称">
        <el-select v-model="formInline.sysCode" placeholder="请选择系统" @change="searchList">
          <el-option v-for="item in systemType" :key="item.value"
                     :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input clearable placeholder="请输入资源名称" :maxlength="20" v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select clearable v-model="formInline.menuType" placeholder="请选择" >
          <el-option v-for="(item,index) in menuTypes" :key="index"
                     :label="item" :value="index + 1">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="状态">
        <el-select clearable v-model="formInline.menuState" placeholder="请选择" >
          <el-option v-for="item in states" :key="item.value"
                     :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
    </el-form>
    <!--列表-->
    <div class="content-box mt10">
      <div>
        <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">添加</el-button> -->
        <template v-for="item in permissionButtons">
          <el-button type="primary" v-if="item.name==='新增'" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
        </template>
      </div>
      <el-table
        border
        :data="listData"
        row-key="id"
        @selection-change="handleSelectionChange"
        default-expand-all
        highlight-current-row
        :lazy="false"
        :indent="20"
        @row-click="rowClick"
        class="mt10"
        height="calc(100% - 46px)"
        :default-sort = "{prop: 'orderNumber', order: 'ascending'}"
        ref="multipleTable"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <!-- <el-table-column type="index" width="60" label="序号"></el-table-column> -->
        <el-table-column sortable prop="name" label="资源名称" min-width="200">
          <template slot-scope="scope">
            <i v-if="scope.row.icon" class="scope.row.icon"></i>
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="orderNumber" align="center" label="资源序号" min-width="110"></el-table-column>
        <el-table-column sortable prop="path" align="center" label="资源路径" min-width="120"></el-table-column>
        <el-table-column sortable prop="menuType" align="center" label="资源类型" min-width="110">
          <template slot-scope="scope">
            <el-tag size="mini":type="menuTypesClass[scope.row.menuType - 1]" effect="dark">
              {{menuTypes[scope.row.menuType - 1]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="openMode" align="center" label="打开方式" min-width="110">
          <template slot-scope="scope">
            {{openModes[scope.row.openMode - 1]}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="departmentState" align="center" label="可见" min-width="90">
          <template slot-scope="scope">
            <el-tag size="mini" :type="stateClass[scope.row.menuState]" effect="dark">
              <span v-if="scope.row.menuState">{{states[scope.row.menuState].label}}</span>
              <span v-else>隐藏</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="170">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)"
                       class="el-icon-edit">编辑</el-button>
            <el-button type="success" size="mini" @click.stop="addCurrentPrev(scope.row)"
                       class="el-icon-plus">新增</el-button>
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                       class="el-icon-close">删除</el-button> -->
            <div class="tableButton">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle  @click.stop="modifyPrev(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="新增" placement="top">
              <el-button type="primary" icon="el-icon-plus" circle  @click.stop="addCurrentPrev(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button type="primary" icon="el-icon-delete" circle  @click.stop="deleteItem(scope.row)"></el-button>
            </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="editFormVisible" @click="showIcons=false">
      <el-dialog :close-on-click-modal="false"  :title="title" :visible.sync="editFormVisible" @click="editFormVisible=false">
        <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
          <el-form-item label="上级资源" prop="parentName">
            <el-input v-model="editForm.parentName" @focus="selectTree" :maxlength="20"
                      readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="资源类型" prop="menuType">
            <el-radio v-for="(item,index) in menuTypes" :key="index"
                      v-model="editForm.menuType" :label="index + 1">{{item}}</el-radio>
          </el-form-item>
          <el-form-item label="资源名称" prop="name">
            <el-input v-model.trim="editForm.name" auto-complete="off" :maxlength="50"
                      placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="orderNumber">
            <el-input v-model.trim="editForm.orderNumber" type="number" :maxlength="50"
                      auto-complete="off" placeholder="请输入排序"></el-input>
          </el-form-item>
          <div v-if="editForm.menuType === 1 || editForm.menuType === 3">
            <el-form-item label="资源路径" prop="path">
              <el-input v-model.trim="editForm.path" auto-complete="off" :maxlength="100"
                        placeholder="请输入资源路径"></el-input>
            </el-form-item>
            <el-form-item label="打开方式" prop="openMode">
              <el-select v-model="editForm.openMode" placeholder="请选择">
                <el-option v-for="(item,index) in openModes" :key="index"
                           :label="item" :value="index + 1">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
         <div v-if="editForm.menuType !== 4">
           <el-form-item label="资源图标" prop="icon" class="relative">
             <el-input v-model="editForm.icon" :maxlength="50"
                       @click.native.stop="showIcons = !showIcons" readonly="readonly"></el-input>
             <Icons v-show="showIcons" @checkedIcon="checkedIcon"></Icons>
           </el-form-item>
           <el-form-item label="资源状态" prop="menuState">
             <el-radio v-model="editForm.menuState" :label="0">隐藏</el-radio>
             <el-radio v-model="editForm.menuState" :label="1">显示</el-radio>
           </el-form-item>
         </div>
          <el-form-item label="角色描述" prop="intro">
            <el-input type="textarea" :rows="2" v-model="editForm.description" :maxlength="200"
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
    <TreeWrap v-model="showTrees" :treeDatas="treeDatas" :selectData="selectData"
              @sureSelectedTree="sureSelectedTree"></TreeWrap>
  </div>
</template>

<script type="text/ecmascript-6">
    import { sureDelete, getChangeData, toTreeData, state1, toTreePackage, getValidButton } from '@/utils'
    import Icons from '@/components/icons'
    import TreeWrap from '@/components/treeWrap'
    import { setMenuList, setMenuAdd, setMenuEdit, setMenuDelete, setMenuBatchDelete, setMenuBaseTree } from '@/plugins/api'

export default {
  data () {
    return {
      loading: false,
      formInline: {
        menuState: '',
        sysCode: '0'
      },
      listData: [], // 列表
      editFormVisible: false,
      editForm: {}, // 添加编辑
      oldEditForm: {}, // 添加编辑
      title: '添加',
      rules: {
        name: [{required: true, message: '请输入资源名称', trigger: 'blur'}],
        path: [{required: true, message: '请输入资源路径', trigger: 'blur'}],
        // orderNumber: [{required: true, message: '请输入资源序号', trigger: 'blur'}],
        menuType: [{required: true, message: '请选择资源类型', trigger: 'blur'}],
        openMode: [{required: true, message: '请输入打开方式', trigger: 'blur'}]
      },
      menuTypesClass: ['danger', '', 'success', 'danger'],
      menuTypes: ['主页', '目录', '菜单', '按钮'],
      openModes: ['页签', '新窗口', '弹框'],
      stateClass: ['danger', 'success'],
      states: state1,
      multipleSelection: [],
      showIcons: false,
      showTrees: false,
      treeDatas: null,
      selectData: {
        treeCode: 0,
        name: ''
      },
      systemType: [{label: '协同后台管理系统', value: '0'}, {label: '协同用户端管理系统', value: '1'}],
      permissionButtons: []
    }
  },
  components: {
    TreeWrap
  },
  created () {
    this.permissionButtons = getValidButton(this.$route.path)
    this.getList()
  },
  methods: {
    getList () {
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`
      }
      setMenuList(sendData).then((res) => {
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
        menuState: data.menuState === 1 ? 0 : 1
      }
      setMenuEdit(sendData).then((res) => {
        this.$message({
          message: res,
          type: 'success'
        })
        this._initEditForm()
        this.getList()
      })
    },
    checkedIcon (iconName) {
      this.$set(this.editForm, 'icon', iconName)
      this.showIcons = false
    },
    // 确认添加
    addList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          this.loading = true
          let sendData = this.editForm
          sendData.sysCode = this.formInline.sysCode
          setMenuAdd(sendData).then((res) => {
            this.$message({
              message: res,
              type: 'success'
            })
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
            setMenuEdit(sendData).then((res) => {
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
        setMenuDelete(sendData).then((res) => {
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
        setMenuBatchDelete(sendData).then((res) => {
          this.$message({
            message: res,
            type: 'success'
          })
          this.getList()
        })
      })
    },
    getTableSelect (val) {
      this.multipleSelection = val
    },
    // 导出
    exportFile () {

    },
    // 修改添加完初始化数据
    _initEditForm () {
      this.editFormVisible = false
      this.editForm = {
        menuState: 1,
        menuType: 2,
        openMode: 1,
        parentId: 0
      }
    },
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    searchReset () {
      this.formInline = {
        menuState: '',
        pageNo: 1
      }
      this.searchList()
    },
    selectTree () {
      setMenuBaseTree({sysCode: this.formInline.sysCode}).then((res) => {
        this.treeDatas = toTreePackage(res)
        const { parentId, parentName } = this.editForm
        this.selectData = {
          treeCode: parentId / 1 || 0,
          name: parentName
        }
        this.showTrees = true
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    sureSelectedTree (data) {
      const { treeCode, name } = data
      this.editForm.parentId = treeCode / 1
      this.editForm.parentName = name
    }
  }
}
</script>

<style scoped>

</style>

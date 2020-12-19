<template>
  <div>
    <div class="fixed-box" v-if="value">
      <!-- 搜索筛选 -->
      <el-form :inline="true" :model="formInline" class="search-box">
        <el-form-item label="字典名称">
          <el-select clearable filterable v-model="curDictionaryId" placeholder="请选择"
                     @change="selectDictionary">
            <el-option v-for="item in dictionaryCatalogs" :key="item.value"
                       :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典标签">
          <el-input clearable placeholder="请输入字标签" :maxlength="50"
                    @keyup.native.enter="searchList"
                    v-model.trim="formInline.labels"></el-input>
        </el-form-item>
      <!--  <el-form-item label="字典状态">
          <el-select clearable v-model="formInline.dictionaryState" placeholder="请选择"
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
      <div class="content-box">
        <div>
          <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="batchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
          <File :exportData="exportData" importUrl="/dictionaryData/baseImport"
                :downUrl="'/字典数据.xlsx'" exportUrl="/dictionaryData/baseExport"></File> -->
                <template v-for="item in permissionButtons">
          <el-button type="primary" v-if="item.name==='新增'" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
          <el-button :disabled="multipleSelection.length===0" v-if="item.name==='批量删除'" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
          <File :exportData="formInline" importUrl="/dictionaryDirectory/baseImport" v-if="item.name==='导入'"
              :downUrl="'/字典目录.xlsx'" exportUrl="/dictionaryDirectory/baseExport"></File>
        </template>
          <el-button type="info" class="ml10" icon="fa fa-mail-reply-all " @click="closePage">关闭</el-button>
        </div>
        <el-table border :data="listData" height="calc(100vh - 220px)" @selection-change="handleSelectionChange"
                  @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable"
                  v-loading="loading" style="width: 100%;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column sortable prop="keyValue" align="center" label="字典键值" min-width="110"></el-table-column>
          <el-table-column sortable prop="labels" align="center" label="字典标签" min-width="130"></el-table-column>
          <el-table-column sortable prop="orderNumber" align="center" label="排序" min-width="110"></el-table-column>
          <el-table-column sortable prop="dictionaryState" align="center" label="字典状态" min-width="110">
            <template slot-scope="scope">
              <el-switch @change="updateState(scope.row)" :value="scope.row.dictionaryState === 1"></el-switch>
            </template>
          </el-table-column>
          <el-table-column sortable prop="description" align="center" label="字典描述" min-width="110"></el-table-column>
          <el-table-column sortable prop="createTime" align="center" label="创建时间" min-width="180"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="120">
            <template slot-scope="scope">
              <!-- <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)"
                         class="el-icon-edit">编辑</el-button>
              <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                         class="el-icon-close">删除</el-button> -->
            <div class="tableButton">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle  @click.stop="modifyPrev(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button type="primary" icon="el-icon-delete" circle  @click.stop="deleteItem(scope.row)"></el-button>
            </el-tooltip>
            </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="editFormVisible">
        <el-dialog :close-on-click-modal="false"  :title="title" :visible.sync="editFormVisible" @click="closeDiolag">
          <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
            <el-form-item label="字典标签" prop="labels">
              <el-input v-model.trim="editForm.labels" auto-complete="off" :maxlength="50"
                        placeholder="请输入字典标签"></el-input>
            </el-form-item>
            <el-form-item label="字典键值" prop="keyValue">
              <el-input v-model.trim="editForm.keyValue" auto-complete="off" :maxlength="50"
                        placeholder="请输入字典键值"></el-input>
            </el-form-item>
            <el-form-item label="字典类型" prop="dictionaryType">
              <el-input v-model.trim="editForm.dictionaryType" disabled auto-complete="off"
                        placeholder="请输入字典类型"></el-input>
            </el-form-item>
            <el-form-item label="字典排序" prop="orderNumber">
              <el-input v-model.trim="editForm.orderNumber" type="number" :maxlength="50"
                        auto-complete="off" placeholder="请输入字典排序"></el-input>
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
            <el-button plain @click="closeDiolag">取消</el-button>
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
  </div>
</template>

<script type="text/ecmascript-6">
import File from '@/components/file'
import { sureDelete, getChangeData, state, getValidButton } from '@/utils'
import { setDirectoryCatalogAll, setDictionaryDataList, setDictionaryDataAdd, setDictionaryDataEdit, setDictionaryDataDelete, setDictionaryDataBatchDelete } from '@/axios/api'

export default {
  props: {
    dictionaryType: String,
    value: Boolean,
    dictionaryId: Number
  },
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
        labels: [{required: true, message: '请输入标签', trigger: 'blur'}],
        keyValue: [{required: true, message: '请输入键值', trigger: 'blur'}],
        name: [{required: true, message: '请输入字典名称', trigger: 'blur'}],
        dictionaryType: [{required: true, message: '请输入字典类型', trigger: 'blur'}]
      },
      states: state,
      multipleSelection: [],
      dictionaryCatalogs: [],
      mountedFlag: false,
      curDictionaryId: this.dictionaryId,
      curDictionaryType: this.dictionaryType,
      exportData: {},
      permissionButtons: []
    }
  },
  components: {
    File
  },
  created () {
    this.permissionButtons = getValidButton(this.$route.path)
    this.getCatalog()
  },
  watch: {
    dictionaryType (cur) {
      this.curDictionaryType = cur
      this.getList()
    },
    dictionaryId (cur) {
      this.curDictionaryId = cur
    },
    // 导出数据处理
    formInline (cur) {
      this.exportData = {
        ...cur,
        dictionaryType: this.curDictionaryType,
        name: `*${this.formInline.name || ''}*`,
        labels: `*${this.formInline.labels || ''}*`
      }
    },
    // 导出数据处理
    curDictionaryType (cur) {
      this.exportData.dictionaryType = cur
    }
  },
  methods: {
    getCatalog () {
      setDirectoryCatalogAll({}).then((res) => {
        this.dictionaryCatalogs = res
      })
    },
    selectDictionary (value) {
      let temp
      this.dictionaryCatalogs.forEach((v) => {
        if (v && v.id && (v.id === value)) {
          temp = v
        }
      })
      if (!temp) return
      this.curDictionaryType = temp.dictionaryType
      this.getList()
    },
    getList () {
      this.loading = true
      let sendData = {
        ...this.formInline,
        dictionaryType: this.curDictionaryType,
        name: `*${this.formInline.name || ''}*`,
        labels: `*${this.formInline.labels || ''}*`
      }
      setDictionaryDataList(sendData).then((res) => {
        this.listData = res
        this.loading = false
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
      this.editForm.dictionaryType = this.curDictionaryType
    },
    // 状态更新
    updateState (data) {
      let sendData = {
        id: data.id,
        dictionaryState: data.dictionaryState === 1 ? 0 : 1
      }
      setDictionaryDataEdit(sendData).then(() => {
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
          setDictionaryDataAdd(sendData).then(() => {
            this.editFormVisible = false
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
            setDictionaryDataEdit(sendData).then(() => {
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
        setDictionaryDataDelete(sendData).then(() => {
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
        setDictionaryDataBatchDelete(sendData).then(() => {
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
        dictionaryState: 1,
        dictionaryType: this.curDictionaryType
      }
    },
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    searchReset () {
      this.formInline = {
        dictionaryState: '',
        pageNo: 1,
        dictionaryType: this.curDictionaryType
      }
      this.searchList()
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    closeDiolag () {
      this.editFormVisible = false
    },
    closePage () {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="relative">
    <!-- 搜索筛选  @keyup.native.enter="searchList" @change="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="公告名称">
        <el-input clearable placeholder="请输入公告名称" :maxlength="20" v-model.trim="formInline.noticeTitle"></el-input>
      </el-form-item>
      <el-form-item label="公告类型">
        <el-select clearable v-model="formInline.noticeType" placeholder="请选择" >
          <el-option v-for="item in noticeTypes" :key="item.keyValue"
              :label="item.labels" :value="item.keyValue"></el-option>
        </el-select>
      </el-form-item>
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
        <el-table-column sortable prop="noticeTitle" align="center" label="公告标题" min-width="130">
          <template slot-scope="scope">
            <el-tooltip  effect="dark" v-if="scope.row.noticeTitle" :content="scope.row.noticeTitle" placement="top">
              <span>{{scope.row.noticeTitle.substring(0,10)}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable prop="noticeContent" align="center" label="公告内容" min-width="120">
          <template slot-scope="scope">
            <el-tooltip  effect="dark" v-if="scope.row.noticeContent" :content="scope.row.noticeContent" placement="top">
              <span>{{scope.row.noticeContent.substring(0,10)}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable prop="noticeType" align="center" label="公告类型" min-width="120">
          <template slot-scope="scope">
            {{getLabel(scope.row.noticeType)}}
          </template>
        </el-table-column>
       <!-- <el-table-column sortable prop="noticeState" align="center" label="状态" min-width="120">
          <template slot-scope="scope">
            <el-switch @change="updateState(scope.row)" :value="scope.row.noticeState === 1"></el-switch>
          </template>
        </el-table-column>-->
      <!--  <el-table-column sortable prop="description" align="center" label="描述" min-width="180">
          <template slot-scope="scope">
            <el-tooltip  effect="dark" v-if="scope.row.description" :content="scope.row.description" placement="top">
              <span>{{scope.row.description.substring(0,10)}}</span>
            </el-tooltip>
          </template>
        </el-table-column>-->
        <el-table-column sortable prop="userName" align="center" label="发布人" min-width="120"></el-table-column>
        <el-table-column sortable prop="createTime" align="center" label="发布时间" min-width="180"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" min-width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="getResiveUserList(scope.row)">接收详情</el-button>
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
        <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
          <el-form-item label="公告标题" prop="noticeTitle">
            <el-input v-model.trim="editForm.noticeTitle" auto-complete="off" :maxlength="50"
                      placeholder="公告标题"></el-input>
          </el-form-item>
          <el-form-item label="公告类型" prop="noticeType">
            <el-select clearable v-model="editForm.noticeType" placeholder="请选择">
              <el-option v-for="item in noticeTypes" :key="item.keyValue"
                         :label="item.labels" :value="item.keyValue"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公告内容" prop="noticeContent">
            <el-input v-model.trim="editForm.noticeContent" type="textarea" :rows="3"
                      auto-complete="off" :maxlength="200"
                      placeholder="公告内容"></el-input>
          </el-form-item>
        <!--  <el-form-item label="描述" prop="description">
            <el-input type="textarea" :rows="2" v-model="editForm.description" :maxlength="50"
                       auto-complete="off" placeholder="请输入描述"></el-input>
          </el-form-item>-->
          <el-form-item label="接收人">
            <el-button type="primary" @click="selectUserVisible= true">选择</el-button>
            <span >已选择{{tempSelectUser.length}}个用户</span>
          </el-form-item>
        <!--  <el-form-item label="公告状态" prop="noticeState">
            <el-radio v-model="editForm.noticeState" :label="0">关闭</el-radio>
            <el-radio v-model="editForm.noticeState" :label="1">正常</el-radio>
          </el-form-item>-->
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
    <div v-if="selectUserVisible">
      <el-dialog :close-on-click-modal="false"  title="选定接收人" class="large-dialog"
                 :visible.sync="selectUserVisible" @click="selectUserVisible=false">
        <setuserpage :selectUser="true" @checkedUserId="checkedUserId">
          <div class="dialog-footer" slot="footer">
            <el-button plain @click="selectUserVisible=false">取消</el-button>
            <el-button type="primary" @click="selectUserVisible=false">确认选择</el-button>
          </div>
        </setuserpage>
      </el-dialog>
    </div>
    <el-dialog :close-on-click-modal="false"  title="接收人记录表" :visible.sync="noticeUserVisible" @click="noticeUserVisible=false">
      <el-table border :data="noticeUserList" height="500px" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column sortable prop="id" align="center" label="ID" min-width="100"></el-table-column>
        <el-table-column sortable prop="noticeTitle" align="center" label="公告标题" min-width="120"></el-table-column>
        <el-table-column sortable prop="userName" align="center" label="用户名" min-width="100"></el-table-column>
        <el-table-column sortable prop="noticeState" align="center" label="接收状态" min-width="120">
          <template slot-scope="scope">
            <el-tag size="mini" :type="noticeStatesClass[scope.row.noticeState]" effect="dark" v-if="noticeStates[scope.row.noticeState]">
              {{noticeStates[scope.row.noticeState]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="receiveTime" align="center" label="接收时间" min-width="160"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import setuserpage from '../../components/pages/setuserpage.vue'
import { sureDelete, getChangeData, deleteAllNext } from '@/utils'
import { setNoticeUserList, setNoticeList, setNoticeAdd, setNoticeEdit, setNoticeDelete, setNoticeBatchDelete, setDictionaryDataList, setNoticeUserDelete } from '@/axios/api'

export default {
  data () {
    return {
      loading: false,
      formInline: {
        noticeState: ''
      },
      listData: [], // 列表
      editFormVisible: false,
      editForm: {}, // 添加编辑
      oldEditForm: {}, // 添加编辑
      title: '添加',
      rules: {
        noticeTitle: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
        noticeContent: [{required: true, message: '请输入公告内容', trigger: 'blur'}]
      },
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      noticeTypes: [],
      multipleSelection: [],
      selectUserVisible: false,
      tempSelectUser: [],
      noticeUserVisible: false,
      noticeUserList: [],
      noticeStates: ['未接收', '已接收'],
      noticeStatesClass: ['warning', 'success']
    }
  },
  components: {
    setuserpage
  },
  created () {
    this.getList()
    this.getSelects()
  },
  methods: {
    getLabel (data) {
      const temp = this.noticeTypes.filter(v => data === v.keyValue)
      if (temp && temp.length > 0) {
        return temp[0].labels
      }
      return ''
    },
    getSelects () {
      setDictionaryDataList({
        dictionaryType: 'sys_notice_type'
      }).then((res) => {
        this.noticeTypes = res
      })
    },
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        noticeTitle: `*${this.formInline.noticeTitle || ''}*`,
        ...data
      }
      setNoticeList(sendData).then((res) => {
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
      this.tempSelectUser = []
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
        noticeState: data.noticeState === 1 ? 0 : 1
      }
      setNoticeEdit(sendData).then(() => {
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
          const temp = this.tempSelectUser.map((v) => {
            return {
              'noticeTitle': sendData.noticeTitle,
              'userId': v.id,
              'userName': v.name
            }
          })
          sendData.noticeUserList = temp
          setNoticeAdd(sendData).then(() => {
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
            setNoticeEdit(sendData).then(() => {
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
        setNoticeDelete(sendData).then((res) => {
          setNoticeUserDelete({
            noticeId: data.id
          }).then(() => {
            this.$parent.$parent.$children[0].initNoticeList()
            this.$message({
              message: res,
              type: 'success'
            })
            this.getList()
          })
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
        setNoticeBatchDelete(sendData).then(() => {
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
        noticeState: 1
      }
    },
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    searchReset () {
      this.formInline = {
        noticeState: '',
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
    },
    checkedUserId (val) {
      this.tempSelectUser = val
    },
    // 接收列表的展示
    getResiveUserList (item) {
      const sendData = {
        noticeId: item.id
      }
      setNoticeUserList(sendData).then((res) => {
        this.noticeUserList = res
        this.noticeUserVisible = true
      })
    }
  }
}
</script>

<style scoped>

</style>

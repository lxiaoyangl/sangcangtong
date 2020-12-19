<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="名称">
        <el-input clearable placeholder="请输入用户名称" :maxlength="20"
                  @keyup.native.enter="searchList"
                  v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input clearable placeholder="请输入用户电话" :maxlength="20"
                  @keyup.native.enter="searchList"
                  v-model.trim="formInline.phoneNumber"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
    </el-form>
    <!--列表-->
    <div class="content-box">
      <div v-if="type === 1">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">添加</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete">批量取消授权</el-button>
        <el-button type="info" icon="fa fa-mail-reply-all " @click="closePage">关闭</el-button>
      </div>
      <User :listData="listData" @handleSelectionChange="handleSelectionChange" :type="type"
            :pageParams="pageParams" @handleSizeChange="handleSizeChange">
        <el-table-column sortable prop="userState" align="center" label="用户状态" min-width="120"
                         v-if="type === 1">
          <template slot-scope="scope">
            <el-tag size="mini":type="stateClass[scope.row.userState]"
                    effect="dark" v-if="scope.row.userState">
              {{states[scope.row.userState]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" min-width="150"
                         v-if="type === 1">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                       class="el-icon-close">取消授权</el-button>
          </template>
        </el-table-column>
      </User>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import User from '@/components/pages/user'
import { sureDelete, state, deleteAllNext } from '@/utils'
import { setRoleUserList, setRoleNoUserList, setRoleUserDelete, setRoleUserBatchDelete, setRoleUserBatchAdd } from '@/axios/api'

export default {
  props: {
    type: Number,
    roleId: Number,
    updateStateList: Boolean
  },
  data () {
    return {
      formInline: {
        pageNo: 1,
        pageSize: 15
      },
      listData: [], // 列表
      states: ['停用', '正常'],
      stateClass: ['danger', 'success'],
      multipleSelection: [],
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      curRoleId: this.roleId
    }
  },
  components: {
    User
  },
  created () {
    this.getList()
  },
  watch: {
    roleId(roleId) {
      this.curRoleId = roleId
      this.getList()
    },
    updateStateList(cur) {
      if (cur) {
        this.getList()
      }
    }
  },
  methods: {
    getList () {
      const sendData = {
        roleId: this.curRoleId,
        ...this.formInline
      }
      if (this.type === 1) {
        setRoleUserList(sendData).then((res) => {
          this.__common(res)
          deleteAllNext(res, this.getList)
          this.$emit('emitUpdateStateList', false)
        })
      } else {
        setRoleNoUserList(sendData).then((res) => {
          this.__common(res)
        })
      }
    },
    __common(res) {
      this.listData = res.records
      this.pageParams.currentPage = res.current
      this.pageParams.pageSize = res.size
      this.pageParams.total = res.total
    },
    // 添加之前
    addPrev () {
      this.$emit('addPrev', true)
    },
    // 删除
    deleteItem (data) {
      sureDelete(() => {
        const sendData = {
          list: [
            {
              userId: data.id,
              roleId: this.roleId
            }
          ]
        }
        setRoleUserDelete(sendData).then(() => {
          this.getList()
        })
      })
    },
    // 批量删除
    batchDelete () {
      const sendData = {
        list: this.multipleSelection.map((v) => {
          return {
            userId: v.id,
            roleId: this.roleId
          }
        })
      }
      if(sendData.list.length < 1) {
        return
      }
      sureDelete(() => {
        setRoleUserBatchDelete(sendData).then(() => {
          this.getList()
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    searchList () {
      this.formInline.pageNo = 1
      this.formInline.pageSize = 15
      this.getList()
    },
    searchReset () {
      this.formInline = {
        pageNo: 1,
        pageSize: 15
      }
      this.searchList()
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 分页插件
    handleSizeChange (param) {
      const { pageSize, pageNo } = param
      this.formInline.pageSize = pageSize
      this.formInline.pageNo = pageNo
      this.getList()
    },
    closePage() {
      this.$emit('closePage', false)
    }
  }
}
</script>

<style scoped>

</style>

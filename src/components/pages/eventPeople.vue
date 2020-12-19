<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="参与人员" :visible.sync="visible"
               :append-to-body="true" :before-close="closeItem" class="large-dialog">
      <!-- 搜索筛选 -->
      <el-form :inline="true" :model="formInline" class="search-box">
        <el-form-item label="姓名">
          <el-input clearable placeholder="姓名" :maxlength="20"
                    @keyup.native.enter="searchList"
                    v-model.trim="formInline.personnelName"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input clearable placeholder="电话" :maxlength="20"
                    @keyup.native.enter="searchList"
                    v-model.trim="formInline.contactNumber"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
      </el-form>
      <!--列表-->
      <div class="content-box" style="padding:0 15px">
        <el-table border :data="listData" height="calc(100vh - 400px)" highlight-current-row
                  @selection-change="handleSelectionChange" row-key="id"
                  @row-click="rowClick" ref="multipleTable"
                  v-loading="loading" style="width: 100%;">
          <el-table-column type="selection" :reserve-selection="true"  width="55"></el-table-column>
          <el-table-column sortable prop="id" align="center" label="ID" min-width="80"></el-table-column>
          <el-table-column sortable prop="name" align="center" label="姓名" min-width="120"></el-table-column>
          <el-table-column sortable prop="age" align="center" label="年龄" min-width="100"></el-table-column>
          <el-table-column sortable prop="contactNumber" align="center" label="电话" min-width="180"></el-table-column>
          <el-table-column sortable prop="teamName" align="center" label="救援队" min-width="130"></el-table-column>
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
      <div style="padding: 0 15px">
        <div class="mt10">
         <span class="label-span">选中人：</span>
          <span v-for="item in multipleSelection" :key="item.id">
            {{item.name}}
          </span>
        </div>
        <div class="mt10">
          <el-input type="textarea" :rows="2" placeholder="请输入指令内容"
                    :maxlength="400" v-model="content"></el-input>
        </div>
        <div class="dialog-footer">
          <el-button type="plain" @click="closeItem">取消</el-button>
          <el-button type="primary" @click="sendMessage">发布指令</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { deleteAllNext, clearpop } from '@/utils'
import { eventPlanPersonList, addEventInstruct, addEventCall } from '@/axios/api'
export default {
  props: ['value', 'eventDetail', 'planId', 'inviteContent'],
  data () {
    return {
      visible: false,
      loading: false,
      listData: [],
      formInline: {},
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      content: '',
      multipleSelection: []
    }
  },
  watch: {
    value(cur) {
      this.visible = cur
      this.getList()
    },
    inviteContent(cur) {
      this.content = cur
    }
  },
  created () {

  },
  methods: {
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        eventId: this.eventDetail.id,
        planId: this.planId,
        name: `*${this.formInline.name || ''}*`,
        contactNumber: `*${this.formInline.contactNumber || ''}*`,
        ...data,
      }
      eventPlanPersonList(sendData, '?_pageList').then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
        deleteAllNext(res, this.getList)
        this.multipleSelection = []
        this.$refs.multipleTable.clearSelection()
      })
    },
    sendMessage() {
      if (this.multipleSelection.length < 1) {
        clearpop('请选择要发送信息的对象')
        return
      }
      const sendData = {
        eventId: this.eventDetail.id,
        eventName: this.eventDetail.eventName,
        content: this.content,
        eventReceiverList: this.multipleSelection.map((v) => {
          const { id, name, contactNumber, teamId, teamBussKey, bussKey } = v
          return {
            receiverId: id,
            receiverName: name,
            receiverTelephone: contactNumber,
            receiverType: 0,
            teamId,
            teamBussKey,
            bussKey,
          }
        })
      }
      if (!this.content) {
        clearpop('请输入指令内容', 'error')
        return
      }
      if (this.inviteContent) {
        addEventCall(sendData).then(() => {
          clearpop('发送成功')
          this.closeItem()
        })
      } else {
        addEventInstruct(sendData).then(() => {
          clearpop('发送成功')
          this.closeItem()
        })
      }
    },
    handleSelectionChange (val) {
      this.$set(this, 'multipleSelection', val)
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    searchList () {
      this.getList()
    },
    searchReset () {
      this.formInline = {
        pageNo: 1
      }
      this.searchList()
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
    closeItem(){
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

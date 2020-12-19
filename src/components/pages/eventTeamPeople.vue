<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="选定救援人员" :visible.async="selectTeamPeopleVisible"
               :before-close="close" class="large-dialog">
      <teamPeople :selectTeamDatas="selectTeamDatas" @teamPeopleChange="teamPeopleChange"
                  :isFilter="true">
        <div slot="footer">
          <div style="padding: 5px 15px">
            <span class="label-span">选定人：</span>
            <span v-for="item in teamPeopleList" :key="item.id">
                {{item.name}}
            </span>
          </div>
          <div style="padding: 0 15px;text-align: right">
            <el-button plain @click="close">取消</el-button>
            <el-button type="success" @click="recordDetail">调拨记录</el-button>
            <el-button type="primary" @click="outTeamPeople">划拨人员</el-button>
          </div>
        </div>
      </teamPeople>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="调拨记录" :visible.async="visibleRecord"
               :before-close="()=>{visibleRecord=false}" >
      <el-table border :data="listData" height="calc(100vh - 290px)"
                highlight-current-row
                v-loading="loading" style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column sortable prop="personnelName" align="center" label="人员" min-width="120"></el-table-column>
        <el-table-column sortable prop="teamName" align="center" label="救援队" min-width="120"></el-table-column>
        <el-table-column sortable prop="eventName" align="center" label="事件" min-width="120"></el-table-column>
        <el-table-column sortable prop="eventName" align="center" label="应急事件" min-width="120"></el-table-column>
        <el-table-column sortable prop="allocationName" align="center" label="调拨人名" min-width="160"></el-table-column>
        <el-table-column sortable prop="allocationTime" align="center" label="调拨时间" min-width="160"></el-table-column>
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
      <div class="dialog-footer">
        <el-button plain @click="visibleRecord=false">取消</el-button>
        <el-button type="primary" @click="visibleRecord=false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import {  clearpop } from '@/utils'
import { materialStockOut, addEventPersonnelAllocation, addEventPersonnelList } from '@/axios/api'
import teamPeople from '@/components/pages/teamPeople'

export default {
  props: ['value', 'eventDetail'],
  data () {
    return {
      selectTeamDatas: null,
      selectTeamPeopleVisible: false,
      teamPeopleList: [],
      loading: false,
      listData: [], // 列表
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      visibleRecord: false
    }
  },
  components: {
    teamPeople,
  },
  watch: {
    value: {
      handler(cur) {
        this.selectTeamPeopleVisible = cur
        this.selectTeamDatas = {}
        this.teamPeopleList = []
      },
      deep: true
    }
  },
  created () {

  },
  methods: {
    teamPeopleChange(list) {
      this.teamPeopleList = list
    },
    // 查看调拨记录
    recordDetail() {
      this.getList().then(() => {
        this.visibleRecord = true
      })
    },
    getList() {
      this.loading = true
      let sendData = {
        eventId: this.eventDetail.id,
      }
      return addEventPersonnelList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
      })
    },
    // 划拨
    outTeamPeople() {
      if (!this.teamPeopleList || this.teamPeopleList.length < 1) {
        clearpop('选择划拨人员')
        return
      }
      const sendData = this.teamPeopleList.map((v) => {
        const { id, name, teamId, teamName } = v
          return {
            eventId: this.eventDetail.id,
            eventName: this.eventDetail.eventName,
            personnelId: id,
            personnelName: name,
            teamId,
            teamName
          }
        })
      addEventPersonnelAllocation({list:sendData}).then(() => {
        this.selectTeamDatas = null
        this.teamPeopleList = []
        setTimeout(() => {
          this.close()
        }, 300)
      })
    },
    close() {
      this.$emit('input', false)
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

<style scoped lang="scss">

</style>

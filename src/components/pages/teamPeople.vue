<template>
  <div class="outer-box relative bgf8" style="height: calc(100vh - 220px)">
    <i class="icon-hide-left el-icon-caret-right"
       v-if="!showLeft"  @click="showLeft = true"></i>
    <transition name="slidLeft">
      <div class="left-box relative" v-if="showLeft" style="height: calc(100vh - 220px)">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>队伍</span>
          </div>
          <ul class="tree-ul">
            <!--  <li  @click="selectTreeData('')" :class="{'checked': !formInline.teamId }">全部</li>-->
            <li v-for="item in teamLists" :class="{'checked':item.id === formInline.teamId}"
                :key="item.id" @click="selectTreeData(item)">
              {{item.name}}
            </li>
          </ul>
        </el-card>
        <i class="icon-hide-left el-icon-caret-left" @click="showLeft = false"></i>
      </div>
    </transition>
    <div class="right-box" :class="{'full': !showLeft }">
      <!-- 搜索筛选 -->
      <el-form :inline="true" :model="formInline" class="search-box">
        <el-form-item label="名称">
          <el-input clearable placeholder="请输入名称" :maxlength="20"
                    @keyup.native.enter="getList"
                    v-model.trim="formInline.name"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
      </el-form>
      <!--列表-->
      <div class="content-box">
        <el-table border :data="listData" height="calc(100vh - 380px)" @selection-change="handleSelectionChange"
                  @row-click="rowClick" highlight-current-row ref="multipleTable" row-key="id"
                  v-loading="loading" style="width: 100%;">
          <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column sortable prop="personnelNumber" align="center" label="编号" min-width="120"></el-table-column>
          <el-table-column sortable prop="name" align="center" label="姓名" min-width="100"></el-table-column>
          <el-table-column sortable prop="sex" align="center" label="性别" min-width="80"></el-table-column>
          <el-table-column sortable prop="age" align="center" label="年龄" min-width="80"></el-table-column>
          <el-table-column sortable prop="contactNumber" align="center" label="联系电话" min-width="160"></el-table-column>
          <el-table-column sortable prop="teamName" align="center" label="队伍" min-width="100"></el-table-column>
          <el-table-column sortable prop="address" align="center" label="地址" min-width="120"></el-table-column>
          <el-table-column sortable prop="createTime" align="center" label="创建时间" min-width="160"></el-table-column>
        </el-table>
        <slot name="footer">
          <div class="dialog-footer">
            <el-button type="plain" @click="cancelSelectTeamPeoples">取消</el-button>
            <el-button type="primary" @click="sureSelectTeamPeoples">确认选择</el-button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { registerRescueTeamListAll, registerRescueTeamPeopleListAll, setDictionaryDataList, eventPlanPersonList } from '@/axios/api'

export default {
  props: ['selectTeamDatas', 'isFilter'],
  data () {
    return {
      loading: false,
      formInline: {},
      listData: [], // 列表
      showLeft: true,
      examineStates: ['待审核', '已通过', '未通过'],
      examineClass: ['orange', 'green', 'red'],
      multipleSelection: [],
      teamLists: [],
      selectDatas: {}
    }
  },
  created() {
    this.selectDatas = JSON.parse(JSON.stringify(this.selectTeamDatas))
    this.getAllTeam()
  },
  watch: {
    selectTeamDatas: {
      handler(cur) {
        if (cur === null) {
          this.$refs.multipleTable.clearSelection();
          return;
        }
        this.selectDatas = JSON.parse(JSON.stringify(cur))
        this.getAllTeam()
      },
      deep: true
    }
  },
  methods: {
    getAllTeam() {
      registerRescueTeamListAll({}).then((res) => {
        this.teamLists = res
        if (res && res.length > 0) {
          this.formInline.teamId = res[0].id
          this.formInline.teamName =  res[0].name
          this.getList()
        }
      })
    },
    getList () {
      this.loading = true
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`
      }
      if (this.isFilter) {
        eventPlanPersonList(sendData, '?_filterJoined').then((res) => {
          this._initData(res, sendData)
        })
      }else {
        registerRescueTeamPeopleListAll(sendData).then((res) => {
          this._initData(res, sendData)
        })
      }
    },
    _initData(res, sendData) {
      this.loading = false
      this.listData = res
      this.$nextTick(() => {
        if (!this.selectDatas[sendData.teamId]) {
          res.forEach((v) => {
            this.$refs.multipleTable.toggleRowSelection(v, false)
          })
          return
        }
        const selectId = this.selectDatas[sendData.teamId].map((v) => v.personnelId)
        if (selectId.length < 1) {
          return
        }
        res.forEach((v) => {
          this.$refs.multipleTable.toggleRowSelection(v, selectId.indexOf(v.id) > -1)
        })
      })
    },
    // 选择了树形后
    selectTreeData(item) {
      const { id, name } = item
      this.formInline.teamId = id
      this.formInline.teamName = name
      this.getList()
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      const temp = []
       val.forEach((v) => {
         if (v.teamId === this.formInline.teamId) {
           temp.push({
             personnelName: v.name,
             personnelId: v.id,
             teamId: this.formInline.teamId,
             teamName: this.formInline.teamName,
           })
         }
      })
      this.selectDatas[this.formInline.teamId] = temp
      this.$emit('teamPeopleChange', this.multipleSelection)
    },
    cancelSelectTeamPeoples() {
      this.$emit('sureSelectTeamPeoples', null)
    },
    sureSelectTeamPeoples() {
      this.$emit('sureSelectTeamPeoples', this.selectDatas)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

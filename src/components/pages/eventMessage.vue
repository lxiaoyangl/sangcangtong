<template>
  <div v-show="visible">
    <div v-show="!visibleDetail">
      <div class="tree-bpx-bg" v-if="!type"></div>
      <div class="show" :class="{'fixed-box, tree-box': !type}" style="left: 5%;right: 5%">
        <div :class="{'fixed-container': !type}" style="padding: 0">
          <div class="el-dialog__header" v-if="!type">
            <span class="el-dialog__title">指令信息</span>
            <button type="button" class="el-dialog__headerbtn" @click="closeItem">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </div>
          <!--列表-->
          <div class="content-box">
            <el-table border :data="listData" :height="type ? 'calc(60vh - 70px)' : 'calc(100vh - 265px)'"
                      highlight-current-row class="mt10" ref="multipleTable"
                      v-loading="loading" style="width: 100%;">
              <el-table-column sortable prop="id" align="center" label="ID" min-width="100"></el-table-column>
              <el-table-column sortable prop="content" align="center" label="内容" min-width="120">
                <template slot-scope="scope">
              <span v-if="scope.row.content">
                {{scope.row.content.substring(0,10)}}
              </span>
                </template>
              </el-table-column>
              <el-table-column sortable prop="user" align="center" label="接收人" min-width="130"></el-table-column>
              <el-table-column sortable prop="createTime" align="center" label="发送时间" min-width="160"></el-table-column>
              <el-table-column fixed="right" align="center" label="操作" min-width="160">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click.stop="getDetail(scope.row)">详情</el-button>
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
        </div>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" title="指令详情"
               :append-to-body="true" :visible.sync="visibleDetail">
      <div style="height: 50vh">
        {{detailData.content}}
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { deleteAllNext } from '@/utils'
import { eventInstructList } from '@/axios/api'
export default {
  props: ['value', 'eventId', 'type'],
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
      visibleDetail: false,
      detailData: {}
    }
  },
  watch: {
    value(cur) {
      this.visible = cur
      this.getList()
    },
  },
  created () {

  },
  methods: {
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        eventId: this.eventId,
        ...data,
      }
      eventInstructList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
        deleteAllNext(res, this.getList)
      })
    },
    getDetail(item) {
      this.visibleDetail = true
      this.detailData = item
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
.table-wrap{
  padding: 24px 32px;
  .table{
    width: 100%;
    border-top:1px solid #000000;
    border-left:1px solid #000000;
    table-layout: fixed;
    .checkbox{
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 1px solid #000;
      margin-right: 3px;
      position: relative;
      top:1px;
      &.checked:before{
        content: '√';
        position: absolute;
        left: 1px;
        top:-4px;
       }
    }
  }
  .thead{
    background: #f2f2f2;
    font-weight: 700;
    color: #000;
    font-size: 13px;
    text-align: center;
  }
  .table-title{
    font-size: 28px;
    font-weight: 700;
    text-align:center;
    padding-bottom:8px;
  }
  td{
    font-size: 14px;
    padding: 5px 20px;
    color: #000;
    border-bottom:1px solid #000000;
    border-right:1px solid #000000;
    &.font18{
      font-size: 18px;
    }
  }
  .fontb{
    font-weight: 700;
  }
}
</style>

<template>
  <div v-show="visible">
    <div class="tree-bpx-bg" v-if="!showType && !editFormVisible"></div>
    <div v-show="!editFormVisible" class="show" :class="{'fixed-box, tree-box': !showType}" style="left: 5%;right: 5%">
      <div :class="{'fixed-container': !showType}" style="padding: 0">
        <div class="el-dialog__header" v-if="!showType">
          <span class="el-dialog__title">关联事件</span>
          <button type="button" class="el-dialog__headerbtn" @click="closeItem">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <el-form :inline="true" :model="formInline" class="search-box">
          <el-form-item label="事件名称">
            <el-input clearable placeholder="请输入名称" :maxlength="20"
                      @keyup.native.enter="searchList"
                      v-model.trim="formInline.eventName"></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
        </el-form>
        <!--列表-->
        <div class="content-box">
          <div v-if="!showType">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">添加</el-button>
          </div>
          <el-table border :data="listData" :height="showType ? 'calc(60vh - 135px)' : 'calc(100vh - 340px)'"
                    highlight-current-row :class="{'mt10': !showType}" ref="multipleTable"
                    v-loading="loading" style="width: 100%;">
            <el-table-column sortable prop="id" align="center" label="ID" min-width="100"></el-table-column>
            <el-table-column sortable prop="eventTime" align="center" label="事发时间" min-width="160"></el-table-column>
            <el-table-column sortable prop="eventName" align="center" label="事件名称" min-width="120"></el-table-column>
            <el-table-column sortable prop="eventSource" align="center" label="死/重/中/轻/其" min-width="220">
              <template slot-scope="scope">
                <span class="dred">{{scope.row.death || 0}}</span>
                <span class="dred">/{{scope.row.seriousInjury|| 0}}</span>
                <span class="red">/{{scope.row.moderateWound|| 0}}</span>
                <span class="yellow">/{{scope.row.minorWound|| 0}}</span>
                <span class="clo6">/{{scope.row.otherWound || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable prop="province" align="center" label="事发区域" min-width="180">
              <template slot-scope="scope">
                {{scope.row.province}} {{scope.row.city}} {{scope.row.county}}
              </template>
            </el-table-column>
            <el-table-column sortable prop="detailAddress" align="center" label="事发地址" min-width="180"></el-table-column>
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
    <el-dialog :close-on-click-modal="false" :title="title" :append-to-body="true"
               :visible.sync="editFormVisible">
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="事件名称" prop="eventName">
          <el-input style="max-width:850px" v-model.trim="editForm.eventName" auto-complete="off" :maxlength="50"
                    :disabled="type!=='add'" placeholder="请输入事件名称"></el-input>
        </el-form-item>
        <el-form-item label="事发地址" prop="detailAddress">
          <areas :disabled="type!=='add'" v-model="editForm" class="iblock"></areas>
          <br/>
          <el-input class="input-common iblock mt10" v-model.trim="editForm.detailAddress"
                    auto-complete="off" :maxlength="50" placeholder="详细地址" :disabled="type!=='add'"></el-input>
          <i v-if="editForm.coordinate" class="el-icon-location-information"  @click="showMapPrev"></i>
          <el-button v-else type="primary" @click="showMapPrev">
            {{editForm.coordinate ? '调整坐标': '坐标'}}
          </el-button>
        </el-form-item>
        <el-form-item label1="伤亡人数" prop="death" class="form-item">
          <span class="el-form-item__label">死亡</span>
          <el-input-number :disabled="type!=='add'" :min="0" size="mini"
                           v-model="editForm.death" placeholder="死亡人数"></el-input-number>
          <span class="el-form-item__label">重伤</span>
          <el-input-number :disabled="type!=='add'" :min="0" size="mini"
                           v-model="editForm.seriousInjury" placeholder="重伤人数"></el-input-number>
          <span class="el-form-item__label">中伤</span>
          <el-input-number :disabled="type!=='add'" :min="0" size="mini" v-model="editForm.moderateWound"
                           placeholder="中伤人数"></el-input-number><br/>
          <span class="el-form-item__label">轻伤</span>
          <el-input-number :disabled="type!=='add'" :min="0" size="mini" v-model="editForm.minorWound"
                           placeholder="人数"></el-input-number>
          <span class="el-form-item__label">其他</span>
          <el-input-number :disabled="type!=='add'" :min="0" size="mini" v-model="editForm.otherWound"
                           placeholder="其他人数"></el-input-number>
        </el-form-item>
        <el-form-item label="事件等级" prop="eventLevelCode">
          <el-select :disabled="type!=='add'" clearable  class="input-common"
                     @change="getChangeEventLevel"
                     v-model="editForm.eventLevelCode" placeholder="请选择">
            <el-option v-for="item in eventLevels" :key="item.keyValue"
                       :label="item.labels" :value="item.keyValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事发时间" prop="eventTime">
          <el-date-picker class="input-common" v-model="editForm.eventTime" type="datetime"
                          :disabled="type!=='add'" :picker-options="pickerOptions"
                          value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择事发时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="事件来源" prop="eventSourceId">
          <el-select :disabled="type!=='add'" clearable  class="input-common"
                     @change="getChangeEventSource"
                     v-model="editForm.eventSourceId" placeholder="请选择">
            <el-option v-for="item in eventSources" :key="item.keyValue"
                       :label="item.labels" :value="item.keyValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件详情" prop="eventContent">
          <wangEditor v-model="editForm.eventContent" :disabled="type!=='add'"></wangEditor>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button plain @click="editFormVisible=false">取消</el-button>
        <el-button type="primary" v-if="type=='add'"
                   @click="addList('editForm')">保存
        </el-button>
        <el-button type="primary" v-if="type=='detail'"
                   @click="editFormVisible=false">确定
        </el-button>
      </div>
    </el-dialog>
    <mapPoint v-model="showMap" :addressData="addressData" @submitPoint="submitPoint"></mapPoint>
  </div>
</template>
<script type="text/ecmascript-6">
import areas from '@/components/areas'
import mapPoint from '@/components/mapPoint'
import wangEditor from '@/components/wangEditor'
import { clearpop } from '@/utils'
import { eventEventsLinkList, eventEventsLinkAdd, setDictionaryDataList } from '@/axios/api'
export default {
  props: ['value', 'eventDetail', 'showType'],
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
      editFormVisible: false,
      editForm: {},
      title: '新增关联事件',
      type: 'detail',
      rules: {
        eventName: [{required: true, message: '请输入事件名称', trigger: 'blur'}],
      },
      showMap: false,
      addressData: {},
      eventLevels: [],
      eventSources: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
    }
  },
  watch: {
    value(cur) {
      this.visible = cur
      this.getList()
    },
  },
  components: {
    areas,
    mapPoint,
    wangEditor,
  },
  created () {
    this.getSelects()
  },
  methods: {
    getList () {
      this.loading = true
      let sendData = {
        ...this.formInline,
        ownerId: this.eventDetail.id,
        eventName: `*${this.formInline.eventName || ''}*`,
      }
      eventEventsLinkList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
      })
    },
    getSelects() {
      setDictionaryDataList({
        dictionaryType: 'sys_event_level'
      }).then((res) => {
        this.eventLevels = res
      })
      setDictionaryDataList({
        dictionaryType: 'sys_event_source'
      }).then((res) => {
        this.eventSources = res
      })
    },
    getDetail(item) {
      this.editForm = item
      this.title = '事件详情'
      this.type = 'detail'
      this.editFormVisible = true
    },
    addPrev() {
      this.editForm = {
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        county: '',
        countyCode: '',
        township: '',
        townshipCode: '',
        death: 0,
        moderateWound: 0,
        minorWound: 0,
        otherWound: 0,
        seriousInjury: 0,
      }
      this.type = 'add'
      this.editFormVisible = true
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
    getChangeEventLevel(data) {
      const temp =  this.eventLevels.filter(v => data === v.keyValue)
      if (temp && temp.length > 0){
        this.editForm.eventLevel = temp[0].labels
      }
    },
    getChangeEventSource(data) {
      const temp =  this.eventSources.filter(v => data === v.keyValue)
      if (temp && temp.length > 0){
        this.editForm.eventSource = temp[0].labels
      }
    },
    // 确认添加
    addList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          this.loading = true
          let sendData = {
            ...this.editForm,
            ownerId: this.eventDetail.id,
            ownerName: this.eventDetail.eventName,
          }
          if (!sendData.coordinate) {
            clearpop('请选择坐标！', 'error')
            return
          }
         eventEventsLinkAdd(sendData).then(() => {
            this.editFormVisible = false
            this.getList()
          })
        }
      })
    },
    showMapPrev() {
      const { province, city, detailAddress, coordinate} = this.editForm
      this.addressData = {
        province,
        city,
        detailAddress,
        coordinate
      }
      this.showMap = true
    },
    submitPoint(point) {
      this.editForm.coordinate = point
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
.form-item{
  /deep/ .el-form-item__content {
    margin-left: 20px !important;
    }
  /deep/ .el-form-item__label{
    float: none!important;
    margin-left: 15px;
  }
}
</style>

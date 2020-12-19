<template>
  <div v-show="visible">
    <div class="tree-bpx-bg" v-if="!type"></div>
    <div class="show" :class="{'fixed-box, tree-box': !type}" style="left: 5%;right: 5%">
      <div :class="{'fixed-container': !type}" style="padding: 0">
        <div class="el-dialog__header" v-if="!type">
          <span class="el-dialog__title">病人详情</span>
          <button type="button" class="el-dialog__headerbtn" @click="closeItem">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="formInline" class="search-box">
          <el-form-item label="姓名">
            <el-input clearable placeholder="姓名" :maxlength="20"
                      @keyup.native.enter="searchList"
                      v-model.trim="formInline.name"></el-input>
          </el-form-item>
          <el-form-item label="伤情">
            <el-select clearable v-model="formInline.classification"
                       @change="searchList" placeholder="请选择">
              <el-option v-for="(item,index) in classifications" :key="index"
                         :label="item" :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
        </el-form>
        <!--列表-->
        <div class="content-box">
          <el-table border :data="listData" :height="type ? 'calc(50vh - 70px)' : 'calc(100vh - 265px)'"
                    highlight-current-row
                    ref="multipleTable" v-loading="loading" style="width: 100%;">
            <el-table-column sortable prop="id" align="center" label="ID" min-width="100"></el-table-column>
            <el-table-column sortable prop="name" align="center" label="姓名" min-width="120"></el-table-column>
            <el-table-column sortable prop="age" align="center" label="年龄" min-width="100"></el-table-column>
            <el-table-column sortable prop="judgement" align="center" label="初步判断" min-width="130"></el-table-column>
            <el-table-column sortable prop="classification" align="center" label="病情" min-width="100">
              <template slot-scope="scope">
                {{classifications[scope.row.classification]}}
              </template>
            </el-table-column>
            <el-table-column sortable prop="hospitalName" align="center" label="医院名称" min-width="130"></el-table-column>
            <el-table-column sortable prop="alarmTime" align="center" label="接警时间" min-width="180"></el-table-column>
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
    <el-dialog :close-on-click-modal="false" title="病人详情" :visible.sync="visibleDetail"
               :append-to-body="true" class="large-dialog">
      <div class="table-wrap">
        <div class="table-title">四川省院前急救病情记录</div>
        <table class="table" cellpadding="0" cellspacing="0">
          <tbody>
          <tr>
            <td colspan="3" class="thead">第一部分：基础信息及初次评估</td>
          </tr>
          <tr>
            <td class="font18">
              <span class="fontb">姓名：</span>{{detailData.name}}
            </td>
            <td class="font18">
              <span class="fontb">性别：</span>{{detailData.sex}}
            </td>
            <td class="font18">
              <span class="fontb">年龄：</span>{{detailData.age}}
            </td>
          </tr>
          <tr>
            <td colspan="2"><span class="fontb">出诊地址：</span>{{detailData.visitingAddress}}</td>
            <td>
              <span class="fontb">联系电话：</span>{{detailData.telephone}}
            </td>
          </tr>
          <tr>
            <td colspan="2"><span class="fontb">接警时间：</span>{{detailData.alarmTime}}</td>
            <td>
              <span class="fontb">出发时间：</span>{{detailData.outTime}}
            </td>
          </tr>
          <tr>
            <td colspan="2"><span class="fontb">到达时间：</span>{{detailData.arriveTime}}</td>
            <td>
              <span class="fontb">离开时间：</span>{{detailData.leaveTime}}
            </td>
          </tr>
          <tr>
            <td colspan="2"><span class="fontb">返院时间：</span>{{detailData.returnTime}}</td>
            <td>
              <span class="fontb">病史提供人：</span>{{detailData.provider}}
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span class="fontb">生命体征：BP：</span>{{ detailData.signsBp}}/mmHg
              <span class="fontb">R：</span>{{ detailData.signsP}}次/分
              <span class="fontb">P：</span>{{ detailData.signsR}}次/分
              <span class="fontb">T：</span>{{ detailData.signsT}}ºC
              <span class="fontb">SOP2：</span>{{ detailData.signsSp}}%
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div>
                <span class="fontb">瞳孔：左/右</span> {{detailData.pupilL}}/{{detailData.pupilR}} mmHg
                <span class="fontb ml10">对光反射</span>
                <span class="checkbox ml10" :class="{'checked':  detailData.launch === 0}"></span>正常
                <span class="checkbox ml10" :class="{'checked':  detailData.launch === 1}"></span>迟钝
                <span class="checkbox ml10" :class="{'checked':  detailData.launch === 2}"></span>消失
                <span class="checkbox ml10" :class="{'checked':  detailData.launch === 3}"></span>其他
              </div>
              <div>
                <span class="fontb">呼吸状况</span>
                <span class="checkbox ml10" :class="{'checked':  detailData.breathing === 0}"></span>呼吸性胸痛
                <span class="checkbox ml10" :class="{'checked':  detailData.breathing === 1}"></span>反常
                <span class="checkbox ml10" :class="{'checked':  detailData.breathing === 2}"></span>困难
                <span class="checkbox ml10" :class="{'checked':  detailData.breathing === 3}"></span>窒息
                <span class="checkbox ml10" :class="{'checked':  detailData.breathing === 4}"></span>停止
                <span class="checkbox ml10" :class="{'checked':  detailData.breathing === 5}"></span>正常
                <span class="checkbox ml10" :class="{'checked':  detailData.breathing === 6}"></span>其他
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span class="fontb">神识/意识：</span>
              <span class="checkbox ml10" :class="{'checked':  detailData.mind === 0}"></span>清醒
              <span class="checkbox ml10" :class="{'checked':  detailData.mind === 1}"></span>嗜睡
              <span class="checkbox ml10" :class="{'checked':  detailData.mind === 2}"></span>昏睡
              <span class="checkbox ml10" :class="{'checked':  detailData.mind === 3}"></span>浅昏迷
              <span class="checkbox ml10" :class="{'checked':  detailData.mind === 4}"></span>深昏迷
              <span class="checkbox ml10" :class="{'checked':  detailData.mind === 5}"></span>其他
              <span class="fontb">评分：</span> MEWS:{{detailData.mews}} T1:{{detailData.t1}}
            </td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2">
              <span class="fontb">初步判读：</span>
              {{detailData.judgement}}
            </td>
            <td>
              <span class="fontb">病情分类：</span>
              <span class="checkbox ml10" :class="{'checked':detailData.classification === 0}"></span>轻
              <span class="checkbox ml10" :class="{'checked':detailData.classification === 1}"></span>中
              <span class="checkbox ml10" :class="{'checked':detailData.classification === 2}"></span>重
              <span class="checkbox ml10" :class="{'checked':detailData.classification === 3}"></span>死亡
            </td>
          </tr>
          <tr>
            <td>
              <span class="fontb">初步分科：</span>
              <span class="checkbox ml10" :class="{'checked':detailData.branch === 0}"></span>外
              <span class="checkbox ml10" :class="{'checked':detailData.branch === 1}"></span>内
              <span class="checkbox ml10" :class="{'checked':detailData.branch === 2}"></span>妇产
              <span class="checkbox ml10" :class="{'checked':detailData.branch === 3}"></span>儿
              <span class="checkbox ml10" :class="{'checked':detailData.branch === 4}"></span>眼
              <span class="checkbox ml10" :class="{'checked':detailData.branch === 5}"></span>五官
              <span class="checkbox ml10" :class="{'checked':detailData.branch === 6}"></span>颈面
              <span class="checkbox ml10" :class="{'checked':detailData.branch === 7}"></span>其他
            </td>
          </tr>
          <tr>
            <td colspan="3" class="thead">第二部分：院前急救诊疗部分</td>
          </tr>
          <tr>
            <td colspan="3">
              <el-row :gutter="120">
                <el-col :span="12">
                  <span class="fontb">过敏史：</span>
                  <span class="checkbox ml10" :class="{'checked':detailData.allergy === 0}"></span>不详
                  <span class="checkbox ml10" :class="{'checked':detailData.allergy === 1}"></span>有
                  <span class="checkbox ml10" :class="{'checked':detailData.allergy === 2}"></span>无
                </el-col>
                <el-col :span="12">
                  <span class="fontb">心脏病史：</span>
                  <span class="checkbox ml10" :class="{'checked':detailData.heartDisease === 0}"></span>不详
                  <span class="checkbox ml10" :class="{'checked':detailData.heartDisease === 1}"></span>有
                  <span class="checkbox ml10" :class="{'checked':detailData.heartDisease === 2}"></span>无
                </el-col>
              </el-row>
              <el-row :gutter="120">
                <el-col :span="12">
                  <span class="fontb">高血压史：</span>
                  <span class="checkbox ml10" :class="{'checked':detailData.hypertension === 0}"></span>不详
                  <span class="checkbox ml10" :class="{'checked':detailData.hypertension === 1}"></span>有
                  <span class="checkbox ml10" :class="{'checked':detailData.hypertension === 2}"></span>无
                </el-col>
                <el-col :span="12">
                  <span class="fontb">糖尿病史：</span>
                  <span class="checkbox ml10" :class="{'checked':detailData.diabetes === 0}"></span>不详
                  <span class="checkbox ml10" :class="{'checked':detailData.diabetes === 1}"></span>有
                  <span class="checkbox ml10" :class="{'checked':detailData.diabetes === 2}"></span>无
                </el-col>
              </el-row>
              <span class="fontb">其他基础疾病：</span>
              <span class="checkbox ml10" :class="{'checked':detailData.otherDisease === 0}"></span>不详
              <span class="checkbox ml10" :class="{'checked':detailData.otherDisease === 1}"></span>有
              <span class="checkbox ml10" :class="{'checked':detailData.otherDisease === 2}"></span>无
            </td>
          </tr>
          <tr>
            <td colspan="3" class="thead">第三部分：转归情况</td>
          </tr>
          <tr>
            <td colspan="2">
              <div class="fontb">*重要阳性体征及处置：</div>
              <div><span class="fontb">主诉：</span>{{detailData.complaint}}</div>
              <div><span class="fontb">现病史：</span>{{detailData.presentIllness}}</div>
              <div><span class="fontb">体格检查：</span>{{detailData.examination}}</div>
              <div class="fontb">急救药品：</div>
              <el-row :gutter="12">
                <el-col :span="8">时间</el-col>
                <el-col :span="8">给药方式</el-col>
                <el-col :span="8">药品及剂量</el-col>
                <el-col :span="8">组别</el-col>
              </el-row>
              <div class="fontb">运转途中：</div>{{detailData.transport}}
              <div class="fontb">病情：</div>{{detailData.patientCondition}}
            </td>
            <td>
              <div class="fontb">急救科目：</div>{{detailData.aidSubjects}}
              <div class="fontb">运转方式：</div>{{detailData.transferMode}}
              <div class="fontb">专科支持：</div>{{detailData.specialistSupport}}
              <div class="fontb">后续检查：</div>{{detailData.followCheck}}
              <div class="fontb">院内准备：</div>{{detailData.getReady}}
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span class="fontb">转归去向：</span>
              <span class="checkbox ml10" :class="{'checked':detailData.whereabouts === 0}"></span>现场死亡
              <span class="checkbox ml10" :class="{'checked':detailData.whereabouts === 1}"></span>送回本院
              <span class="checkbox ml10" :class="{'checked':detailData.whereabouts === 2}"></span>转往他院
              <span class="checkbox ml10" :class="{'checked':detailData.whereabouts === 3}"></span>拒绝送院
              <span class="checkbox ml10" :class="{'checked':detailData.whereabouts === 4}"></span>其他
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span class="fontb">急救效果：</span>
              <span class="checkbox ml10" :class="{'checked':detailData.aidEffect === 0}"></span>有效
              <span class="checkbox ml10" :class="{'checked':detailData.aidEffect === 1}"></span>无变化
              <span class="checkbox ml10" :class="{'checked':detailData.aidEffect === 2}"></span>病情加重
              <span class="checkbox ml10" :class="{'checked':detailData.aidEffect === 3}"></span>现场死亡
              <span class="checkbox ml10" :class="{'checked':detailData.aidEffect === 4}"></span>途中死亡
              <span class="checkbox ml10" :class="{'checked':detailData.aidEffect === 5}"></span>其他
            </td>
          </tr>
          <tr>
            <td colspan="3" class="thead">第四部分：交接情况</td>
          </tr>
          <tr>
            <td colspan="3">
              <div>
                <span class="fontb">BP：</span>{{ detailData.handoverBp}}/mmHg
                <span class="fontb">R：</span>{{ detailData.handoverR}}次/分
                <span class="fontb">P：</span>{{ detailData.handoverP}}次/分
                <span class="fontb">T：</span>{{ detailData.handoverT}}ºC
                <span class="fontb">SOP2：</span>{{ detailData.handoverSp}}%
              </div>
              <div>
                <span class="fontb">呼吸状况</span>
                <span class="checkbox ml10" :class="{'checked':  detailData.hBreathing === 0}"></span>呼吸性胸痛
                <span class="checkbox ml10" :class="{'checked':  detailData.hBreathing === 1}"></span>反常
                <span class="checkbox ml10" :class="{'checked':  detailData.hBreathing === 2}"></span>困难
                <span class="checkbox ml10" :class="{'checked':  detailData.hBreathing === 3}"></span>窒息
                <span class="checkbox ml10" :class="{'checked':  detailData.hBreathing === 4}"></span>停止
                <span class="checkbox ml10" :class="{'checked':  detailData.hBreathing === 5}"></span>正常
                <span class="checkbox ml10" :class="{'checked':  detailData.hBreathing === 6}"></span>其他
              </div>
              <div>
                <span class="fontb">神识/意识：</span>
                <span class="checkbox ml10" :class="{'checked':  detailData.hMind === 0}"></span>清醒
                <span class="checkbox ml10" :class="{'checked':  detailData.hMind === 1}"></span>嗜睡
                <span class="checkbox ml10" :class="{'checked':  detailData.hMind === 2}"></span>昏睡
                <span class="checkbox ml10" :class="{'checked':  detailData.hMind === 3}"></span>浅昏迷
                <span class="checkbox ml10" :class="{'checked':  detailData.hMind === 4}"></span>深昏迷
                <span class="checkbox ml10" :class="{'checked':  detailData.hMind === 5}"></span>其他
              </div>
            </td>
          </tr>
          <tr>
            <td>出诊医师签名：{{detailData.physician}}</td>
            <td>出诊护士签名：{{detailData.nurse}}</td>
            <td>
              接诊医生或护士签名：{{detailData.autograph}}<br/>
              交接时间：{{detailData.handoverTime}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { deleteAllNext } from '@/utils'
import { eventPatientList, eventPatientDetail } from '@/axios/api'
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
      classifications: ['轻','中', '重 ','死亡'],
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
        name: `*${this.formInline.name || ''}*`,
        ...data,
      }
      eventPatientList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
        deleteAllNext(res, this.getList)
      })
    },
    getDetail(item) {
      eventPatientDetail({ id: item.id }).then((res) => {
        this.visibleDetail = true
        this.detailData = res
      })
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

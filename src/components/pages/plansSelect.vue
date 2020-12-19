<template>
  <div class="outer-box relative bgf8"  style=" height: calc(100vh - 145px)">
    <i class="icon-hide-left el-icon-caret-right"
       v-if="!showLeft"  @click="showLeft = true"></i>
    <transition name="slidLeft">
      <div class="left-box relative" v-if="showLeft" style=" height: calc(100vh - 145px)">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>预案目录</span>
          </div>
          <div>
            <el-tree highlight-current default-expand-all :expand-on-click-node="false"
                     :current-node-key="0" node-key="treeCode" ref="tree" :indent="2"
                     :data="treeDatas" :props="treeProps" @node-click="handleTreeClick"></el-tree>
          </div>
        </el-card>
        <i class="icon-hide-left el-icon-caret-left" @click="showLeft = false"></i>
      </div>
    </transition>
    <div class="right-box" :class="{'full': !showLeft }">
      <!--列表-->
      <div class="content-box">
        <div class="content-list">
         <!-- <el-form :inline="true" :model="formInline" class="search-box">
            <el-form-item label="">
              <el-input clearable :maxlength="50" placeholder="请输入预案名称"
                        @keyup.native.enter="searchList"
                        v-model.trim="formInline.name"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search fixed-right" @click="searchList">搜索</el-button>
          </el-form>-->
          <ul class="tree-ul">
            <li v-for="item in listData" :key="item.id" :class="{'checked':item.id===currentPlanId}"
                @click="getDetail(item.id)">{{item.name}}</li>
          </ul>
        </div>
        <div class="content-detail">
          <div class="wrap">
            <dl class="detail-dl">
              <dd class="label">预案名称</dd>
              <dt class="desc">{{planDetail.name}}</dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">预案目录</dd>
              <dt class="desc">{{planDetail.catalog}}</dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">预案分类</dd>
              <dt class="desc">{{planDetail.planType}}</dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">事故等级</dd>
              <dt class="desc">  {{planDetail.accidentGrade}}</dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">伤亡人数</dd>
              <dt class="desc">{{casualtiesNumbers[planDetail.casualtiesNumber]}}</dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">预案标签</dd>
              <dt class="desc">
                <el-button type="danger" size="mini" v-for="item in planDetail.planLabelList" :key="item.keyValue">
                  {{item.labelName}}
                </el-button>
              </dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">预案版本</dd>
              <dt class="desc">{{planDetail.planVersion}}</dt>
            </dl>
            <ul v-if="planStepVOList && planStepVOList.length>0" style="margin-top: 20px">
              <li class="command-step-wrap" v-for="(e, index) in planStepVOList" :key="e.id">
                <div class="command-step">
                  <span class="theme">第{{e.stepNumber}}步</span>
                </div>
                <dl class="detail-dl">
                  <dd class="label">应急内容</dd>
                  <dt class="desc">{{e.planContent}}</dt>
                </dl>
                <dl class="detail-dl">
                  <dd class="label">注意事项</dd>
                  <dt class="desc">{{e.matter}}</dt>
                </dl>
              </li>
            </ul>
            <div class="center mt10 clo6" v-else>
              暂无预案步骤
            </div>
          </div>
          <div class="dialog-footer" v-if="planStepVOList && planStepVOList.length>0">
            <el-button type="plain" @click="cancelSelect">取消</el-button>
            <el-button type="primary" @click="sureSelect">选择</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { sureDelete, getChangeData, state, toTreePackage, deleteAllNext } from '@/utils'
import { plansListAll, planCatalogBaseTree, plansDetail, setDictionaryDataList } from '@/axios/api'

export default {
  props: ['catalogId', 'planId'],
  data () {
    return {
      formInline: {
        planState : ''
      },
      listData: [], // 列表
      states: state,
      treeDatas: [],
      treeProps: {
        children: 'children',
        label: 'name'
      },
      showLeft: true,
      accidentGrades: ['一般事故-（I）', '严重事故-（II）','重大事故-（III）','特大事故-（IV）'],
      casualtiesNumbers:['0~3人','4~6人','7人以上'],
      examineStates:['待审核', '已通过','未通过'],
      planTypes:['上报预案' ,'处理预案'],
      planStepVOList: [],
      currentPlanId: '',
      currentPlanName: '',
      planDetail: {}
    }
  },
  created () {
    this.getTreeDatas()
    this.getSelects()
    this.formInline.catalogId = this.catalogId || ''
    this.getList()
  },
  watch: {
    planId(cur) {
      if (cur) {
        this.formInline.catalogId = this.catalogId || ''
        this.getList()
      }
    }
  },
  methods: {
    getList () {
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`,
      }
      plansListAll(sendData).then((res) => {
        this.currentPlanId = this.planId
        this.getDetail(this.planId)
        this.listData = res
      })
    },
    getDetail(id) {
      plansDetail({id}).then((res) => {
        this.planDetail = res
        this.planStepVOList = res.planStepVOList
        this.currentPlanId = id
        this.currentPlanName = res.name
      })
    },
    getTreeDatas() {
      planCatalogBaseTree({}).then((res) => {
        this.treeDatas = toTreePackage(res)
      })
    },
    getSelects() {
      let sendData = {
        dictionaryType: 'sys_event_keyword',
      }
      setDictionaryDataList(sendData).then((res) => {
        this.keyWords = res
      })
    },
    handleTreeClick(data) {
      const { treeCode } = data
      this.formInline.catalogId = treeCode
      this.getList()
    },
    searchList () {
      this.getList()
    },
    sureSelect() {
      this.$emit('changePlanStep', this.planStepVOList)
      this.$emit('changeCurrentPlanId', {
        id: this.currentPlanId,
        name: this.currentPlanName
      })
    },
    cancelSelect() {
      this.$emit('changePlanStep', null)
    }
  }
}
</script>

<style scoped lang="scss">
  .content-list,
  .content-detail{
    height: calc(100vh - 172px);
    overflow: hidden;
    .wrap{
      padding: 15px 20px;
      height: calc(100vh - 255px);
      overflow: auto;
    }
  }
  .content-box{
    display: flex;
    .content-list{
      flex:2;
      min-width: 180px;
      border-right: 1px solid #f8f8f8;
    }
    .content-detail{
      flex: 8;
    }
  }
  .tree-ul{
    li{
      padding: 10px 15px;
    }
  }
  /deep/ .el-form-item{
    margin-bottom: 0;
  }
</style>

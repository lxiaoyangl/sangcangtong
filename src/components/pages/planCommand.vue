<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="执行预案" :visible.sync="visible"
               :before-close="closeItem">
      <div class="el-dialog__content" style="margin-top: -20px">
        <el-radio-group v-model="checkedIndex">
          <div class="command-step-wrap" v-for="(item, index) in stepLists" :key="item.id">
            <div class="command-step">
              <el-radio v-if="activeStep === index" :disabled="item.stepState === 1" :label="index"></el-radio>
              <span class="theme">第{{item.stepNumber}}步</span>
              <span class="ml10 green el-icon-circle-check" v-if="item.stepState">已执行</span>
              <span class="ml10 clo6 el-icon-stopwatch" v-else>待执行</span>
            <span class="fright">
              <el-button size="mini" :disabled="item.stepState === 1"
                         type="danger" @click="addTeamListPrev(item, index)">人力</el-button>
              <el-button size="mini" :disabled="item.stepState === 1"
                         type="primary" @click="addMaterialPrev(item, index)">物资</el-button>
              <!--<el-button size="mini" class="el-icon-delete" type="info" @click="deleteStep(index)">删除</el-button>-->
            </span>
            </div>
            <dl class="detail-dl">
              <dd class="label">应急内容</dd>
              <dt class="desc">
                <el-input type="textarea" :rows="2" placeholder="请输入应急内容"
                          :disabled="item.stepState === 1" :maxlength="400" v-model="item.planContent"></el-input>
              </dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">注意事项</dd>
              <dt class="desc">
                <el-input type="textarea" :rows="2" placeholder="请输入注意事项"
                          :disabled="item.stepState === 1" :maxlength="400" v-model="item.matter"></el-input>
              </dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">救援队</dd>
              <dt class="desc" v-if="item.eventRescuePersonnelList">
              <div v-for="(people,key,index) in item.eventRescuePersonnelList" :key="people[0].teamId + people[0].personnelId + index">
                <div>
                  {{people[0].teamName}} <span class="clo6">({{people.length}}人)</span>
                </div>
               <span v-for="p in people">
                 {{p.personnelName}}
               </span>
              </div>
              </dt>
            </dl>
            <dl class="detail-dl">
              <dd class="label">物资</dd>
              <dt class="desc" v-if="item.eventMaterialList">
              <div v-for="(material,key,index) in item.eventMaterialList" :key="material[0].id+index">
                <div>{{material[0].catalogName}}</div>
                    <span v-for="m in material">
                      {{m.materialName}}-{{m.demandNumber}}件
                    </span>
              </div>
              </dt>
            </dl>
          </div>
        </el-radio-group>

      </div>
      <div class="dialog-footer">
      <!--  <el-button class="fleft" type="primary" @click="addStep">添加步骤</el-button>-->
        <el-button type="plain" @click="closeItem">取消</el-button>
        <el-button type="primary" v-if="checkedIndex <= activeStep && activeStep < stepLists.length" @click="commandPlanList">执行</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="选定救援人员" :visible.sync="selectTeamVisible"
               :before-close="()=>{selectTeamVisible = false}" class="large-dialog">
      <teamPeople @sureSelectTeamPeoples="sureSelectTeamPeoples" :selectTeamDatas="selectTeamDatas"></teamPeople>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="选定物资" :visible.sync="selectMaterialVisible"
               :before-close="()=>{selectMaterialVisible=false}" class="large-dialog">
      <materialData  :selectMaterialDatas="selectMaterialDatas" @sureSelectMaterial="sureSelectMaterial" ></materialData>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import teamPeople from '@/components/pages/teamPeople'
import materialData from '@/components/pages/materialData'
import { sureDelete, clearpop } from '@/utils'
import { execEventPlanStep, editEventPlanStep } from '@/axios/api'
export default {
  props: ['value', 'stepDetails', 'activeStep'],
  components: {
    teamPeople,
    materialData
  },
  data () {
    return {
      visible: false,
      selectTeamVisible: false,
      selectTeamDatas: [],
      selectMaterialVisible: false,
      selectMaterialDatas: [],
      stepLists: [],
      tempIndex: '',
      checkedIndex: ''
    }
  },
  created () {

  },
  watch: {
    value (cur) {
      this.visible = cur
      if (cur) {
        this.stepLists = JSON.parse(JSON.stringify(this.stepDetails))
        this.checkedIndex = this.activeStep
      }
    }
  },
  methods: {
    commandPlanList () {
      if (this.checkedIndex === '' || this.checkedIndex === undefined) {
        clearpop('请选择要执行的步骤')
        return
      }
      sureDelete(() => {
        const sendData = this._getChangeData()
        editEventPlanStep(sendData).then(() => {
          execEventPlanStep({ id: sendData.id }).then(() => {
            clearpop('执行成功', 'success')
            this.$emit('exeCommand', true)
          })
        })
      })
    },
    _getChangeData () {
      const obj = JSON.parse(JSON.stringify(this.stepLists[this.checkedIndex]))
      return {
        ...obj,
        eventMaterialList: this._objToArray(obj.eventMaterialList || {}),
        eventRescuePersonnelList: this._objToArray(obj.eventRescuePersonnelList || {})
      }
    },
    _objToArray (obj) {
      let temp = []
      for (var key in obj) {
        temp = temp.concat(obj[key])
      }
      return temp
    },
    addStep () {
      // eventMaterialList eventRescuePersonnelList
      this.stepLists.push({
        stepNumber: this.stepLists.length + 1
      })
    },
    addTeamListPrev (item, index) {
      this.tempIndex = index
      this.selectTeamDatas = JSON.parse(JSON.stringify(item.eventRescuePersonnelList || {}))
      this.selectTeamVisible = true
    },
    addMaterialPrev (item, index) {
      this.tempIndex = index
      this.selectMaterialDatas = JSON.parse(JSON.stringify(item.eventMaterialList || {}))
      this.selectMaterialVisible = true
    },
    sureSelectTeamPeoples (list) {
      if (!list || list === null) {
        this.selectTeamVisible = false
        return
      }
      // console.log(list)
      this.$set(this.stepLists[this.tempIndex], 'eventRescuePersonnelList', list)
      this.selectTeamVisible = false
    },
    sureSelectMaterial (list) {
      if (!list || list === null) {
        this.selectMaterialVisible = false
        return
      }
      this.$set(this.stepLists[this.tempIndex], 'eventMaterialList', list)
      this.selectMaterialVisible = false
    },
    deleteStep (index) {
      this.stepLists.splice(index, 1)
    },
    closeItem () {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="scss">
  /deep/ .el-radio-group{
    display: block;
  }
/deep/ .command-step-wrap{
  padding-right: 10px;
  /deep/ .el-radio__label{
    display: none;
  }
  /deep/ .el-radio{
    margin-right: 0;
  }
}
  .desc {
    /deep/ .el-textarea__inner{
      padding:0 5px;
      color: #222;
      font-size: 14px;
      line-height: 1.3;
      border-color: #e1e1e1;
    }
  }

</style>

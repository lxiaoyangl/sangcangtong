<template>
  <div>
    <div class="fixed-box" v-if="value">
      <RoleUserCommon :roleId="curRoleId" :type="1" :updateStateList="updateStateList"
                      @emitUpdateStateList="emitUpdateStateList"
                      @closePage="closePage" @addPrev="addPrev"></RoleUserCommon>
      <div v-show="editFormVisible" class="glyh">
        <el-dialog :close-on-click-modal="false"  title="关联用户" :visible.sync="editFormVisible" @click="closeDiolag" width="800px">
          <RoleUserCommon :roleId="curRoleId" :type="2" :updateStateList="updateStateList"
                          @handleSelectionChange="handleSelectionChange"></RoleUserCommon>
          <div class="dialog-footer">
            <el-button plain @click="closeDiolag">取消</el-button>
            <el-button type="primary" @click="addList">确认添加</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import RoleUserCommon from '@/components/pages/roleUserCommon'
import { setRoleUserBatchAdd } from '@/axios/api'

export default {
  props: {
    value: Boolean,
    roleId: Number
  },
  data () {
    return {
      curRoleId: 0,
      multipleSelection: [],
      editFormVisible: false,
      updateStateList: false
    }
  },
  components: {
    RoleUserCommon
  },
  created () {

  },
  watch: {
    roleId (roleId) {
      if (!this.value) {
        return
      }
      this.curRoleId = roleId
    }
  },
  methods: {
    // 添加之前
    addPrev () {
      this.editFormVisible = true
    },
    // 确认添加
    addList () {
      const sendData = {
        list: this.multipleSelection.map((v) => {
          return {
            roleId: this.curRoleId,
            userId: v.id
          }
        })
      }
      setRoleUserBatchAdd(sendData).then(() => {
        this.editFormVisible = false
        this.updateStateList = true
      })
    },
    emitUpdateStateList () {
      this.updateStateList = false
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    closeDiolag () {
      this.editFormVisible = false
    },
    closePage (boolean) {
      this.$emit('input', boolean)
    }
  }
}
</script>

<style scoped>

</style>

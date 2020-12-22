<template>
  <el-dialog
  title="分配资源权限"
  :visible.sync="value"
  width="650px"
  :before-close="close"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  class="menuConfigDialog">
    <div class="menuConfig">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="系统名称">
              <el-select v-model="formInline.sysCode" placeholder="请选择系统" @change="getAllMenus">
                <el-option v-for="item in systemType" :key="item.value"
                          :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="treeData">
            <el-tree
              :data="allMenus"
              show-checkbox
              node-key="treeCode"
              :indent="5"
              default-expand-all
              :expand-on-click-node="false"
              ref="tree"
              :three_state="false"
              :props="treeProps"
              class="checkbox-tree"
              check-strictly>
            </el-tree>
          </div>
        </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="sureSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { toTreePackage } from '@/utils'
import { setMenuBaseTree, setRoleMenuList, setRoleMenuBatchEdit } from '@/plugins/api'

export default {
  props: {
    value: Boolean,
    roleId: Number
  },
  data () {
    return {
      treeProps: {
        children: 'children',
        label: 'name'
      },
      allMenus: [],
      allMenuss: [],
      checkedMenus: [],
      curRoleId: this.roleId,
      systemType: [{label: '协同后台管理系统', value: 0}, {label: '协同用户端管理系统', value: 1}],
      formInline: {
        sysCode: 0
      }
    }
  },
  created () {
    // this.$nextTick(() => {
    //   this.getAllMenus()
    // })
  },
  watch: {
    roleId (roleId) {
      if (!this.value) {
        return
      }
      this.curRoleId = roleId
      // this.getRoleMenus(roleId)
      this.getAllMenus()
    }
  },
  methods: {
    getAllMenus () {
      setMenuBaseTree({...this.formInline}).then((res) => {
        this.allMenuss = toTreePackage(res)
        this.getRoleMenus(this.roleId)
      })
    },
    getRoleMenus (roleId) {
      setRoleMenuList({ roleId }).then((res) => {
        this.checkedMenus = res.map(v => v.menuId)
        this.allMenus = this.allMenuss
        this.$refs.tree.setCheckedKeys(this.checkedMenus)
      })
    },
    // 过滤所有的父节点
    _getAllParent () {
      const temp = []
      this._allParentCode(temp)
      return this.checkedMenus.filter((v) => v !== 0 && temp.indexOf(v) < 1)
    },
    _allParentCode (temp, data = this.allMenus) {
      data.map((v) => {
        if (v.children && v.children.length > 0) {
          temp.push(v.treeCode / 1)
          this._allParentCode(temp, v.children)
        }
      })
    },
    close () {
      this.$emit('input', false)
    },
    sureSubmit () {
      const checked = this.$refs.tree.getCheckedKeys()
      const checkedParent = this.$refs.tree.getHalfCheckedKeys()
      const temp = []
      checked.concat(checkedParent).forEach((v) => {
        if (v) {
          temp.push({
            menuId: v / 1,
            roleId: this.curRoleId
          })
        }
      })
      const sendData = {
        list: temp,
        roleId: this.curRoleId,
        sysCode: this.formInline.sysCode
      }
      setRoleMenuBatchEdit(sendData).then(() => {
        this.close()
      })
    }
  }
}
</script>

<style lang="less" scoped>
// scoped
.menuConfigDialog{
  /deep/ .el-dialog__body{
    padding: 10px 20px;
  }
  .menuConfig{
    max-height: 500px;
    /deep/ .el-form{
      /deep/.el-form-item{
        margin-bottom: 0px!important;
      }
    }
    .treeData{
      height:452px;
      overflow-y: auto;
    }
  }
}
</style>

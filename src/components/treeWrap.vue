<template>
  <div v-show="value">
    <div class="tree-bpx-bg" @click="close"></div>
    <div class="tree-box">
      <div class="el-dialog__header">
        <span class="el-dialog__title">请选择</span>
        <button type="button" class="el-dialog__headerbtn" @click="close">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <div class="el-dialog__body">
        <el-tree highlight-current default-expand-all :expand-on-click-node="false"
                 :current-node-key="selectData.id" node-key="treeCode" ref="tree" :indent="2"
                 :data="treeDatas" :props="treeProps" @node-click="handleTreeClick"></el-tree>
      </div>
      <div class="dialog-footer">
        <el-button plain @click="close">关闭</el-button>
        <el-button type="primary" @click="sureSelectedTree">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    treeDatas: Array,
    selectData: Object,
    treeProps: {
      type: Object,
      default(){
        return {
          children: 'children',
          label: 'name'
        }
      }
    }
  },
  data() {
    return {
      tempData: null
    }
  },
  watch: {
    selectData(cur) {
       this.$nextTick(() => {
         this.tempData = {
           ...cur,
         }
         this.$refs.tree.setCurrentKey(cur.treeCode)
       });
    }
  },
  name: "tree-wrap",
  methods: {
    close() {
      this.$emit('input', false)
    },
    sureSelectedTree() {
      this.$emit('sureSelectedTree', this.tempData)
      this.close()
    },
    handleTreeClick(val) {
      this.tempData = val
    }
  }
}
</script>

<style scoped>

</style>

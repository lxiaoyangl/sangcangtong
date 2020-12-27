<template>
  <!-- 新增物资蒙层 -->
  <el-dialog
      :title="title"
      :visible.sync="visible"
      :width="width"
      top="2vh"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
  >
    <i class="el-icon-close dialog_close" @click="$emit('cancel')"></i>
    <slot name="dialog_content"/>
    <slot name="dialog_page"/>
    <span slot="footer" class="dialog-footer">
<!--            <el-button @click="$emit('cancel')" size="medium">取 消</el-button>-->
            <el-button type="primary" @click="$emit('sure')" size="medium">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      width: {
        type: String,
        default: '1000px'
      },
      title: {
        type: String,
        default: '新增'
      }
    },
  }
</script>

<style lang="less" scoped>
  /deep/ .el-dialog {
    border-radius: 5px;
    height: 90%;
    overflow: hidden;

    .el-dialog__header {
      background: #1d2a3d;

      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__body{
      height: calc(90% - 76px);
      overflow: auto;
    }
  }

  /deep/ .dialog_page {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /deep/ .el-form-item {
    margin-bottom: 0px !important;
  }

  /deep/ .dialog_close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
</style>
<template>
  <div class="outer-box relative bgf8">
    <i class="icon-hide-left el-icon-caret-right"
       v-if="!showLeft"  @click="showLeft = true"></i>
    <transition name="slidLeft">
      <div class="left-box relative" v-if="showLeft">
        <el-card class="box-card">
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
      <!-- 搜索筛选 -->
      <el-form :inline="true" :model="formInline" class="search-box">
        <el-form-item label="物资名称">
          <el-input clearable :maxlength="50" placeholder="请输入物资名称"
                    @keyup.native.enter="searchList"
                    v-model.trim="formInline.name"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
      </el-form>
      <!--列表-->
      <div class="content-box">
        <el-table border :data="listData" height="calc(100vh - 260px)" @selection-change="handleSelectionChange"
                  @row-click="rowClick" highlight-current-row ref="multipleTable" row-key="id"
                  v-loading="loading" style="width: 100%;">
          <el-table-column :reserve-selection="true" type="selection" width="55"></el-table-column>
          <el-table-column sortable prop="materialName" align="center" label="名称" min-width="120"></el-table-column>
          <el-table-column sortable prop="batch" align="center" label="批次" min-width="120"></el-table-column>
          <el-table-column sortable prop="specifications" align="center" label="规格" min-width="100"></el-table-column>
          <el-table-column sortable prop="warehouseName" align="center" label="仓库" min-width="100"></el-table-column>
          <el-table-column sortable prop="storageLocation" align="center" label="仓库位置" min-width="120"></el-table-column>
          <el-table-column sortable prop="storageNumber" align="center" label="库存" min-width="120"></el-table-column>
          <el-table-column sortable prop="demandNumber" align="center" label="调拨数量" min-width="130">
            <template slot-scope="scope">
              <el-input-number size="mini" v-model="scope.row.demandNumber" :min="1"
                               :max="scope.row.storageNumber"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
        <slot name="footer">
          <div class="dialog-footer">
            <el-button type="plain" @click="cancelSelect">取消</el-button>
            <el-button type="primary" @click="sureSelect">确认选择</el-button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { state, toTreePackage, clearpop } from '@/utils'
import { materialDataListAll, materialCatalogBaseTree } from '@/axios/api'
export default {
  props: ['selectMaterialDatas', 'warehouseData'],
  data () {
    return {
      loading: false,
      formInline: {},
      listData: [], // 列表
      multipleSelection: [],
      treeDatas: [],
      treeProps: {
        children: 'children',
        label: 'name'
      },
      showLeft: true,
      selectDatas: {}
    }
  },
  watch: {
    selectMaterialDatas: {
      handler (cur) {
        // console.log(cur);
        this.selectDatas = JSON.parse(JSON.stringify(cur))
        this.getTreeDatas()
      },
      deep: true
    }
  },
  created () {
    this.selectDatas = JSON.parse(JSON.stringify(this.selectMaterialDatas))
    this.getTreeDatas()
  },
  methods: {
    getList () {
      this.loading = true
      let sendData = {
        ...this.formInline, // id目录ID list中catid
        name: `*${this.formInline.name || ''}*`,
        materialState: 1
      }
      if (this.warehouseData) {
        sendData.warehouseId = this.warehouseData.id || ''
      }
      delete sendData.catalogName
      materialDataListAll(sendData).then((res) => {
        this.listData = res
        this.loading = false
        this.$nextTick(() => {
          if (!this.selectDatas[sendData.catId]) {
            res.forEach((v) => {
              this.$refs.multipleTable.toggleRowSelection(v, false)
            })
            return
          }
          const selectId = this.selectDatas[sendData.catId].map((v) => v.id)
          if (selectId.length < 1) {
            return
          }
          res.forEach((v) => {
            let tmpSelct = null
            this.selectDatas[sendData.catId].forEach((select) => {
              if (select.id === v.id) {
                tmpSelct = select
              }
            })
            if (tmpSelct) {
              this.$set(v, 'demandNumber', tmpSelct.demandNumber)
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(v, selectId.indexOf(v.id) > -1)
              })
            } else {
              this.$refs.multipleTable.toggleRowSelection(v, false)
            }
          })
        })
      })
    },
    getTreeDatas () {
      materialCatalogBaseTree({}).then((res) => {
        this.treeDatas = res
        if (res.length > 0) {
          this.formInline.catId = res[0].treeCode
          this.formInline.catalogName = res[0].name
          this.getList()
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(res[0].treeCode)
          })
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      const list = []
      val.forEach((v) => {
        const { demandNumber} = v
        if (demandNumber && demandNumber > 0) {
          if (v.catid === this.formInline.catId) {
            list.push({
              ...v,
              demandNumber,
              stockId: v.id,
              catalogName: v.catname,
              catalogId: v.catid
            })
          }
        } else {
          this.$refs.multipleTable.toggleRowSelection(v, false)
        }
      })
      this.selectDatas[this.formInline.catId] = list
      this.$emit('materialChange', this.multipleSelection)
    },
    searchList () {
      this.getList()
    },
    searchReset () {
      this.formInline = {
        materialState: ''
      }
      this.searchList()
      this.$refs.tree.setCurrentKey(0)
    },
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    handleTreeClick (data) {
      const { treeCode, name } = data
      this.formInline.catId = treeCode
      this.formInline.catalogName = name
      this.getList()
    },
    sureSelect () {
      const keys = Object.keys(this.selectDatas)
      if (!keys || keys && keys.length < 1) {
        clearpop('请先选择物资', 'error')
        return
      }
      this.$emit('sureSelectMaterial', this.selectDatas)
    },
    cancelSelect () {
      this.$emit('sureSelectMaterial', null)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

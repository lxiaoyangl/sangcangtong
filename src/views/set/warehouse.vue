<template>
<!-- 仓库管理 -->
  <div style="height:100%;">
    <!-- 搜索筛选  @keyup.native.enter="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="仓库名称">
        <el-input clearable placeholder="请输入仓库名称" :maxlength="10" v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input clearable placeholder="请输地址" :maxlength="20" v-model.trim="formInline.address"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
    </el-form>
    <!--列表-->
    <div class="content-box mt10">
      <div>
        <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete" :disabled="!multipleSelection.length">批量删除</el-button> -->
        <template v-for="item in permissionButtons">
          <el-button type="primary" v-if="item.name==='新增'" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
          <el-button :disabled="multipleSelection.length===0" v-if="item.name==='批量删除'" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
        </template>
      </div>
      <el-table border :data="listData" height="calc(100% - 84px)" @selection-change="handleSelectionChange"
                @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable"
                v-loading="loading" style="width: 100%;">
        <el-table-column type="selection" width="50"></el-table-column>
        <!-- <el-table-column type="index" width="60" label="序号"></el-table-column> -->
        <el-table-column sortable prop="name" align="center" label="仓库名称" width="180"></el-table-column>
        <el-table-column sortable prop="province" align="center" label="省" width="120"></el-table-column>
        <el-table-column sortable prop="city" align="center" label="市" min-width="100"></el-table-column>
        <el-table-column sortable prop="county" align="center" label="县（区）" min-width="100"></el-table-column>
        <el-table-column sortable prop="township" align="center" label="乡镇" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="address" align="center" label="地址" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="contacts" align="center" label="联系人" min-width="180"></el-table-column>
        <el-table-column sortable prop="contactNumber" align="center" label="联系电话" min-width="130"></el-table-column>
        <el-table-column sortable prop="warehouseState" align="center" label="状态" min-width="100">
          <template slot-scope="scope">
            <el-tag size="mini" :type="scope.row.warehouseState===1?'':'danger'" effect="dark" v-if="warehouseStateList[scope.row.warehouseState]">
              {{warehouseStateList[scope.row.warehouseState].label}}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column sortable prop="description" align="center" label="描述" min-width="180" show-overflow-tooltip></el-table-column> -->
        <el-table-column fixed="right" align="center" label="操作" width="120">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)"
                       class="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                       class="el-icon-close">删除</el-button> -->
            <div class="tableButton">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle  @click.stop="modifyPrev(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button type="primary" icon="el-icon-delete" circle  @click.stop="deleteItem(scope.row)"></el-button>
            </el-tooltip>
            </div>
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
    <!-- 新增修改表单 -->
    <div v-if="editFormVisible">
      <el-dialog :close-on-click-modal="false"  :title="title" :visible.sync="editFormVisible" @click="editFormVisible=false" width="800px">
        <el-form label-width="100px" ref="editForm" :model="editForm" :rules="rules">
          <el-row>
            <el-col  :span="12">
              <el-form-item label="仓库名称" prop="name">
                <el-input v-model.trim="editForm.name" auto-complete="off" :maxlength="10" placeholder="请输入仓库名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="所在地区"  prop="townshipCode">
            <areas :disabled="false" v-model="editForm" class="iblock"></areas>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model.trim="editForm.address" auto-complete="off" :maxlength="50" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-row>
            <el-col  :span="12">
              <el-form-item label="联系人" prop="contacts">
            <el-input v-model.trim="editForm.contacts" auto-complete="off" :maxlength="25"
                      placeholder="请输入联系人"></el-input>
          </el-form-item>
            </el-col>
            <el-col  :span="12">
              <el-form-item label="联系电话" prop="contactNumber">
            <el-input v-model.trim="editForm.contactNumber" auto-complete="off" :maxlength="11"
                      placeholder="请输入联系电话"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="状态" prop="areaState">
            <el-radio v-model="editForm.warehouseState" :label="1">启用</el-radio>
            <el-radio v-model="editForm.warehouseState" :label="0">停用</el-radio>
          </el-form-item>
          <!-- <el-form-item label="描述" >
            <el-input v-model.trim="editForm.description" auto-complete="off" :maxlength="100" type="textarea" :rows="2" placeholder="请输入描述"></el-input>
          </el-form-item> -->
        </el-form>
        <div class="dialog-footer">
          <el-button plain @click="editFormVisible=false">取消</el-button>
          <el-button type="primary" v-if="editForm.type=='add'"
                     @click="addList('editForm')">保存
          </el-button>
          <el-button type="primary" v-if="editForm.type=='edit'"
                     @click="modifyList('editForm')">确认修改
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { sureDelete, getChangeData, toTreeData, state, deleteAllNext, getValidButton } from '@/utils'
import {
  setWarehouseList,
  setWarehouseDel,
  setWarehouseDels,
  setWarehouseAdd,
  setWarehouseEdit
} from '@/axios/apis'
import areas from '@/components/areas'

export default {
  components: {
    areas
  },
  data () {
    var phonePass = (rule, value, callback) => {
      var newReg = /^1\d{10}$/
      if (newReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (this.editForm.provinceCode && this.editForm.cityCode && this.editForm.countyCode && this.editForm.townshipCode) {
        callback()
      } else if (!this.editForm.provinceCode) {
        callback(new Error('请选择省'))
      } else if (!this.editForm.cityCode) {
        callback(new Error('请选择市'))
      } else if (!this.editForm.countyCode) {
        callback(new Error('请选择区/县'))
      } else if (!this.editForm.townshipCode) {
        callback(new Error('请选择乡镇'))
      }
    }
    return {
      formInline: {
        name: '',
        phoneNumber: ''
      },
      loading: false,
      pageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      listData: [], // 列表
      multipleSelection: [],

      editFormVisible: false,
      editForm: {}, // 添加编辑
      oldEditForm: {}, // 添加编辑
      title: '',
      rules: {
        name: [{required: true, message: '请输入仓库名称', trigger: 'blur'}],
        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        contacts: [{required: true, message: '请输入联系人', trigger: 'blur'}],
        contactNumber: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          { validator: phonePass, trigger: 'blur' }
        ],
        townshipCode: [
          { required: true, validator: validatePass, trigger: 'change' }
        ]
      },
      warehouseStateList: [{label: '停用', value: 0}, {label: '启用', value: 1}], // 仓库状态
      permissionButtons: []
    }
  },
  created () {
    this.permissionButtons = getValidButton(this.$route.path)
    this.getList()
  },
  methods: {
    // 查询列表
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`,
        address: `*${this.formInline.address || ''}*`,
        ...data
      }
      setWarehouseList(sendData).then((res) => {
        this.listData = res.records
        this.loading = false
        this.pageParams.currentPage = res.current
        this.pageParams.pageSize = res.size
        this.pageParams.total = res.total
        deleteAllNext(res, this.getList)
      })
    },
    // 搜索
    searchList () {
      this.formInline.pageNo = 1
      this.getList()
    },
    // 重置
    searchReset () {
      this.formInline = {
        pageNo: 1
      }
      this.searchList()
    },
    // 修改当前页数
    handleCurrentChange (param) {
      this.formInline.pageNo = param
      this.getList()
    },
    // 修改每页显示条数
    handleSizeChange (param) {
      this.formInline.pageSize = param
      this.getList()
    },
    // 行点击
    rowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 更新行选中数据
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 删除
    deleteItem (data) {
      sureDelete(() => {
        const sendData = {
          id: data.id
        }
        setWarehouseDel(sendData).then((res) => {
          this.getList()
          this.$message({
            message: res,
            type: 'success'
          })
        })
      })
    },
    // 批量删除
    batchDelete () {
      const sendData = {
        list: this.multipleSelection.map((v) => {
          return { id: v.id }
        })
      }
      if (sendData.list.length < 1) {
        return
      }
      sureDelete(() => {
        setWarehouseDels(sendData).then((res) => {
          this.getList()
          this.$message({
            message: res,
            type: 'success'
          })
        })
      })
    },

    // 添加
    addPrev () {
      this._initEditForm()
      this.editFormVisible = true
      this.title = '添加仓库'
      this.editForm.type = 'add'
    },
    // 修改
    modifyPrev (item) {
      this.editForm = JSON.parse(JSON.stringify(item))
      this.oldEditForm = JSON.stringify(item)
      this.title = '修改仓库'
      this.editForm.type = 'edit'
      this.editFormVisible = true
    },
    // 确认添加
    addList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          let sendData = this.editForm
          setWarehouseAdd(sendData).then((res) => {
            this._initEditForm()
            this.getList()
            this.$message({
              message: res,
              type: 'success'
            })
          })
        }
      })
    },
    // 确认修改
    modifyList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          getChangeData(this.oldEditForm, this.editForm, (sendData) => {
            setWarehouseEdit(sendData).then((res) => {
              this._initEditForm()
              this.getList()
              this.$message({
                message: res,
                type: 'success'
              })
            })
          })
        }
      })
    },
    // 修改添加完初始化数据
    _initEditForm () {
      this.editFormVisible = false
      this.editForm = {
        warehouseState: 1
      }
    }
  }
}
</script>

<style scoped>

</style>

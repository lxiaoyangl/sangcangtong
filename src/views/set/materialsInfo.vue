<template>
<!-- 仓库管理 -->
  <div style="height:100%;">
    <!-- 搜索筛选  @keyup.native.enter="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="物资名称">
        <el-input clearable placeholder="请输入物资名称" :maxlength="10" v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="厂商名称">
        <el-input clearable placeholder="请输厂商名称" :maxlength="20" v-model.trim="formInline.businessMen"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select clearable v-model="formInline.materialState" placeholder="请选择状态" >
          <el-option v-for="item in materialStateList" :key="item.value"
                     :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
        <el-table-column sortable prop="name" align="center" label="物资名称" min-width="120" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="businessMen" align="center" label="厂商" width="180" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="catalogName" align="center" label="目录名称" width="120" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="mnemonicCode" align="center" label="助记码" min-width="100" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="natureGoods" align="center" label="物资性质" min-width="120">
          <template slot-scope="scope">
            <!-- <el-tag size="mini" :type="scope.row.natureGoods==='1'?'':'danger'" effect="dark" v-if="natureGoodsList[scope.row.natureGoods]"> -->
              {{natureGoodsList[scope.row.natureGoods]&&natureGoodsList[scope.row.natureGoods].label}}
            <!-- </el-tag> -->
          </template>
        </el-table-column>
        <el-table-column sortable prop="placeOrigin" align="center" label="产地" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="serialNumber" align="center" label="序号" min-width="180" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="specifications" align="center" label="规格" min-width="130" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="textureMaterial" align="center" label="材质" min-width="130" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="unitQuantity" align="center" label="数量单位" min-width="130" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="valuationMode" align="center" label="计价方式" min-width="130">
          <template slot-scope="scope">
            <!-- <el-tag size="mini" :type="scope.row.valuationMode==='1'?'':'danger'" effect="dark" v-if="valuationModeList[scope.row.valuationMode]"> -->
              {{valuationModeList[scope.row.valuationMode]&&valuationModeList[scope.row.valuationMode].label}}
            <!-- </el-tag> -->
          </template>
        </el-table-column>
        <el-table-column sortable prop="specifications" align="center" label="重量单位" min-width="130" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="weightCoefficient" align="center" label="理重" min-width="130" show-overflow-toolti></el-table-column>
        <el-table-column sortable prop="materialState" align="center" label="状态" min-width="100">
          <template slot-scope="scope">
            <el-tag size="mini" :type="scope.row.materialState===1?'':'danger'" effect="dark" v-if="materialStateList[scope.row.materialState]">
              {{materialStateList[scope.row.materialState].label}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="description" align="center" label="描述" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="160">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click.stop="viewPrev(scope.row)"
                       class="el-icon-edit">查看</el-button>
            <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)"
                       class="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)"
                       class="el-icon-close">删除</el-button> -->
            <div class="tableButton">
            <el-tooltip effect="dark" content="查看" placement="top">
              <el-button type="primary" icon="el-icon-search" circle  @click.stop="viewPrev(scope.row)"></el-button>
            </el-tooltip>
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
      <el-dialog :close-on-click-modal="false"  :title="title" :visible.sync="editFormVisible" @click="editFormVisible=false" width="750px">
        <el-form label-width="90px" ref="editForm" :model="editForm" :rules="rules">
          <el-row>
            <el-col  :span="12">
              <el-form-item label="物资名称" prop="name">
                <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.name" auto-complete="off" :maxlength="20" placeholder="请输入物资名称"></el-input>
              </el-form-item>
            </el-col>
          <el-col  :span="12">
            <el-form-item label="厂商" prop="businessMen">
              <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.businessMen" auto-complete="off" :maxlength="20" placeholder="请输入厂商"></el-input>
            </el-form-item>
          </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
            <el-form-item label="目录名称" prop="catalogName">
                <el-input :disabled="editForm.type==='view'" @focus="selectTree" v-model.trim="editForm.catalogName" auto-complete="off" :maxlength="20" placeholder="请选择请输入目录"></el-input>
              </el-form-item>
            </el-col>
            <el-col  :span="12">
              <el-form-item label="助记码" prop="mnemonicCode">
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.mnemonicCode" auto-complete="off" :maxlength="20"
                      placeholder="请输入助记码"></el-input>
          </el-form-item>
            </el-col>
            </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="物资性质">
        <el-select :disabled="editForm.type==='view'" clearable v-model="editForm.natureGoods" placeholder="请选择物资性质" >
          <el-option v-for="item in natureGoodsList" :key="item.value"
                     :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产地" prop="placeOrigin">
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.placeOrigin" auto-complete="off" :maxlength="20"
                      placeholder="请输入产地"></el-input>
          </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12"><el-form-item label="序号" prop="placeOrigin">
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.serialNumber" auto-complete="off" :maxlength="20"
                      placeholder="请输入序号"></el-input>
          </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="规格" prop="specifications">
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.specifications" auto-complete="off" :maxlength="20"
                      placeholder="请输入规格"></el-input>
          </el-form-item></el-col>
          </el-row
          >
          <el-row>
            <el-col :span="12">
              <el-form-item label="材质" prop="textureMaterial">
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.textureMaterial" auto-complete="off" :maxlength="20"
                      placeholder="请输入材质"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量单位" prop="unitQuantity">
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.unitQuantity" auto-complete="off" :maxlength="20"
                      placeholder="请输入数量单位"></el-input>
          </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="计价方式" prop="valuationMode">
                       <el-select :disabled="editForm.type==='view'" clearable v-model="editForm.valuationMode" placeholder="请选择计价方式" >
          <el-option v-for="item in valuationModeList" :key="item.value"
                     :label="item.label" :value="item.value">
          </el-option>
        </el-select>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="重量单位" prop="weight">
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.weight" auto-complete="off" :maxlength="20"
                      placeholder="请输入重量单位"></el-input>
          </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12"><el-form-item label="状态" prop="areaState">
            <el-radio :disabled="editForm.type==='view'" v-model="editForm.materialState" :label="1">启用</el-radio>
            <el-radio :disabled="editForm.type==='view'" v-model="editForm.materialState" :label="0">停用</el-radio>
          </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="理重" prop="weightCoefficient">
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.weightCoefficient" auto-complete="off" :maxlength="20"
                      placeholder="请输入理重"></el-input>
          </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="物资图片" prop="materialImg">
            <el-upload
             :headers="updataAttr"
             class="avatar-uploader"
            :action="`${serverUrl}/FileController/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :disabled="uploadStatus">
              <div class="uploadBg"  v-if="editForm.materialImg">
                <img class="el-upload-list__item-thumbnail" :src="editForm.materialImg" alt="" >
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete" @click="handlePictureCardPreview" >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleDownload" >
                    <i class="el-icon-download"></i>
                  </span>
                  <span  class="el-upload-list__item-delete" v-if="editForm.type !== 'view'" @click="handleRemove">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="描述" >
            <el-input :disabled="editForm.type==='view'" v-model.trim="editForm.description" auto-complete="off" :maxlength="25" type="textarea" :rows="2" placeholder="请输入描述"></el-input>
          </el-form-item>
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
    <TreeWrap v-model="showTrees" :treeDatas="treeDatas" :selectData="selectData"
              @sureSelectedTree="sureSelectedTree"></TreeWrap>
    <el-dialog :visible.sync="viewImgVisible" width="700px" title="物资图片">
      <div style="width:650px;height:500px;">
      <img style="width:100%;height:100%;" :src="viewImageUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { sureDelete, getChangeData, toTreeData, state, deleteAllNext, toTreePackage, formatData, getValidButton } from '@/utils'
import {
  setmaterialsInfoList,
  setMaterialsInfoDel,
  setMaterialsInfoDels,
  setMaterialsInfoAdd,
  setMaterialsInfoEdit,
  setMaterialsTree,
  selectDictionary
} from '@/plugins/apis'
import areas from '@/components/areas'
import TreeWrap from '@/components/treeWrap'
import Cookies from 'js-cookie'

export default {
  components: {
    areas, TreeWrap
  },
  data () {
    return {
      formInline: {
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
        name: [{required: true, message: '请输入物资名称', trigger: 'blur'}],
        natureGoods: [{required: true, message: '请选择物资性质', trigger: 'blur'}],
        specifications: [{required: true, message: '请输入规格', trigger: 'blur'}],
        textureMaterial: [{required: true, message: '请输入材质', trigger: 'blur'}],
        unitQuantity: [{required: true, message: '请输入数量单位', trigger: 'blur'}],
        valuationMode: [{required: true, message: '请选择计价方式', trigger: ['blur', 'change']}],
        weight: [{required: true, message: '请输入重量单位', trigger: 'blur'}],
        weightCoefficient: [{required: true, message: '请输入理重', trigger: 'blur'}]
      },
      materialStateList: [{label: '停用', value: 0}, {label: '启用', value: 1}], // 仓库状态
      natureGoodsList: [],
      valuationModeList: [],
      showTrees: false,
      treeDatas: null,
      selectData: {
        treeCode: 0,
        name: ''
      },

      serverUrl: '',
      imageUrl: '',
      updataAttr: {
        token: Cookies.get('tokenb')
      },
      viewImgVisible: false,
      viewImageUrl: '',
      uploadStatus: false,
      permissionButtons: []
    }
  },
  created () {
    this.permissionButtons = getValidButton(this.$route.path)
    // 物资类型
    selectDictionary({
      dictionaryType: 'materialsType',
      dictionaryState: 1
    }).then((res) => {
      this.natureGoodsList = formatData(res)
    })
    // 计价方式
    selectDictionary({
      dictionaryType: 'pricingManner',
      dictionaryState: 1
    }).then((res) => {
      this.valuationModeList = formatData(res)
    })
    this.getList()
  },
  computed: {
  },
  methods: {
    // 删除
    handleRemove (file) {
      // this.$refs.updateFile.handleRemove(file)
      // this.editForm.businessLicense = ''
      this.editForm.materialImg = ''
      this.uploadStatus = false
    },
    // 查看
    handlePictureCardPreview (file) {
      this.viewImageUrl = this.editForm.materialImg
      this.viewImgVisible = true
    },
    // 下载
    handleDownload () {
      function imgToBase64 (imgSrc, imgName) {
        var image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function () {
          var canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          var context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)
          var url = canvas.toDataURL('image/png')
          var a = document.createElement('a')
          var event = new MouseEvent('click')
          a.download = imgName
          a.href = url
          a.dispatchEvent(event)
        }
        image.src = imgSrc
      }
      imgToBase64(this.editForm.materialImg, '新闻封面')
    },
    handleAvatarSuccess (res, file) {
      this.editForm.materialImg = res.data.path
      this.uploadStatus = true
      this.$forceUpdate()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 查询列表
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`,
        businessMen: `*${this.formInline.businessMen || ''}*`,
        ...data
      }
      setmaterialsInfoList(sendData).then((res) => {
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
        setMaterialsInfoDel(sendData).then((res) => {
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
        setMaterialsInfoDels(sendData).then((res) => {
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
      this.title = '添加物资信息'
      this.editForm.type = 'add'

      this.uploadStatus = false
    },
    // 修改
    modifyPrev (item) {
      this.editForm = JSON.parse(JSON.stringify(item))
      this.oldEditForm = JSON.stringify(item)
      this.title = '修改物资信息'
      this.editForm.type = 'edit'
      this.editFormVisible = true

      if (this.editForm.materialImg) {
        this.uploadStatus = true
      } else {
        this.uploadStatus = false
      }
    },
    // 查看
    viewPrev (item) {
      this.editForm = JSON.parse(JSON.stringify(item))
      this.oldEditForm = JSON.stringify(item)
      this.title = '查看物资信息'
      this.editForm.type = 'view'
      this.editFormVisible = true

      this.uploadStatus = true
    },
    // 确认添加
    addList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          let sendData = this.editForm
          setMaterialsInfoAdd(sendData).then((res) => {
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
            setMaterialsInfoEdit(sendData).then((res) => {
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
        materialState: 1
      }
    },
    selectTree () {
      setMaterialsTree({}).then((res) => {
        this.treeDatas = toTreePackage(res)
        const { catalogId, catalogName } = this.editForm
        this.selectData = {
          treeCode: catalogId / 1 || 0,
          name: catalogName
        }
        this.showTrees = true
      })
    },
    sureSelectedTree (data) {
      this.$nextTick(() => {
        const { treeCode, name } = data
        this.editForm.catalogId = treeCode / 1
        this.editForm.catalogName = name
        // this.$forceUpdate()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar-uploader{
   .uploadBg{
    width: 100px;
    height: 100px;
    position: relative;
    img{
      width: 100%;
      height:100%;
    }
    .el-upload-list__item-actions{
      // position: absolute;
      // width: 100px;
      // height: 100px;
      // left: 0;
      // line-height: 100px;

      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      transition: opacity .3s;
      &::after{
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
      }&:hover{
        opacity: 1;
      }
      .el-upload-list__item-delete{
        cursor: pointer;
        display: inline-block;
        line-height: 16px;
        font-size: 16px;
        margin-left: 6px;
        position: initial;
        color: #fff;
        right:none;
        top:none;
      }
      &:hover{
        // background: #4e4646;
        // opacity: 0.6;
        // color: #fff;

        .el-upload-list__item-delete{
          // display: inline-block;
        }
      }
    }
  }
  .avatar-uploader-icon{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .imgBox{
    width: 300px;
    height: 300px;
  }
}
</style>

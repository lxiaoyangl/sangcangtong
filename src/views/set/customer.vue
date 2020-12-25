<template>
  <!-- 企业管理 -->
  <div style="height:100%;">
    <!-- 搜索筛选  @keyup.native.enter="searchList" @change="searchList"-->
    <el-form :inline="true" :model="formInline" class="search-box">
      <el-form-item label="企业名称">
        <el-input clearable placeholder="请输入企业名称" :maxlength="20" v-model.trim="formInline.name"></el-input>
      </el-form-item>
     <el-form-item label="状态">
        <el-select clearable v-model="formInline.companyState" placeholder="请选择状态"  @change="searchList">
          <el-option v-for="item in companyStateList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
    </el-form>
    <!--列表-->
    <div class="content-box mt10">
      <div>
        <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button> -->
        <template v-for="item in permissionButtons">
          <el-button type="primary" v-if="item.name==='新增'" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
          <el-button :disabled="multipleSelection.length===0" v-if="item.name==='批量删除'" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
        </template>
      </div>
      <el-table border :data="listData" height="calc(100% - 84px)" @selection-change="handleSelectionChange" @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable" v-loading="loading" style="width: 100%;">
        <el-table-column type="selection" width="55" ></el-table-column>
        <!-- <el-table-column type="index" width="60" label="序号"></el-table-column> -->
        <el-table-column sortable prop="name" align="center" label="企业名称" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="abbreviation" align="center" label="企业简称" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="accountName" align="center" label="开户名" min-width="120" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column sortable prop="accountName" align="center" label="税号" min-width="120" show-overflow-tooltip></el-table-column> -->
        <el-table-column sortable prop="bankAccountNumber" align="center" label="开户行账号" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="depositBank" align="center" label="开户行" min-width="120" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column sortable prop="businessLicense" align="center" label="营业执照" min-width="120" show-overflow-tooltip></el-table-column> -->
        <el-table-column sortable prop="organizationCode" align="center" label="组织机构代码" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="openPermit" align="center" label="开户许可证" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="businessScope" align="center" label="经营范围" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="legalName" align="center" label="法人代表" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="legalCard" align="center" label="法人身份证号" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="certificationStatus" align="center" label="认证" min-width="90">
          <template slot-scope="scope">
            <el-tag size="mini" :type="scope.row.certificationStatus===1?'':'danger'" effect="dark" v-if="certificationStatusList[scope.row.certificationStatus]">
              {{certificationStatusList[scope.row.certificationStatus].label}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="companyState" align="center" label="企业状态" min-width="120">
          <template slot-scope="scope">
            <el-tag size="mini" :type="scope.row.companyState===1?'':'danger'" effect="dark" v-if="companyStateList[scope.row.companyState]">
              {{companyStateList[scope.row.companyState].label}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="contactAddress" align="center" label="联系地址" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="contactNumber" align="center" label="联系电话" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="contacts" align="center" label="联系人" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="mailbox" align="center" label="联系人邮箱" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="isExamine" align="center" label="审核" min-width="120">
          <template slot-scope="scope">
              {{isExamineList[scope.row.isExamine]&&isExamineList[scope.row.isExamine].label}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="phoneNumber" align="center" label="联系人手机号" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="registeredAddress" align="center" label="注册地址" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="description" align="center" label="描述" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click.stop="viewPrev(scope.row)" class="el-icon-edit">查看</el-button>
            <el-button type="primary" size="mini" @click.stop="relatedMaterials(scope.row)" class="el-icon-edit">关联物资</el-button>
            <el-button type="primary" size="mini" @click.stop="modifyPrev(scope.row)" class="el-icon-edit">修改</el-button>
            <el-button type="danger" size="mini" @click.stop="deleteItem(scope.row)" class="el-icon-close">删除</el-button> -->
            <div class="tableButton">
              <el-tooltip effect="dark" content="查看" placement="top">
                <el-button type="primary" icon="el-icon-search" circle  @click.stop="viewPrev(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button type="primary" icon="el-icon-edit" circle  @click.stop="modifyPrev(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="关联物资" placement="top">
                <el-button type="primary" icon="el-icon-plus" circle  @click.stop="relatedMaterials(scope.row)"></el-button>
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
    <div v-if="editFormVisible">
      <el-dialog :close-on-click-modal="false"  :title="title" :visible.sync="editFormVisible" @click="editFormVisible=false" width="800px">
        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="name">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入企业名称" :maxlength="20" v-model.trim="editForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业简称" >
              <el-input :disabled="editForm.type==='view'" placeholder="请输入企业简称" :maxlength="20" v-model.trim="editForm.abbreviation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="组织机构代码" prop="organizationCode">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入组织机构代码" :maxlength="20" v-model.trim="editForm.organizationCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户许可证号" prop="openPermit">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入开户许可证号" :maxlength="20" v-model.trim="editForm.openPermit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="审核">
        <el-select :disabled="editForm.type==='view'" v-model="editForm.isExamine" placeholder="请选择审核"  @change="searchList">
          <el-option v-for="item in isExamineList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="认证">
        <el-select :disabled="editForm.type==='view'" v-model="editForm.certificationStatus" placeholder="请选择认证"  @change="searchList">
          <el-option v-for="item in certificationStatusList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <!-- <el-form-item label="税号" prop="dutyParagraph">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入税号" :maxlength="20" v-model.trim="editForm.dutyParagraph"></el-input>
            </el-form-item> -->
            <el-form-item label="企业状态" prop="companyState">
              <el-radio :disabled="editForm.type==='view'" v-model="editForm.companyState" :label='0' >停用</el-radio>
              <el-radio :disabled="editForm.type==='view'" v-model="editForm.companyState" :label='1' >启用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人姓名" prop="legalName">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入法人姓名" :maxlength="20" v-model.trim="editForm.legalName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="法人身份证号" prop="legalCard">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入法人身份证号" :maxlength="18" v-model.trim="editForm.legalCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址" prop="registeredAddress">
          <el-input :disabled="editForm.type==='view'" placeholder="请输入注册地址" :maxlength="20" v-model.trim="editForm.registeredAddress"></el-input>
        </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
             <el-form-item label="联系地址" prop="contactAddress">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入联系地址" :maxlength="20" v-model.trim="editForm.contactAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="联系电话" prop="contactNumber">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入联系电话" :maxlength="15" v-model.trim="editForm.contactNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contacts">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入联系人" :maxlength="20" v-model.trim="editForm.contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人手机号" prop="phoneNumber">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入联系人手机号" :maxlength="11" v-model.trim="editForm.phoneNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
              <el-form-item label="联系人邮箱" prop="mailbox">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入联系人邮箱" :maxlength="20" v-model.trim="editForm.mailbox"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="开户行" prop="depositBank">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入开户行" :maxlength="20" v-model.trim="editForm.depositBank"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
              <el-form-item label="开户名" prop="accountName">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入开户名" :maxlength="20" v-model.trim="editForm.accountName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="开户行账号" prop="bankAccountNumber">
              <el-input :disabled="editForm.type==='view'" placeholder="请输入开户行账号" :maxlength="20" v-model.trim="editForm.bankAccountNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- v-model="editForm.businessLicense" -->
        <el-form-item label="营业执照" prop="businessLicense">
            <el-upload
             :headers="updataAttr"
             class="avatar-uploader"
            :action="`${serverUrl}/FileController/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :disabled="uploadStatus">
              <div class="uploadBg"  v-if="editForm.businessLicense">
                <img class="el-upload-list__item-thumbnail" :src="editForm.businessLicense" alt="" >
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
        <el-form-item label="经营范围" prop="businessScope">
          <el-input :disabled="editForm.type==='view'" placeholder="请输入经营范围" :maxlength="250" type="textarea" :rows="3" v-model.trim="editForm.businessScope"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input :disabled="editForm.type==='view'" placeholder="请输入描述" :maxlength="50" type="textarea" :rows="2" v-model.trim="editForm.description"></el-input>
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
    <el-dialog :visible.sync="viewImgVisible">
      <img width="100%" :src="viewImageUrl" alt="">
    </el-dialog>

    <el-dialog :visible.sync="relatedMaterialsShow" title="关联物资" width="1200px" class="company"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
      <div class="MaterialsBox">
       <el-col :span="11">
         <el-form :inline="true" :model="leftForm" class="search-box">
            <el-form-item label="物资名称">
              <el-input clearable placeholder="请输入物资名称" :maxlength="20" v-model.trim="leftForm.name"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchListLeft">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" plain @click="searchResetLeft">重置</el-button>
          </el-form>
          <el-table
            :data="leftListData"
            border
            ref="leftSelection"
            @selection-change="checkLeftAll"
            style="width: 100%"
            v-loading="leftLoading"
            height="485px"
            @cell-click="leftCellClick"
            >
              <el-table-column type="selection" width="50"> </el-table-column>
              <el-table-column prop="name" label="物资名称" min-width="100"> </el-table-column>
              <el-table-column prop="businessMen" label="厂家" min-width="100"> </el-table-column>
              <el-table-column prop="natureGoods" label="物资性质" min-width="100">
                <template slot-scope="scope">
                  {{natureGoodsList[scope.row.natureGoods]&&natureGoodsList[scope.row.natureGoods].label}}
                </template>
              </el-table-column>
              <el-table-column prop="placeOrigin" label="产地" min-width="100"> </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChangeLeft"
        @current-change="handleCurrentChangeLeft"
        :current-page="this.leftPageParams.currentPage"
        :page-sizes="[15, 30, 50, 100]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.leftPageParams.total">
      </el-pagination>
    </el-col>

    <el-col :span="2">
      <div class="opSetting">
        <div @click="handelSelect">
          <el-button icon="el-icon-d-arrow-right" :disabled="leftMultipleSelection.length?false:true" type="primary" >添加</el-button>
        </div>
        <div class="spacing" @click="handleRemoveSelect">
          <el-button icon="el-icon-d-arrow-left" :disabled="rightMultipleSelection.length?false:true" type="primary">取消</el-button>
        </div>
      </div>
    </el-col>

    <el-col :span="11">
      <div class="rightMenu">
      <!-- <el-button type="primary" icon="el-icon-search" @click="searchListLeft">取消</el-button> -->
      </div>
         <el-table
            :data="rightListData"
            border
            ref="rightSelection"
            @selection-change="checkRightAll"
            style="width: 100%"
            height="485px"
           @cell-click="rightCellClick">
              <el-table-column type="selection" width="50"> </el-table-column>
              <el-table-column prop="name" label="物资名称" min-width="100"> </el-table-column>
              <el-table-column prop="businessMen" label="厂家" min-width="100"> </el-table-column>
              <el-table-column prop="natureGoods" label="物资性质" min-width="100">
                <template slot-scope="scope">
                  {{natureGoodsList[scope.row.natureGoods]&&natureGoodsList[scope.row.natureGoods].label}}
                </template>
              </el-table-column>
              <el-table-column prop="placeOrigin" label="产地" min-width="100"> </el-table-column>
        </el-table>
    </el-col>
  </div>
  <div class="dialog-footer">
          <el-button plain @click="relatedMaterialsShow=false">取消</el-button>
          <el-button type="primary" @click="saveRecipient">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import { sureDelete, getChangeData, toTreeData, state2, deleteAllNext, formatData, getValidButton } from '@/utils'
import {
  setCustomerList,
  setCustomerDel,
  setCustomerDels,
  setCustomerAdd,
  setCustomerEdit,
  setmaterialsInfoList,
  setCompanyGoodsList,
  setCompanyGoodsDel,
  setCompanyGoodsAdds,
  selectDictionary,
  dictSetWarehouse
} from '@/plugins/apis'
import Cookies from 'js-cookie'

export default {
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
      title: '添加',
      rules: {
        name: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
        organizationCode: [{required: true, message: '请输入组织机构代码', trigger: 'blur'}],
        openPermit: [{required: true, message: '请输入开户许可证号', trigger: 'blur'}],
        isExamine: [{required: true, message: '请选择审核', trigger: ['blur', 'change']}],
        certificationStatus: [{required: true, message: '请选择认证', trigger: ['blur', 'change']}],
        // dutyParagraph: [{required: true, message: '请输入税号', trigger: 'blur'}],
        legalName: [{required: true, message: '请输入法人姓名', trigger: 'blur'}],
        legalCard: [
          {required: true, message: '请输入法人身份证号', trigger: 'blur'},
          {pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入有效的法人身份证号', trigger: 'blur'}
        ],
        registeredAddress: [{required: true, message: '请输入注册地址', trigger: 'blur'}],
        contactAddress: [{required: true, message: '请输入联系地址', trigger: 'blur'}],
        contactNumber: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
        contacts: [{required: true, message: '请输入联系人', trigger: 'blur'}],
        phoneNumber: [
          {required: true, message: '请输入联系人手机号', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '请输入正确的联系人手机号', trigger: 'blur'}
        ],
        depositBank: [{required: true, message: '请输入开户行', trigger: 'blur'}],
        accountName: [{required: true, message: '请输入开户名', trigger: 'blur'}],
        bankAccountNumber: [{required: true, message: '请输入开户行账号', trigger: 'blur'}],
        businessLicense: [{required: true, message: '请上传营业执照', trigger: 'blur'}],
        businessScope: [{required: true, message: '请输入经营范围', trigger: 'blur'}],
        mailbox: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '请输入有效的邮箱地址', trigger: 'blur'}
        ]
      },
      companyStateList: [{label: '停用', value: 0}, {label: '启用', value: 1}],
      isExamineList: [{label: '不审核', value: 0}, {label: '审核', value: 1}],
      certificationStatusList: [{label: '未认证', value: 0}, {label: '已认证', value: 1}],

      setWarehouseList: [], // 仓库

      serverUrl: '',
      imageUrl: '',
      updataAttr: {
        token: Cookies.get('tokenb')
      },
      viewImgVisible: false,
      viewImageUrl: '',
      uploadStatus: false,

      relatedMaterialsShow: false,
      curCompanyId: '',
      leftForm: {},
      leftLoading: false,
      rightLoading: false,
      leftPageParams: {
        currentPage: 1,
        pageSize: 15,
        total: 1
      },
      leftListData: [], // 列表
      rightListData: [], // 列表
      leftMultipleSelection: [],
      rightMultipleSelection: [],
      natureGoodsList: [{label: '吃的', value: '0'}, {label: '喝的', value: '1'}],
      permissionButtons: []
    }
  },
  created () {
    this.permissionButtons = getValidButton(this.$route.path)
    this.getDatasource()
    this.getList()
  },
  watch: {
    'editForm.contactNumber': function (curVal, oldVal) {
      if (curVal) {
        this.editForm.contactNumber = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join('') : ''
      }
    },
    'editForm.manufacturerNumber': function (curVal, oldVal) {
      if (curVal) {
        this.editForm.manufacturerNumber = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join('') : ''
      }
    }
  },
  methods: {
    getDatasource () {
      // 仓库
      // dictSetWarehouse({}).then(res => {
      //   this.setWarehouseList = res
      // })
      // // 用途
      // selectDictionary({
      //   dictionaryType: 'barrier_use_type'
      // }).then((res) => {
      //   this.useTypeList = formatData(res)
      // })
    },
    // 查询列表
    getList (data) {
      this.loading = true
      let sendData = {
        ...this.formInline,
        name: `*${this.formInline.name || ''}*`,
        ...data
      }
      setCustomerList(sendData).then((res) => {
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
        setCustomerDel(sendData).then((res) => {
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
        setCustomerDels(sendData).then((res) => {
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
      this.title = '添加企业信息'
      this.editForm.type = 'add'

      this.uploadStatus = false
    },
    // 修改
    modifyPrev (item) {
      this.editForm = JSON.parse(JSON.stringify(item))
      this.oldEditForm = JSON.stringify(item)
      this.title = '修改企业信息'
      this.editForm.type = 'edit'
      this.editFormVisible = true

      if (this.editForm.businessLicense) {
        this.uploadStatus = true
      } else {
        this.uploadStatus = false
      }
    },
    // 查看
    viewPrev (item) {
      this.editForm = JSON.parse(JSON.stringify(item))
      this.oldEditForm = JSON.stringify(item)
      this.title = '查看企业信息'
      this.editForm.type = 'view'
      this.editFormVisible = true

      this.uploadStatus = true
    },
    // 确认添加
    addList (editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          let sendData = this.editForm
          setCustomerAdd(sendData).then((res) => {
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
            setCustomerEdit(sendData).then((res) => {
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
        companyState: 1
      }
    },
    // 转换状态
    formatOpen (row, column, cellValue, index) {
      for (var i = 0; i < this.videoOpen.length; i++) {
        if (this.videoOpen[i].keyValue === cellValue) {
          return this.videoOpen[i].labels
        }
      }
    },
    // 查询仓库名
    setSetWarehouseName (val) {
      for (var i = 0; i < this.setWarehouseList.length; i++) {
        if (this.setWarehouseList[i].id === val) {
          this.editForm.warehouseName = this.setWarehouseList[i].name
        }
      }
    },
    // 查询仓库名
    setPurposeName (val) {
      for (var i = 0; i < this.useTypeList.length; i++) {
        if (this.useTypeList[i].id === val) {
          this.editForm.PurposeName = this.useTypeList[i].label
        }
      }
    },

    // 删除
    handleRemove (file) {
      // this.$refs.updateFile.handleRemove(file)
      // this.editForm.businessLicense = ''
      this.editForm.businessLicense = ''
      this.uploadStatus = false
    },
    // 查看
    handlePictureCardPreview (file) {
      this.viewImageUrl = this.editForm.businessLicense
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
      imgToBase64(this.editForm.businessLicense, '营业执照')
    },
    handleAvatarSuccess (res, file) {
      this.editForm.businessLicense = res.data.path
      this.uploadStatus = true
      this.$forceUpdate()
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 公司关联物资
    relatedMaterials (row) {
      this.curCompanyId = row.id
      this.getListLeft()
      this.getRightList()
      this.relatedMaterialsShow = true
    },
    // 公司已关联物资
    getRightList () {
      setCompanyGoodsList({id: this.curCompanyId}).then((res) => {
        this.rightListData = res
      })
    },
    // 查询列表
    getListLeft (data) {
      this.leftLoading = true
      let sendData = {
        ...this.leftForm,
        name: `*${this.leftForm.name || ''}*`,
        materialState: 1,
        ...data
      }
      setmaterialsInfoList(sendData).then((res) => {
        this.leftListData = res.records
        this.leftLoading = false
        this.leftPageParams.currentPage = res.current
        this.leftPageParams.pageSize = res.size
        this.leftPageParams.total = res.total
        deleteAllNext(res, this.getListLeft)
      })
    },
    // 搜索
    searchListLeft () {
      this.leftForm.pageNo = 1
      this.getListLeft()
    },
    // 重置
    searchResetLeft () {
      this.leftForm = {
        pageNo: 1
      }
      this.getListLeft()
    },
    // 修改当前页数
    handleCurrentChangeLeft (param) {
      this.leftForm.pageNo = param
      this.getListLeft()
    },
    // 修改每页显示条数
    handleSizeChangeLeft (param) {
      this.leftForm.pageSize = param
      this.getListLeft()
    },
    // 左选择
    checkLeftAll (val) {
      this.leftMultipleSelection = val
    },
    // 有选择
    checkRightAll (val) {
      this.rightMultipleSelection = val
    },
    // 选中
    handelSelect () {
      this.rightListData = this.handleConcatArr(this.rightListData, this.leftMultipleSelection)
      // this.handleRemoveTabList(this.leftMultipleSelection, this.leftListData)
      this.leftMultipleSelection = []
      this.$refs.leftSelection.clearSelection()
    },
    // 取消
    handleRemoveSelect () {
      // this.leftListData = this.handleConcatArr(this.leftListData, this.rightMultipleSelection)
      this.handleRemoveTabList(this.rightMultipleSelection, this.rightListData)
      this.rightMultipleSelection = []
      this.$refs.rightSelection.clearSelection()
    },
    // 合并
    handleConcatArr (rightListData, leftMultipleSelection) {
      let arr = []
      arr = arr.concat(rightListData, leftMultipleSelection)
      var result = []
      var obj = {}
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i].id]) {
          result.push(arr[i])
          obj[arr[i].id] = true
        }
      }
      return result
    },
    // 移除
    handleRemoveTabList (isNeedArr, originalArr) {
      if (isNeedArr.length && originalArr.length) {
        for (let i = 0; i < isNeedArr.length; i++) {
          for (let k = 0; k < originalArr.length; k++) {
            if (isNeedArr[i]['name'] === originalArr[k]['name']) {
              originalArr.splice(k, 1)
            }
          }
        }
      }
    },
    leftCellClick (row) {
      this.$refs.leftSelection.toggleRowSelection(row)
    },
    rightCellClick (row) {
      this.$refs.rightSelection.toggleRowSelection(row)
    },
    // 修改分配
    saveRecipient (tableForm) {
      const sendData = {
        list: this.rightListData.map((v) => {
          return {
            materialId: v.id,
            companyId: this.curCompanyId
          }
        })
      }
      // 至少一个
      // if (sendData.list.length < 1) {
      //   return
      // }
      sureDelete(() => {
        // this.configLoading = true
        setCompanyGoodsDel({companyId: this.curCompanyId})
          .then(() => {
            // this.configLoading = false
            this.batchAdd(sendData)
          })
          .catch(() => {
            // this.configLoading = false
            this.batchAdd(sendData)
          })
      })
    },
    // 批量添加
    batchAdd (sendData) {
      setCompanyGoodsAdds(sendData)
        .then((res) => {
          this.relatedMaterialsShow = false
          this.leftListData = []
          this.rightListData = []
          this.$message({
            message: res,
            type: 'success'
          })
        })
        .catch(() => {
          this.relatedMaterialsShow = false
          this.leftListData = []
          this.rightListData = []
          this.getList()
        })
    }
  }
}
</script>
<style lang="less" scoped>
.company{
    /deep/ .el-dialog{
      width: 1200px;
      max-width: 1200px;
      .el-dialog__body{
        padding: 10px;
      }
    }
    .MaterialsBox{
      height: 600px;
    }
    .rightMenu{
      padding: 20px 10px 20px;
      height:36px;
    }
    .opSetting{
      margin-top: 200px;
      text-align: center;
    }
    .spacing{
      margin-top: 10px;;
    }
  }
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

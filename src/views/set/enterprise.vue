<template>
<!-- 企业信息管理 -->
  <div class="wrap">
    <div class="wrapContent">
      <div class="wrapHeader">企业信息管理：</div>
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="name">
              <el-input placeholder="请输入企业名称" :maxlength="20" v-model.trim="editForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业简称" prop="abbreviation">
              <el-input placeholder="请输入企业简称" :maxlength="20" v-model.trim="editForm.abbreviation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="组织机构代码" prop="organizationCode">
              <el-input placeholder="请输入组织机构代码" :maxlength="20" v-model.trim="editForm.organizationCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户许可证号" prop="openPermit">
              <el-input placeholder="请输入开户许可证号" :maxlength="20" v-model.trim="editForm.openPermit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税号" prop="dutyParagraph">
              <el-input placeholder="请输入税号" :maxlength="20" v-model.trim="editForm.dutyParagraph"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法人姓名" prop="legalName">
              <el-input placeholder="请输入法人姓名" :maxlength="20" v-model.trim="editForm.legalName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人身份证号" prop="legalCard">
              <el-input placeholder="请输入法人身份证号" :maxlength="20" v-model.trim="editForm.legalCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="注册地址" prop="registeredAddress">
          <el-input placeholder="请输入注册地址" :maxlength="20" v-model.trim="editForm.registeredAddress"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="16">
            <el-form-item label="联系地址" prop="contactAddress">
              <el-input placeholder="请输入联系地址" :maxlength="20" v-model.trim="editForm.contactAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input placeholder="请输入联系电话" :maxlength="15" v-model.trim="editForm.contactNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人" prop="contacts">
              <el-input placeholder="请输入联系人" :maxlength="20" v-model.trim="editForm.contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人手机号" prop="phoneNumber">
              <el-input placeholder="请输入联系人手机号" :maxlength="11" v-model.trim="editForm.phoneNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人邮箱" prop="mailbox">
              <el-input placeholder="请输入联系人邮箱" :maxlength="20" v-model.trim="editForm.mailbox"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户行" prop="depositBank">
              <el-input placeholder="请输入开户行" :maxlength="20" v-model.trim="editForm.depositBank"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户名" prop="accountName">
              <el-input placeholder="请输入开户名" :maxlength="20" v-model.trim="editForm.accountName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行账号" prop="bankAccountNumber">
              <el-input placeholder="请输入开户行账号" :maxlength="20" v-model.trim="editForm.bankAccountNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
              <el-form-item label="企业状态" prop="companyState">
              <el-radio v-model="editForm.companyState" :label='0' >停用</el-radio>
              <el-radio v-model="editForm.companyState" :label='1' >启用</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- v-model="editForm.businessLicense" -->
        <el-form-item label="营业执照" prop="businessLicense">
          <el-upload class="businessLicense" :data="updataAttr" :action="`${serverUrl}/FileController/upload`" list-type="picture-card" :limit="1"  :on-success="success" ref="updateFile" :on-exceed="onExceed">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)" >
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="经营范围" prop="businessScope">
          <el-input placeholder="请输入经营范围" :maxlength="250" type="textarea" :rows="3" v-model.trim="editForm.businessScope"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input placeholder="请输入描述" :maxlength="100" type="textarea" :rows="2" v-model.trim="editForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
          <el-button type="primary" @click="submitForm('editForm')">保存</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="viewImgVisible">
  <img width="100%" :src="viewImageUrl" alt="">
</el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { setserverInfo } from '@/plugins/api'
import { setCompanyData, setCompanyEdit } from '@/plugins/apis'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      serverUrl: __config.serverUrl,
      updataAttr: {
        token: Cookies.get('tokenb')
      },
      editForm: {},
      rules: {
        name: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
        organizationCode: [{required: true, message: '请输入组织机构代码', trigger: 'blur'}],
        openPermit: [{required: true, message: '请输入开户许可证号', trigger: 'blur'}],
        dutyParagraph: [{required: true, message: '请输入税号', trigger: 'blur'}],
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
      disabled: false,
      viewImgVisible: false,
      viewImageUrl: '',
      fileList: []
    }
  },
  created () {
    this.getCompanyData()
  },
  mounted () {

  },
  watch: {
    'editForm.phoneNumber': function (curVal, oldVal) {
      if (curVal) {
        this.editForm.phoneNumber = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join('') : ''
      }
    },
    'editForm.contactNumber': function (curVal, oldVal) {
      if (curVal) {
        this.editForm.contactNumber = curVal.match(/\d/gi) ? curVal.match(/[0-9-]/gi).join('') : ''
      }
    }
  },
  methods: {
    // 获取企业信息
    getCompanyData () {
      // setCompanyData({}).then((res) => {
      //   this.editForm = res[0]
      //   this.$nextTick(() => {
      //     if (this.editForm.businessLicense) {
      //       this.$refs.updateFile.uploadFiles = [{'uid': new Date().getTime(), 'url': this.editForm.businessLicense}]
      //     }
      //   })
      // })
    },
    // 修改企业信息
    submitForm () {
      // setCompanyEdit(this.editForm).then((res) => {
      //   this.$message({
      //     message: res,
      //     type: 'success'
      //   })
      // })
    },

    // 营业执照
    // 上传成功
    success (res) {
      this.editForm.businessLicense = res.data.path
    },
    // 删除
    handleRemove (file) {
      this.$refs.updateFile.handleRemove(file)
      this.editForm.businessLicense = ''
    },
    // 查看
    handlePictureCardPreview (file) {
      this.viewImageUrl = file.url
      this.viewImgVisible = true
    },
    // 下载
    handleDownload (file) {
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
      imgToBase64(file.url || file.response.data.path, '营业执照')
    },
    onExceed (res) {
      this.$message({
        message: '请不要重复添加！',
        type: 'warning'
      })
      // this.$refs.updateFile.uploadFiles = [{'uid': 1604152023401, 'url': 'http://dev.123456cc.cc:9000/filedb/filedb_1604152185030.ico'}]
      // this.editForm.businessLicense = 'http://dev.123456cc.cc:9000/filedb/filedb_1604152185030.ico'
    }
  }
}
</script>

<style scoped lang="less">
  .wrap{
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
      .wrapContent{
        padding: 20px 40px;
        min-width: 800px;
        .businessLicense{
          div{
            width:100%;
            height:100%;
          }
        }
      }
      .wrapHeader{
        font-size: 30px;
        padding: 0 10px 20px;
      }
  }
</style>

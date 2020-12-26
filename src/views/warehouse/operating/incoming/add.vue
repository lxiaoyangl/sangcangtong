<template>
  <div class="add" v-loading="loading">
    <div class="tips" v-show="isEdit">
      订单号: {{prevPageData.orderNo}} - 客户名称: {{prevPageData.customerName}} - 订单状态: {{prevPageData.orderState.description}} <span style="color: red"></span>
    </div>
    <div class="base-info">
      <p class="title">入仓基本信息</p>
    </div>

    <div class="detail_content_form">
      <el-form ref="application_form" :model="form" :rules="form_rules" :inline="true" label-position="left" label-width="125px">
        <el-form-item label="入仓名称" prop="inp1">
          <el-select clearable v-model="form.inp1" placeholder="请选择仓库" size="mini">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否平台派车" prop="inp12">
          <template>
            <el-radio v-model="form.inp12" :label="true">是</el-radio>
            <el-radio v-model="form.inp12" :label="false">否</el-radio>
          </template>
          <!--<el-select clearable v-model="form.inp12" placeholder="是否平台派车" size="mini">
            <el-option
                v-for="item in is_platform_send_car_arr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="计划入仓日期" prop="inp3">
          <el-date-picker
              v-model="form.inp3"
              type="date"
              placeholder="选择日期时间"
              size="mini"
              :picker-options="time_option">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发货点" prop="inp7">
          <el-input v-model="form.inp7" placeholder="发货点" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="运输方式" prop="inp2">
          <el-select clearable v-model="form.inp2" placeholder="请选择运输方式" size="mini">
            <el-option
                v-for="item in getAllDict('transportType')"
                :key="item.value"
                :label="item.dictLabel"
                :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货详细地址" prop="inp9">
          <el-input v-model="form.inp9" placeholder="发货详细地址" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="inp6">
          <el-select clearable v-model="form.inp6" placeholder="请选择客户" filterable size="mini">
            <el-option
                v-for="item in cusNameArr"
                :key="item.value"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="送货点" prop="inp8">
          <el-input v-model="form.inp8" placeholder="送货点" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="发货点联系人" prop="inp4">
          <el-input v-model="form.inp4" placeholder="请输入发货点联系人" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="发货点联系方式" prop="inp5">
          <el-input v-model="form.inp5" placeholder="货运联系方式" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="经办人" prop="inp10">
          <el-select clearable v-model="form.inp10" placeholder="请选择经办人" size="mini">
            <el-option
                v-for="item in operator"
                :key="item.value"
                filterable
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划发货日期" prop="inp15">
          <el-date-picker
              v-model="form.inp15"
              type="date"
              placeholder="选择日期时间"
              size="mini"
              :picker-options="time_option">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="inp16">
          <el-input type="textarea" v-model="form.inp16" placeholder="请输入备注" size="mini"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="base-info">
      <p class="title">入仓商品列表</p>
      <!--<div class="bi-content">
        <div class="bic-item" v-for="(i,index) in baseInfoArr" :key="index">
          <span class="label">{{i.name}}:</span>
          <span class="value">{{i.value}}</span>
        </div>
      </div>-->
    </div>

    <div>
      <el-button type="text" @click="add_goods" icon="el-icon-circle-plus-outline">新增</el-button>
      <el-button type="text" @click="del_goods" icon="el-icon-remove-outline" class="top_color_red">删除</el-button>
    </div>

    <div class="detail_content">
      <div class="detail_content_table">
        <div class="detail_content_table_box">
          <el-table
              :data="table_data"
              style="width: 100%"
              height="100%"
              stripe
              @selection-change="detail_table_selection_change"
              header-row-class-name="table_header"
          >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="name"
                label="品名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="placeOrigin"
                label="产地"
                width="100">
            </el-table-column>
            <el-table-column
                prop="textureMaterial"
                label="材质"
                width="100">
            </el-table-column>
            <el-table-column
                prop="specifications"
                label="规格"
                width="100">
            </el-table-column>

            <el-table-column
                prop="inPlanNum"
                label="计划入仓数量"
                width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inPlanNum" type="number" placeholder="计划入仓数量" size="mini" @input="enterNumber_change(scope.row)"></el-input>
              </template>
            </el-table-column>

            <el-table-column
                prop="numUnitId"
                label="数量单位"
                width="120">
              <template slot-scope="scope">
                <el-select clearable v-model="scope.row.numUnitId" placeholder="单位" size="mini">
                  <el-option
                      v-for="item in getAllDict('numunit')"
                      :key="item.value"
                      :label="item.dictLabel"
                      :value="item.dictValue">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
                prop="inPlanWeight"
                label="计划入库重量"
                width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inPlanWeight" type="number" placeholder="计划入库重量" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column
                prop="weightUnitId"
                label="重量单位"
                width="120">
              <template slot-scope="scope">
                <el-select clearable v-model="scope.row.weightUnitId" placeholder="单位" size="mini">
                  <el-option
                      v-for="item in getAllDict('weightunit')"
                      :key="item.value"
                      :label="item.dictLabel"
                      :value="item.dictValue">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
                prop="weightCoefficient"
                label="理重"
                width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.weightCoefficient" type="number" placeholder="理重" size="mini" @input="enterNumber_change(scope.row)"></el-input>
              </template>
            </el-table-column>

            <el-table-column
                prop="measureMethodId"
                label="计量方式"
                width="120">
              <template slot-scope="scope">
                <el-select clearable v-model="scope.row.measureMethodId" placeholder="计量方式" size="mini">
                  <el-option
                      v-for="item in getAllDict('measure_method')"
                      :key="item.value"
                      :id="typeof dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
                prop="carNum"
                label="车牌号"
                width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.carNum" placeholder="车牌号" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column
                prop="driver"
                label="司机"
                width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.driver" placeholder="司机" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column
                prop="idCardType"
                label="证件类型"
                width="150">
              <template slot-scope="scope">
                <el-select clearable v-model="scope.row.idCardType" placeholder="证件类型" size="mini">
                  <el-option
                      v-for="item in getAllDict('idType')"
                      :key="item.value"
                      :label="item.dictLabel"
                      :value="item.dictValue">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
                prop="idCardNum"
                label="证件号码"
                min-width="190">
              <template slot-scope="scope">
                <el-input v-model="scope.row.idCardNum" placeholder="证件号码" size="mini"></el-input>
              </template>
            </el-table-column>


            <el-table-column
                prop="contactPhone"
                label="联系电话"
                width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.contactPhone" placeholder="联系电话" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column
                prop="remark"
                label="备注"
                width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" placeholder="备注" size="mini"></el-input>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
    </div>


    <div class="sure-btn">
      <el-button type="primary" size="small"  @click="save">保存</el-button>
      <el-button plain size="small" @click="go_back">取消</el-button>
    </div>
    <!-- 新增物资蒙层 -->
    <BasisDialog
        :title="'物资选择'"
        :visible="add_dialog_flag"
        @cancel="add_dialog_before_close"
        @sure="add_dialog_sure"
        v-loading="goods_loading"
    >
      <div slot="dialog_content" class="dialog_content">
        <div class="dialog_content_form">
          <el-form ref="form" :model="add_dialog_form" :inline="true" label-width="100px">
            <el-form-item label="品名">
              <el-input v-model="add_dialog_form.name" placeholder="品名" size="mini" clearable></el-input>
            </el-form-item>

            <el-form-item label="材质">
              <el-input v-model="add_dialog_form.material" placeholder="材质" size="mini" clearable></el-input>
            </el-form-item>

            <!--<el-form-item label="规格">
              <el-input v-model="add_dialog_form.spec" placeholder="规格" size="mini" clearable></el-input>
            </el-form-item>

            <el-form-item label="产地">
              <el-input v-model="add_dialog_form.origin" placeholder="产地" size="mini" clearable></el-input>
            </el-form-item>-->

            <el-form-item label="">
              <el-button size="mini" icon="el-icon-search" type="primary" @click="get_goods">搜索</el-button>
              <el-button size="mini" icon="el-icon-refresh" type="info" @click="get_goods_refresh">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="dialog_content_table">
          <el-table
              ref="add_dialog_table"
              :data="add_dialog_table_data"
              style="width: 100%"
              height="100%"
              stripe
              @selection-change="add_dialog_table_selection_change"
              header-row-class-name="table_header"
          >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="materialName"
                label="品名"
                width="150">
            </el-table-column>
            <el-table-column
                prop="placeOrigin"
                label="产地"
                width="150">
            </el-table-column>
            <el-table-column
                prop="textureMaterial"
                label="材质"
                width="150">
            </el-table-column>
            <el-table-column
                prop="specifications"
                label="规格"
                width="150">
            </el-table-column>
            <el-table-column
                prop="unitQuantity"
                label="数量单位"
                width="150">
            </el-table-column>
            <el-table-column
                prop="weight"
                label="重量单位"
                width="150">
            </el-table-column>
            <!--<el-table-column
                prop="natureGoods"
                label="货物特性"
                width="100">
            </el-table-column>
            <el-table-column
                prop="mnemonicCode"
                label="物资代码"
                width="100">
            </el-table-column>
            <el-table-column
                prop="catalogName"
                label="品名大类"
                width="100">
            </el-table-column>-->
          </el-table>
        </div>
      </div>

      <div slot="dialog_page" class="dialog_page">
        <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="add_dialog_page_obj.total"
            :current-page="add_dialog_page_obj.page_num"
            :page-size="add_dialog_page_obj.page_size"
            @current-change="add_dialog_page_change">
        </el-pagination>
      </div>
    </BasisDialog>

    <!-- 附件 -->
    <BasisDialog
        :title="'附件上传'"
        :visible="enclosure_flag"
        @cancel="enclosure_before_close"
        @sure="enclosure_sure"
        v-loading="enclosure_loading"
    >
      <div slot="dialog_content" class="enclosure_dialog_content">
        <div class="enclosure_dialog_content_form">
          <el-upload
              class="upload-demo"
              :show-file-list="false"
              :auto-upload="false"
              action=""
              :on-change='enclosure_upload'
          >
            <span>上传新文件&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-button size="small" type="primary" icon="el-icon-upload2" :loading="enclosure_loading">点击上传</el-button>
          </el-upload>
        </div>

        <div class="enclosure_dialog_content_table">
          <el-table
              :data="enclosure_dialog_content_table_data"
              style="width: 100%"
              height="100%"
              stripe
              header-row-class-name="table_header"
          >
            <el-table-column
                prop="fileName"
                label="文件名称"
                min-width="180">
            </el-table-column>

            <el-table-column
                prop="fileType"
                label="类型"
                width="180">
            </el-table-column>

            <el-table-column
                prop="fileSize"
                label="大小(kb)"
                width="180">
            </el-table-column>

            <el-table-column
                label="操作"
                width="180">
              <template slot-scope="scope">
                <el-button type="text" @click="enclosure_dialog_content_table_data_del(scope.row)">删除</el-button>
                <el-button type="text" @click="download_file(scope.row)">下载</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
    </BasisDialog>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import {setDictionaryDataList} from '@/plugins/api'
  import config from "Public/config.js";
  import api_warehouse from "@/api/warehouse.js";
  import {getUserInfo, timestampToTime} from "../../../../utils";
  import {setCompanyData} from '@/plugins/apis'
  import {setUserList, loadDictList} from '@/plugins/api'

  export default {
    data() {
      return {
        loading: false,
        // 表单数据
        form: {
          inp1: null,
          inp2: null,
          inp3: '',
          inp4: '',
          inp5: '',
          inp6: '',
          inp7: '',
          inp8: '',
          inp9: '',
          inp10: '',
          inp11: '',
          inp12: 0,
          inp13: '',
          inp14: '',
          inp15: '',
          inp16: '',
        },
        form_rules: {
          inp1: {required: true, message: '请选择仓库', trigger: 'blur'},
          inp2: {required: true, message: '请选择运输方式', trigger: 'blur'},
          inp3: {required: true, message: '请选择入仓时间', trigger: 'blur'},
          inp4: {required: true, message: '请输入发货点联系人', trigger: 'blur'},
          inp5: [
            {required: true, message: '请输入发货点联系方式', trigger: 'blur'},
            {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码'}
          ],
          inp6: {required: true, message: '请输入客户名称', trigger: 'blur'},
          inp7: {required: true, message: '请输入发货点', trigger: 'blur'},
          inp8: {required: true, message: '请输入送货点', trigger: 'blur'},
          inp9: {required: true, message: '请输入发货详细地址', trigger: 'blur'},
          inp10: {required: true, message: '请输入联系人', trigger: 'blur'},
          /*inp11: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码'}
          ],*/
          inp12: {required: true, message: '请选择是否平台派车', trigger: 'blur'},
          inp15: {required: true, message: '请选择计划发货日期', trigger: 'blur'},
          inp16: {required: true, message: '请输入装车备注', trigger: 'blur'},
        },
        //客户名称下拉数据
        cusNameArr: [],
        operator: [],

        // 仓库下拉数据
        options: [],
        // 列表数据
        table_data: [],
        // 入库方式下拉数据数组
        inhouse_type_arr: [],
        // 是否平台派车
        is_platform_send_car_arr: [
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          }
        ],
        // 数量单位
        num_unit_arr: [],
        // 重量单位
        weight_unit_arr: [],
        // 货物性质下拉数据
        goods_type_arr: [],
        // 证件类型下拉数据
        idType_arr: [],
        // 计量方式
        valuationType_arr: [{value: 1, label: "方式1"}],

        // 新增蒙层显示标识
        add_dialog_flag: false,
        add_dialog_form: {
          name: "", // 品名
          material: '', // 材质
          spec: '', // 规格
          origin: '', // 产地
        },
        // 蒙层表格
        add_dialog_table_data: [],
        // 新增蒙层选中存贮数组
        add_dialog_selected_arr: [],
        // 详情列表选中存储数组
        detail_selected_arr: [],
        // 新增蒙层页码数据
        add_dialog_page_obj: {
          total: 0,
          page_num: 1,
          page_size: 20
        },
        // 物资的loading
        goods_loading: false,

        // 附件上传标识
        enclosure_loading: false,
        // 附件蒙层显示标识
        enclosure_flag: false,
        // 附件蒙层表格数据
        enclosure_dialog_content_table_data: [],

        // 准备上传的附件列表
        file_list: [],

        // 时间组件的范围确定
        time_option: {
          disabledDate(val) {
            return val.getTime() <= new Date(new Date().getTime() - 86400000).getTime()
          }
        },
        SITE_CONFIG: window.SITE_CONFIG,
      }
    },
    computed: {
      prevPageData() {
        let data = sessionStorage.getItem("tableRow")
        if (data) {
          return JSON.parse(data)
        } else {
          return {}
        }
      },
      isEdit(){
        return sessionStorage.getItem('warehouse-incoming-edit') === 'true'
      },

    },
    watch: {
      'enclosure_flag': function (val) {
        if (!val) {
          return;
        }
        if (sessionStorage.getItem('warehouse-incoming-edit') === 'false') {
          this.enclosure_dialog_content_table_data = [...this.file_list];
          console.log('1', this.file_list)
          return;
        }
        this.enclosure_loading = true;
        this.$axios.post('/applicationEnclosure/baseList', {
          applicationFormType: 0,
          applicationFormId: sessionStorage.getItem('warehouse-incoming-aplicationid') * 1,
        }).then(res => {
          console.log('附件', res);
          this.enclosure_dialog_content_table_data = [...res.data.data];
        }).finally(() => {
          this.enclosure_loading = false;
        })
      }
    },
    mounted() {
      // 获取入库下拉数据
      this.get_rktype();
      // 获取数量单位下拉数据
      this.$fn.get_numunit(this);
      // 获取重量单位下拉数据
      this.$fn.get_weightunit(this)
      // 获取货物特性
      this.$fn.get_goodsfeatures(this)
      // 获取证件类型下拉数据
      this.$fn.get_idType(this)
      // 获取计量方式下拉数据
      this.$fn.get_valuationType(this)
      // 获取仓库下拉数据
      this.get_warehouse_data();
      // 获取物资接口
      this.get_goods();
      //获取客户下拉数据
      setCompanyData({}).then((res) => {
        this.cusNameArr = res
      })
      //获取经办人数据
      setUserList({name: '**', phone: '**', userState: ''}).then(res => {
        this.operator = res.records;
      });

      // 判断是否是在编辑
      if (sessionStorage.getItem('warehouse-incoming-edit') === 'true') {
        // 申请单详情查询
        let obj = this.prevPageData;
        this.form.inp1 = obj.warehouseId;
        this.form.inp2 = obj.shippingTypeId;
        this.form.inp3 = obj.putInPlanDate;
        this.form.inp4 = obj.deliverName;
        this.form.inp5 = obj.deliverPhone;
        this.form.inp6 = obj.customerId;
        this.form.inp7 = obj.deliverPlace;
        this.form.inp8 = obj.acceptPlace;
        this.form.inp9 = obj.deliverLocation;
        this.form.inp10 = obj.operatorId;
        // this.form.inp11 = obj.consigneeNumber;
        this.form.inp12 = obj.isPlfDistVeh;
        this.form.inp15 = obj.deliverPlanDate;
        this.form.inp16 = obj.remark;


        // 物资查询
        /*this.$axios.post('/applicationInItem/baseList', {
          applicationId: sessionStorage.getItem('warehouse-incoming-aplicationid') * 1
        }).then(res => {
          this.table_data = [...res.data.data];
        })*/

      }
      //获取全部数据字典
      loadDictList({
        name: '**',
      }).then(res => {
        this.allDict = res;
        if (sessionStorage.getItem('warehouse-incoming-edit') === 'true') {
          this.getMaterialList();
        }
      });
    },
    methods: {
      //获取字典参数,主要用于下拉框选择参数
      getAllDict(dictType) {
        if (!this.allDict) {
          return []
        } else {
          let dict = this.allDict.find((item) => {
            return item.dictType === dictType
          });

          dict.dataList.forEach((item) => {
            item.dictValue = Number(item.dictValue)
          });

          return dict.dataList;
        }
      },
      //获取id对应的中文
      getNameById(dictType, id, field) {
        let data;
        if (typeof dictType === 'object') {
          data = dictType
        } else {
          data = this.getAllDict(dictType)
        }

        let obj = data.find(item => {
          if (field) {
            return item[field] == id;
          } else {
            return item.dictValue == id;
          }
        });

        return obj || {};

      },
      // 获取入库下拉信息
      get_rktype() {
        // setDictionaryDataList();
        this.$axios.post('/dictionaryData/baseList', {
          dictionaryType: 'rktype'
        }).then(res => {
          console.log(res);
          res.data.data.map(item => {
            item.label = item.labels;
            item.value = item.keyValue;
          })
          this.inhouse_type_arr = [...res.data.data];
        })
      },
      // 返回入库预报
      go_back() {
        this.$router.push({name: 'Incoming_homePage'})
      },
      // 蒙层关闭前触发函数
      add_dialog_before_close() {
        // 清空蒙层选中项
        this.$refs.add_dialog_table.clearSelection();
        this.add_dialog_flag = false;
      },
      // 新增物资
      add_goods() {
        this.add_dialog_table_data.map(item => {
          this.num_unit_arr.map(it => {
            if (it.value == item.num_unit) {
              item.num_unit_cn = it.label;
            }
          })

          this.weight_unit_arr.map(it => {
            if (it.value == item.weight_unit) {
              item.weight_unit_cn = it.label;
            }
          })

          this.goods_type_arr.map(it => {
            if (it.value == item.goods_type) {
              item.goods_type_cn = it.label;
            }
          })
        })
        this.add_dialog_flag = true;
      },
      // 删除物资
      del_goods() {
        if (this.detail_selected_arr.length === 0) {
          this.$fn.message('请选择物资再进行删除', 'error');
          return;
        }
        console.log('选中物资删除', this.detail_selected_arr);
        let arr = [];
        this.table_data.map(item => {
          let flag = false;
          this.detail_selected_arr.map(it => {
            if (it.id === item.id) {
              flag = true;
            }
          })
          if (!flag) {
            arr.push(item);
          }
        })
        this.table_data = [...arr];
      },
      // 物资详情多选选择函数
      detail_table_selection_change(val) {
        console.log('物资详情多选选择函数', val);
        this.detail_selected_arr = [...val];
      },
      // 新增蒙层多选改变函数
      add_dialog_table_selection_change(val) {
        console.log(val);
        this.add_dialog_selected_arr = [...val];
      },
      // 新增蒙层确认函数
      add_dialog_sure() {
        let arr = JSON.parse(JSON.stringify(this.add_dialog_selected_arr));
        arr.map(item => {
          item = Object.assign({}, item);
          this.table_data.push(item);
        })
        this.add_dialog_before_close();
      },

      // 获取仓库数据
      get_warehouse_data() {
        // 获取仓库数据
        this.$fn.get_warehouse_data(this).then(res => {
          console.log('res', res);
          this.options = [...res.data.data];
        }, err => {
          console.log('err', err);
        })
      },
      // 获取物资接口
      get_goods() {
        let senddata = {};
        if (this.add_dialog_form.name !== '') {
          senddata.name = this.add_dialog_form.name;
        }
        if (this.add_dialog_form.material !== '') {
          senddata.textureMaterial = this.add_dialog_form.material;
        }
        if (this.add_dialog_form.spec !== '') {
          senddata.specifications = this.add_dialog_form.spec;
        }
        if (this.add_dialog_form.origin !== '') {
          senddata.placeOrigin = this.add_dialog_form.origin;
        }
        this.goods_loading = true;
        this.$axios.post('/material/baseList?_pageList', {
          pageNo: this.add_dialog_page_obj.page_num,
          pageSize: this.add_dialog_page_obj.page_size,
          ...senddata
        }).then(res => {
          console.log('物资', res);
          res.data.data.records.map(item => {
            item.materialName = item.name
          })
          this.add_dialog_table_data = [...res.data.data.records];
          this.add_dialog_page_obj.total = res.data.data.total;
        }, err => {
          console.log('物资抛错', err);
        }).finally(() => {
          this.goods_loading = false;
        })
      },
      // 获取物资的重置
      get_goods_refresh() {
        this.add_dialog_form = {
          name: '',
          material: '',
          spec: '',
          origin: ''
        }
        this.get_goods();
      },
      // 新增蒙层页码改变函数
      add_dialog_page_change(val) {
        this.add_dialog_page_obj.page_num = val;
        this.get_goods();
      },
      // 保存触发函数
      save() {
        this.$confirm('保存申请单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.application_form.validate((valid) => {
            if (!valid) {
              return;
            }
            // 判断计划送达事件要大于计划装车时间
            /*if (this.form.inp12 == 1) {
              if (new Date(this.form.inp13).getTime() >= new Date(this.form.inp14).getTime()) {
                this.$message.error('计划送达事件需要大于计划装车时间');
                return;
              }
            }*/
            //重新匹配字段(后台字段和原始字段不匹配)
            let itemList = this.table_data.map((item) => {

              return {
                name: item.name,
                textureMaterial: item.textureMaterial,
                specifications: item.specifications,
                placeOrigin: item.placeOrigin,
                inPlanNum: item.inPlanNum,
                numUnitId: item.numUnitId,
                numUnit: this.getNameById('numunit', item.numUnitId).dictLabel,
                inPlanWeight: item.inPlanWeight,
                weightUnitId: item.weightUnitId,
                weightUnit: this.getNameById('weightunit', item.weightUnitId).dictLabel,
                weightCoefficient: item.weightCoefficient,
                measureMethodId: item.measureMethodId,
                measureMethod: this.getNameById('measure_method', item.measureMethodId).dictLabel,
                carNum: item.carNum,
                driver: item.driver,
                idCardType: item.idCardType,
                idCardNum: item.idCardNum,
                contactPhone: item.contactPhone,
                remark: item.remark,
                isRefer: true,
              }
            });

            let sendData = {
              documentState: 0,
              warehouseId: this.form.inp1,
              warehouseName: this.getNameById(this.options, this.form.inp1, 'id').name,
              shippingTypeId: this.form.inp2,
              shippingTypeName: this.getNameById('transportType', this.form.inp2).dictLabel,
              putInPlanDate: timestampToTime(this.form.inp3),
              deliverName: this.form.inp4,
              deliverPhone: this.form.inp5,
              customerId: this.form.inp6,
              customerName: this.getNameById(this.cusNameArr, this.form.inp6, 'id').name,
              deliverPlace: this.form.inp7,
              deliverLocation: this.form.inp8,
              loadingLocation: this.form.inp9,
              operatorId: this.form.inp10,
              operatorName: this.getNameById(this.operator, this.form.inp10, 'id').name,
              // goodsSenderPhone: this.form.inp11,
              isPlfDistVeh: this.form.inp12,
              deliverPlanDate: timestampToTime(this.form.inp15),
              acceptPlace: this.getNameById(this.options, this.form.inp1, 'id').name,
              remark: this.form.inp16,
              updateUserId: getUserInfo().userId,
              updateUser: getUserInfo().username,
              updateTime: timestampToTime(new Date()),
              // orderState:'',
              materialList: [...itemList],
              fileList: [...this.file_list]
            };
            this.options.map(item => {
              if (item.value === this.form.inp1) {
                sendData.warehouseName = item.label;
              }
            });
            /*if (this.form.inp12 === 1) {
              if (this.form.inp13) {
                sendData.loadingTime = this.$fn.timeChange(this.form.inp13);
              } else {
                this.$fn.message('请选择计划装车时间', 'error');
                return;
              }

              if (this.form.inp14) {
                sendData.serviceTime = this.$fn.timeChange(this.form.inp14);
              } else {
                this.$fn.message('请选择计划送达时间', 'error')
                return;
              }
            }*/
            this.loading = true;
            if (sessionStorage.getItem('warehouse-incoming-edit') === 'true') {
              let upData = {
                id: this.prevPageData.id,
                orderNo: this.prevPageData.orderNo,
              }
              api_warehouse.storage.updateStorage(this, {...sendData, ...upData}).then(res => {
                this.$message.info(res.data.msg);
                this.go_back();
              });
            } else {
              api_warehouse.storage.addStorage(this, sendData).then(()=>{
                this.$message.info(res.data.msg);
                this.go_back();
              });
            }


            /*this.$axios.post('/storage/apply/in/addStorage', sendData).then(res => {
              console.log('新增结果', res);
              // this.$message.success(res.data.data);
              this.go_back();
            }, err => {
              console.log('新增报错', err);
            })*/
          });
        }).catch(() => {

        });


      },
      // 提交触发函数
      submit() {
        return
        this.$confirm('提交申请单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.application_form.validate((valid) => {
            if (!valid) {
              return;
            }
            // 判断计划送达事件要大于计划装车时间
            if (this.form.inp12 == 1) {
              if (new Date(this.form.inp13).getTime() >= new Date(this.form.inp14).getTime()) {
                this.$message.error('计划送达事件需要大于计划装车时间')
                return;
              }
            }
            let sendData = {
              documentState: 1,
              warehouseId: this.form.inp1,
              inWarehouseId: this.form.inp2,
              arriveTime: this.$fn.timeChange(this.form.inp3),
              contacts: this.form.inp4,
              contactInformation: this.form.inp5,
              orderNumber: this.form.inp6,
              loadingPoint: this.form.inp7,
              unloadingPoint: this.form.inp8,
              shippingAddress: this.form.inp9,
              consignee: this.form.inp10,
              //consigneeNumber: this.form.inp11,
              isSendCar: this.form.inp12,
              itemList: [...this.table_data],
              fileList: [...this.file_list]
            }
            this.options.map(item => {
              if (item.value === this.form.inp1) {
                sendData.warehouseName = item.label;
              }
            })
            if (this.form.inp12 === 1) {
              if (this.form.inp13) {
                sendData.loadingTime = this.$fn.timeChange(this.form.inp13);
              } else {
                this.$fn.message('请选择计划装车时间', 'error')
                return;
              }

              if (this.form.inp14) {
                sendData.serviceTime = this.$fn.timeChange(this.form.inp14);
              } else {
                this.$fn.message('请选择计划送达时间', 'error')
                return;
              }
            }
            if (sessionStorage.getItem('warehouse-incoming-edit') === 'true') {
              sendData.id = sessionStorage.getItem('warehouse-incoming-aplicationid') * 1;
              this.$axios.post('/applicationIn/editApplicationIn', sendData).then(res => {
                console.log('修改结果', res);
                // this.$message.success(res.data.data);
                this.go_back();
              }, err => {
                console.log('修改报错', err);
              })
              return;
            }
            this.$axios.post('/applicationIn/addApplicationIn', sendData).then(res => {
              console.log('新增结果', res);
              // this.$message.success(res.data.data);
              this.go_back();
            }, err => {
              console.log('新增报错', err);
            })
          })
        }).catch(() => {

        });

      },
      // 附件蒙层关闭前触发函数
      enclosure_before_close() {
        this.enclosure_flag = false;
        this.enclosure_dialog_content_table_data = [];
      },
      // 附件蒙层确认函数
      enclosure_sure() {
        this.enclosure_flag = false;
        this.file_list = [...this.enclosure_dialog_content_table_data];
        this.enclosure_dialog_content_table_data = [];
      },
      // 文件上传
      enclosure_upload(val) {
        console.log(val);
        let formdata = new FormData();
        formdata.append('file', val.raw)
        this.enclosure_loading = true;
        this.$axios.post('/FileController/upload', formdata).then(res => {
          console.log('上传结果', res);
          this.enclosure_dialog_content_table_data.push(res.data.data);
          this.enclosure_dialog_content_table_data.map(item => {
            item.fileName = item.name;
            item.fileSize = item.size;
            item.fileType = item.type;
          })
        }, err => {
          console.log('上传报错', err);
        }).finally(() => {
          this.enclosure_loading = false;
        })
      },
      // 附件蒙层，文件删除
      enclosure_dialog_content_table_data_del(obj) {
        console.log('附件删除', obj)
        let arr = [];
        this.enclosure_dialog_content_table_data.map(item => {
          if (item.path !== obj.path) {
            arr.push(item);
          }
        })
        this.enclosure_dialog_content_table_data = [...arr];
      },
      // 计划入库数量修改
      enterNumber_change(val) {
        console.log(val);
        if (val.enterNumber < 0) {
          val.enterNumber = 0;
          val.enterWeight = 0;
          return;
        }
        val.enterWeight = val.enterNumber * val.weightCoefficient;
      },
      // 模板下载
      download_excel() {
        window.open('http://dev.123456cc.cc:4000/busfront-busproc/busfront-busproc/FHYBQY.xlsx');
      },
      // 数据导入 material/importExcel
      import_excel1(file, fileList) {
        let files = {0: file.raw}
        let that = this;
        console.log(files);
        if (files.length <= 0) {//如果没有文件名
          return false;
        } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
          this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
          return false;
        }

        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary'
            });
            const wsname = workbook.SheetNames[0];//取第一张表
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
            console.log(ws);
            // that.peopleArr = [];//清空接收数据
            // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == "" && that.peopleArr[0].enLine == ""){
            //     that.peopleArr = [];
            // }
            //重写数据
            try {
              let obj = {
                materialName: ws[0]['品名'],
                specifications: ws[0]['规格'],
                textureMaterial: ws[0]['材质'],
                placeOrigin: ws[0]['产地'],
                enterNumber: ws[0]['计划入库数量'],
                weightCoefficient: ws[0]['理重'],
                enterWeight: ws[0]['计划入库重量'],
                unitQuantity: ws[0]['数量单位'],
                unitWeight: ws[0]['重量单位'],
                measurementMethod: ws[0]['计量方式'],
                materialNature: ws[0]['物资性质'],
                licensePlateNumber: ws[0]['车牌号'],
                description: ws[0]['备注'],
              }
              this.table_data.push(obj);
            } catch (err) {
              console.log(err)
            }

            this.$refs.upload.value = '';

          } catch (e) {

            return false;
          }
        };
        fileReader.readAsBinaryString(files[0]);
      },
      // 数据导入后端处理
      import_excel(file, fileList) {
        let formdata = new FormData();
        formdata.append('file', file.raw)
        this.loading = true;
        this.$axios.post('/material/importExcel', formdata).then(res => {
          console.log('上传结果', res);
          // this.enclosure_dialog_content_table_data.push(res.data.data);
          // this.enclosure_dialog_content_table_data.map(item=>{
          //     item.fileName = item.name;
          //     item.fileSize = item.size;
          //     item.fileType = item.type;
          // })
          this.table_data = [...this.table_data, ...res.data.data];
        }, err => {
          console.log('上传报错', err);
        }).finally(() => {
          this.loading = false;
        })
      },

      // 附件文件下载操作
      download_file(obj) {
        console.log(obj);
        window.open(obj.path);
      },

      //获取商品数据
      getMaterialList() {
        let data = {
          orderNo: this.prevPageData.orderNo,
          /* pageNo: this.page.page_num,
           pageSize: this.page.page_size,*/
        };
        api_warehouse.storage.getMaterialList(this, data).then(res => {
          this.table_data = res.data.data.records
        })
      },
    },
    beforeDestroy() {
      //sessionStorage.removeItem('warehouse-incoming-edit');
    }
  }
</script>

<style lang="less" scoped>
  .cls {
    width: 100%;
  }

  .title {
    display: flex;
    align-items: center;
    height: 16px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;

    &:before {
      content: '';
      display: inline-block;
      margin-right: 5px;
      height: 100%;
      width: 3px;
      background: #409EFF;
    }
  }

  /deep/ .el-textarea__inner {
    min-height: 50px !important;
    max-height: 50px !important;
  }

  .detail_content {
    flex: 1;
  }

  /deep/ .detail_content_table {
    width: 100%;
    height: 100%;
    /*height: 600px;*/
    box-sizing: border-box;
    background: #fff;
    overflow: auto;

    .detail_content_table_btn {
      width: 100%;
      height: 40px;
      line-height: 40px;

      .upload-demo {
        display: inline-block;
        margin-left: 10px;
      }
    }

    .detail_content_table_box {
      width: 100%;
      height: 100%;
    }
  }

  /deep/ .dialog_content {
    width: 100%;
    // height: 500px;
    display: flex;
    flex-direction: column;

    .dialog_content_form {
      width: 100%;
    }

    .dialog_content_table {
      width: 100%;
      // flex: 1;
      height: 400px;
    }
  }

  /deep/ .import_dialog_content {
    width: 100%;
    height: 100px;
  }

  /deep/ .enclosure_dialog_content {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;

    .enclosure_dialog_content_form {
      width: 100%;
      height: 50px;
    }

    .enclosure_dialog_content_table {
      width: 100%;
      height: calc(100% - 50px);
    }
  }

  .add {
    display: flex;
    flex-flow: column;
    padding: 10px;
    overflow: auto;
    height: 100%;
    width: 100%;

    .tips {
      font-weight: bold;
      font-size: 15px;
      margin-bottom: 20px;
    }

    .detail_content_form {
      width: 700px;

      .el-form-item {
        margin-right: 20px;
      }

      /deep/ .el-textarea__inner {
        width: 500px;
      }
    }

    .detail_content {
      width: 100%;
      flex: 1;
      min-height: 200px;

      .el-select {
        width: 100% !important;
      }
    }

    .sure-btn {
      height: 50px;
      margin-top: 20px;
    }

  }


</style>
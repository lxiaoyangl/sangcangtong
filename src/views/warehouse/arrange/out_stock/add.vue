<template>
  <div class="add" v-loading="loading">
    <div class="tips" v-if="isEdit">
      {{ prevPageData.orderPlanNo }} -
      <span style="color: red">{{ prevPageData.orderState.description }}</span>
      - {{ prevPageData.customerName }}
    </div>
    <div class="base-info">
      <p class="title">入仓基本信息</p>
      <el-button type="primary" size="mini" @click="getQuoteOrder">引用入仓订单</el-button>
    </div>
    <!--新增的表单-->
    <div v-if="!isEdit" class="detail_content_form">
      <el-form
          class="my-el-form"
          ref="application_form"
          :model="form"
          :rules="form_rules"
          :inline="true"
          label-position="right"
          label-width="125px"
      >
        <div>
          <el-form-item label="订单号" prop="inp1" style="width: 100%">
            <el-input type="text" v-model="form.inp1" placeholder="订单号" readonly size="mini"></el-input>
          </el-form-item>
          <el-form-item label="客户名称" prop="inp2">
            <el-select clearable v-model="form.inp2" placeholder="请选择客户" filterable size="mini">
              <el-option v-for="item in cusNameArr" :key="item.value" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="入仓名称" prop="inp3">
            <el-select clearable v-model="form.inp3" placeholder="请选择仓库" filterable size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="计划入仓日期" prop="inp4">
            <el-date-picker v-model="form.inp4" type="date" placeholder="选择日期时间" size="mini" :picker-options="time_option">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="运输方式" prop="inp5">
            <el-select clearable v-model="form.inp5" placeholder="请选择运输方式" filterable size="mini">
              <el-option v-for="item in getAllDict('transportType')" :key="item.value" :label="item.dictLabel" :value="item.dictValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号" prop="inp6" style="width: 100%">
            <el-input type="text" v-model="form.inp6" placeholder="车牌号" readonly size="mini"></el-input>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="司机" prop="inp7">
            <el-input type="text" v-model="form.inp7" placeholder="司机" size="mini"></el-input>
          </el-form-item>
          <div class="id-info">
            <el-form-item label="证件信息" prop="inp8">
              <el-select style="width: 80% !important;" clearable v-model="form.inp8" placeholder="证件信息" filterable size="mini">
                <el-option v-for="item in getAllDict('idType')" :key="item.value" :label="item.dictLabel" :value="item.dictLabel">
                </el-option>
              </el-select>
              <el-input type="text" v-model="form.inp9" placeholder="证件号码" size="mini"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="联系电话" prop="inp10" style="width: 100%">
            <el-input type="text" v-model="form.inp10" placeholder="联系电话" size="mini"></el-input>
          </el-form-item>
        </div>

        <div style="margin-top: 5px">
          <el-form-item label="备注" prop="inp11" style="width: 100%">
            <el-input
                style="padding-bottom: 10px"
                type="textarea"
                v-model="form.inp11"
                placeholder="请输入备注"
                size="medium"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="附件" prop="inp11" style="width: 100%">
            <el-button
                type="text"
                size="medium"
                class="s-button"
                icon="el-icon-document"
                @click="enclosure_flag = true"
            >上传附件
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--修改的表单-->
    <div v-if="isEdit" class="detail_content_form">
      <el-form
          class="my-el-form"
          ref="application_form"
          :model="form"
          :rules="form_rules"
          :inline="true"
          label-position="right"
          label-width="125px"
      >
        <div>
          <el-form-item label="订单号" prop="inp1" style="width: 100%">
            <el-input type="text" v-model="form.inp1" placeholder="订单号" readonly size="mini"></el-input>
          </el-form-item>
          <el-form-item label="客户名称" prop="inp2">
            <el-select clearable v-model="form.inp2" placeholder="请选择客户" filterable size="mini">
              <el-option v-for="item in cusNameArr" :key="item.value" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="入仓名称" prop="inp3">
            <el-select clearable v-model="form.inp3" placeholder="请选择仓库" filterable size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="计划入仓日期" prop="inp4">
            <el-date-picker v-model="form.inp4" type="date" placeholder="选择日期时间" size="mini" :picker-options="time_option">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="运输方式" prop="inp5">
            <el-select clearable v-model="form.inp5" placeholder="请选择运输方式" filterable size="mini">
              <el-option v-for="item in getAllDict('transportType')" :key="item.value" :label="item.dictLabel" :value="item.dictValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号" prop="inp6" style="width: 100%">
            <el-input type="text" v-model="form.inp6" placeholder="车牌号" readonly size="mini"></el-input>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="司机" prop="inp7">
            <el-input type="text" v-model="form.inp7" placeholder="司机" size="mini"></el-input>
          </el-form-item>
          <div class="id-info">
            <el-form-item label="证件信息" prop="inp8">
              <el-select style="width: 80% !important;" clearable v-model="form.inp8" placeholder="证件信息" filterable size="mini">
                <el-option v-for="item in getAllDict('idType')" :key="item.value" :label="item.dictLabel" :value="item.dictLabel">
                </el-option>
              </el-select>
              <el-input type="text" v-model="form.inp9" placeholder="证件号码" size="mini"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="联系电话" prop="inp10" style="width: 100%">
            <el-input type="text" v-model="form.inp10" placeholder="联系电话" size="mini"></el-input>
          </el-form-item>
        </div>

        <div style="margin-top: 5px">
          <el-form-item label="备注" prop="inp11" style="width: 100%">
            <el-input
                style="padding-bottom: 10px"
                type="textarea"
                v-model="form.inp11"
                placeholder="请输入备注"
                size="medium"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="附件" prop="inp11" style="width: 100%">
            <el-button
                type="text"
                size="medium"
                class="s-button"
                icon="el-icon-document"
                @click="enclosure_flag = true"
            >上传附件
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--商品信息-->
    <div class="base-info">
      <p class="title">入仓商品信息</p>
      <el-button type="primary" @click="add_goods" size="mini">添加商品信息</el-button>
    </div>
    <div class="detail_content">
      <div class="detail_content_table">
        <div class="detail_content_table_box">
          <el-table
              :data="table_data"
              style="width: 100%"
              height="100%"
              stripe
              :fit="true"
              border
              header-row-class-name="table_header"
              highlight-current-row
              :row-class-name="tableRowClassName"
              @row-click="detail_table_selection_change"
          >
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="name" label="品名" min-width="100">
            </el-table-column>
            <el-table-column prop="placeOrigin" label="产地" min-width="80">
            </el-table-column>
            <el-table-column prop="textureMaterial" label="材质" min-width="80">
            </el-table-column>
            <el-table-column prop="specifications" label="规格" min-width="80">
            </el-table-column>
            <el-table-column prop="weightCoefficient" label="理重" min-width="80">
            </el-table-column>
            <el-table-column prop="inPlanNum" label="计划入仓数量" min-width="100">
            </el-table-column>
            <el-table-column prop="numUnit" label="数量单位" min-width="80">
            </el-table-column>
            <el-table-column prop="inPlanWeight" label="计划入仓重量" min-width="100">
            </el-table-column>
            <el-table-column prop="weightUnit" label="重量单位" min-width="80">
            </el-table-column>
            <el-table-column prop="measureMethod" label="计量方式" min-width="80">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="base-info">
      <p class="title">{{c_single_M_tip}}</p>
      <el-button type="primary" size="mini" @click="add_bp">新建入仓库位编排</el-button>
    </div>
    <!--库位编排-->
    <div class="detail_content">
      <div class="detail_content_table">
        <div class="detail_content_table_box tableButton">
          <el-table
              :data="bp_row"
              style="width: 100%"
              height="100%"
              stripe
              :fit="true"
              border
              header-row-class-name="table_header"
          >
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="warehouseLocation" label="库区库位" min-width="100">
              <template slot-scope="scope">
                <el-select v-show="scope.row.isEdit" clearable v-model="scope.row.warehouseLocation" placeholder="请选择区域" filterable size="mini">
                  <el-option v-for="item in getAllDict('warehouse_area')" :label="item.dictLabel" :value="item.dictLabel">
                  </el-option>
                </el-select>
                <span v-show="!scope.row.isEdit">{{scope.row.warehouseLocation}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="inPlanNum" label="计划存放数量" min-width="80">
              <template slot-scope="scope">
                <el-input v-show="scope.row.isEdit" v-model="scope.row.inPlanNum" type="number" placeholder="计划入仓数量" size="mini"></el-input>
                <span v-show="!scope.row.isEdit">{{scope.row.inPlanNum}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="inPlanWeight" label="计划存放重量" min-width="80">
              <template slot-scope="scope">
                <el-input v-show="scope.row.isEdit" v-model="scope.row.inPlanWeight" type="number" placeholder="计划入仓数量" size="mini"></el-input>
                <span v-show="!scope.row.isEdit">{{scope.row.inPlanWeight}}</span>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
              <template slot-scope="scope">
                <el-tooltip v-show="scope.row.isEdit" effect="dark" content="保存" placement="top">
                  <el-button @click.native.prevent="saveRow(scope.$index, bp_row)" type="primary" icon="el-icon-folder-checked" circle></el-button>
                </el-tooltip>
                <el-tooltip v-show="scope.row.isEdit" effect="dark" content="取消" placement="top">
                  <el-button @click.native.prevent="cancelRow(scope.$index, bp_row)" type="primary" icon="el-icon-remove-outline" circle></el-button>
                </el-tooltip>
                <el-tooltip v-show="!scope.row.isEdit" effect="dark" content="编辑" placement="top">
                  <el-button @click.native.prevent="editRow(scope.$index, bp_row)" type="primary" icon="el-icon-edit" circle></el-button>
                </el-tooltip>
                <el-tooltip v-show="!scope.row.isEdit" effect="dark" content="删除" placement="top">
                  <el-button @click.native.prevent="deleteRow(scope.$index, bp_row)" type="primary" icon="el-icon-circle-close" circle></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>


    <div class="sure-btn">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button plain size="small" @click="go_back">取消</el-button>
    </div>

    <!-- 入仓订单信息 -->
    <BasisDialog
        :title="'入仓订单'"
        :visible="material_flag"
        @cancel="order_before_close"
        @sure="material_sure"
        v-loading="false"
        width="90%"
    >
      <div slot="dialog_content" class="dialog_content">
        <div class="dialog_content_form dia-search-item">
          <el-form
              ref="form"
              :model="add_dialog_form"
              :inline="true"
              label-width="100px"
          >
            <el-form-item label="入仓订单号">
              <el-input
                  v-model="search.orderNo"
                  placeholder="入仓订单号"
                  size="mini"
                  clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="车牌号">
              <el-input
                  v-model="search.carNum"
                  placeholder="车牌号"
                  size="mini"
                  clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="入仓名称">
              <div class="efi-div">
                <el-select
                    clearable
                    v-model="search.warehouseName"
                    placeholder="请选择仓库"
                    filterable
                    size="mini"
                >
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>

            <el-form-item label="客户名称">
              <el-select
                  clearable
                  v-model="search.cusName"
                  placeholder="请选择客户"
                  filterable
                  size="mini"
              >
                <el-option
                    v-for="item in cusNameArr"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="">
              <el-button
                  size="mini"
                  icon="el-icon-search"
                  type="primary"
                  @click="searchAllMaterialListItem"
              >查询
              </el-button
              >
              <el-button
                  size="mini"
                  icon="el-icon-refresh"
                  type="info"
                  @click="resetAllMaterialList"
              >重置
              </el-button
              >
            </el-form-item>
          </el-form>
        </div>

        <div id="scrollTable" class="dialog_content_table">
          <el-table
              ref="add_dialog_table"
              :data="allMaterialList"
              style="width: 100%"
              height="100%"
              stripe
              @selection-change="add_dialog_table_selection_change"
              header-row-class-name="table_header"
              v-tableLoadMore="loadMore"
          >
            <el-table-column width="55">
              <template scope="scope">
                <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentMaterialRow(scope.row)">&nbsp;</el-radio>
              </template>
            </el-table-column>

            <el-table-column prop="orderNo" label="入仓订单" width="150"></el-table-column>
            <el-table-column prop="carNum" label="车牌号" width="90"></el-table-column>
            <el-table-column prop="warehouseName" label="入仓名称" width="100"></el-table-column>
            <el-table-column prop="putInPlanDate" label="计划入仓日期" width="120">
              <template slot-scope="scope">
                {{scope.row.putInPlanDate.slice(0,10)}}
              </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称" width="100"></el-table-column>
            <el-table-column prop="shippingTypeName" label="运输方式" width="70"></el-table-column>
            <el-table-column prop="driver" label="司机" width="70"></el-table-column>
            <el-table-column prop="weight" label="证件信息" width="280">
              <template slot-scope="scope">
                {{scope.row.idCardType + ': ' + scope.row.idCardNum}}
              </template>
            </el-table-column>
            <el-table-column prop="contactPhone" label="联系电话" width="150"></el-table-column>
            <el-table-column prop="remark" label="备注" min-width="150">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.remark" placement="top">
                  <span>{{scope.row.remark}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--<div slot="dialog_page" class="dialog_page">
        <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="add_dialog_page_obj.total"
            :current-page="add_dialog_page_obj.page_num"
            :page-size="add_dialog_page_obj.page_size"
            @current-change="add_dialog_page_change"
        >
        </el-pagination>
      </div>-->
    </BasisDialog>

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
          <el-form
              ref="form"
              :model="add_dialog_form"
              :inline="true"
              label-width="100px"
          >
            <el-form-item label="品名">
              <el-input
                  v-model="add_dialog_form.name"
                  placeholder="品名"
                  size="mini"
                  clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="材质">
              <el-input
                  v-model="add_dialog_form.material"
                  placeholder="材质"
                  size="mini"
                  clearable
              ></el-input>
            </el-form-item>

            <!--<el-form-item label="规格">
              <el-input v-model="add_dialog_form.spec" placeholder="规格" size="mini" clearable></el-input>
            </el-form-item>

            <el-form-item label="产地">
              <el-input v-model="add_dialog_form.origin" placeholder="产地" size="mini" clearable></el-input>
            </el-form-item>-->

            <el-form-item label="">
              <el-button
                  size="mini"
                  icon="el-icon-search"
                  type="primary"
                  @click="add_goods('search')"
              >搜索
              </el-button
              >
              <el-button
                  size="mini"
                  icon="el-icon-refresh"
                  type="info"
                  @click="get_goods_refresh"
              >重置
              </el-button
              >
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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="品名" min-width="100">
            </el-table-column>
            <el-table-column prop="placeOrigin" label="产地" width="80">
            </el-table-column>
            <el-table-column prop="textureMaterial" label="材质" width="80">
            </el-table-column>
            <el-table-column prop="specifications" label="规格" width="80">
            </el-table-column>
            <el-table-column prop="weightCoefficient" label="理重" width="80">
            </el-table-column>
            <el-table-column prop="inPlanNum" label="计划入仓数量" width="100">
            </el-table-column>
            <el-table-column prop="numUnit" label="数量单位" width="80">
            </el-table-column>
            <el-table-column prop="inPlanWeight" label="计划入仓重量" width="100">
            </el-table-column>
            <el-table-column prop="weightUnit" label="重量单位" width="80">
            </el-table-column>
            <el-table-column prop="measureMethod" label="计量方式" width="80">
            </el-table-column>
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
            @current-change="add_dialog_page_change"
        >
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
              :on-change="enclosure_upload"
          >
            <span>上传新文件&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-button
                size="small"
                type="primary"
                icon="el-icon-upload2"
                :loading="enclosure_loading"
            >点击上传
            </el-button
            >
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
            <el-table-column prop="fileName" label="文件名称" min-width="180">
            </el-table-column>

            <el-table-column prop="fileType" label="类型" width="180">
            </el-table-column>

            <el-table-column prop="fileSize" label="大小(kb)" width="180">
            </el-table-column>

            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                    type="text"
                    @click="enclosure_dialog_content_table_data_del(scope.row)"
                >删除
                </el-button
                >
                <el-button type="text" @click="download_file(scope.row)"
                >下载
                </el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </BasisDialog>
  </div>
</template>

<script>
  import XLSX from "xlsx";
  import {setDictionaryDataList} from "@/plugins/api";
  import config from "Public/config.js";
  import api_warehouse from "@/api/warehouse.js";
  import {getUserInfo, timestampToTime} from "@/utils";
  import {setCompanyData} from "@/plugins/apis";
  import {setUserList, loadDictList} from "@/plugins/api";

  export default {
    directives: {
      tableLoadMore: {
        bind(el, binding) {
          const selectWrap = el.querySelector(".el-table__body-wrapper");
          console.log(selectWrap);
          selectWrap.addEventListener("scroll", function () {
            if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
              binding.value();
            }
          });
        },
      },
    },
    data() {
      return {
        loading: false,
        // 表单数据
        form: {
          inp1: null,
          inp2: null,
          inp3: "",
          inp4: "",
          inp5: "",
          inp6: "",
          inp7: "",
          inp8: "",
          inp9: "",
          inp10: "",
          inp11: "",
          inp12: false,
          inp13: "",
          inp14: "",
          inp15: "",
          inp16: "",
        },
        /*form_rules: {

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
            /!*inp11: [
              {required: true, message: '请输入联系电话', trigger: 'blur'},
              {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码'}
            ],*!/
            inp12: {required: true, message: '请选择是否平台派车', trigger: 'blur'},
            inp15: {required: true, message: '请选择计划发货日期', trigger: 'blur'},
            inp16: {required: true, message: '请输入装车备注', trigger: 'blur'},

          },*/
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
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
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
          material: "", // 材质
          spec: "", // 规格
          origin: "", // 产地
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
          page_size: 20,
        },
        // 物资的loading
        goods_loading: false,

        // 附件上传标识
        enclosure_loading: false,
        // 附件蒙层显示标识
        enclosure_flag: false,
        //订单蒙层显示标识
        material_flag: false,
        // 附件蒙层表格数据
        enclosure_dialog_content_table_data: [],

        // 准备上传的附件列表
        file_list: [],

        // 时间组件的范围确定
        time_option: {
          disabledDate(val) {
            return (
              val.getTime() <= new Date(new Date().getTime() - 86400000).getTime()
            );
          },
        },
        SITE_CONFIG: window.SITE_CONFIG,

        //订单列表数据
        orderList: [],
        //订单分页数据
        page: {
          page_num: 1,
          page_size: 20,
          total: 0,
        },
        //订单搜索条件
        search: {
          customerName: "",
          warehouseName: "",
          orderNo: "",
          carNum: "",
        },
        allMaterialList: [], //所有商品列表
        radio: '',//单选表格,
        currentMaterialRow: {},//当前选择商品列表
        sureRow: {}, //点击确定之后所选的row
        single_M_row: {},// 入仓商品信息单选
        bp_row: [],//编排表格数据
      };
    },
    computed: {
      prevPageData() {
        let data = sessionStorage.getItem("tableRow");
        if (data) {
          return JSON.parse(data);
        } else {
          return {orderState: ""};
        }
      },
      c_single_M_tip() {
        if (!this.single_M_row || !this.single_M_row.name) {
          return ''
        } else {
          let row = this.single_M_row;
          return `${row.name}  【${row.specifications}】| ${row.inPlanWeight}${row.weightUnit} `
        }
      },
      isEdit() {
        return sessionStorage.getItem("warehouse-incoming-edit") === "true";
      },
      form_rules() {
        return {
          inp1: {required: true, message: "请选择仓库", trigger: "blur"},
          inp2: {required: true, message: "请选择客户", trigger: "blur"},
          inp3: {required: true, message: "请选择入仓名称", trigger: "blur"},
          inp4: {
            required: true,
            message: "请选择计划入仓日期",
            trigger: "blur",
          },
          inp5: {required: true, message: "请选择运输方式", trigger: "blur"},
          inp6: {required: true, message: "请输入车牌号", trigger: "blur"},
          inp7: {
            required: true,
            message: "请输入司机",
            trigger: "blur",
          },
          inp8: {required: true, message: "请选择证件信息", trigger: ["blur", "change"]},
          inp9: {
            required: true,
            message: "请输入证件号码",
            trigger: "blur",
          },
          inp10: [
            {
              required: true,
              message: "请输入联系电话",
              trigger: "blur",
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: "目前只支持中国大陆的手机号码",
            },
          ],
          /*inp11: [
              {required: true, message: '请输入联系电话', trigger: 'blur'},
              {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码'}
            ],*/
        };
      },
    },
    watch: {
      enclosure_flag: function (val) {
        /* if (!val) {
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
           })*/
      },
      "form.inp12"(newVal, oldVal) {
        /* if (!newVal) {
           this.form.inp7 = "";
           this.form.inp9 = "";
           this.form.inp4 = "";
           this.form.inp5 = "";
           this.form.inp15 = "";
         }*/
      },
    },
    mounted() {
      // 获取入库下拉数据
      this.get_rktype();
      // 获取数量单位下拉数据
      this.$fn.get_numunit(this);
      // 获取重量单位下拉数据
      this.$fn.get_weightunit(this);
      // 获取货物特性
      this.$fn.get_goodsfeatures(this);
      // 获取证件类型下拉数据
      this.$fn.get_idType(this);
      // 获取计量方式下拉数据
      this.$fn.get_valuationType(this);
      // 获取仓库下拉数据
      this.get_warehouse_data();
      // 获取物资接口
      this.get_goods();
      //获取客户下拉数据
      setCompanyData({}).then((res) => {
        this.cusNameArr = res;
      });
      //获取经办人数据
      setUserList({name: "**", phone: "**", userState: ""}).then((res) => {
        this.operator = res.records;
      });

      // 判断是否是在编辑
      if (sessionStorage.getItem("warehouse-incoming-edit") === "true") {
        // 申请单详情查询
        let obj = this.prevPageData;
        console.log(this.prevPageData);
        this.form.inp1 = obj.orderApplyNo;
        this.form.inp2 = obj.customerId;
        this.form.inp3 = obj.warehouseId;
        this.form.inp4 = obj.putInPlanDate;
        this.form.inp5 = obj.shippingTypeId;
        this.form.inp6 = obj.carNum;
        this.form.inp7 = obj.driver;
        this.form.inp8 = obj.idCardType;
        this.form.inp9 = obj.idCardNum;
        this.form.inp10 = obj.contactPhone;
        this.form.inp11 = obj.remark;
      }
      //获取全部数据字典
      loadDictList({
        name: "**",
      }).then((res) => {
        this.allDict = res;
        if (sessionStorage.getItem("warehouse-incoming-edit") === "true") {
          this.getMaterialList();
          this.getUploadList();
        }
      });
      this.getAllMaterialList();
    },
    methods: {
      //获取字典参数,主要用于下拉框选择参数
      getAllDict(dictType) {
        if (!this.allDict) {
          return [];
        } else {
          let dict = this.allDict.find((item) => {
            return item.dictType === dictType;
          });
          dict.dataList.forEach((item) => {
            if (!isNaN(Number(item.dictValue))) {
              item.dictValue = Number(item.dictValue);
            }
          });
          return dict.dataList;
        }
      },
      //获取id对应的中文
      getNameById(dictType, id, field) {
        let data;
        if (typeof dictType === "object") {
          data = dictType;
        } else {
          data = this.getAllDict(dictType);
        }

        let obj = data.find((item) => {
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
        this.$axios
          .post("/dictionaryData/baseList", {
            dictionaryType: "rktype",
          })
          .then((res) => {
            console.log(res);
            res.data.data.map((item) => {
              item.label = item.labels;
              item.value = item.keyValue;
            });
            this.inhouse_type_arr = [...res.data.data];
          });
      },
      // 返回入库预报
      go_back() {
        this.$router.push({name: "arrange_incoming_homePage"});
      },
      // 蒙层关闭前触发函数
      add_dialog_before_close() {
        // 清空蒙层选中项
        this.$refs.add_dialog_table.clearSelection();
        this.add_dialog_flag = false;
      },
      // 新增物资
      add_goods(isSearch) {
        if (!this.form.inp1) {
          this.$alert("请先引用入仓订单");
          return
        }
        let data = {};
        if (!isSearch) {
          data = {orderNo: this.form.inp1}
        } else {
          data = {
            orderNo: this.form.inp1,
            name: this.add_dialog_form.name,
            material: this.add_dialog_form.material
          }
        }
        api_warehouse.storage.getMaterialList(this, data).then((res) => {
          this.add_dialog_table_data = [...res.data.data.records];
          this.add_dialog_page_obj.total = res.data.data.total;
        });
        this.add_dialog_flag = true;
      },
      // 删除物资
      del_goods() {
        if (this.detail_selected_arr.length === 0) {
          this.$fn.message("请选择物资再进行删除", "error");
          return;
        }
        console.log("选中物资删除", this.detail_selected_arr);
        let arr = [];
        this.table_data.map((item) => {
          let flag = false;
          this.detail_selected_arr.map((it) => {
            if (it.id === item.id) {
              flag = true;
            }
          });
          if (!flag) {
            arr.push(item);
          }
        });
        this.table_data = [...arr];
      },
      //获取入仓商品信息表格index
      tableRowClassName({row, rowIndex}) {
        row.index = rowIndex;

      },
      // 物资详情多选选择函数
      detail_table_selection_change(row) {
        this.single_M_row = row;
        if (this.isEdit) {
          api_warehouse.arrange.getLocationList(this, {orderNo: row.orderNo}).then(res => {
            this.bp_row = res.data.data.records;
            this.bp_row.forEach(item => {
              item.isEdit = true;
            });
          });

        } else {
          alert(1)
          this.bp_row = row.materialLocationList || [];
        }
      },
      // 新增蒙层多选改变函数
      add_dialog_table_selection_change(val) {
        console.log(val);
        this.add_dialog_selected_arr = [...val];
      },
      // 新增蒙层确认函数
      add_dialog_sure() {
        let arr = JSON.parse(JSON.stringify(this.add_dialog_selected_arr));
        arr.map((item) => {
          item = Object.assign({}, item);
          this.table_data.push(item);
        });
        this.add_dialog_before_close();
      },

      // 获取仓库数据
      get_warehouse_data() {
        // 获取仓库数据
        this.$fn.get_warehouse_data(this).then(
          (res) => {
            console.log("res", res);
            this.options = [...res.data.data];
          },
          (err) => {
            console.log("err", err);
          }
        );
      },
      // 获取物资接口
      get_goods() {
        let senddata = {};
        if (this.add_dialog_form.name !== "") {
          senddata.name = this.add_dialog_form.name;
        }
        if (this.add_dialog_form.material !== "") {
          senddata.textureMaterial = this.add_dialog_form.material;
        }
        if (this.add_dialog_form.spec !== "") {
          senddata.specifications = this.add_dialog_form.spec;
        }
        if (this.add_dialog_form.origin !== "") {
          senddata.placeOrigin = this.add_dialog_form.origin;
        }
        this.goods_loading = true;
        this.$axios
          .post("/material/baseList?_pageList", {
            pageNo: this.add_dialog_page_obj.page_num,
            pageSize: this.add_dialog_page_obj.page_size,
            ...senddata,
          }).then((res) => {
            res.data.data.records.map((item) => {
              item.materialName = item.name;
            });
            this.add_dialog_table_data = [...res.data.data.records];
            this.add_dialog_page_obj.total = res.data.data.total;
          },
          (err) => {
            console.log("物资抛错", err);
          }
        )
          .finally(() => {
            this.goods_loading = false;
          });
      },
      // 获取物资的重置
      get_goods_refresh() {
        this.add_dialog_form = {
          name: "",
          material: "",
          spec: "",
          origin: "",
        };
        this.get_goods();
      },
      // 新增蒙层页码改变函数
      add_dialog_page_change(val) {
        this.add_dialog_page_obj.page_num = val;
        this.get_goods();
      },
      // 保存触发函数
      save() {
        this.$confirm("保存申请单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$refs.application_form.validate((valid) => {
            if (!valid) {
              return;
            }
            //重新匹配字段(后台字段和原始字段不匹配)
            let itemList = this.table_data.map((item) => {
              return {
                name: item.name,
                textureMaterial: item.textureMaterial,
                specifications: item.specifications,
                placeOrigin: item.placeOrigin,
                inPlanNum: item.inPlanNum,
                numUnitId: item.numUnitId,
                numUnit: this.getNameById("numunit", item.numUnitId).dictLabel,
                inPlanWeight: item.inPlanWeight,
                weightUnitId: item.weightUnitId,
                weightUnit: this.getNameById("weightunit", item.weightUnitId).dictLabel,
                weightCoefficient: item.weightCoefficient,
                measureMethodId: item.measureMethodId,
                measureMethod: this.getNameById("measure_method", item.measureMethodId).dictLabel,
                carNum: item.carNum,
                driver: item.driver,
                idCardType: item.idCardType,
                idCardNum: item.idCardNum,
                contactPhone: item.contactPhone,
                remark: item.remark,
                isRefer: true,
              };
            });

            /*let sendData = {
              documentState: 0,
              orderNo: this.form.inp1,
              customerId: this.form.inp2,
              customerName: this.getNameById(this.cusNameArr, this.form.inp2, "id").name,
              warehouseId: this.form.inp3,
              warehouseName: this.getNameById(this.options, this.form.inp3, 'id').name,
              putInPlanDate: timestampToTime(this.form.inp4),
              shippingTypeId: this.form.inp5,
              shippingTypeName: this.getNameById("transportType", this.form.inp5).dictLabel,
              carNum:this.form.inp6,
              driver:this.form.inp7,
              idCardType:this.getNameById("idType", this.form.inp8).dictLabel,
              idCardNum:this.form.inp9,
              contactPhone:this.form.inp10,
              remark:this.form.inp11,
              customerNo:'',

             /!* deliverPlace: this.form.inp7,
              deliverLocation: this.form.inp9,
              loadingLocation: this.form.inp8,
              operatorId: this.form.inp10,
              operatorName: this.getNameById(this.operator, this.form.inp10, "id").name,
              // goodsSenderPhone: this.form.inp11,
              isPlfDistVeh: this.form.inp12,
              deliverPlanDate: timestampToTime(this.form.inp15),
              acceptPlace: this.getNameById(this.options, this.form.inp1, "id").name,
              remark: this.form.inp16,
              updateUserId: getUserInfo().userId,
              updateUser: getUserInfo().username,
              updateTime: timestampToTime(new Date()),
              // orderState:'',
              materialList: [...itemList],
              attachments: [...this.file_list],
              customerNo: this.getNameById(this.cusNameArr, this.form.inp6, "id").companyNo,
              orderSource: "PLATFORM",*!/
            };*/
            let sendData = {
              operatorId: getUserInfo().userId,
              operatorName: getUserInfo().username,
              updateUserId: getUserInfo().userId,
              updateUser: getUserInfo().username,
              updateTime: timestampToTime(new Date()),
              createTime: timestampToTime(new Date()),
              attachments: [...this.file_list],
              orderState: 0,
              orderApplyNo: this.sureRow.orderNo,
              ...this.sureRow,
            };
            sendData.materialList = this.table_data;

            this.loading = true;

            if (sessionStorage.getItem("warehouse-incoming-edit") === "true") {
              let upData = {
                // id: this.prevPageData.id,
                // orderPlanNo: this.prevPageData.orderPlanNo,
                ...this.prevPageData,
                ...sendData,
              };

              api_warehouse.arrange.editInPlan(this, upData).then((res) => {
                this.$message.info(res.data.msg);
                this.go_back();
              });

            } else {
              api_warehouse.arrange.addInPlan(this, sendData).then((res) => {
                this.$message.info(res.data.msg);
                this.go_back();
              });
            }
            return;


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
          });
        })
          .catch(() => {
          });
      },
      // 提交触发函数
      submit() {
        return;
        this.$confirm("提交申请单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$refs.application_form.validate((valid) => {
              if (!valid) {
                return;
              }
              // 判断计划送达事件要大于计划装车时间
              if (this.form.inp12 == 1) {
                if (
                  new Date(this.form.inp13).getTime() >=
                  new Date(this.form.inp14).getTime()
                ) {
                  this.$message.error("计划送达事件需要大于计划装车时间");
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
                fileList: [...this.file_list],
              };
              this.options.map((item) => {
                if (item.value === this.form.inp1) {
                  sendData.warehouseName = item.label;
                }
              });
              if (this.form.inp12 === 1) {
                if (this.form.inp13) {
                  sendData.loadingTime = this.$fn.timeChange(this.form.inp13);
                } else {
                  this.$fn.message("请选择计划装车时间", "error");
                  return;
                }

                if (this.form.inp14) {
                  sendData.serviceTime = this.$fn.timeChange(this.form.inp14);
                } else {
                  this.$fn.message("请选择计划送达时间", "error");
                  return;
                }
              }
              if (sessionStorage.getItem("warehouse-incoming-edit") === "true") {
                sendData.id =
                  sessionStorage.getItem("warehouse-incoming-aplicationid") * 1;
                this.$axios
                  .post("/applicationIn/editApplicationIn", sendData)
                  .then(
                    (res) => {
                      console.log("修改结果", res);
                      // this.$message.success(res.data.data);
                      this.go_back();
                    },
                    (err) => {
                      console.log("修改报错", err);
                    }
                  );
                return;
              }
              this.$axios.post("/applicationIn/addApplicationIn", sendData).then(
                (res) => {
                  console.log("新增结果", res);
                  // this.$message.success(res.data.data);
                  this.go_back();
                },
                (err) => {
                  console.log("新增报错", err);
                }
              );
            });
          })
          .catch(() => {
          });
      },
      // 附件蒙层关闭前触发函数
      enclosure_before_close() {
        this.enclosure_flag = false;
        //this.enclosure_dialog_content_table_data = [];
      },
      order_before_close() {
        this.material_flag = false;
      },
      // 附件蒙层确认函数
      enclosure_sure() {
        this.enclosure_flag = false;
        let ids = [];
        this.enclosure_dialog_content_table_data.forEach((item) => {
          ids.push(item.id);
        });
        // this.file_list = [...this.enclosure_dialog_content_table_data];
        this.file_list = ids;
        //this.enclosure_dialog_content_table_data = [];
      },
      // 文件上传
      enclosure_upload(val) {
        console.log(val);
        let formdata = new FormData();
        formdata.append("file", val.raw);
        this.enclosure_loading = true;
        api_warehouse.storage.storageUploadFile(this, formdata).then(
          (res) => {
            console.log("上传结果", res);
            this.enclosure_dialog_content_table_data.push(res.data.data);
            this.enclosure_dialog_content_table_data.map((item) => {
              item.fileName = item.fileName;
              item.fileSize = item.fileSize;
              item.fileType = item.fileType;
            });
          },
          (err) => {
            console.log("上传报错", err);
          }
        )
          .finally(() => {
            this.enclosure_loading = false;
          });
      },
      // 附件蒙层，文件删除
      enclosure_dialog_content_table_data_del(obj) {
        this.$confirm("是否删除该附件", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          api_warehouse.storage.deleteStorageUploadFile(this, obj.id).then(() => {
            let arr = [];
            this.enclosure_dialog_content_table_data.map((item) => {
              if (item.filePath !== obj.filePath) {
                arr.push(item);
              }
            });
            this.enclosure_dialog_content_table_data = [...arr];
          });
        });
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
        window.open(
          "http://dev.123456cc.cc:4000/busfront-busproc/busfront-busproc/FHYBQY.xlsx"
        );
      },
      // 数据导入 material/importExcel
      import_excel1(file, fileList) {
        let files = {0: file.raw};
        let that = this;
        console.log(files);
        if (files.length <= 0) {
          //如果没有文件名
          return false;
        } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
          this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
          return false;
        }

        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: "binary",
            });
            const wsname = workbook.SheetNames[0]; //取第一张表
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
            console.log(ws);
            // that.peopleArr = [];//清空接收数据
            // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == "" && that.peopleArr[0].enLine == ""){
            //     that.peopleArr = [];
            // }
            //重写数据
            try {
              let obj = {
                materialName: ws[0]["品名"],
                specifications: ws[0]["规格"],
                textureMaterial: ws[0]["材质"],
                placeOrigin: ws[0]["产地"],
                enterNumber: ws[0]["计划入库数量"],
                weightCoefficient: ws[0]["理重"],
                enterWeight: ws[0]["计划入库重量"],
                unitQuantity: ws[0]["数量单位"],
                unitWeight: ws[0]["重量单位"],
                measurementMethod: ws[0]["计量方式"],
                materialNature: ws[0]["物资性质"],
                licensePlateNumber: ws[0]["车牌号"],
                description: ws[0]["备注"],
              };
              this.table_data.push(obj);
            } catch (err) {
              console.log(err);
            }

            this.$refs.upload.value = "";
          } catch (e) {
            return false;
          }
        };
        fileReader.readAsBinaryString(files[0]);
      },
      // 数据导入后端处理
      import_excel(file, fileList) {
        let formdata = new FormData();
        formdata.append("file", file.raw);
        this.loading = true;
        this.$axios
          .post("/material/importExcel", formdata)
          .then(
            (res) => {
              console.log("上传结果", res);
              // this.enclosure_dialog_content_table_data.push(res.data.data);
              // this.enclosure_dialog_content_table_data.map(item=>{
              //     item.fileName = item.name;
              //     item.fileSize = item.size;
              //     item.fileType = item.type;
              // })
              this.table_data = [...this.table_data, ...res.data.data];
            },
            (err) => {
              console.log("上传报错", err);
            }
          )
          .finally(() => {
            this.loading = false;
          });
      },

      // 附件文件下载操作
      download_file(obj) {
        window.open(obj.filePath);
      },

      //获取商品数据
      getMaterialList() {
        let data = {
          orderPlanNo: this.prevPageData.orderPlanNo,
          /* pageNo: this.page.page_num,
             pageSize: this.page.page_size,*/
        };
        api_warehouse.arrange.getMaterialList(this, data).then((res) => {
          this.table_data = res.data.data.records;
        });
      },
      //获取附件信息
      getUploadList() {
        let data = {
          orderNo: this.prevPageData.orderNo,
          businessType: "PUT_IN",
        };
        console.log(1);
        api_warehouse.storage.getStorageUploadFile(this, data).then((res) => {
          this.enclosure_dialog_content_table_data = res.data.data;
        });
      },

      //获取全部入仓商品列表
      getAllMaterialList(isSearch) {
        let senddata = {
          ...this.search,
        };

        api_warehouse.arrange
          .getAllMaterialList(null, {
            pageNo: this.page.page_num,
            pageSize: this.page.page_size,
            ...senddata,
          })
          .then((res) => {
            console.log(res)
            this.page.total = res.data.data.total;
            if (isSearch) {
              this.page.page_num = 1;
              this.allMaterialList = res.data.data.records;
            } else {
              this.allMaterialList = [...this.allMaterialList, ...res.data.data.records];
              this.page.total = res.data.data.total;
            }
          });
      },
      //搜索商品信息
      searchAllMaterialListItem() {
        this.page.page_num = 1;
        this.getAllMaterialList("search");
      },
      //重置搜索信息
      resetAllMaterialList() {
        this.page.page_num = 1;
        for (let i in this.search) {
          this.search[i] = "";
        }
        this.getAllMaterialList("search");
      },
      //引用入仓订单
      getQuoteOrder() {
        this.material_flag = true;
      },

      //下拉加载更多;
      loadMore() {
        if (this.page.page_num * this.page.page_size >= this.page.total) {

        } else {
          this.page.page_num++
          this.getAllMaterialList();
        }
      },
      //单选入仓订单表格
      getCurrentMaterialRow(row) {
        this.currentMaterialRow = row;
      },
      // 入仓商品确认函数
      material_sure() {
        this.material_flag = false;
        this.sureRow = JSON.parse(JSON.stringify(this.currentMaterialRow));
        let row = this.sureRow;
        console.log(row);
        if (!row) return;
        this.form = {
          inp1: row.orderNo,
          inp2: row.customerId,
          inp3: row.warehouseId,
          inp4: row.putInPlanDate,
          inp5: row.shippingTypeId,
          inp6: row.carNum,
          inp7: row.driver,
          inp8: row.idCardType,
          inp9: row.idCardNum,
          inp10: row.contactPhone,
          inp11: row.remark,
        };
        this.table_data = [];
      },
      //增加编排
      add_bp() {
        if (!this.single_M_row || !this.single_M_row.name) {
          this.$alert("选择入仓商品信息");
        } else {
          let row = JSON.parse(JSON.stringify(this.single_M_row));
          row.isEdit = true;
          this.bp_row.push(row);
        }
      },
      //保存单商品编排
      save_bp() {
        //判断数量是否对应
        let numCount = 0, weightCount = 0, index = this.single_M_row.index;
        this.bp_row.forEach((item) => {
          numCount += item.inPlanNum * 1;
          weightCount += item.inPlanWeight * 1;
          item.warehouseLocation = item.warehouseLocation;
        });
        if (this.table_data[index].inPlanWeight !== weightCount || this.table_data[index].inPlanNum !== numCount) {
          this.$alert("请确保计划入仓数量或者重量等于计划存放数量或重量");
          return false
        }
        let copyRow = JSON.parse(JSON.stringify(this.bp_row));
        this.table_data[index].materialLocationList = copyRow;
        return true;
      },
      //删除编排
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      //保存编排
      saveRow(index, rows) {
        if (this.save_bp()) {

          //强制修改数组
          this.bp_row.push(1)
          this.bp_row.pop();


          this.bp_row.forEach((item) => {
            item.isEdit = false
          });
        } else {

        }
      },
      //修改编排
      editRow(index, rows) {
        //强制修改数组
        this.bp_row.push(1)
        this.bp_row.pop();

        this.bp_row[index].isEdit = true;
        // console.log(rows[index]);
       /* let row = JSON.parse(JSON.stringify(this.bp_row));
        this.bp_row = [];
        row[index].isEdit = true;
        this.bp_row = row*/
      },
      //取消编排
      cancelRow(index, rows) {
        rows[index].inPlanNum = '';
        rows[index].inPlanWeight = '';
        rows[index].warehouseLocation = '';
      }
    },
    beforeDestroy() {
      let a = {
        "attachments": [
          0
        ],
        "carNum": "string",
        "contactPhone": "string",
        "customerId": 0,
        "customerName": "string",
        "customerNo": "string",
        "driver": "string",
        "id": 0,
        "idCardNum": "string",
        "idCardType": "string",
        "linkedOrderNo": "string",
        "materialList": [
          {
            "finishInTime": "2021-01-04T01:19:33.594Z",
            "id": 0,
            "inPlanNum": 0,
            "isRefer": false,
            "materialLocationList": [
              {
                "finishInTime": "2021-01-04T01:19:33.594Z",
                "id": 0,
                "inPlanNum": 0,
                "isRefer": false,
                "measureMethod": "string",
                "measureMethodId": 0,
                "name": "string",
                "numUnit": "string",
                "numUnitId": 0,
                "pageNo": 0,
                "pageSize": 0,
                "placeOrigin": "string",
                "realInNum": 0,
                "realInWeight": 0,
                "remark": "string",
                "specifications": "string",
                "terminalName": "string",
                "terminalNo": "string",
                "terminalTypeId": 0,
                "textureMaterial": "string",
                "warehouseLocation": "string",
                "weightCoefficient": 0,
                "weightUnit": "string",
                "weightUnitId": 0
              }
            ],
            "measureMethod": "string",
            "measureMethodId": 0,
            "name": "string",
            "numUnit": "string",
            "numUnitId": 0,
            "orderPlanNo": "string",
            "pageNo": 0,
            "pageSize": 0,
            "placeOrigin": "string",
            "realInNum": 0,
            "realInWeight": 0,
            "remark": "string",
            "specifications": "string",
            "terminalName": "string",
            "terminalNo": "string",
            "terminalTypeId": 0,
            "textureMaterial": "string",
            "weightCoefficient": 0,
            "weightUnit": "string",
            "weightUnitId": 0
          }
        ],
        "operatorId": 0,
        "operatorName": "string",
        "orderApplyNo": "string",
        "orderMaterialNo": "string",
        "orderNo": "string",
        "pageNo": 0,
        "pageSize": 0,
        "putInPlanDate": "2021-01-04T01:19:33.594Z",
        "remark": "string",
        "shippingTypeId": 0,
        "shippingTypeName": "string",
        "warehouseId": 0,
        "warehouseName": "string"
      }
      //sessionStorage.removeItem('warehouse-incoming-edit');
    },
  };
</script>

<style lang="less" scoped>
  @import "../../../../style/views/warehouse/add/arrange.less";
</style>
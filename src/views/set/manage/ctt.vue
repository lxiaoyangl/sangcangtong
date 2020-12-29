<template>
    <div class="outer-box relative" style="height:100%;">
        <div class="right-box" :class="{'full': !showLeft }">
            <el-form :inline="true" :model="formInline" class="search-box">
                <el-form-item label="合同号">
                    <el-input clearable :maxlength="50" placeholder="请输入合同号" v-model.trim="formInline.cttNo"></el-input>
                </el-form-item>
                <el-form-item label="合同名称">
                    <el-input clearable :maxlength="200" placeholder="请输入合同名称" v-model.trim="formInline.cttName"></el-input>
                </el-form-item>
                <el-form-item label="签署日期">
                    <el-date-picker
                            v-model="formInline.sacDateList"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd"
                            start-placeholder="起始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item label="客户名称">
                    <el-input clearable :maxlength="50" placeholder="请输入客户名称" v-model.trim="formInline.custName"></el-input>
                </el-form-item>
                <el-form-item label="合同状态">
                    <ren-select v-model="formInline.cttStatus" dict-type="ctt_status" ></ren-select>
                </el-form-item>-->
                <!--<el-form-item label="到期日期">
                    <el-date-picker
                            v-model="formInline.povDateList"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd"
                            start-placeholder="起始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>-->
                <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" plain @click="searchReset">重置</el-button>
            </el-form>
            <!--列表-->
            <div class="content-box mt10">
                <div>
                    <template >
                        <el-button type="primary" v-show="$hasPermission('新增')" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
                        <el-button :disabled="multipleSelection.length===0" v-show="$hasPermission('批量删除')" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
                    </template>
                </div>
                <el-table border :data="listData" height="calc(100vh - 287px)" @selection-change="handleSelectionChange"
                          @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable"
                          v-loading="loading" style="width: 100%;">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column sortable prop="cttNo" align="center" label="合同号" min-width="160"></el-table-column>
                    <el-table-column prop="cttName" align="center" label="合同名称" min-width="200"></el-table-column>
                    <el-table-column sortable prop="custId" align="center" label="客户号" min-width="160"></el-table-column>
                    <el-table-column prop="custName" align="center" label="客户名称" min-width="200"></el-table-column>
                    <el-table-column sortable prop="sacDate" align="center" label="签署日期" min-width="160"></el-table-column>
                    <el-table-column sortable prop="povDate" align="center" label="到期日期" min-width="160"></el-table-column>
                    <el-table-column sortable prop="cttStatus" align="center" label="合同状态" min-width="130">
                        <template slot-scope="scope">
                            <span v-show="scope.row.cttStatus === '01'">新建</span>
                            <span v-show="scope.row.cttStatus === '11'">审核中</span>
                            <span v-show="scope.row.cttStatus === '21'">审核通过</span>
                            <span v-show="scope.row.cttStatus === '22'">审核拒绝</span>
                            <span v-show="scope.row.cttStatus === '90'">过期</span>
                            <span v-show="scope.row.cttStatus === '91'">作废</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="210">
                        <template slot-scope="scope" v-for="item in permissionButtons">
                            <div class="tableButton">
                                <el-tooltip v-show="$hasPermission('查看')" effect="dark" content="查看" placement="top">
                                    <el-button type="primary" icon="el-icon-search" circle  @click.stop="viewPrev(scope.row)"></el-button>
                                </el-tooltip>
                                <el-tooltip v-show="$hasPermission('编辑')" effect="dark" content="编辑" placement="top">
                                    <el-button :disabled="!(scope.row.cttStatus === '01' || scope.row.cttStatus === '22')" type="primary" icon="el-icon-edit" circle  @click.stop="modifyPrev(scope.row)"></el-button>
                                </el-tooltip>
                                <el-tooltip v-show="$hasPermission('删除')" effect="dark" content="删除" placement="top">
                                    <el-button :disabled="!(scope.row.cttStatus === '01' || scope.row.cttStatus === '22')" type="primary" icon="el-icon-delete" circle  @click.stop="deleteItem(scope.row)"></el-button>
                                </el-tooltip>
                                <el-tooltip v-show="$hasPermission('提交')" effect="dark" content="提交" placement="top">
                                    <el-button :disabled="!(scope.row.cttStatus === '01' || scope.row.cttStatus === '22')" @click="submitRow(scope.row)" type="primary" icon="el-icon-finished" circle></el-button>
                                </el-tooltip>
                                <el-tooltip v-show="$hasPermission('审核')" effect="dark" content="审核" placement="top">
                                    <el-button :disabled="scope.row.cttStatus !== '11'" @click="auditRow(scope.row)" type="primary" icon="el-icon-document-add" circle></el-button>
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
        </div>
        <div  v-if="editFormVisible" class="fixed-box show">
            <div class="fixed-container">
                <el-form label-width="90px" ref="editForm" :model="editForm" :rules="rules">
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="合同名称" prop="cttName">
                                <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" v-model.trim="editForm.cttName" auto-complete="off" :maxlength="50"
                                          placeholder="请输入合同名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="公司" prop="custId">
                                <el-select :disabled="editForm.type==='view' || editForm.type==='audit'" v-model="editForm.custId" placeholder="请选择"   @change="getChangeName" clearable>
                                    <el-option v-for="item in companyDatas" :key="item.companyNo"
                                               :label="item.name" :value="item.companyNo">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div v-if="editForm.type==='view' || editForm.type==='audit'">
                        <el-row :gutter="120">
                            <el-col :span="12">
                                <el-form-item label="联系人" prop="custContact">
                                    <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" v-model.trim="editForm.cttName" auto-complete="off" :maxlength="50"
                                              placeholder="请输入联系人"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系人电话" prop="custContactTel">
                                    <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" v-model.trim="editForm.cttName" auto-complete="off" :maxlength="50"
                                              placeholder="请输入联系人电话"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="合同日期" prop="cttDate">
                                <el-date-picker
                                        :readonly="editForm.type==='view' || editForm.type==='audit'"
                                        v-model="editForm.cttDate"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="签署日期"
                                        end-placeholder="到期日期日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户经理" prop="custManager">
                                <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" v-model.trim="editForm.custManager" auto-complete="off" :maxlength="50"
                                          placeholder="请输入客户经理"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="备注" prop="remark">
                        <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" type="textarea" :rows="3" v-model="editForm.remark" :maxlength="1000"
                                  auto-complete="off" placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-form>
                <div v-if="editForm.type!=='view' && editForm.type!=='audit'">
                    <el-button type="text" class="s-button" @click="addDetail" icon="el-icon-circle-plus-outline">新增</el-button>
                    <div class="line"></div>
                    <el-button type="text" @click="delDetail" icon="el-icon-remove-outline" class="top_color_red s-button">删除</el-button>
                    <div class="line"></div>
                    <el-button type="text" size="medium" class="s-button" icon="el-icon-document" @click="enclosure_flag = true">上传附件</el-button>
                </div>
                <div class="detail_content">
                    <div class="detail_content_table">
                        <div class="detail_content_table_box">
                            <el-table
                                    :data="listDetailData"
                                    style="width: 100%"
                                    :height="detailTableHeight"
                                    stripe
                                    @selection-change="detailTableSelectionChange"
                                    header-row-class-name="table_header">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="costName"
                                        label="费用名称"
                                        width="180">
                                    <template slot-scope="scope">
                                        <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.costName" placeholder="费用名称" size="mini"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="costType"
                                        label="费用类型"
                                        width="150">
                                    <template slot-scope="scope">
                                        <el-select clearable :disabled="editForm.type==='view' || editForm.type==='audit'" style="width:105px !important;" v-model="scope.row.costType" placeholder="费用类型" size="mini">
                                            <el-option
                                                    v-for="item in getAllDict('cost_type')"
                                                    :key="item.value"
                                                    :label="item.dictLabel"
                                                    :value="item.dictValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="warehouseId"
                                        label="仓库名称"
                                        width="150">
                                    <template slot-scope="scope">
                                        <el-select style="width:105px !important;" clearable :disabled="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.warehouseId" placeholder="仓库名称" size="mini">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="settlementMode"
                                        label="结算方式"
                                        width="150">
                                    <template slot-scope="scope">
                                        <el-select style="width:105px !important;" clearable :disabled="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.settlementMode" placeholder="结算方式" size="mini">
                                            <el-option
                                                    v-for="item in getAllDict('settlement_mode')"
                                                    :key="item.value"
                                                    :label="item.dictLabel"
                                                    :value="item.dictValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="chargingMode"
                                        label="计费方式"
                                        width="150">
                                    <template slot-scope="scope">
                                        <el-select style="width:105px !important;" clearable :disabled="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.chargingMode" placeholder="计费方式" size="mini">
                                            <el-option
                                                    v-for="item in getAllDict('charging_mode')"
                                                    :key="item.value"
                                                    :label="item.dictLabel"
                                                    :value="item.dictValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="unitPrice"
                                        label="单价"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.unitPrice" type="number" placeholder="单价" size="mini"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="unit"
                                        label="单位"
                                        width="150">
                                    <template slot-scope="scope">
                                        <el-select style="width:105px !important;" clearable :disabled="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.unit" placeholder="单位" size="mini">
                                            <el-option
                                                    v-for="item in getAllDict('unit')"
                                                    :key="item.value"
                                                    :label="item.dictLabel"
                                                    :value="item.dictValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="applyBill"
                                        label="适用单据"
                                        width="150">
                                    <template slot-scope="scope">
                                        <el-select style="width:105px !important;" clearable :disabled="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.applyBill" placeholder="适用单据" size="mini">
                                            <el-option
                                                    v-for="item in getAllDict('bill_type')"
                                                    :key="item.value"
                                                    :label="item.dictLabel"
                                                    :value="item.dictValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>bill_type
                                <el-table-column
                                        prop="filterMaterialClass"
                                        label="分类过滤物资"
                                        width="155">
                                    <template slot-scope="scope">
                                        <el-select style="width:120px !important;" clearable :disabled="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.filterMaterialClass" placeholder="分类过滤物资" size="mini">
                                            <el-option
                                                    v-for="item in getAllDict('bill_type')"
                                                    :key="item.value"
                                                    :label="item.dictLabel"
                                                    :value="item.dictValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="filterMaterialPrdName"
                                        label="品名过滤物资"
                                        width="155">
                                    <template slot-scope="scope">
                                        <el-select style="width:120px !important;" clearable :disabled="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.filterMaterialPrdName" placeholder="品名过滤物资" size="mini">
                                            <el-option
                                                    v-for="item in getAllDict('bill_type')"
                                                    :key="item.value"
                                                    :label="item.dictLabel"
                                                    :value="item.dictValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="beginDays"
                                        label="开始天数"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.beginDays" type="number" placeholder="开始天数" size="mini"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="endDays"
                                        label="结束天数"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" v-model="scope.row.endDays" type="number" placeholder="结束天数" size="mini"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <el-form v-if="editForm.type==='audit'" label-width="90px" ref="editAuditForm" :model="editAuditForm" :rules="auditRules" style="margin-top: 10px !important;">
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="审核结果" prop="result">
                                <el-select style="width: 500px !important;" v-model="editAuditForm.result" placeholder="请选择"  clearable>
                                    <el-option v-for="item in getAllDict('audit_result')" :key="item.value"
                                               :label="item.dictLabel" :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="审核意见" prop="suggest">
                        <el-input :readonly="editForm.type==='view'" type="textarea" :rows="2" v-model="editAuditForm.suggest" :maxlength="1000"
                                  auto-complete="off" placeholder="请输入审核意见"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer">
                    <el-button v-if="editForm.type=='audit' || editForm.type=='view'" type="text" size="medium" class="s-button" icon="el-icon-document" @click="enclosure_flag = true">查看附件</el-button>
                    <el-button plain @click="editFormVisible=false">取消</el-button>
                    <el-button type="primary" v-if="editForm.type=='add'"
                               @click="addList('editForm')">保存
                    </el-button>
                    <el-button type="primary" v-if="editForm.type=='edit'"
                               @click="modifyList('editForm')">确认修改
                    </el-button>
                    <el-button type="primary" v-if="editForm.type=='audit'"
                               @click="subAudit('editAuditForm')">提交
                    </el-button>
                </div>
            </div>
        </div>
        <!-- 附件 -->
        <BasisDialog
                :title="'附件上传'"
                :visible="enclosure_flag"
                @cancel="enclosure_sure"
                @sure="enclosure_sure"
                v-loading="enclosure_loading"
        >
            <div slot="dialog_content" class="enclosure_dialog_content">
                <div v-show="this.fileView" class="enclosure_dialog_content_form">
                    <el-upload
                            class="upload-demo"
                            :show-file-list="false"
                            :auto-upload="false"
                            action=""
                            :on-change='enclosure_upload'
                    >
                        <div>
                            <span>上传新文件&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <el-button size="small" type="primary" icon="el-icon-upload2" :loading="enclosure_loading">点击上传</el-button>
                        </div>
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
                                <el-button type="text" v-if="scope.row.fileView" @click="enclosure_dialog_content_table_data_del(scope.row)">删除</el-button>
                                <el-button type="text" @click="download_file(scope.row)">下载</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </div>
        </BasisDialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import { sureDelete, getChangeData,getValidButton,deleteAllNext } from '@/utils'
    import { setManageCttList,setManageCttAdd,setManageCttEdit,setManageCttDelete,setManageCttBatchDelete,setDictionaryDataList,loadDictList,setManageCttDetail,setManageCttAudit} from '@/plugins/api'
    import { setCompanyData } from '@/plugins/apis'

    export default {
        data () {
            return {
                loading: false,
                formInline: {
                    cttNo:'',
                    cttName:'',
                    sacDate:'',
                    povDate:'',
                    custId:'',
                    custName:'',
                    cttStatus:'',
                    sacDateList:[],
                },
                listData: [], // 列表
                listDetailData: [], // 明细列表
                pageParams: {
                    currentPage: 1,
                    pageSize: 15,
                    total: 1
                },
                showLeft: true,
                multipleSelection: [],
                editFormVisible: false,
                editForm: {}, // 添加编辑
                oldEditForm: {}, // 添加编辑
                editAuditForm:{},
                companyDatas:[],
                showTrees: false,
                selectData: {
                    treeCode: 0,
                    name: ''
                },
                columnOptions: [],
                postIds: [],
                rules: {
                    cttName: [{required: true, message: '请输入合同名称', trigger: 'blur'}],
                    custId: [{required: true, message: '请选择公司', trigger: 'blur'}],
                    cttDate:[{required: true, message: '请选择合同日期', trigger: 'blur'}],
                },
                auditRules: {
                    result: [{required: true, message: '请选择审核意见', trigger: 'blur'}],
                },

                // 仓库下拉数据
                options: [],
                // 详情列表选中存储数组
                detailSelectedArr: [],
                detailTableHeight:'calc(100vh - 340px)',
                // 附件上传标识
                enclosure_loading: false,
                // 附件蒙层显示标识
                enclosure_flag: false,
                // 附件蒙层表格数据
                enclosure_dialog_content_table_data: [],
                // 准备上传的附件列表
                file_list: [],
                fileView:true,
            }
        },
        components: {
        },
        created () {
            this.permissionButtons = getValidButton(this.$route.path)
            this.getList()
            this.getCompanyDatas()
            this.getSelects()
            this.getWarehouseData();
            //获取全部数据字典
            loadDictList({
                name: '**',
            }).then(res => {
                this.allDict = res;
            });
        },
        computed: {
        },
        watch: {
            'editForm.phoneNumber': function (curVal, oldVal) {
                if (curVal) {
                    this.editForm.phoneNumber = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join('') : ''
                }
            },
        },
        methods: {
            // 附件蒙层确认函数
            enclosure_sure() {
                this.enclosure_flag = false;
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
                        item.filePath = item.path;
                        item.fileView = true;
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
            // 附件文件下载操作
            download_file(obj) {
                window.open(obj.path);
            },
            //点击提交
            submitRow(row) {
                this.$confirm('订单提交过后将不可修改, 是否继续').then(() => {
                    let data = {
                        id: row.id,
                        orderState: 'PENDING'
                    };
                    let sendData = {
                        ...row,
                        cttStatus : '11',
                        ...data
                    }
                    setManageCttEdit(sendData).then((res) => {
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        })
                        this._initEditForm()
                        this.getList()
                    }).catch((res) => {
                        this.$message.error(res.data.data)
                    })
                })
            },
            // 删除
            delDetail() {
                if (this.detailSelectedArr.length === 0) {
                    this.$fn.message('请选择数据再进行删除', 'error');
                    return;
                }
                let arr = [];
                this.listDetailData.map(item => {
                    let flag = false;
                    this.detailSelectedArr.map(it => {
                        if (it.id === item.id) {
                            flag = true;
                        }
                    })
                    if (!flag) {
                        arr.push(item);
                    }
                })
                this.listDetailData = [...arr];
            },
            // 获取仓库数据
            getWarehouseData() {
                // 获取仓库数据
                this.$fn.get_warehouse_data(this).then(res => {
                    this.options = [...res.data.data];
                }, err => {
                    console.log('err', err);
                })
            },
            //获取字典参数,主要用于下拉框选择参数
            getAllDict(dictType) {

                if (!this.allDict) {
                    return []
                } else {
                    let dict = this.allDict.find((item) => {
                        return item.dictType === dictType
                    });

                    dict.dataList.forEach((item) => {
                        item.dictValue = item.dictValue
                    });

                    return dict.dataList;
                }
            },
            detailTableSelectionChange(val) {
                this.detailSelectedArr = [...val];
            },
            addDetail(){
                Promise.all([
                    this.checkDetailData()
                ]).then(res => {
                    if(res[0] == true){
                        if(this.listDetailData != null && this.listDetailData.length>0) {
                            let idValue = 0;
                            for (let i = 0; i < this.listDetailData.length; i++) {
                                if(this.listDetailData[i].id>=idValue){
                                    idValue = this.listDetailData[i].id+1;
                                }
                            }
                            this.listDetailData.push({id:idValue});
                        }else{
                            this.listDetailData.push({id:0});
                        }
                    }
                })

            },
            getList (data) {
                this.loading = true
                let url = "";
                if(this.formInline.sacDateList != null && this.formInline.sacDateList.length>0){
                    var sacDate_begin = this.formInline.sacDateList[0];
                    var sacDate_end = this.formInline.sacDateList[1];
                    url = '&sacDate_begin=' + sacDate_begin + '&sacDate_end=' + sacDate_end
                }
                if(this.formInline.povDateList != null && this.formInline.povDateList.length>0){
                    var povDate_begin = this.formInline.povDateList[0];
                    var povDate_end = this.formInline.povDateList[1];
                    url = url + '&povDate_begin=' + povDate_begin + '&povDate_end=' + povDate_end
                }
                let sendData = {
                    ...this.formInline,
                    cttName: `*${this.formInline.cttName || ''}*`,
                    custName: `*${this.formInline.custName || ''}*`,
                    ...data
                }
                setManageCttList(url,sendData).then((res) => {
                    this.listData = res.records
                    this.loading = false
                    this.pageParams.currentPage = res.current
                    this.pageParams.pageSize = res.size
                    this.pageParams.total = res.total
                    deleteAllNext(res, this.getList)
                })
            },
            searchList () {
                this.formInline.pageNo = 1
                this.getList()
            },
            searchReset () {
                this.formInline = {
                    cttStatus:'',
                    pageNo: 1
                }
                this.searchList()
            },
            handleSelectionChange (val) {
                this.multipleSelection = val
            },
            rowClick (row) {
                this.$refs.multipleTable.toggleRowSelection(row)
            },
            handleSizeChange (param) {
                this.formInline.pageSize = param
                this.getList()
            },
            handleCurrentChange (param) {
                this.formInline.pageNo = param
                this.getList()
            },
            getSelects () {
                setDictionaryDataList({
                    dictionaryType: 'sys_position'
                }).then((res) => {
                    this.postIds = res
                })
            },
            addPrev () {
                this._initEditForm()
                this.listDetailData = []
                this.editFormVisible = true
                this.title = '添加'
                this.detailTableHeight='calc(100vh - 340px)'
                this.editForm.type = 'add'
                this.enclosure_dialog_content_table_data = [];
                this.file_list=[];
                this.fileView = true
            },
            // 修改之前
            modifyPrev (item) {
                let sendData = item;
                setManageCttDetail(sendData).then((res) => {
                    let cttData = res
                    this.getColumnIdArr(cttData)
                    this.editForm = JSON.parse(JSON.stringify(cttData))
                    this.$set(this.editForm,'cttDate',[cttData.sacDate,cttData.povDate]);
                    if(cttData.detailList != null && cttData.detailList.length>0){
                        for (let i = 0; i < cttData.detailList.length>0; i++) {
                            cttData.detailList[i].warehouseId = Number(cttData.detailList[i].warehouseId);
                        }
                    }
                    this.listDetailData = cttData.detailList;
                    this.file_list = [];
                    this.file_list = cttData.fileList;
                    this.enclosure_dialog_content_table_data = [];
                    this.enclosure_dialog_content_table_data = this.file_list;
                    this.enclosure_dialog_content_table_data.map(item => {
                        item.fileView = true;
                        item.path = item.filePath;
                        item.name = item.fileName;
                        item.size = item.fileSize;
                        item.type = item.fileType;
                    })
                    this.oldEditForm = JSON.stringify(cttData)
                    this.title = '修改'
                    this.editForm.type = 'edit'
                    this.detailTableHeight='calc(100vh - 340px)'
                    this.editFormVisible = true
                    this.fileView = true
                })
            },
            // 修改添加完初始化数据
            _initEditForm () {
                this.editFormVisible = false
                this.editForm = {
                    state: 1
                }
            },
            getCompanyDatas () {
                setCompanyData({}).then((res) => {
                    this.companyDatas = res
                })
            },
            getChangeName (data) {
                const temp = this.companyDatas.filter(v => data === v.companyNo)
                if (temp && temp.length > 0) {
                    this.editForm.custName = temp[0].name;
                    this.editForm.custId = temp[0].companyNo;
                    this.editForm.custContact = temp[0].contacts;
                    this.editForm.custContactTel = temp[0].contactNumber;
                }
            },
            checkDetailData(){
                if(this.listDetailData != null && this.listDetailData.length>0) {
                    for (let i = 0; i < this.listDetailData.length; i++) {
                        let detailData = this.listDetailData[i];
                        var costName = detailData.costName;
                        if(detailData.costName == null){
                            this.$message.warning("第"+(i+1)+"行费用名称不能为空！")
                            return false;
                        }else if(detailData.costType == null){
                            this.$message.warning("\""+costName+"\"的费用类型不能为空!")
                            return false;
                        }else if(detailData.warehouseId == null){
                            this.$message.warning("\""+costName+"\"的仓库不能为空!")
                            return false;
                        }else if(detailData.settlementMode == null){
                            this.$message.warning("\""+costName+"\"的结算方式不能为空!")
                            return false;
                        }else if(detailData.chargingMode == null){
                            this.$message.warning("\""+costName+"\"的计费方式不能为空!")
                            return false;
                        }else if(detailData.unitPrice == null || detailData.unitPrice<=0){
                            this.$message.warning("\""+costName+"\"的单价不能为空,且不能小于0！")
                            return false;
                        }else if(detailData.unit == null){
                            this.$message.warning("\""+costName+"\"的单位不能为空!")
                            return false;
                        }else if(detailData.applyBill == null){
                            this.$message.warning("\""+costName+"\"的适用单据不能为空!")
                            return false;
                        }else if(detailData.filterMaterialClass == null){
                            this.$message.warning("\""+costName+"\"的分类过滤物资不能为空!")
                            return false;
                        }else if(detailData.filterMaterialPrdName == null){
                            this.$message.warning("\""+costName+"\"的品名过滤物资不能为空!")
                            return false;
                        }else if(detailData.beginDays == null){
                            this.$message.warning("\""+costName+"\"的开始天数不能为空!")
                            return false;
                        }else if(detailData.endDays == null){
                            this.$message.warning("\""+costName+"\"的结束天数不能为空")
                            return false;
                        }
                    }
                }else{
                    return true;
                }
                return true;
            },
            // 确认添加
            addList (editData) {
                this.$refs[editData].validate((valid) => {
                    if (valid) {
                        let dataList = [];
                        Promise.all([
                            this.checkDetailData()
                        ]).then(res => {
                            if(res[0] == true){
                                if(this.listDetailData != null && this.listDetailData.length>0) {
                                    for (let i = 0; i < this.listDetailData.length; i++) {
                                        let detailData = this.listDetailData[i];
                                        for (let j = 0; j < this.options.length; j++) {
                                            if (detailData.warehouseId === this.options[j].id) {
                                                detailData.warehouseName = this.options[j].name;
                                            }
                                        }
                                        detailData.id = '';
                                        dataList.push(detailData);
                                    }
                                }
                                this.loading = true
                                this.editForm.sacDate = this.editForm.cttDate[0];
                                this.editForm.povDate = this.editForm.cttDate[1];
                                this.editForm.detailList = dataList;
                                this.file_list = [...this.enclosure_dialog_content_table_data];
                                this.editForm.fileList = this.file_list
                                let sendData = this.editForm
                                setManageCttAdd(sendData).then((res) => {
                                    this.$message({
                                        message: res,
                                        type: 'success'
                                    })
                                    this._initEditForm()
                                    this.getList()
                                }).catch((res) => {
                                    this.$message.error(res.data.data)
                                })
                            }
                        })
                    }
                })
            },
            // 确认修改
            modifyList (editData) {
                this.$refs[editData].validate((valid) => {
                    if (valid) {
                        Promise.all([
                            this.checkDetailData()
                        ]).then(res => {
                            if(res[0] == true){
                                let dataList = [];
                                if(this.listDetailData != null && this.listDetailData.length>0){
                                    for (let i = 0; i < this.listDetailData.length; i++) {
                                        let detailData = this.listDetailData[i];
                                        for (let j = 0; j < this.options.length; j++) {
                                            if(detailData.warehouseId === this.options[j].id){
                                                detailData.warehouseName = this.options[j].name;
                                            }
                                        }
                                        detailData.id = '';
                                        dataList.push(detailData);
                                    }
                                }
                                this.editForm.sacDate = this.editForm.cttDate[0];
                                this.editForm.povDate = this.editForm.cttDate[1];
                                let sendData = this.editForm
                                sendData.detailList = dataList;
                                this.file_list = [...this.enclosure_dialog_content_table_data];
                                this.editForm.fileList = this.file_list
                                setManageCttEdit(sendData).then((res) => {
                                    this.$message({
                                        message: res,
                                        type: 'success'
                                    })
                                    this._initEditForm()
                                    this.getList()
                                })
                            }
                        })
                    }
                })
            },
            // 删除
            deleteItem (data) {
                sureDelete(() => {
                    const sendData = {
                        id: data.id
                    }
                    setManageCttDelete(sendData).then((res) => {
                        this.$message({
                            message: res,
                            type: 'success'
                        })
                        this.getList()
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
                    setManageCttBatchDelete(sendData).then((res) => {
                        this.$message({
                            message: res,
                            type: 'success'
                        })
                        this.getList()
                    })
                })
            },
            // 查看
            viewPrev (item) {
                let sendData = item;
                setManageCttDetail(sendData).then((res) => {
                    let cttData = res
                    this.editForm = JSON.parse(JSON.stringify(cttData))
                    this.$set(this.editForm,'cttDate',[cttData.sacDate,cttData.povDate]);
                    if(cttData.detailList != null && cttData.detailList.length>0){
                        for (let i = 0; i < cttData.detailList.length>0; i++) {
                            cttData.detailList[i].warehouseId = Number(cttData.detailList[i].warehouseId);
                        }
                    }
                    this.listDetailData = cttData.detailList;
                    this.file_list = [];
                    this.file_list = cttData.fileList;
                    this.enclosure_dialog_content_table_data = [];
                    this.enclosure_dialog_content_table_data = this.file_list;
                    this.enclosure_dialog_content_table_data.map(item => {
                        item.fileView = false;
                        item.path = item.filePath;
                        item.name = item.fileName;
                        item.size = item.fileSize;
                        item.type = item.fileType;
                    })
                    this.title = '查看合同信息'
                    this.editForm.type = 'view'
                    this.editFormVisible = true
                    this.detailTableHeight='calc(100vh - 340px)'
                    this.uploadStatus = true
                    this.fileView = false
                })
            },
            // 审核前
            auditRow (item) {
                let sendData = item;
                setManageCttDetail(sendData).then((res) => {
                    let cttData = res
                    this.editForm = JSON.parse(JSON.stringify(cttData))
                    this.$set(this.editForm,'cttDate',[cttData.sacDate,cttData.povDate]);
                    if(cttData.detailList != null && cttData.detailList.length>0){
                        for (let i = 0; i < cttData.detailList.length>0; i++) {
                            cttData.detailList[i].warehouseId = Number(cttData.detailList[i].warehouseId);
                        }
                    }
                    this.listDetailData = cttData.detailList;
                    this.file_list = [];
                    this.file_list = cttData.fileList;
                    this.enclosure_dialog_content_table_data = [];
                    this.enclosure_dialog_content_table_data = this.file_list;
                    this.enclosure_dialog_content_table_data.map(item => {
                        item.fileView = false;
                        item.path = item.filePath;
                        item.name = item.fileName;
                        item.size = item.fileSize;
                        item.type = item.fileType;
                    })
                    this.title = '审批合同信息'
                    this.editForm.type = 'audit'
                    this.editFormVisible = true
                    this.detailTableHeight='calc(100vh - 440px)'
                    this.uploadStatus = true
                    this.fileView = false
                })
            },
            //提交审核
            subAudit (editAuditForm) {
                this.$refs[editAuditForm].validate((valid) => {
                    if (valid) {
                        if(this.editAuditForm.result == 'JJ' && this.editAuditForm.suggest == null){
                            this.$message.warning("审核拒绝时，审核意见不能为空！")
                            return;
                        }
                        this.editAuditForm.id = this.editForm.id;
                        this.editAuditForm.cttNo = this.editForm.cttNo;
                        let sendData = this.editAuditForm
                        setManageCttAudit(sendData).then((res) => {
                            this.$message({
                                message: res,
                                type: 'success'
                            })
                            this._initEditForm()
                            this.getList()
                        }).catch((res) => {
                            this.$message.error(res.data.data)
                        })
                    }
                })
            },
            updateColumnName (val) {
                if (val.length > 0) {
                    let casLabelVal = this.$refs['columnId'].getCheckedNodes()[0].pathLabels
                    this.editForm.columnName = casLabelVal[casLabelVal.length - 1]
                } else {
                    this.editForm.columnName = ''
                }
            },
            getColumnIdArr (row) {
                this.$nextTick(() => {
                    this.editForm.columnId = this.changeDetSelect(row.columnId + '', this.columnOptions)
                })
            },
            changeDetSelect (key, treeData) {
                let arr = [] // 在递归时操作的数组
                let returnArr = [] // 存放结果的数组
                let depth = 0 // 定义全局层级
                // 定义递归函数
                function childrenEach(childrenData, depthN) {
                    for (var j = 0; j < childrenData.length; j++) {
                        depth = depthN // 将执行的层级赋值 到 全局层级
                        arr[depthN] = childrenData[j].treeCode
                        if (childrenData[j].treeCode === key) {
                            returnArr = arr.slice(0, depthN + 1) // 将目前匹配的数组，截断并保存到结果数组，
                            break
                        } else {
                            if (childrenData[j].children) {
                                depth++
                                childrenEach(childrenData[j].children, depth)
                            }
                        }
                    }
                    return returnArr
                }
                return childrenEach(treeData, depth)
            },
        }
    }
</script>

<style lang="less" scoped>
    .line {
        display: inline-block;
        height: 10px;
        width: 1px;
        background: #e0e0e0;
        margin: 0 10px;
    }
    .s-button {
        padding: 0;
    }
    /deep/ .el-textarea__inner {
        min-height: 50px !important;
        max-height: 50px !important;
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
</style>



<template>
    <div class="outer-box relative" style="height:100%;">
        <div class="right-box" :class="{'full': !showLeft }">
            <el-form :inline="true" :model="formInline" class="search-box">
                <el-form-item label="单据号">
                    <el-input clearable :maxlength="50" placeholder="请输入单据号" v-model.trim="formInline.billNo"></el-input>
                </el-form-item>
                <el-form-item label="仓库名称">
                    <el-select v-model="formInline.warehouseId" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                size="mini"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务大类">
                    <el-select v-model="formInline.bussTypeId" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in getAllDict('buss_type')"
                                :key="item.value"
                                size="mini"
                                :label="item.dictLabel"
                                :value="item.dictValue">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" style="margin-top: 5px;" icon="el-icon-search" size="mini" @click="searchList">搜索</el-button>
                <el-button type="primary" style="margin-top: 5px;" icon="el-icon-refresh" size="mini" plain @click="searchReset">重置</el-button>
            </el-form>
            <!--列表-->
            <div class="content-box mt10">
                <div>
                    <template >
                        <el-button type="primary" v-show="$hasPermission('新增')" icon="el-icon-circle-plus-outline" @click="addPrev">新增</el-button>
                        <el-button :disabled="multipleSelection.length===0" v-show="$hasPermission('批量删除')" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
                    </template>
                </div>
                <el-table border :data="listData" height="calc(100vh - 265px)" @selection-change="handleSelectionChange"
                          @row-click="rowClick" highlight-current-row class="mt10" ref="multipleTable"
                          v-loading="loading" style="width: 100%;">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column sortable prop="billNo" align="center" label="单据号" min-width="160"></el-table-column>
                    <el-table-column sortable prop="warehouseName" align="center" label="仓库名称" min-width="160"></el-table-column>
                    <el-table-column sortable prop="bussType" align="center" label="业务大类" min-width="160"></el-table-column>
                    <el-table-column sortable prop="billType" align="center" label="业务类型" min-width="160"></el-table-column>
                    <el-table-column sortable prop="bussBillNo" align="center" label="业务单号" min-width="160"></el-table-column>
                    <el-table-column prop="costName" align="center" label="费用名称" min-width="200"></el-table-column>
                    <el-table-column sortable prop="settDirection" align="center" label="结算方向" min-width="160">
                        <template slot-scope="scope">
                            <span v-show="scope.row.settDirection === 'YS'">应收</span>
                            <span v-show="scope.row.settDirection === 'YF'">应付</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="custName" align="center" label="客户名称" min-width="160"></el-table-column>
                    <el-table-column sortable prop="amtTotal" align="center" label="总金额" min-width="160"></el-table-column>
                    <el-table-column sortable prop="amtReceive" align="center" label="已收金额" min-width="160"></el-table-column>
                    <el-table-column sortable prop="creareType" align="center" label="创建方式" min-width="160">
                        <template slot-scope="scope">
                            <span v-show="scope.row.creareType === 'XT'">系统</span>
                            <span v-show="scope.row.creareType === 'RG'">人工</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="status" align="center" label="状态" min-width="160">
                        <template slot-scope="scope">
                            <span v-show="scope.row.status === 'XT'">系统</span>
                            <span v-show="scope.row.status === 'RG'">人工</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="140">
                        <template slot-scope="scope" v-for="item in permissionButtons">
                            <div class="tableButton">
                                <el-tooltip v-show="$hasPermission('查看')" effect="dark" content="查看" placement="top">
                                    <el-button type="primary" icon="el-icon-search" circle  @click.stop="viewPrev(scope.row)"></el-button>
                                </el-tooltip>
                                <el-tooltip v-show="$hasPermission('编辑')" effect="dark" content="编辑" placement="top">
                                    <el-button type="primary" icon="el-icon-edit" circle  @click.stop="modifyPrev(scope.row)"></el-button>
                                </el-tooltip>
                                <el-tooltip v-show="$hasPermission('删除')" effect="dark" content="删除" placement="top">
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
        </div>
        <div  v-if="editFormVisible" class="fixed-box show">
            <div class="fixed-container">
                <el-form label-width="120px" ref="editForm" :model="editForm" :rules="rules">
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="客户" prop="custId">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.custId" placeholder="请选择"   @change="getChangeName" clearable>
                                    <el-option v-for="item in companyDatas" :key="item.companyNo"
                                               :label="item.name" :value="item.companyNo">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="仓库" prop="warehouseId">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.warehouseId" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="业务大类" prop="bussTypeId">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.bussTypeId" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in getAllDict('buss_type')"
                                            :key="item.value"
                                            :label="item.dictLabel"
                                            :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="业务类型" prop="billTypeId">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.billTypeId" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in getAllDict('bill_type')"
                                            :key="item.value"
                                            :label="item.dictLabel"
                                            :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="业务单号" prop="bussBillNo">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.bussBillNo" auto-complete="off" :maxlength="50"
                                          placeholder="请输入业务单号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="费用名称" prop="costName">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.costName" auto-complete="off" :maxlength="50"
                                          placeholder="请输入费用名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="结算方向" prop="settDirection">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.settDirection" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in getAllDict('sett_direction')"
                                            :key="item.value"
                                            :label="item.dictLabel"
                                            :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="计费方式" prop="charginaMode">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.charginaMode" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in getAllDict('charging_mode')"
                                            :key="item.value"
                                            :label="item.dictLabel"
                                            :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="结算方式" prop="settlementMode">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.settlementMode" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in getAllDict('settlement_mode')"
                                            :key="item.value"
                                            :label="item.dictLabel"
                                            :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结算量" prop="settVolume">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.settVolume" auto-complete="off" :maxlength="50"
                                          placeholder="请输入结算量"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="单价" prop="unitPrice">
                                <el-input :readonly="editForm.type==='view' " v-model.trim="editForm.unitPrice" auto-complete="off" :maxlength="50"
                                          placeholder="请输入单价"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="单价单位" prop="unit">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.unit" auto-complete="off" :maxlength="50"
                                          placeholder="请输入单价单位"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="总金额" prop="amtTotal">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.amtTotal" auto-complete="off" :maxlength="50"
                                          placeholder="请输入总金额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="已收金额" prop="amtReceive">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.amtReceive" auto-complete="off" :maxlength="50"
                                          placeholder="请输入已收金额"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="免费" prop="freeFlag">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.freeFlag" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in getAllDict('yes_no')"
                                            :key="item.value"
                                            :label="item.dictLabel"
                                            :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="备注" prop="remark">
                        <el-input :readonly="editForm.type==='view' || editForm.type==='audit'" type="textarea" :rows="3" v-model="editForm.remark" :maxlength="1000"
                                  auto-complete="off" placeholder="请输入备注"></el-input>
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
                    <el-button type="primary" v-if="editForm.type=='audit'"
                               @click="subAudit('editAuditForm')">提交
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { sureDelete,getValidButton,deleteAllNext } from '@/utils'
    import { setSupfinExpenseDetList,setSupfinExpenseDetAdd,setSupfinExpenseDetEdit,setSupfinExpenseDetDelete ,setSupfinExpenseDetBatchDelete,setDictionaryDataList,loadDictList} from '@/plugins/api'
    import { setCompanyData } from '@/plugins/apis'
    export default {
        data () {
            return {
                loading: false,
                formInline: {

                },
                listData: [], // 列表
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
                showTrees: false,
                selectData: {
                    treeCode: 0,
                    name: ''
                },
                columnOptions: [],
                postIds: [],
                rules: {
                    warehouseLocaNo: [{required: true, message: '请输入库位编号', trigger: 'blur'}],
                    warehouseLocaNm: [{required: true, message: '请输入库位名称', trigger: 'blur'}],
                    warehouseAreaId: [{required: true, message: '请选择库区编号', trigger: 'blur'}],
                    warehouseId:[{required: true, message: '请选择仓库', trigger: 'blur'}],
                    warehouseLocaType:[{required: true, message: '请选择库位性质', trigger: 'blur'}],
                    maxQuantity:[{required: true, message: '请输入最大存放数量', trigger: 'blur'}],
                    maxWeight:[{required: true, message: '请输入最大存放重量', trigger: 'blur'}],
                    controlSts:[{required: true, message: '请选择控制状态', trigger: 'blur'}],
                    status:[{required: true, message: '请选择状态', trigger: 'blur'}],

                },

                // 仓库下拉数据
                options: [],
                companyDatas:[],
            }
        },
        components: {
        },
        created () {
            this.permissionButtons = getValidButton(this.$route.path)
            this.getCompanyDatas()
            this.getSelects()
            this.getWarehouseData();
            //获取全部数据字典
            loadDictList({
                name: '**',
            }).then(res => {
                this.allDict = res;
            });
            //this.getList()
        },
        computed: {
        },
        watch: {

        },
        methods: {
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
                }
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
            getList (data) {
                //this.loading = true
                let sendData = {
                    ...this.formInline,
                    billNo: `*${this.formInline.billNo || ''}*`,
                    ...data
                }
                setSupfinExpenseDetList(sendData).then((res) => {
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
                this.editForm.type = 'add'
            },
            // 修改之前
            modifyPrev (item) {
                this.getColumnIdArr(item)
                this.editForm = JSON.parse(JSON.stringify(item))
                this.oldEditForm = JSON.stringify(item)
                this.title = '修改'
                this.editForm.type = 'edit'
                this.editFormVisible = true
            },
            // 修改添加完初始化数据
            _initEditForm () {
                this.editFormVisible = false
                this.editForm = {
                    state: 1
                }
            },
            // 确认添加
            addList (editData) {
                this.$refs[editData].validate((valid) => {
                    if (valid) {
                        let dataList = [];
                        Promise.all([
                            //库区编号
                            this.getAllDict('yes_no'),
                            //库位性质
                            this.getAllDict('warehouse_loca_type'),
                        ]).then(res => {
                            if(res != null && res.length==2){
                                for (let i = 0; i < res[0].length; i++) {
                                    if(this.editForm.warehouseAreaId == res[0][i].dictValue){
                                        this.editForm.warehouseArea = res[0][i].dictLabel
                                    }
                                }
                                for (let i = 0; i < res[1].length; i++) {
                                    if(this.editForm.warehouseLocaType == res[1][i].dictValue){
                                        this.editForm.warehouseLocaTypeNm = res[1][i].dictLabel
                                    }
                                }
                                for (let i = 0; i < this.options.length; i++) {
                                    if(this.editForm.warehouseId == this.options[i].value){
                                        this.editForm.warehouseNm = this.options[i].label
                                    }
                                }
                                this.loading = true
                                let sendData = this.editForm
                                setSupfinExpenseDetAdd(sendData).then((res) => {
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
                            //库区编号
                            this.getAllDict('yes_no'),
                            //库位性质
                            this.getAllDict('yes_no'),
                        ]).then(res => {
                            if(res != null && res.length==2){
                                for (let i = 0; i < res[0].length; i++) {
                                    if(this.editForm.warehouseAreaId == res[0][i].dictValue){
                                        this.editForm.warehouseArea = res[0][i].dictLabel
                                    }
                                }
                                for (let i = 0; i < res[1].length; i++) {
                                    if(this.editForm.warehouseLocaType == res[1][i].dictValue){
                                        this.editForm.warehouseLocaTypeNm = res[1][i].dictLabel
                                    }
                                }
                                for (let i = 0; i < this.options.length; i++) {
                                    if(this.editForm.warehouseId == this.options[i].value){
                                        this.editForm.warehouseNm = this.options[i].label
                                    }
                                }
                                this.loading = true
                                let sendData = this.editForm
                                setSupfinExpenseDetEdit(sendData).then((res) => {
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
            // 删除
            deleteItem (data) {
                sureDelete(() => {
                    const sendData = {
                        id: data.id
                    }
                    setSupfinExpenseDetDelete(sendData).then((res) => {
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
                    setSupfinExpenseDetBatchDelete(sendData).then((res) => {
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
                this.getColumnIdArr(item)
                this.editForm = JSON.parse(JSON.stringify(item))
                this.oldEditForm = JSON.stringify(item)
                this.editFormVisible = true
                this.title = '查看合同信息'
                this.editForm.type = 'view'
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



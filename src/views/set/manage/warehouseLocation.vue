<template>
    <div class="outer-box relative" style="height:100%;">
        <div class="right-box" :class="{'full': !showLeft }">
            <el-form :inline="true" :model="formInline" class="search-box">
                <el-form-item label="库位编号">
                    <el-input clearable :maxlength="50" placeholder="请输入库位编号" v-model.trim="formInline.warehouseLocaNo"></el-input>
                </el-form-item>
                <el-form-item label="库位名称">
                    <el-input clearable :maxlength="200" placeholder="请输入库位名称" v-model.trim="formInline.warehouseLocaNm"></el-input>
                </el-form-item>
                <el-form-item label="库区编号">
                    <el-select clearable v-model="formInline.warehouseAreaId" >
                        <el-option
                                v-for="item in getAllDict('yes_no')"
                                :key="item.value"
                                :label="item.dictLabel"
                                :value="item.dictValue">
                        </el-option>
                    </el-select>
                </el-form-item>
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
                    <el-table-column sortable prop="warehouseLocaNo" align="center" label="库位编号" min-width="160"></el-table-column>
                    <el-table-column prop="warehouseLocaNm" align="center" label="库位名称" min-width="200"></el-table-column>
                    <el-table-column sortable prop="warehouseArea" align="center" label="库区编号" min-width="160"></el-table-column>
                    <el-table-column prop="warehouseNm" align="center" label="仓库名称" min-width="200"></el-table-column>
                    <el-table-column sortable prop="warehouseLocaTypeNm" align="center" label="库位性质名称" min-width="160"></el-table-column>
                    <el-table-column sortable prop="maxQuantity" align="center" label="最大存放数量" min-width="160"></el-table-column>
                    <el-table-column sortable prop="maxWeight" align="center" label="最大存放重量" min-width="160"></el-table-column>
                    <el-table-column sortable prop="mixFlag" align="center" label="混堆" min-width="160"></el-table-column>
                    <el-table-column sortable prop="controlSts" align="center" label="控制状态" min-width="160">
                        <template slot-scope="scope">
                            <span v-show="scope.row.controlSts === '0'">正常</span>
                            <span v-show="scope.row.controlSts === '1'">只如不出</span>
                            <span v-show="scope.row.controlSts === '2'">只出不如</span>
                        </template>
                    </el-table-column>

                    <el-table-column sortable prop="status" align="center" label="状态" min-width="130">
                        <template slot-scope="scope">
                            <span v-show="scope.row.status === '0'">停用</span>
                            <span v-show="scope.row.status === '1'">启用</span>
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
                            <el-form-item label="库位编号" prop="warehouseLocaNo">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.warehouseLocaNo" auto-complete="off" :maxlength="50"
                                          placeholder="请输入库位名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="库位名称" prop="warehouseLocaNm">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.warehouseLocaNm" auto-complete="off" :maxlength="50"
                                          placeholder="请输入库位名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="库区编号" prop="warehouseAreaId">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.warehouseAreaId" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in getAllDict('yes_no')"
                                            :key="item.value"
                                            :label="item.dictLabel"
                                            :value="item.dictValue">
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
                        <el-col  :span="12">
                            <el-form-item label="库区性质" prop="warehouseLocaType">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.warehouseLocaType" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in getAllDict('yes_no')"
                                            :key="item.value"
                                            :label="item.dictLabel"
                                            :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="混堆" prop="mixFlag">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.mixFlag" placeholder="请选择" clearable>
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
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="最大存放数量" prop="maxQuantity">
                                <el-input type="number" :readonly="editForm.type==='view'" v-model.trim="editForm.maxQuantity" auto-complete="off" :maxlength="50"
                                          placeholder="请输入最大存放数量"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最大存放重量" prop="maxWeight">
                                <el-input type="number" :readonly="editForm.type==='view'" v-model.trim="editForm.maxWeight" auto-complete="off" :maxlength="50"
                                          placeholder="请输入最大存放重量"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="品名" prop="catalogNm">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.catalogNm" auto-complete="off" :maxlength="50"
                                          placeholder="请输入品名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="规格" prop="specifications">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.specifications" auto-complete="off" :maxlength="50"
                                          placeholder="请输入规格"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="材质" prop="textureMaterial">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.textureMaterial" auto-complete="off" :maxlength="50"
                                          placeholder="请输入材质"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="产地" prop="placeOrigin ">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.placeOrigin" auto-complete="off" :maxlength="50"
                                          placeholder="请输入库位名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="120">
                        <el-col :span="12">
                            <el-form-item label="视频地址" prop="videoUrl">
                                <el-input :readonly="editForm.type==='view'" v-model.trim="editForm.videoUrl" auto-complete="off" :maxlength="50"
                                          placeholder="请输入视频地址"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col  :span="12">
                            <el-form-item label="控制状态" prop="controlSts">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.controlSts" placeholder="请选择" clearable>
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
                    <el-row :gutter="120">
                        <el-col  :span="12">
                            <el-form-item label="状态" prop="status">
                                <el-select :disabled="editForm.type==='view'" v-model="editForm.status" placeholder="请选择" clearable>
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
                        <el-input :readonly="editForm.type==='view'" type="textarea" :rows="3" v-model="editForm.remark" :maxlength="1000"
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
    import { setWarehouseLocationList,setWarehouseLocationAdd,setWarehouseLocationEdit,setWarehouseLocationDelete ,setWarehouseLocationBatchDelete,setDictionaryDataList,loadDictList} from '@/plugins/api'

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
            }
        },
        components: {
        },
        created () {
            this.permissionButtons = getValidButton(this.$route.path)
            this.getList()
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

        },
        methods: {
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
                this.loading = true
                let sendData = {
                    ...this.formInline,
                    warehouseLocaNo: `*${this.formInline.warehouseLocaNo || ''}*`,
                    warehouseLocaNm: `*${this.formInline.warehouseLocaNm || ''}*`,
                    ...data
                }
                setWarehouseLocationList(sendData).then((res) => {
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
                                setWarehouseLocationAdd(sendData).then((res) => {
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
                                setWarehouseLocationEdit(sendData).then((res) => {
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
                    setWarehouseLocationDelete(sendData).then((res) => {
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
                    setWarehouseLocationBatchDelete(sendData).then((res) => {
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



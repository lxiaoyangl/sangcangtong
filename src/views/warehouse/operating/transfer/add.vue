<template>
    <div class="add">
        <BasisDetail>
            <i slot="detail_icon" class="el-icon-back" @click="go_back"></i>

            <span slot="detail_title">过户预报登记</span>
            
            <div slot="detail_btn">
                <el-button type="primary" size="medium" icon="el-icon-folder-add" @click="save">保存</el-button>
                <el-button type="primary" size="medium" icon="el-icon-folder-add" @click="submit">提交</el-button>
                <el-button type="info" size="medium" icon="el-icon-document" @click="enclosure_flag=true">附件</el-button>
            </div>

            <!-- 中部form信息块 -->
            <div slot="detail_content_form">
                <el-form ref="application_form" :model="form" :rules="form_rules" :inline="true" label-width="120px">
                    <el-form-item label="仓库" prop="inp1">
                        <el-select clearable v-model="form.inp1" placeholder="请选择仓库" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="过入方" prop="inp2">
                        <el-select clearable v-model="form.inp2" placeholder="请选择过入方" size="mini">
                            <el-option
                                v-for="item in pass_through_arr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="交易订单号" prop="inp3">
                        <el-input v-model="form.inp3" placeholder="交易订单号" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="计划过户日期" prop="inp4">
                        <el-date-picker
                            v-model="form.inp4"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="mini"
                            :picker-options="time_option">
                        </el-date-picker>
                    </el-form-item>
                   
                </el-form>
            </div>

            <div slot="detail_content">
                <div class="detail_content_table">
                    <div class="detail_content_table_btn">
                        <el-button type="text" icon="el-icon-circle-plus-outline" @click="add_goods">库存选择</el-button>
                        <el-button type="text" icon="el-icon-remove-outline" @click="del_goods" class="top_color_red">删除</el-button>
                    </div>

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
                                prop="materialName"
                                label="品名"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="specifications"
                                label="规格"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="textureMaterial"
                                label="材质"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="businessMen"
                                label="产地"
                                width="100">
                            </el-table-column>

                            <el-table-column
                                prop="transferQuantity"
                                label="计划过户数量"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.transferQuantity" type="number" placeholder="请输入数量" size="mini" @input="enterNumber_change(scope.row)"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="weightCoefficient"
                                label="理重"
                                width="100">
                            </el-table-column>

                            <el-table-column
                                prop="transferWeight"
                                label="计划过户重量"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.transferWeight" type="number" placeholder="请输入重量" size="mini"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="unitQuantityId"
                                label="数量单位"
                                width="200">
                                <template slot-scope="scope">
                                    <el-select clearable v-model="scope.row.unitQuantityId" placeholder="数量单位" size="mini">
                                        <el-option
                                            v-for="item in num_unit_arr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="unitWeightId"
                                label="重量单位"
                                width="200">
                                <template slot-scope="scope">
                                    <el-select clearable v-model="scope.row.unitWeightId" placeholder="重量单位" size="mini">
                                        <el-option
                                            v-for="item in weight_unit_arr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="measurementMethod"
                                label="计量方式"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.measurementMethod" placeholder="计量方式" size="mini"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="materialNatureId"
                                label="货物特性"
                                width="200">
                                <template slot-scope="scope">
                                    <el-select clearable v-model="scope.row.materialNatureId" placeholder="货物特性" size="mini">
                                        <el-option
                                            v-for="item in goods_type_arr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="description"
                                label="备注"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.description" placeholder="备注" size="mini"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </BasisDetail>
        
        <!-- 新增物资蒙层 -->
        <BasisDialog
            :title="'物资选择'"
            :visible="add_dialog_flag"
            @cancel="add_dialog_before_close"
            @sure="add_dialog_sure"
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

                        <el-form-item label="规格">
                            <el-input v-model="add_dialog_form.matespecrial" placeholder="规格" size="mini" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="产地">
                            <el-input v-model="add_dialog_form.origin" placeholder="产地" size="mini" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="仓库">
                            <el-select clearable v-model="add_dialog_form.warehouse" placeholder="请选择仓库" size="mini">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

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
                            prop="unitQuantity"
                            label="数量单位"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="weight"
                            label="重量单位"
                            width="100">
                        </el-table-column>
                        <el-table-column
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
                        <el-button size="small" type="primary" :loading="enclosure_loading">点击上传</el-button>
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
export default {
    data(){
        return{
            // 表单数据
            form:{
                inp1:null,
                inp2:null,
                inp3:'',
                inp4:'',
            },
            form_rules:{
                inp1:{required: true, message: '请选择仓库',trigger: 'blur'},
                inp2:{required: true, message: '请选择过入方',trigger: 'blur'},
                inp3:{required: true, message: '请输入交易订单号',trigger: 'blur'},
                inp4:{required: true, message: '请选择过户时间',trigger: 'blur'},
            },
            // 仓库下拉数据
            options: [],
            // 过入方
            pass_through_arr:[],
            // 列表数据
            table_data: [],
            // 数量单位
            num_unit_arr:[],
            // 重量单位
            weight_unit_arr:[],
            // 货物性质下拉数据
            goods_type_arr:[],

            // 新增蒙层显示标识
            add_dialog_flag:false,
            add_dialog_form:{
                name:"", // 品名
                material:'', // 材质
                spec:'', // 规格
                origin:'', // 产地
                warehouse:null, // 仓库
            },
            // 蒙层表格
            add_dialog_table_data:[],
            // 新增蒙层选中存贮数组
            add_dialog_selected_arr:[],
            // 详情列表选中存储数组
            detail_selected_arr:[],

            // 新增蒙层页码数据
            add_dialog_page_obj:{
                total:0,
                page_num:1,
                page_size:20
            },


            // 附件上传标识
            enclosure_loading:false,
            // 附件蒙层显示标识
            enclosure_flag:false,
            // 附件蒙层表格数据
            enclosure_dialog_content_table_data:[],

            // 准备上传的附件列表
            file_list:[],

            // 时间组件的范围确定
            time_option: {
                disabledDate(val){
                    return val.getTime() < new Date().getTime()
                }
            }
        }
    },
    watch:{
        'enclosure_flag':function(val){
            if(!val){
                return;
            }
            if(sessionStorage.getItem('warehouse-transfer-edit') === 'false'){
                this.enclosure_dialog_content_table_data = [...this.file_list];
                console.log('1',this.file_list)
                return;
            }
            this.enclosure_loading = true;
            this.$axios.post('/applicationEnclosure/baseList',{
                applicationFormType:2,
                applicationFormId:sessionStorage.getItem('warehouse-transfer-aplicationid')*1,
            }).then(res=>{
                console.log('附件',res);
                this.enclosure_dialog_content_table_data = [...res.data.data];
            }).finally(()=>{
                this.enclosure_loading = false;
            })
        }
    },
    mounted(){
        // 获取数量单位下拉数据
        this.$fn.get_numunit(this);
        // 获取重量单位下拉数据
        this.$fn.get_weightunit(this)
        // 获取货物特性
        this.$fn.get_goodsfeatures(this)
        this.$fn.get_transportType(this);
        // 获取证件类型下拉数据
        this.$fn.get_idType(this)
        // 获取计量方式下拉数据
        this.$fn.get_valuationType(this)
       // 获取仓库数据
        this.get_warehouse_data();
        // 获取物资
        this.get_goods();
        // 获取企业下拉数据
        this.get_company();

        // 判断是否是在编辑
        if(sessionStorage.getItem('warehouse-transfer-edit') === 'true'){
            // 申请单详情查询
            this.$axios.post('/applicationTransfer/baseList',{
                id:sessionStorage.getItem('warehouse-transfer-aplicationid')*1
            }).then(res=>{
                console.log('在编辑数据',res);
                let obj = res.data.data[0];
                this.form.inp1 = obj.warehouseId;
                this.form.inp2 = obj.receiverId;
                this.form.inp3 = obj.orderNumber;
                this.form.inp4 = new Date(obj.transferTime);
                // 物资查询
                this.$axios.post('/applicationTransferItem/baseList',{
                    applicationId:sessionStorage.getItem('warehouse-transfer-aplicationid')*1
                }).then(re=>{
                    this.table_data = [...re.data.data];
                })
            },err=>{
                console.log('在编辑数据报错',err);
            })
        }
    },
    methods:{
        // 返回入库预报
        go_back(){
            this.$router.push({name:'transfer_list'})
        },
        // 蒙层关闭前触发函数
        add_dialog_before_close(){
            this.$refs.add_dialog_table.clearSelection();
            this.add_dialog_flag = false;
        },
        // 新增物资
        add_goods(){
            this.add_dialog_flag = true;
        },
        // 删除物资
        del_goods(){
            if(this.detail_selected_arr.length === 0){
                this.$fn.message('请选择物资再进行删除','error');
                return;
            }
            let arr = [];
            this.table_data.map(item=>{
                let flag = false;
                this.detail_selected_arr.map(it=>{
                    if(it.id === item.id){
                        flag = true;
                    }
                })
                if(!flag){
                    arr.push(item);
                }
            })
            this.table_data = [...arr];
        },
        // 物资详情多选选择函数
        detail_table_selection_change(val){
            console.log('物资详情多选选择函数',val);
            this.detail_selected_arr = [...val];
        },
        // 新增蒙层多选改变函数
        add_dialog_table_selection_change(val){
            console.log(val);
            this.add_dialog_selected_arr = [...val];
        },
        // 新增蒙层确认函数
        add_dialog_sure(){
            let arr = JSON.parse(JSON.stringify(this.add_dialog_selected_arr));
            arr.map(item=>{
                item = Object.assign({},item);
                item.materialName = item.name;
                this.table_data.push(item);
            })
            this.add_dialog_before_close();
        },

        // 获取仓库数据
        get_warehouse_data(){
            // 获取仓库数据
            this.$fn.get_warehouse_data(this).then(res=>{
                console.log('res',res);
                this.options = [...res.data.data];
            },err=>{
                console.log('err',err);
            })
        },

        // 获取企业下拉信息
        get_company(){
            this.$axios.post('/company/baseList',{

            }).then(res=>{
                console.log('企业下拉数据',res);
                res.data.data.map(item=>{
                    item.value = item.id;
                    item.label = item.name;
                })
                this.pass_through_arr = [...res.data.data];
            })
        },

        // 获取物资接口
        get_goods(){
            let senddata = {};
            if(this.add_dialog_form.name !== ''){
                senddata.name = this.add_dialog_form.name;
            }
            if(this.add_dialog_form.material !== ''){
                senddata.textureMaterial = this.add_dialog_form.material;
            }
            if(this.add_dialog_form.spec !== ''){
                senddata.specifications = this.add_dialog_form.spec;
            }
            if(this.add_dialog_form.origin !== ''){
                senddata.placeOrigin = this.add_dialog_form.origin;
            }
            // if(this.add_dialog_form.warehouse !== null){
            //     senddata.placeOrigin = this.add_dialog_form.origin;
            // }
            this.goods_loading = true;
            this.$axios.post('/material/baseList?_pageList',{
                pageNo:this.add_dialog_page_obj.page_num,
                pageSize:this.add_dialog_page_obj.page_size,
                ...senddata
            }).then(res=>{
                console.log('物资',res);
                res.data.data.records.map(item=>{
                    item.materialName = item.name
                })
                this.add_dialog_table_data = [...res.data.data.records];
                this.add_dialog_page_obj.total = res.data.data.total;
            },err=>{
                console.log('物资抛错',err);
            }).finally(()=>{
                this.goods_loading = false;
            })
        },

        // 保存触发函数
        save(){
            this.$confirm('保存申请单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs.application_form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    let sendData = {
                        documentState:0,
                        warehouseId:this.form.inp1,
                        receiverId:this.form.inp2,
                        orderNumber:this.form.inp3,
                        transferTime:this.$fn.timeChange(this.form.inp4),
                        itemList:[...this.table_data],
                        fileList:[...this.file_list]
                    }
                    // 仓库中文
                    this.options.map(item=>{
                        if(item.value === sendData.warehouseId){
                            sendData.warehouseName = item.label
                        }
                    })
                    // 过户方中文
                    this.pass_through_arr.map(item=>{
                        if(item.value === sendData.receiverId){
                            sendData.receiver = item.label
                        }
                    })
                    if(sessionStorage.getItem('warehouse-transfer-edit') === 'true'){
                        sendData.id = sessionStorage.getItem('warehouse-transfer-aplicationid')*1;
                        this.$axios.post('/applicationTransfer/editApplicationTransfer',sendData).then(res=>{
                            console.log('修改结果',res);
                            // this.$message.success(res.data.data);
                            this.go_back();
                        },err=>{
                            console.log('修改报错',err);
                        })
                        return;
                    }
                    this.$axios.post('/applicationTransfer/addApplicationTransfer',sendData).then(res=>{
                        console.log('新增结果',res);
                        // this.$message.success(res.data.data);
                        this.go_back();
                    },err=>{
                        console.log('新增报错',err);
                    })
                })
            }).catch(() => {
                  
            });
        },
        // 提交
        submit(){
            this.$confirm('提交申请单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs.application_form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    let sendData = {
                        documentState:1,
                        warehouseId:this.form.inp1,
                        receiverId:this.form.inp2,
                        orderNumber:this.form.inp3,
                        transferTime:this.$fn.timeChange(this.form.inp4),
                        itemList:[...this.table_data],
                        fileList:[...this.file_list]
                    }
                    // 仓库中文
                    this.options.map(item=>{
                        if(item.value === sendData.warehouseId){
                            sendData.warehouseName = item.label
                        }
                    })
                    // 过户方中文
                    this.pass_through_arr.map(item=>{
                        if(item.value === sendData.receiverId){
                            sendData.receiver = item.label
                        }
                    })
                    if(sessionStorage.getItem('warehouse-transfer-edit') === 'true'){
                        sendData.id = sessionStorage.getItem('warehouse-transfer-aplicationid')*1;
                        this.$axios.post('/applicationTransfer/editApplicationTransfer',sendData).then(res=>{
                            console.log('修改结果',res);
                            // this.$message.success(res.data.data);
                            this.go_back();
                        },err=>{
                            console.log('修改报错',err);
                        })
                        return;
                    }
                    this.$axios.post('/applicationTransfer/addApplicationTransfer',sendData).then(res=>{
                        console.log('新增结果',res);
                        // this.$message.success(res.data.data);
                        this.go_back();
                    },err=>{
                        console.log('新增报错',err);
                    })
                })
            }).catch(() => {
                  
            });
            
        },

        // 获取物资的重置
        get_goods_refresh(){
            this.add_dialog_form = {
                name:"", // 品名
                material:'', // 材质
                spec:'', // 规格
                origin:'', // 产地
                warehouse:null, // 仓库
            }
            this.get_goods();
        },
        // 新增蒙层页码改变函数
        add_dialog_page_change(val){
            this.add_dialog_page_obj.page_num = val;
            this.get_goods();
        },


        // 附件蒙层关闭前触发函数
        enclosure_before_close(){
            this.enclosure_flag = false;
            this.enclosure_dialog_content_table_data = [];
        },
        // 附件蒙层确认函数
        enclosure_sure(){
            this.enclosure_flag = false;
            this.file_list = [...this.enclosure_dialog_content_table_data];
            this.enclosure_dialog_content_table_data = [];
        },
        // 文件上传
        enclosure_upload(val){
            console.log(val);
            let formdata = new FormData();
            formdata.append('file',val.raw)
            this.enclosure_loading = true;
            this.$axios.post('/FileController/upload',formdata).then(res=>{
                console.log('上传结果',res);
                this.enclosure_dialog_content_table_data.push(res.data.data);
                this.enclosure_dialog_content_table_data.map(item=>{
                    item.fileName = item.name;
                    item.fileSize = item.size;
                    item.fileType = item.type;
                })
            },err=>{
                console.log('上传报错',err);
            }).finally(()=>{
                this.enclosure_loading = false;
            })
        },
        // 附件蒙层，文件删除
        enclosure_dialog_content_table_data_del(obj){
            console.log('附件删除',obj)
            let arr = [];
            this.enclosure_dialog_content_table_data.map(item=>{
                if(item.path !== obj.path){
                    arr.push(item);
                }
            })
            this.enclosure_dialog_content_table_data = [...arr];
        },

        // 计划入库数量修改
        enterNumber_change(val){
            if(val.enterNumber<0){
                val.enterNumber = 0;
                val.enterWeight = 0;
                return;
            }
            val.transferWeight = val.transferQuantity*val.weightCoefficient;
        },

        // 附件文件下载操作
        download_file(obj){
            console.log(obj);
            window.open(obj.path);
        }
    }
}
</script>

<style lang="less" scoped>
.add{
    width: 100%;
    height: 100%;
}
               
/deep/.el-textarea__inner{
    min-height: 50px !important;
    max-height: 50px !important;
}

/deep/.detail_content_table{
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    background: #fff;
    .detail_content_table_btn{
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
    .detail_content_table_box{
        width: 100%;
        height: calc(100% - 40px);
    }
}

/deep/.dialog_content{
    width: 100%;
    display: flex;
    flex-direction: column;
    .dialog_content_form{
        width: 100%;
    }
    .dialog_content_table{
        width: 100%;
        height: 400px;
    }
}

.el-select,.el-date-editor{
    width: 178px !important;
}

// .el-form-item{
//     margin-bottom: 0px;
// }


/deep/.enclosure_dialog_content{
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    .enclosure_dialog_content_form{
        width: 100%;
        height: 50px;
    }
    .enclosure_dialog_content_table{
        width: 100%;
        height: calc(100% - 50px);
    }
}
</style>
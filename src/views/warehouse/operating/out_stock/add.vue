<template>
    <div class="add" v-loading="loading">
        <BasisDetail>
            <i slot="detail_icon" class="el-icon-back" @click="go_back"></i>

            <span slot="detail_title">出库资源</span>
            
            <div slot="detail_btn">
                <el-button type="primary" size="medium" icon="el-icon-folder-add" @click="save">保存</el-button>
                <el-button type="primary" size="medium" icon="el-icon-folder-add" @click="submit">提交</el-button>
                <el-button type="info" size="medium" icon="el-icon-document" @click="enclosure_flag = true">附件</el-button>
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

                    <el-form-item label="计划装车日期" prop="inp2">
                        <el-date-picker
                            v-model="form.inp2"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="mini"
                            :picker-options="time_option">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="交易订单号" prop="inp3">
                        <el-input v-model="form.inp3" placeholder="交易订单号" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="运输方式" prop="inp4">
                        <el-select clearable v-model="form.inp4" placeholder="请选择运输方式" size="mini">
                            <el-option
                                v-for="item in transport_arr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="装车点" prop="inp5">
                        <el-input v-model="form.inp5" placeholder="装车点" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="卸车点" prop="inp6">
                        <el-input v-model="form.inp6" placeholder="卸车点" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="卸车地址" prop="inp7">
                        <el-input v-model="form.inp7" placeholder="卸车地址" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="签收人" prop="inp8">
                        <el-input v-model="form.inp8" placeholder="签收人" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="签收人电话" prop="inp9">
                        <el-input v-model="form.inp9" placeholder="签收人电话" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="是否平台派车" prop="inp10">
                        <el-select clearable v-model="form.inp10" placeholder="请选择是否平台派车" size="mini">
                            <el-option
                                v-for="item in is_platform_send_car_arr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="计划派车日期" v-show="form.inp10 === 1">
                        <el-date-picker
                            v-model="form.inp11"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="mini">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="计划送达日期" v-show="form.inp10 === 1">
                        <el-date-picker
                            v-model="form.inp12"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="mini">
                        </el-date-picker>
                    </el-form-item>

                </el-form>
            </div>

            <div slot="detail_content">
                <div class="detail_content_table">
                    <div class="detail_content_table_btn">
                        <el-button type="text" @click="add_goods" icon="el-icon-circle-plus-outline">库存选择</el-button>
                        <el-button type="text" @click="code_table_choosed" icon="el-icon-circle-plus-outline">码表选择</el-button>
                        <el-button type="text" @click="del_goods" icon="el-icon-remove-outline" class="top_color_red">删除</el-button>
                        <el-button type="text" @click="download_excel" icon="el-icon-download">模板下载</el-button>
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            accept=".xls,.xlsx"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-change="import_excel"
                            :limit="1"
                            :show-file-list="false"
                            :auto-upload="false"
                        >
                            <el-button type="text" icon="el-icon-upload2">数据导入</el-button>
                        </el-upload>
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
                                label="厂商"
                                width="100">
                            </el-table-column>

                            <el-table-column
                                prop="takeNumber"
                                label="计划提货数量"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.takeNumber" type="number" placeholder="请输入数量" size="mini" @input="enterNumber_change(scope.row)"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="weightCoefficient"
                                label="理重"
                                width="100">
                            </el-table-column>

                            <el-table-column
                                prop="takeWeight"
                                label="计划提货重量"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.takeWeight" type="number" placeholder="请输入重量" size="mini"></el-input>
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
                                prop="measurementMethodId"
                                label="计量方式"
                                width="200">
                                <template slot-scope="scope">
                                    <el-select clearable v-model="scope.row.measurementMethodId" placeholder="计量方式" size="mini">
                                        <el-option
                                            v-for="item in valuationType_arr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
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
                                prop="licenseNumberPlan"
                                label="计划提货车号"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.licenseNumberPlan" placeholder="计划提货车号" size="mini"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="licenseNumber"
                                label="实际提货车号"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.licenseNumber" placeholder="实际提货车号" size="mini"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="takeUser"
                                label="提货人"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.takeUser" placeholder="车皮号" size="mini"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="contactInformation"
                                label="联系方式"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.contactInformation" placeholder="备注" size="mini"></el-input>
                                </template>
                            </el-table-column>
                            
                            <el-table-column
                                prop="certificatesType"
                                label="证件类型"
                                min-width="180">
                                <template slot-scope="scope">
                                    <el-select clearable v-model="scope.row.certificatesType" placeholder="证件类型" size="mini">
                                        <el-option
                                            v-for="item in idType_arr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="certificatesNumber"
                                label="证件号"
                                width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.certificatesNumber" placeholder="证件号" size="mini"></el-input>
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
        
        <!-- 库存选择蒙层 -->
        <BasisDialog
            :title="'现货物资汇总列表'"
            :visible="add_dialog_flag"
            @cancel="add_dialog_before_close"
            @sure="add_dialog_sure"
        >
            <div slot="dialog_content" class="dialog_content">

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
                            label="货物性质"
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
                >
                </el-pagination>
            </div>
        </BasisDialog>

        <!-- 码表选择蒙层 -->
        <BasisDialog
            :title="'物资选择'"
            :visible="code_table_flag"
            @cancel="code_table_before_close"
            @sure="code_table_sure"
            v-loading="code_loading"
        >
            <div slot="dialog_content" class="code_dialog_content">
                <div class="dialog_content_form">
                    <el-form ref="form" :model="code_dialog_form" :inline="true" label-width="100px">
                        <el-form-item label="品名">
                            <el-input v-model="code_dialog_form.name" placeholder="品名" size="mini" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="材质">
                            <el-input v-model="code_dialog_form.material" placeholder="材质" size="mini" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="规格">
                            <el-input v-model="code_dialog_form.spec" placeholder="规格" size="mini" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="产地">
                            <el-input v-model="code_dialog_form.origin" placeholder="产地" size="mini" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="">
                            <el-button size="mini" icon="el-icon-search" type="primary" @click="get_goods">搜索</el-button>
                            <el-button size="mini" icon="el-icon-refresh" type="info" @click="get_goods_refresh">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="dialog_content_table">
                    <el-table
                        ref="code_table"
                        :data="code_table_data"
                        style="width: 100%"
                        height="100%"
                        @selection-change="code_table_selection_change"
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
                            label="货物性质"
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
                    :total="code_dialog_page_obj.total"
                    :current-page="code_dialog_page_obj.page_num"
                    :page-size="code_dialog_page_obj.page_size"
                    @current-change="code_dialog_page_change">
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
export default {
    data(){
        return{
            loading:false,
            // 表单数据
            form:{
                inp1:null,
                inp2:null,
                inp3:'',
                inp4:null,
                inp5:'',
                inp6:'',
                inp7:'',
                inp8:'',
                inp9:'',
                inp10:0,
                inp11:'',
                inp12:'',
            },
            form_rules:{
                inp1:{required: true, message: '请选择仓库',trigger: 'blur'},
                inp2:{required: true, message: '请选择装车时间',trigger: 'blur'},
                inp3:{required: true, message: '请输入交易订单号',trigger: 'blur'},
                inp4:{required: true, message: '请选择运输方式',trigger: 'blur'},
                inp5:{required: true, message: '请输入装车点',trigger: 'blur'},
                inp6:{required: true, message: '请输入卸车点',trigger: 'blur'},
                inp7:{required: true, message: '请输入卸车地址',trigger: 'blur'},
                inp8:{required: true, message: '请输入签收人',trigger: 'blur'},
                inp9:[
                    {required: true, message: '请输入签收人电话',trigger: 'blur'},
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
                ],
                inp10:{required: true, message: '请选择是否平台派车',trigger: 'blur'},
            },
            // 仓库下拉数据
            options: [],
            // 列表数据
            table_data: [
                // {
                //     name: '钢金',
                //     spec: '20*20',
                //     material: 'HRB200', //材质
                //     origin: '重庆', // 产地
                //     plan_incoming_num: 0, //计划入库数量
                //     weight: 0.8, // 理重
                //     plan_incoming_weight:0, //计划入库重量
                //     num_unit:1, //数量单位
                //     weight_unit:1, //重量单位
                //     compute_type:'', // 计量方式
                //     goods_type:1, //货物性质
                //     train_num:'', // 车次
                //     wagon_num:'', // 车皮号
                //     remark:'', // 备注
                //     loading_point:'', // 装车点
                //     unloading_point: '', // 卸车点
                //     shipping_address: '', // 收货地址
                //     receiver:'', //收货人
                //     receiver_phone:'', //收货人电话
                // },
            ],
            // 是否平台派车
            is_platform_send_car_arr:[
                {
                    label: '是',
                    value:1,
                },
                {
                    label: '否',
                    value:0,
                }
            ],
            // 数量单位
            num_unit_arr:[],
            // 重量单位
            weight_unit_arr:[],
            // 货物性质下拉数据
            goods_type_arr:[],
            // 证件类型下拉数据
            idType_arr: [],
            // 计量方式
            valuationType_arr: [],

            // 新增蒙层显示标识
            add_dialog_flag:false,
            code_dialog_form:{
                name:"", // 品名
                material:'', // 材质
                spec:'',// 规格
                origin:'', // 产地
            },
            // 品名下拉数据
            name_arr:[
                {
                    label:'螺纹',
                    value:1,
                },
                {
                    label:'盘螺',
                    value:2,
                },
            ],
            // 材质下拉数据
            material_arr:[
               {
                    label:'1214',
                    value:1,
                },
                {
                    label:'C30',
                    value:2,
                }, 
            ],
            // 规格下拉数据
            spec_arr:[
                {
                    label:'0.7*12',
                    value:1,
                },
                {
                    label:'10',
                    value:2,
                }, 
            ],
            // 规格下拉数据
            origin_arr:[
                {
                    label:'成都',
                    value:1,
                },
                {
                    label:'万钢',
                    value:2,
                }, 
            ],
            // 证件类型
            card_type_arr:[
                {
                    label:'驾驶证',
                    value:1,
                },
                {
                    label:'身份证',
                    value:2,
                }, 
            ],
            // 库存蒙层表格
            add_dialog_table_data:[],
            // 码表蒙层表格
            code_table_data:[],
            // 新增蒙层选中存贮数组
            add_dialog_selected_arr:[],
            // 详情列表选中存储数组
            detail_selected_arr:[],
            // 码表蒙层选中存贮数组
            code_table_selected_arr:[],

            // 运输方式
            transport_arr:[
                
            ],

            // 码表蒙层
            code_table_flag:false,

            // 新增库存选择蒙层页码数据
            add_dialog_page_obj:{
                total:0,
                page_num:1,
                page_size:20
            },
            // 新增码表选择蒙层页码数据
            code_dialog_page_obj:{
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

            // 码表选择loading
            code_loading:false,

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
            if(sessionStorage.getItem('warehouse-out-stock-edit') === 'false'){
                this.enclosure_dialog_content_table_data = [...this.file_list];
                console.log('1',this.file_list)
                return;
            }
            this.enclosure_loading = true;
            this.$axios.post('/applicationEnclosure/baseList',{
                applicationFormType:1,
                applicationFormId:sessionStorage.getItem('warehouse-out-stock-aplicationid')*1,
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

        // 判断是否是在编辑
        if(sessionStorage.getItem('warehouse-out-stock-edit') === 'true'){
            // 申请单详情查询
            this.$axios.post('/applicationOut/baseList',{
                id:sessionStorage.getItem('warehouse-out-stock-aplicationid')*1
            }).then(res=>{
                console.log('在编辑数据',res);
                let obj = res.data.data[0];
                this.form.inp1 = obj.warehouseId;
                this.form.inp2 = new Date(obj.planTakeTime);
                this.form.inp3 = obj.orderNumber;
                this.form.inp4 = obj.transportId;
                this.form.inp5 = obj.loadingPoint;
                this.form.inp6 = obj.unloadingPoint;
                this.form.inp7 = obj.unloadingAddress;
                this.form.inp8 = obj.signer;
                this.form.inp9 = obj.signerNumber;
                this.form.inp10 = obj.isSendCar;

                if(this.form.inp10 === 1){
                    this.form.inp11 = obj.sendCarTime;
                    this.form.inp12 = obj.serviceTime;
                }
                // 物资查询
                this.$axios.post('/applicationOutItem/baseList',{
                    applicationId:sessionStorage.getItem('warehouse-out-stock-aplicationid')*1
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
            this.$router.push({name:'out_stock_list'})
        },
        // 蒙层关闭前触发函数
        add_dialog_before_close(){
            this.$refs.add_dialog_table.clearSelection();
            this.add_dialog_flag = false;
        },
        // 库存选择开启蒙层
        add_goods(){
            this.add_dialog_flag = true;
        },
        // 码表选择开启蒙层
        code_table_choosed(){
            this.code_table_flag = true;
        },
        // 删除物资
        del_goods(){
            if(this.detail_selected_arr.length === 0){
                this.$fn.message('请选择物资再进行删除','error');
                return;
            }
            console.log('选中物资删除',this.detail_selected_arr);
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
            this.detail_selected_arr = [...val];
        },
        // 库存选择蒙层多选改变函数
        add_dialog_table_selection_change(val){
            this.add_dialog_selected_arr = [...val];
        },
        // 库存蒙层确认函数
        add_dialog_sure(){
            let arr = JSON.parse(JSON.stringify(this.add_dialog_selected_arr));
            console.log(arr);
            arr.map(item=>{
                item.materialName = item.name;
                item = Object.assign({},item);
                this.table_data.push(item);
            })
            this.add_dialog_before_close();
        },

        // 码表蒙层取消函数
        code_table_before_close(){
            this.$refs.code_table.clearSelection();
            this.code_table_flag = false;
        },
        // 码表确认函数
        code_table_sure(){
            let arr = JSON.parse(JSON.stringify(this.code_table_selected_arr));
            arr.map(item=>{
                item.materialName = item.name;
                item = Object.assign({},item);
                this.table_data.push(item);
            })
            this.code_table_before_close();
        },
        // 码表蒙层多选改变函数
        code_table_selection_change(val){
            console.log(val);
            this.code_table_selected_arr = [...val];
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

        // 获取码表物资数据接口
        get_goods(){
            let senddata = {};
            if(this.code_dialog_form.name !== ''){
                senddata.name = this.code_dialog_form.name;
            }
            if(this.code_dialog_form.material !== ''){
                senddata.textureMaterial = this.code_dialog_form.material;
            }
            if(this.code_dialog_form.spec !== ''){
                senddata.specifications = this.code_dialog_form.spec;
            }
            if(this.code_dialog_form.origin !== ''){
                senddata.placeOrigin = this.code_dialog_form.origin;
            }
            this.code_loading = true;
            this.$axios.post('/material/baseList?_pageList',{
                pageNo:this.code_dialog_page_obj.page_num,
                pageSize:this.code_dialog_page_obj.page_size,
                ...senddata
            }).then(res=>{
                console.log('物资',res);
                this.add_dialog_table_data = [...res.data.data.records];
                
                this.code_table_data = [...res.data.data.records];
                this.code_dialog_page_obj.total = res.data.data.total
            },err=>{
                console.log('物资抛错',err);
                this.code_loading = false;
            })
        },
        // 码表选择页码改变函数
        code_dialog_page_change(val){
            this.code_dialog_page_obj.page_num = val;
            this.get_goods();
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
                    // 判断计划送达事件要大于计划装车时间
                    if(this.form.inp10 == 1){
                        if(new Date(this.form.inp11).getTime() >= new Date(this.form.inp12).getTime()){
                            this.$message.error('计划送达事件需要大于计划装车时间')
                            return;
                        }
                    }
                    let sendData = {
                        documentState:0,
                        warehouseId:this.form.inp1,
                        planTakeTime:this.$fn.timeChange(this.form.inp2),
                        orderNumber:this.form.inp3,
                        transportId:this.form.inp4,
                        loadingPoint:this.form.inp5,
                        unloadingPoint:this.form.inp6,
                        unloadingAddress:this.form.inp7,
                        signer:this.form.inp8,
                        signerNumber:this.form.inp9,
                        isSendCar:this.form.inp10,
                        itemList:[...this.table_data],
                        fileList:[...this.file_list]
                    }
                    // 仓库中文
                    this.options.map(item=>{
                        if(item.value === sendData.warehouseId){
                            sendData.warehouseName = item.label
                        }
                    })
                    if(this.form.inp10 === 1){
                        if(this.form.inp11){
                            sendData.loadingTime = this.$fn.timeChange(this.form.inp11);
                        }else{
                            this.$fn.message('请选择计划派车时间', 'error')
                            return;
                        }

                        if(this.form.inp12){
                            sendData.serviceTime = this.$fn.timeChange(this.form.inp12);
                        }else{
                            this.$fn.message('请选择计划送达时间', 'error')
                            return;
                        }
                    }
                    if(sessionStorage.getItem('warehouse-out-stock-edit') === 'true'){
                        sendData.id = sessionStorage.getItem('warehouse-out-stock-aplicationid')*1;
                        this.$axios.post('/applicationOut/editApplicationOut',sendData).then(res=>{
                            console.log('修改结果',res);
                            // this.$message.success(res.data.data);
                            this.go_back();
                        },err=>{
                            console.log('修改报错',err);
                        })
                        return;
                    }
                    this.$axios.post('/applicationOut/addApplicationOut',sendData).then(res=>{
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

         // 提交触发函数
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
                        planTakeTime:this.$fn.timeChange(this.form.inp2),
                        orderNumber:this.form.inp3,
                        transportId:this.form.inp4,
                        loadingPoint:this.form.inp5,
                        unloadingPoint:this.form.inp6,
                        unloadingAddress:this.form.inp7,
                        signer:this.form.inp8,
                        signerNumber:this.form.inp9,
                        isSendCar:this.form.inp10,
                        itemList:[...this.table_data],
                        fileList:[...this.file_list]
                    }
                    // 仓库中文
                    this.options.map(item=>{
                        if(item.value === sendData.warehouseId){
                            sendData.warehouseName = item.label
                        }
                    })
                    if(this.form.inp10 === 1){
                        sendData.sendCarTime = this.$fn.timeChange(this.form.inp11);
                        sendData.serviceTime = this.$fn.timeChange(this.form.inp12);
                    }
                    if(sessionStorage.getItem('warehouse-out-stock-edit') === 'true'){
                        sendData.id = sessionStorage.getItem('warehouse-out-stock-aplicationid')*1;
                        this.$axios.post('/applicationOut/editApplicationOut',sendData).then(res=>{
                            console.log('修改结果',res);
                            // this.$message.success(res.data.data);
                            this.go_back();
                        },err=>{
                            console.log('修改报错',err);
                        })
                        return;
                    }
                    this.$axios.post('/applicationOut/addApplicationOut',sendData).then(res=>{
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
        // 获取物资的重置
        get_goods_refresh(){
            this.code_dialog_form = {
                name:'',
                material:'',
                spec:'',
                origin:''
            }
            this.get_goods();
        },
        // 模板下载
        download_excel(){
            window.open('http://dev.123456cc.cc:4000/busfront-busproc/busfront-busproc/FHYBQY.xlsx');
        },
        // 数据导入后端处理
        import_excel(file,fileList){
            let formdata = new FormData();
            formdata.append('file',file.raw)
            this.loading = true;
            this.$axios.post('/material/importExcel',formdata).then(res=>{
                console.log('上传结果',res);
                this.table_data = [...this.table_data, ...res.data.data];
            },err=>{
                console.log('上传报错',err);
            }).finally(()=>{
                this.loading = false;
            })
        },
        // 计划入库数量修改
        enterNumber_change(val){
            if(val.enterNumber<0){
                val.enterNumber = 0;
                val.enterWeight = 0;
                return;
            }
            val.takeWeight = val.takeNumber*val.weightCoefficient;
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
        .upload-demo{
            display: inline-block;
            margin-left: 10px;
        }
    }
    .detail_content_table_box{
        width: 100%;
        height: calc(100% - 40px);
    }
}

/deep/.dialog_content{
    width: 100%;
    // height: 500px;
    display: flex;
    flex-direction: column;
    .dialog_content_form{
        width: 100%;
    }
    .dialog_content_table{
        width: 100%;
        // flex: 1;
        height: 400px;
    }
}
// .code_dialog_content{}

.el-select,.el-date-editor{
    width: 178px !important;
}

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
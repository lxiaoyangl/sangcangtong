<template>
    <div class="add">
        <BasisDetail>
            <i slot="detail_icon" class="el-icon-back" @click="go_back"></i>

            <span slot="detail_title">融资申请</span>
            
            <div slot="detail_btn">
                <el-button type="primary" icon="el-icon-folder-add" size="medium">保存</el-button>
                <el-button type="primary" icon="el-icon-folder-add" size="medium">保存并提交</el-button>
            </div>

            <!-- 中部form信息块 -->
            <div slot="detail_content_form">
                <el-form ref="form" :model="form" :inline="true" label-width="120px">
                    <el-form-item label="融资企业">
                        <el-input v-model="form.inp1" placeholder="系统生成" size="mini" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="融资类型">
                        <el-select clearable v-model="form.inp5" placeholder="请选择融资类型" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="供应商">
                        <el-select clearable v-model="form.inp5" placeholder="请选择供应商" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="资金方">
                        <el-select clearable v-model="form.inp5" placeholder="请选择资金方" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="融资产品">
                        <el-select clearable v-model="form.inp5" placeholder="请选择融资产品" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="用款周期">
                        <el-input v-model="form.inp2" placeholder="用款周期" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="保证金比例">
                        <el-input v-model="form.inp2" placeholder="保证金比例%" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="预计保证金">
                        <el-input v-model="form.inp2" placeholder="预计保证金" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="代采物资总额">
                        <el-input v-model="form.inp2" placeholder="代采物资总额" size="mini" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="预计融资金额">
                        <el-input v-model="form.inp2" placeholder="预计融资金额" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="交付地点">
                        <el-select clearable v-model="form.inp5" placeholder="请选择交付地点" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="交付时间">
                        <el-date-picker
                            v-model="form.inp3"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="mini"
                            disabled>
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="交付方式">
                        <el-select clearable v-model="form.inp5" placeholder="请选择交付方式" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="结算方式">
                        <el-select clearable v-model="form.inp5" placeholder="请选择结算方式" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="detail_content">
                <div class="detail_content_table">
                    <div class="detail_content_table_btn">
                        <el-button type="text" icon="el-icon-circle-plus-outline" @click="add_goods">请选择码单物资</el-button>
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
                                prop="name"
                                label="品名"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                prop="spec"
                                label="物料编码"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                prop="material"
                                label="采购重量（吨）"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                prop="origin"
                                label="采购数量（件）"
                                min-width="100">
                            </el-table-column>

                            <el-table-column
                                prop="origin"
                                label="单价（元、吨）"
                                min-width="100">
                            </el-table-column>

                            <el-table-column
                                prop="weight"
                                label="金额（元）"
                                min-width="100">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </BasisDetail>
        
        <!-- 新增物资蒙层 -->
        <BasisDialog
            :visible="add_dialog_flag"
            @cancel="add_dialog_before_close"
            @sure="add_dialog_sure"
        >
            <div slot="dialog_content" class="dialog_content">
                <div class="dialog_content_form">
                    <el-form ref="form" :model="add_dialog_form" :inline="true" label-width="100px">
                        <el-form-item label="品名">
                            <el-select clearable v-model="add_dialog_form.name" placeholder="请选择品名" size="mini">
                                <el-option
                                    v-for="item in name_arr"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="材质">
                            <el-select clearable v-model="add_dialog_form.material" placeholder="请选择材质" size="mini">
                                <el-option
                                    v-for="item in material_arr"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="规格">
                            <el-select clearable v-model="add_dialog_form.spec" placeholder="请选择规格" size="mini">
                                <el-option
                                    v-for="item in spec_arr"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="产地">
                            <el-select clearable v-model="add_dialog_form.origin" placeholder="请选择产地" size="mini">
                                <el-option
                                    v-for="item in origin_arr"
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
                            prop="name"
                            label="品名"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="origin"
                            label="产地"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="material"
                            label="材质"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="spec"
                            label="规格"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="num_unit_cn"
                            label="数量单位"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="weight_unit_cn"
                            label="重量单位"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="goods_type_cn"
                            label="货物性质"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="goods_code"
                            label="物资代码"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name_big_type"
                            label="品名大类"
                            width="100">
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
                inp1:'',
                inp2:'',
            },
            // 仓库下拉数据
            options: [
                {
                    value: '选项1',
                    label: '尼木仓库'
                }
            ],
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
            // 入库方式下拉数据数组
            inhouse_type_arr:[
                {
                    label: '专运线入库',
                    value:1,
                },
                {
                    label: '汽运入库',
                    value:2,
                }
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
            num_unit_arr:[
                {
                    label:'件',
                    value:1,
                },
                {
                    label:'立方',
                    value:2,
                }
            ],
            // 重量单位
            weight_unit_arr:[
                {
                    label:'吨',
                    value:1,
                },
                {
                    label:'千克',
                    value:2,
                }
            ],
            // 货物性质下拉数据
            goods_type_arr:[
                {
                    label:'正常',
                    value:1,
                },
                {
                    label:'偏轻',
                    value:2,
                }
            ],

            // 新增蒙层显示标识
            add_dialog_flag:false,
            add_dialog_form:{
                name:"", // 品名
                material:'', // 材质
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
            // 蒙层表格
            add_dialog_table_data:[
                {
                    name:'钢金',
                    origin:'重庆',
                    material:'HRB200',
                    spec:'20*20',
                    num_unit:1,
                    weight_unit:1,
                    goods_type:1,
                    goods_code:'000039',
                    name_big_type:'建筑材料'
                },
                {
                    name:'钢金',
                    origin:'四川',
                    material:'HRB200',
                    spec:'20*20',
                    num_unit:1,
                    weight_unit:1,
                    goods_type:1,
                    goods_code:'000039',
                    name_big_type:'建筑材料'
                }
            ],
            // 新增蒙层选中存贮数组
            add_dialog_selected_arr:[],
            // 详情列表选中存储数组
            detail_selected_arr:[],
        }
    },
    mounted(){
       
    },
    methods:{
        // 返回入库预报
        go_back(){
            this.$router.push({name:'financing_apply_manage_list'})
        },
        // 蒙层关闭前触发函数
        add_dialog_before_close(){
            this.$refs.add_dialog_table.clearSelection();
            this.add_dialog_flag = false;
        },
        // 新增物资
        add_goods(){
            this.add_dialog_table_data.map(item=>{
                this.num_unit_arr.map(it=>{
                    if(it.value == item.num_unit){
                        item.num_unit_cn = it.label;
                    }
                })

                this.weight_unit_arr.map(it=>{
                    if(it.value == item.weight_unit){
                        item.weight_unit_cn = it.label;
                    }
                })

                this.goods_type_arr.map(it=>{
                    if(it.value == item.goods_type){
                        item.goods_type_cn = it.label;
                    }
                })
            })
            this.add_dialog_flag = true;
        },
        // 删除物资
        del_goods(){
            // let index_arr = this.detail_selected_arr.map(item=>{
            //     return 
            // })
            this.$fn.message('因为数据没有id，暂时不支持删除','error');
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
                let obj = {
                    name: '钢金',
                    spec: '20*20',
                    material: 'HRB200', //材质
                    origin: '重庆', // 产地
                    plan_incoming_num: 0, //计划入库数量
                    weight: 0.8, // 理重
                    plan_incoming_weight:0, //计划入库重量
                    num_unit:1, //数量单位
                    weight_unit:1, //重量单位
                    compute_type:'', // 计量方式
                    goods_type:1, //货物性质
                    train_num:'', // 车次
                    wagon_num:'', // 车皮号
                    remark:'', // 备注
                    loading_point:'', // 装车点
                    unloading_point: '', // 卸车点
                    shipping_address: '', // 收货地址
                    receiver:'', //收货人
                    receiver_phone:'', //收货人电话
                };
                item = Object.assign(obj,item);
                this.table_data.push(item);
            })
            // this.table_data = [this.table_data,...arr];
            this.add_dialog_before_close();
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
    height: 500px;
    display: flex;
    flex-direction: column;
    .dialog_content_form{
        width: 100%;
    }
    .dialog_content_table{
        width: 100%;
        flex: 1;
    }
}
</style>
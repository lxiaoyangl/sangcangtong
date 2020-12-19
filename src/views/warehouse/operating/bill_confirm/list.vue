<template>
    <div class="incoming">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="单据号">
                    <el-input v-model="form.inp1" placeholder="请输入单据号" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="结算方式">
                    <el-select clearable v-model="form.inp2" placeholder="请选择结算方式" size="mini">
                        <el-option
                            v-for="item in cost_arr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="仓库">
                    <el-select clearable v-model="form.inp3" placeholder="请选择仓库" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="申请日期">
                    <el-date-picker
                        v-model="form.inp4"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="mini">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <div class="search_btn" slot="search_btn">
                <el-button type="primary" size="medium" icon="el-icon-search">搜索</el-button>
                <el-button type="info" size="medium" icon="el-icon-refresh">重置</el-button>
            </div>

            <div class="table" slot="table">
                <div class="table_btn">
                    <el-button type="primary" @click="add" size="medium" icon="el-icon-view">查看</el-button>
                    <el-button type="primary" size="medium" icon="el-icon-folder-checked">结算单确认</el-button>
                    <el-button type="primary" size="medium" icon="el-icon-download">导出EXCEL</el-button>
                    <el-button type="info" @click="enclosure_flag=true" size="medium" icon="el-icon-document">附件</el-button>
                </div>

                <div class="table_box">
                    <el-table
                        :data="table_data"
                        style="width: 100%"
                        height="100%"
                        stripe
                        header-row-class-name="table_header"
                    >
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="order_num"
                            label="单据号"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="order_status"
                            label="状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="日期"
                            min-width="130">
                        </el-table-column>
                        <el-table-column
                            prop="order_owner"
                            label="货主"
                            min-width="130">
                        </el-table-column>
                        <el-table-column
                            prop="direction"
                            label="方向"
                            min-width="70">
                        </el-table-column>
                        <el-table-column
                            prop="order_warehouse"
                            label="仓库"
                            min-width="130">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="含税总金额"
                            min-width="130">
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注"
                            min-width="80">
                        </el-table-column>
                    </el-table>
                </div>

                <div class="table_box_pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :total="page.total">
                    </el-pagination>
                </div>
            </div>
        </BasisPage>

        <!-- 新增物资蒙层 -->
        <BasisDialog
            :title="'结算单确认'"
            :visible="dialog_flag"
            @cancel="dialog_before_close"
            @sure="dialog_sure"
        >
            <div slot="dialog_content" class="dialog_content">
                <div class="dialog_content_form">
                    <el-form ref="form" :model="dialog_form" :inline="true" label-width="100px">
                        <el-form-item label="单据">
                            <el-input v-model="form.document" placeholder="请输入单据号" size="mini" disabled></el-input>
                        </el-form-item>

                        <el-form-item label="日期">
                            <el-input v-model="form.time" placeholder="请输入日期" size="mini" disabled></el-input>
                        </el-form-item>

                        <el-form-item label="仓库">
                            <el-select clearable v-model="dialog_form.warehouse" placeholder="请选择仓库" size="mini" disabled>
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="备注">
                            <el-input v-model="form.time" placeholder="请输入日期" size="mini" disabled></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="dialog_content_table">
                    <el-table
                        ref="dialog_table"
                        :data="dialog_table_data"
                        style="width: 100%"
                        height="100%"
                        stripe
                        header-row-class-name="table_header"
                    >
                        <el-table-column
                            prop="inp1"
                            label="是否确认"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp2"
                            label="业务单据号"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="inp3"
                            label="费用日期"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp4"
                            label="费用名称"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp5"
                            label="方向"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp6"
                            label="货主"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp7"
                            label="结算单位"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp8"
                            label="结算方式"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp9"
                            label="计费方式"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp10"
                            label="结算量"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp11"
                            label="含税单价"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp12"
                            label="含税金额"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp13"
                            label="税率"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp14"
                            label="税额"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp15"
                            label="仓储天数"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp16"
                            label="备注"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="inp17"
                            label="仓库"
                            width="100">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </BasisDialog>

        <!-- 附件 -->
        <BasisDialog
            :title="'附件上传'"
            :visible="enclosure_flag"
            @cancel="enclosure_flag = false"
            @sure="enclosure_flag = false"
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
                        <el-button size="small" type="primary" icon="el-icon-download" :loading="enclosure_loading">点击上传</el-button>
                    </el-upload>
                </div>

                <div class="enclosure_dialog_content_table">
                    <el-table
                        :data="get_file"
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
                            <template>
                                <el-button type="text">下载</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>
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
                                <el-button type="text">下载</el-button>
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
                inp1:'',
                inp2:null,
                inp3:null,
                inp4:null,
            },
            // 仓库下拉数据
            options: [
                {
                    value: '选项1',
                    label: '尼木仓库'
                }
            ],
            // 费用名称下拉数据
            cost_arr:[
                {
                    value: 1,
                    label: '月结'
                },
                {
                    value: 2,
                    label: '季结'
                },
                {
                    value: 3,
                    label: '年结'
                }
            ],
            // 列表数据
            table_data: [
                {
                    order_num: 'YB000120000023',
                    order_owner:'墨色梧桐',
                    order_status: '平台已审核',
                    order_warehouse:'尼木仓库',
                    order_maker:'黄欢呼声',
                    goods_contact_person:'墨色梧桐',
                    number_plate:'川A123456',
                    apply_time: '2020-09-16 16:56:05',
                    plan_time: '2020-11-10 00:00:00',
                    date:'2020-11-10',
                    business_order_num:'123465789',
                    cost_name:'仓租费',
                    direction:'应收',
                    bill_confirm_business:'四川成都XXX公司',
                    compute_cost_type:'按重量',
                    settlement_type:'月结',
                    settlement_amount:88,
                    one_price:'1.75',
                    price:'175',
                    rate:'0',
                    rate_amount:'0',
                    save_days:20,
                    remark:'123'
                },
            ],
            // 分页数据
            page:{
                total:1,
            },

            // 蒙层数据
            dialog_flag: false,
            // 蒙层表单数据
            dialog_form:{},
            // 蒙层表格数据
            dialog_table_data:[
                {
                    inp1:'已确认',
                    inp2:'FY123456789',
                    inp3:'2020-10-10',
                    inp4:'装卸费',
                    inp5:'应收',
                    inp6:'墨色梧桐',
                    inp7:'月结',
                    inp8:'按重量',
                    inp9:'按存储天数',
                    inp10:'8KG',
                    inp11:'100元/KG',
                    inp12:'800元',
                    inp13:'1%',
                    inp14:'8元',
                    inp15:'30天',
                    inp16:'阿萨斯多',
                    inp17:'尼格买提'
                }
            ],

            // 附件蒙层现实标识
            enclosure_flag:false, 
            enclosure_loading:false,
            enclosure_dialog_content_table_data:[],
            get_file:[
                {
                    fileName:'发票',
                    fileType:'png',
                    fileSize:'12054'
                }
            ]
        }
    },
    mounted(){
        // 进入页面校验是否已登录
        // this.$fn.check_login(this);
    },
    methods:{
        // 跳转新增页面
        add(){
            // this.$router.push({name:'Incoming_add'});
            this.dialog_flag = true;
        },
        // 蒙层方法
        dialog_before_close(){
            this.dialog_flag = false;
        },
        // 确认方法
        dialog_sure(){
            this.dialog_flag = false;
        },
        // 文件上传
        enclosure_upload(){
            
        }
    }
}
</script>

<style lang="less" scoped>
.incoming{
    width: 100%;
    height: 100%;
}

/deep/.table{
    width: 100%;
    height: 100%;
    // background: #fff;
    box-sizing: border-box;
    padding: 10px 20px;
    .table_btn{
        width: 100%;
        height: 50px;
    }
    .table_box{
        width: 100%;
        height: calc(100% - 100px);
    }
    .table_box_pagination{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        flex: 1;
    }
}

/deep/.enclosure_dialog_content{
    width: 100%;
    display: flex;
    flex-direction: column;
    .enclosure_dialog_content_form{
        width: 100%;
        height: 50px;
    }
    .enclosure_dialog_content_table{
        width: 100%;
        // height: calc(100% - 50px);
        height: 300px;
    }
}

.el-form-item{
    margin-bottom: 0px !important;
}
</style>
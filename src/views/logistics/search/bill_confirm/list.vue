<template>
    <div class="incoming">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="单据号">
                    <el-input v-model="form.inp2" placeholder="请输入单据号" size="mini"></el-input>
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

                <el-form-item label="费用日期">
                    <el-date-picker
                        v-model="form.inp4"
                        type="date"
                        placeholder="选择日期"
                        size="mini">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="费用名称">
                    <el-select clearable v-model="form.inp5" placeholder="请选择费用名称" size="mini">
                        <el-option
                            v-for="item in cost_arr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="货主">
                    <el-select clearable v-model="form.inp5" placeholder="请选择费用名称" size="mini">
                        <el-option
                            v-for="item in cost_arr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="方向">
                    <el-select clearable v-model="form.inp5" placeholder="请选择费用名称" size="mini">
                        <el-option
                            v-for="item in cost_arr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="结算单位">
                    <el-select clearable v-model="form.inp5" placeholder="请选择费用名称" size="mini">
                        <el-option
                            v-for="item in cost_arr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="结算方式">
                    <el-select clearable v-model="form.inp5" placeholder="请选择费用名称" size="mini">
                        <el-option
                            v-for="item in cost_arr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="确认状态">
                    <el-select clearable v-model="form.inp5" placeholder="请选择费用名称" size="mini">
                        <el-option
                            v-for="item in cost_arr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="申请日期">
                    <el-date-picker
                        v-model="form.inp1"
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
                    <el-button type="primary" size="medium" icon="el-icon-check">结算单确认</el-button>
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
                            prop="a"
                            label="单据号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="b"
                            label="确认状态"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="c"
                            label="日期"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="d"
                            label="业务单号"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="e"
                            label="货主"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="f"
                            label="费用名称"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="g"
                            label="方向"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="h"
                            label="结算单位"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="i"
                            label="计费方式"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="j"
                            label="结算方式"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="k"
                            label="结算量"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="l"
                            label="含税单价"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="m"
                            label="含税金额"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="n"
                            label="税率"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="o"
                            label="税额"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="p"
                            label="仓储天数"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="q"
                            label="备注"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="r"
                            label="制单人"
                            width="80">
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
                            prop="name"
                            label="是否确认"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="业务单据号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="费用日期"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="费用名称"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="方向"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="货主"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="结算单位"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="结算方式"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="计费方式"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="结算量"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="含税单价"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="含税金额"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="税率"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="税额"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="仓储天数"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="备注"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="仓库"
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
                inp1:[],
                inp2:'',
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
                    value: '选项1',
                    label: '装卸费'
                },
                {
                    value: '选项2',
                    label: '刚才'
                },
                {
                    value: '选项3',
                    label: '仓租费'
                }
            ],
            // 列表数据
            table_data: [
                {
                    a: 'YB4123456789',
                    b:'已审核',
                    c: '2020-05-05',
                    d:'123456',
                    e:'成都川凡',
                    f:'运费',
                    g:'收费',
                    h: '成都川凡',
                    i: '按路程',
                    j:'现金',
                    k:'10KG',
                    l:'10',
                    m:'100',
                    n:'0',
                    o:'0',
                    p:'0',
                    q:'',
                    r:'',
                    s:'',
                    t:'',
                    u:'',
                    v:'',
                    w:'',
                    x:'',
                    y:'',
                    z:'',
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
            dialog_table_data:[],
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
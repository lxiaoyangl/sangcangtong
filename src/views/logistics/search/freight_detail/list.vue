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

                <el-form-item label="车皮/车牌号">
                    <el-input v-model="form.inp4" placeholder="请输入车皮/车牌号" size="mini"></el-input>
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
                <!-- <div class="table_btn">
                    <el-button type="primary" @click="add" size="medium">新增</el-button>
                    <el-button type="success" size="medium">修改</el-button>
                    <el-button type="danger" size="medium">删除</el-button>
                </div> -->

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
                            label="单据号">
                        </el-table-column>
                        <el-table-column
                            prop="order_owner"
                            label="货主">
                        </el-table-column>
                        <el-table-column
                            prop="order_status"
                            label="单据状态">
                        </el-table-column>
                        <el-table-column
                            prop="order_warehouse"
                            label="仓库">
                        </el-table-column>
                        <el-table-column
                            prop="order_maker"
                            label="制单人">
                        </el-table-column>
                        <el-table-column
                            prop="goods_contact_person"
                            label="货运联系人">
                        </el-table-column>
                        <el-table-column
                            prop="number_plate"
                            label="车牌号">
                        </el-table-column>
                        <el-table-column
                            prop="apply_time"
                            label="申请日期">
                        </el-table-column>
                         <el-table-column
                            prop="plan_time"
                            label="计划到园时间">
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
            // 列表数据
            table_data: [
                {
                    order_num: 'YB000120000023',
                    order_owner:'成都川凡',
                    order_status: '平台已审核',
                    order_warehouse:'尼木仓库',
                    order_maker:'斯达舒',
                    goods_contact_person:'詹三',
                    number_plate:'川A123456',
                    apply_time: '2020-09-16',
                    plan_time: '2020-11-10'
                },
            ],
            // 分页数据
            page:{
                total:1,
            }
        }
    },
    mounted(){
        // 进入页面校验是否已登录
        // this.$fn.check_login(this);
    },
    methods:{
        // 跳转新增页面
        add(){
            // this.$router.push({name:'logistics_operating_waybill_add'});
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
        height: calc(100% - 50px);
    }
    .table_box_pagination{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
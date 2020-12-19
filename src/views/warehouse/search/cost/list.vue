<template>
    <div class="incoming">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="货主">
                    <el-select clearable v-model="form.inp2" placeholder="请选择货主" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="费用类别">
                    <el-select clearable v-model="form.inp3" placeholder="请选择费用类别" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="费用名称">
                    <el-select clearable v-model="form.inp4" placeholder="请选择费用名称" size="mini">
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
                <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
                <el-button type="info" icon="el-icon-refresh" size="medium">重置</el-button>
            </div>

            <div class="table" slot="table">
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
                            label="出账日期"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="b"
                            label="费用类别"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="c"
                            label="费用名称"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="d"
                            label="货主"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="e"
                            label="结算单位"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="f"
                            label="应付金额"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="g"
                            label="已付金额"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="h"
                            label="重量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="i"
                            label="重量单位"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="j"
                            label="单价"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="k"
                            label="单价单位"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="l"
                            label="折扣"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="m"
                            label="备注"
                            min-width="180">
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
                    a: '2020-09-16',
                    b:'收费',
                    c: '装卸费',
                    d:'成都川凡有限公司',
                    e:'成都川凡有限公司',
                    f:'120',
                    g:'120',
                    h: '1',
                    i: '千克',
                    j:'120',
                    k:'元',
                    l:'0',
                    m:'',
                    n:'',
                    o:'',
                    p:'',
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
            this.$router.push({name:'Incoming_add'});
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
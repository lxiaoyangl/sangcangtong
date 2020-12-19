<template>
    <div class="incoming">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="合同编号">
                    <el-input v-model="form.inp3" placeholder="请输入合同编号" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="合同方">
                    <el-input v-model="form.inp3" placeholder="请输入合同方" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="项目名称">
                    <el-input v-model="form.inp3" placeholder="请输入项目名称" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="项目编号">
                    <el-input v-model="form.inp3" placeholder="请输入项目编号" size="mini"></el-input>
                </el-form-item>
                
                <el-form-item label="签订时间">
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
                <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
                <el-button type="info" icon="el-icon-refresh" size="medium">重置</el-button>
            </div>

            <div class="table" slot="table">
                <div class="table_btn">
                    <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
                    <el-button type="success" size="medium" icon="el-icon-edit">修改</el-button>
                    <el-button type="warning" size="medium" icon="el-icon-view">合同详情</el-button>
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
                            label="合同编号"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="b"
                            label="合同类型"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="c"
                            label="合同方"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="d"
                            label="签订时间"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="f"
                            label="项目编号"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="e"
                            label="项目名称"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="g"
                            label="合同金额"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="h"
                            label="合同状态"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="i"
                            label="上传方"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="j"
                            label="上传时间"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="k"
                            label="备注"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="l"
                            label="作废时间"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="m"
                            label="作废原因"
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
                    a: '123456789',
                    b:'正常',
                    c: '成都传发',
                    d:'2020-05-05',
                    e:'1234596789',
                    f:'天堂伞贸易',
                    g:'100W',
                    h: '正常',
                    i: '成都传发',
                    j:'2020-05-05',
                    k:'',
                    l:'',
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
            this.$router.push({name:'financing_agreement_manage_add'});
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
</style>
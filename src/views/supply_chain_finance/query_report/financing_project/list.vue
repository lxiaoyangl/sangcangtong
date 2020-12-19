<template>
    <div class="incoming">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="项目编号">
                    <el-input v-model="form.inp1" placeholder="请输入项目编号" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="项目名称">
                    <el-input v-model="form.inp2" placeholder="请输入项目名称" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="融资类型">
                    <el-select clearable v-model="form.inp3" placeholder="请选择融资类型" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="赎货日期">
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
                    <el-button type="primary" @click="add" size="medium" icon="el-icon-refresh-left">赎货</el-button>
                    <el-button type="success" size="medium" icon="el-icon-document">赎货记录</el-button>
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
                            label="项目编号"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="b"
                            label="项目名称"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="c"
                            label="最后赎货日期"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="d"
                            label="融资类型"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="e"
                            label="融资金额（元）"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="f"
                            label="已还金额（元）"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="g"
                            label="待还金额（元）"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="h"
                            label="用款周期（天）"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="i"
                            label="已使用天数"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="j"
                            label="已逾期天数"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="k"
                            label="赎货状态"
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
                    b:'天堂伞贸易',
                    c: '2020-05-05',
                    d:'天使轮',
                    e:'10W',
                    f:'1W',
                    g:'9W',
                    h: '30',
                    i: '2',
                    j:'',
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
            // this.$router.push({name:'Incoming_add'});
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
<template>
    <div class="incoming">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="品名">
                    <el-select clearable v-model="form.inp1" placeholder="请选择品名" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="材质">
                    <el-select clearable v-model="form.inp2" placeholder="请选择材质" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="规格">
                    <el-select clearable v-model="form.inp3" placeholder="请选择规格" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产地">
                    <el-select clearable v-model="form.inp4" placeholder="请选择产地" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
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
                            label="品名"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="b"
                            label="材质"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="c"
                            label="规格"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="d"
                            label="产地"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="e"
                            label="实物数量"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="f"
                            label="实物重量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="g"
                            label="可供数量"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="h"
                            label="可供重量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="i"
                            label="总锁定数量"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="j"
                            label="总锁定重量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="k"
                            label="数量单位"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="l"
                            label="重量单位"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="m"
                            label="货物性质"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="n"
                            label="计量方式"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="o"
                            label="平均重量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="p"
                            label="货主"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="q"
                            label="仓库"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="r"
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
                    a: '天堂伞',
                    b:'伞布',
                    c: '把',
                    d:'成都',
                    e:'10',
                    f:'10',
                    g:'10',
                    h: '10',
                    i: '10',
                    j:'10',
                    k:'个',
                    l:'千克',
                    m:'易碎',
                    n:'按数量',
                    o:'10',
                    p:'成都川凡有限公司',
                    q:'成都二仓',
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
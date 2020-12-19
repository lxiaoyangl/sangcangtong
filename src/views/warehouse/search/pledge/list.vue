<template>
    <div class="incoming">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="单据号">
                    <el-input v-model="form.inp2" placeholder="请输入单据号" size="mini"></el-input>
                </el-form-item>
                
                <el-form-item label="质押方">
                    <el-select clearable v-model="form.inp3" placeholder="请选择质押方" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="协议书号">
                    <el-input v-model="form.inp2" placeholder="请输入协议书号" size="mini"></el-input>
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
                            label="质押日期"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="b"
                            label="业务类别"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="c"
                            label="单据号"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="d"
                            label="质押方"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="e"
                            label="协议书号"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="f"
                            label="品名"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="g"
                            label="材质"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="h"
                            label="规格"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="i"
                            label="产地"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="j"
                            label="质押数量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="k"
                            label="质押重量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="l"
                            label="解押数量"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="m"
                            label="解押重量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="n"
                            label="未解押数量"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="o"
                            label="未解押重量"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="p"
                            label="数量单位"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="q"
                            label="重量单位"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="r"
                            label="货物性质"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="s"
                            label="计量方式"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="t"
                            label="仓库"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="u"
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
                    b:'质押',
                    c: '123456789',
                    d:'成都川凡有限公司',
                    e:'123456789',
                    f:'天堂伞',
                    g:'伞布',
                    h: '把',
                    i: '成都',
                    j:'100',
                    k:'200',
                    l:'10',
                    m:'10',
                    n:'10',
                    o:'10',
                    p:'10',
                    q:'10',
                    r:'个',
                    s:'千克',
                    t:'成都二仓',
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
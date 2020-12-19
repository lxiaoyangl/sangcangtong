<template>
    <div class="incoming" v-loading="loading">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="仓库">
                    <el-select clearable v-model="form.inp1" placeholder="请选择仓库" size="mini">
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
                        v-model="form.inp2"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="mini">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <div class="search_btn" slot="search_btn">
                <el-button type="primary" size="medium" icon="el-icon-search" @click="get_data">搜索</el-button>
                <el-button type="info" size="medium" icon="el-icon-refresh" @click="refresh">重置</el-button>
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
                            prop="documentNo"
                            label="申请订单号">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="货主名称">
                        </el-table-column>
                        <el-table-column
                            prop="documentState"
                            label="单据状态">
                            <template slot-scope="scope">
                                <span v-show="scope.row.documentState === 0">未提交</span>
                                <span v-show="scope.row.documentState === 1">平台待审核</span>
                                <span v-show="scope.row.documentState === 2">平台已通过</span>
                                <span v-show="scope.row.documentState === 3">平台未通过</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="warehouseName"
                            label="仓库">
                        </el-table-column>
                        <el-table-column
                            prop="createUserName"
                            label="申请人">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="申请日期">
                        </el-table-column>
                         <el-table-column
                            prop="serviceTime"
                            label="计划送达时间">
                        </el-table-column>
                    </el-table>
                </div>

                <div class="table_box_pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :total="page.total"
                        :current-page="page.page_num"
                        :page-size="page.page_size"
                        @current-change="page_num_change">
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
            loading:false,
            // 表单数据
            form:{
                inp1:null,
                inp2:null,
            },
            // 仓库下拉数据
            options: [
                {
                    value: '选项1',
                    label: '尼木仓库'
                }
            ],
            // 列表数据
            table_data: [],
            // 分页数据
            page:{ 
                total:1,
                page_num:1,
                page_size:20,
            }
        }
    },
    mounted(){
        this.get_warehouse_data();
        this.get_data();
    },
    methods:{
        // 数据查询
        get_data(){
            let senddata = {};
            if(this.form.inp1 !== null){
                senddata.warehouseId = this.form.inp1;
            }
            if(this.form.inp2 !== null){
                senddata.loadingTime = this.$fn.timeChange(this.form.inp2[0]); // 计划装车时间
                senddata.serviceTime = this.$fn.timeChange(this.form.inp2[1]); // 计划送达时间
            }
            this.loading = true;
            this.$axios.post('/applicationTransport/baseList?_pageList',{
                pageNo:this.page.page_num,
                pageSize:this.page.page_size,
                // documentState:2,
                ...senddata
            }).then(res=>{
                console.log('列表查询结果',res);
                this.table_data = [...res.data.data.records];
                this.page.total = res.data.data.total;
            },err=>{
                console.log('列表查询报错',err);
            }).finally(()=>{
                this.loading = false;
            })
        },
        // 分页页码改变
        page_num_change(val){
            this.page.page_num = val;
            this.get_data();
        },
        refresh(){
            this.form = {
                inp1:null,
                inp2:null,
            };
            this.get_data();
        },
        // 获取仓库数据
        get_warehouse_data(){
            this.$fn.get_warehouse_data(this).then(res=>{
                console.log('res',res);
                this.options = [...res.data.data];
            },err=>{
                console.log('err',err);
            })
        },
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
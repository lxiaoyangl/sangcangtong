<template>
    <div class="incoming" v-loading="loading">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="申请单号">
                    <el-input v-model="form.inp2" placeholder="请输入申请单号" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="签收人">
                    <el-input v-model="form.inp3" placeholder="请输入签收人" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="仓库">
                    <el-select clearable v-model="form.inp4" placeholder="请选择仓库" size="mini">
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
                            label="申请单号"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="orderNumber"
                            label="交易订单号"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="货主"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="createUserName"
                            label="申请人"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="isSendCar"
                            label="平台派车"
                            min-width="180">
                            <tempalte slot-scope="scope">
                                <span>{{scope.row.isSendCar==1?'是':'不是'}}</span>
                            </tempalte>
                        </el-table-column>
                        <el-table-column
                            prop="signer"
                            label="签收人"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="signerNumber"
                            label="签收人电话"
                            min-width="180">
                        </el-table-column>
                         <el-table-column
                            prop="transportName"
                            label="运输方式"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="warehouseName"
                            label="仓库"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="planTakeTime"
                            label="计划装车时间"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="sendCarTime"
                            label="计划派车时间"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="serviceTime"
                            label="计划送达时间"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="description"
                            label="描述"
                            min-width="180">
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
                inp1:'',
                inp2:'',
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
        // 获取数据
        get_data(){
            let senddata = {};
            if(this.form.inp1 !== ''){
                senddata.documentNo = this.form.inp1;
            }
            if(this.form.inp2 !== ''){
                senddata.signer = this.form.inp2;
            }
            if(this.form.inp3 !== null){
                senddata.warehouseId = this.form.inp3;
            }
            if(this.form.inp4 !== null){
                senddata.planTakeTime = this.$fn.timeChange(this.form.inp4[0]); // 计划装车时间
                senddata.serviceTime = this.$fn.timeChange(this.form.inp4[1]); // 计划送达时间
            }
            this.loading = true;
            this.$axios.post('/applicationOut/baseList?_pageList',{
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
        // 获取仓库数据
        get_warehouse_data(){
            this.$fn.get_warehouse_data(this).then(res=>{
                console.log('res',res);
                this.options = [...res.data.data];
            },err=>{
                console.log('err',err);
            })
        },
        refresh(){
            this.form = {
                inp1:'',
                inp2:'',
                inp3:null,
                inp4:null
            };
            this.get_data();
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
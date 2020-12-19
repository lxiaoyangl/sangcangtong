<template>
    <div class="incoming" v-loading="loading">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="单据号">
                    <el-input v-model="form.inp1" placeholder="请输入单据号" size="mini"></el-input>
                </el-form-item>
                
                <el-form-item label="过入方">
                    <el-select clearable v-model="form.inp2" placeholder="请选择过入方" size="mini">
                        <el-option
                            v-for="item in pass_through_arr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="申请日期">
                    <el-date-picker
                        v-model="form.inp3"
                        type="date"
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
                            label="申请订单号"
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
                            prop="receiver"
                            label="过入方"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="warehouseName"
                            label="仓库"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="申请日期"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="transferTime"
                            label="计划过户日期"
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
                inp2:null,
                inp3:null
            },
            // 过入方下拉数据
            pass_through_arr: [],
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
        this.get_company();
        this.get_data();
    },
    methods:{
        // 数据查询
        get_data(){
            let senddata = {};
            if(this.form.inp1 !== ''){
                senddata.documentNo = this.form.inp1;
            }
          
            if(this.form.inp2 !== null){
                senddata.receiverId = this.form.inp2;
            }
            if(this.form.inp3 !== null){
                senddata.createTime = this.$fn.timeChange(this.form.inp3); // 计划装车时间
            }
            this.loading = true;
            this.$axios.post('/applicationIn/baseList?_pageList',{
                pageNo:this.page.page_num,
                pageSize:this.page.page_size,
                // documentState:2
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
        // 获取企业下拉信息
        get_company(){
            this.$axios.post('/company/baseList',{

            }).then(res=>{
                console.log('企业下拉数据',res);
                res.data.data.map(item=>{
                    item.value = item.id;
                    item.label = item.name;
                })
                this.pass_through_arr = [...res.data.data];
            })
        },
        refresh(){
            this.form = {
                inp1:'',
                inp2:null,
                inp3:null
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
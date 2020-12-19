<template>
    <div class="incoming" v-loading="loading">
        <BasisPage>
            <el-form slot="form" ref="form" :model="form" :inline="true" label-width="100px">
                <el-form-item label="申请订单号">
                    <el-input v-model="form.inp1" placeholder="请输入申请订单号" size="mini" clearable></el-input>
                </el-form-item>
                
                <el-form-item label="仓库">
                    <el-select v-model="form.inp2" placeholder="请选择仓库" size="mini" clearable>
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
                        v-model="form.inp3"
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
                <div class="table_btn">
                    <el-button type="primary" v-show="right_arr.includes('新增')" @click="add" size="medium" icon="el-icon-circle-plus-outline">新增</el-button>
                    <el-button type="success" v-show="right_arr.includes('修改')" @click="change" size="medium" icon="el-icon-edit">修改</el-button>
                    <el-button type="danger" v-show="right_arr.includes('删除')" @click="del_data" size="medium" icon="el-icon-circle-close">删除</el-button>
                    <el-button type="primary" v-show="right_arr.includes('提交')" @click="submit" size="medium" icon="el-icon-tickets">提交</el-button>
                    <el-button type="success" v-show="right_arr.includes('审核')" @click="examine" size="medium" icon="el-icon-finished">审核</el-button>
                </div>

                <div class="table_box">
                    <el-table
                        :data="table_data"
                        style="width: 100%"
                        height="100%"
                        stripe
                        header-row-class-name="table_header"
                        @selection-change="table_selection_change"
                    >
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="documentNo"
                            label="申请订单号"
                            min-width="160">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="货主"
                            min-width="120">
                        </el-table-column>
                        <el-table-column
                            prop="documentState"
                            label="单据状态"
                            min-width="120">
                            <template slot-scope="scope">
                                <span v-show="scope.row.documentState === 0">未提交</span>
                                <span v-show="scope.row.documentState === 1">待审核</span>
                                <span v-show="scope.row.documentState === 2">审核未通过</span>
                                <span v-show="scope.row.documentState === 3">平台待审核</span>
                                <span v-show="scope.row.documentState === 4">平台处理中</span>
                                <span v-show="scope.row.documentState === 5">审核拒绝</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="warehouseName"
                            label="仓库"
                            min-width="160">
                        </el-table-column>
                        <el-table-column
                            prop="createUserName"
                            label="申请人"
                            min-width="120">
                        </el-table-column>
                        <el-table-column
                            prop="planTakeTime"
                            label="计划装车时间"
                            min-width="160">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="申请日期"
                            min-width="160">
                        </el-table-column>
                         <el-table-column
                            prop="serviceTime"
                            label="计划到园时间"
                            min-width="160">
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
            },
            table_selection_arr: [], // 多选存储变量
            right_arr: [],
        }
    },
    mounted(){
        // 获取按钮权限
        let arr = [...JSON.parse(sessionStorage.getItem('right-arr'))===null?[]:JSON.parse(sessionStorage.getItem('right-arr'))];
        arr.map(item=>{
            this.right_arr.push(item.name);
        })

        sessionStorage.setItem('warehouse-out-stock-edit','false');
        // 进入页面校验是否已登录
        // this.$fn.check_login(this);
        // 获取仓库数据
        this.loading = true;
        this.$fn.get_warehouse_data(this).then(res=>{
            console.log('res',res);
            this.options = [...res.data.data];
            this.get_data();
        },err=>{
            console.log('err',err);
        }).finally(()=>{
            this.loading = false;
        })
    },
    methods:{
        // 审核功能
        examine(){
            if(this.table_selection_arr.length === 0){
                this.$message.error('请先选择需要审核的申请');
                return;
            }
            if(this.table_selection_arr[0].documentState === 4){
                this.$message.error('申请已通过审核，请重新选择');
                return;
            }
            if(this.table_selection_arr[0].documentState === 0){
                this.$message.error('申请未提交，请重新选择');
                return;
            }
            // this.$confirm('即将进行订单审核, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     let arr = [];
            //     this.loading = true;
            //     this.table_selection_arr.map(item=>{
            //         let obj = {
            //             id: item.id,
            //             documentState: 2
            //         }
            //         arr.push(obj);
            //     })
            //     this.$axios.post('/applicationOut/baseBatchEdit',{
            //         list:arr
            //     }).then(res=>{
            //         console.log('审核申请',res);
            //         this.get_data();
            //     },err=>{
            //         console.log('审核申请报错',err);
            //     }).finally(()=>{
            //         this.loading = false;
            //     })
            // }).catch(() => {
                 
            // });

            this.$prompt('请进行订单审核', '提示', {
                confirmButtonText: '审核通过',
                cancelButtonText: '审核不通过',
                inputType: 'textarea',
                inputPlaceholder: '请输入审核意见',
                distinguishCancelAndClose:true,
                beforeClose:(action,instance,done)=>{
                    console.log('===',action,instance)
                    let value = instance.$refs.input.value;
                    if(action === 'close'){
                        done();
                        return;
                    }
                    if(value !== null && value.length > 200){
                        this.$message.error('审核意见长度不能超过200个字符，现在'+value.length+'个字符')
                        return
                    }
                    let arr = [];
                    this.loading = true;
                    if(action === 'confirm'){
                        this.table_selection_arr.map(item=>{
                            let obj = {
                                id: item.id,
                                documentState: 4,
                                examinationOpinion: value
                            }
                            arr.push(obj);
                        })
                    }
                    if(action === 'cancel'){
                        if(value === null){
                            this.$message.error('不通过审核必须输入意见');
                            this.loading = false;
                            return;
                        }
                        this.table_selection_arr.map(item=>{
                            let obj = {
                                id: item.id,
                                documentState: 5,
                                examinationOpinion: value
                            }
                            arr.push(obj);
                        })
                    }
                    this.$axios.post('/applicationOut/baseBatchEdit',{
                        list:arr
                    }).then(res=>{
                        console.log('审核申请',res);
                        this.get_data();
                    },err=>{
                        console.log('审核申请报错',err);
                    }).finally(()=>{
                        this.loading = false;
                    })
                    // 写入说明
                    let userinfo = JSON.parse(sessionStorage.getItem('login-userinfo'));
                    this.$axios.post('/examineRecord/baseAdd',{
                        applicationId: this.table_selection_arr[0].id,
                        applicationType: 0,
                        examineOpinion: value,
                        examineTime: this.$fn.timeChange(new Date()),
                        reviewerId: userinfo.userId,
                        reviewerName: userinfo.username,
                    }).then(res=>{
                        console.log(res);
                    })
                    done();
                }
            })
        },
        // 多选改变函数
        table_selection_change(val){
            this.table_selection_arr = [...val];
        },
        // 跳转新增页面
        add(){
            this.$router.push({name:'out_stock_add'});
            // this.$confirm('即将新增订单, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     this.$router.push({name:'out_stock_add'});
            // }).catch(() => {
                 
            // });
        },
        // 获取数据
        get_data(){
            let senddata = {
                companyId: sessionStorage.getItem('companyId')
            };
            let url = '/applicationOut/baseList?_pageList&ascColumn=documentState,createTime';
            if(this.form.inp1 !== ''){
                senddata.documentNo = '*'+this.form.inp1+'*';
            }
            if(this.form.inp2 !== null){
                senddata.warehouseId = this.form.inp2;
            }
            if(this.form.inp3 !== null){
                // senddata.planTakeTime = this.$fn.timeChange(this.form.inp3[0]); // 计划装车时间
                // senddata.serviceTime = this.$fn.timeChange(this.form.inp3[1]); // 计划送达时间
                url = url+'&createTime_begin='+this.$fn.timeChange(this.form.inp3[0]).substr(0,10)+'&createTime_end='+this.$fn.timeChange(this.form.inp3[1]).substr(0,10)
            }
            this.loading = true;
            this.$axios.post(url,{
                pageNo:this.page.page_num,
                pageSize:this.page.page_size,
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
        // 删除数据
        del_data(){
            if(this.table_selection_arr.length === 0){
                this.$message.error('请先选择需要删除的申请');
                return;
            }
            this.$confirm('即将删除订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let arr = [];
                this.table_selection_arr.map(item=>{
                    arr.push(item.id);
                })
                this.$axios.post('/applicationOut/delApplicationOut',{
                    ids:arr.join(',')
                }).then(res=>{
                    console.log('删除入库申请',res);
                    this.get_data();
                },err=>{
                    console.log('删除入库申请报错',err);
                })
            }).catch(() => {
                 
            });
        },
        // 修改数据
        change(){
            if(this.table_selection_arr.length !== 1){
                this.$message.error('请先选择一个申请');
                return;
            }
            if(this.table_selection_arr[0].documentState !== 0 && this.table_selection_arr[0].documentState !== 5){
                this.$message.error('选择的申请单不能编辑');
                return;
            }
            sessionStorage.setItem('warehouse-out-stock-edit','true');
            sessionStorage.setItem('warehouse-out-stock-aplicationid',this.table_selection_arr[0].id);
            this.$router.push({name:'out_stock_add'});
            // this.$confirm('即将修改订单, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     sessionStorage.setItem('warehouse-out-stock-edit','true');
            //     sessionStorage.setItem('warehouse-out-stock-aplicationid',this.table_selection_arr[0].id);
            //     this.$router.push({name:'out_stock_add'});
            // }).catch(() => {
                 
            // });
        },
        // 分页页码改变
        page_num_change(val){
            this.page.page_num = val;
            this.get_data();
        },
        // 提交
        submit(){
            if(this.table_selection_arr.length === 0){
                this.$message.error('请先选择需要提交的申请');
                return;
            }
            let flag = false;
            this.table_selection_arr.map(item=>{
                if(item.documentState === 1 || item.documentState === 4) {
                    flag = true;
                }
            })
            if(flag) {
                this.$message.error('选择的申请单中有已提交或者已审核通过的申请单，请去除后操作');
                return;
            }
            this.$confirm('订单提交过后将不可修改, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let arr = [];
                this.table_selection_arr.map(item=>{
                    let obj = {};
                    obj.id = item.id;
                    obj.documentState = 1;
                    arr.push(obj);
                })
                this.$axios.post('/applicationOut/baseBatchEdit',{
                    list:arr
                }).then(res=>{
                    console.log(res);
                    this.get_data();
                })
            }).catch(() => {
                 
            });
        },
        // 重置
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

.el-form-item{
    margin-bottom: 0px !important;
}
</style>
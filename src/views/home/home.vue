<template>
    <div class="home">
        <div class="home_top">
            <div class="title">
                <span></span>
                <span>标题一</span>
            </div>
            <div class="home_top_content">
                <div class="home_top_content_item">
                    <div class="home_top_content_item_left">
                        <i class="el-icon-eleme"></i>
                    </div>

                    <div class="home_top_content_item_right">
                        <div class="home_top_content_item_right_text">
                            <span>22%</span>
                            <span>比例</span>
                        </div>
                        <div class="home_top_content_item_right_text">
                            <span>22%</span>
                            <span>比例</span>
                        </div>
                    </div>
                </div>

                <div class="home_top_content_item">
                    <div class="home_top_content_item_left">
                        <i class="el-icon-eleme"></i>
                    </div>

                    <div class="home_top_content_item_right">
                        <div class="home_top_content_item_right_text">
                            <span>33%</span>
                            <span>库存</span>
                        </div>
                        <div class="home_top_content_item_right_text">
                            <span>33%</span>
                            <span>库存</span>
                        </div>
                    </div>
                </div>

                <div class="home_top_content_item">
                    <div class="home_top_content_item_left">
                        <i class="el-icon-eleme"></i>
                    </div>

                    <div class="home_top_content_item_right">
                        <div class="home_top_content_item_right_text">
                            <span>22%</span>
                            <span>错误数</span>
                        </div>
                        <div class="home_top_content_item_right_text">
                            <span>22%</span>
                            <span>错误数</span>
                        </div>
                    </div>
                </div>

                <div class="home_top_content_item">
                    <div class="home_top_content_item_left">
                        <i class="el-icon-eleme"></i>
                    </div>

                    <div class="home_top_content_item_right">
                        <div class="home_top_content_item_right_text">
                            <span>880</span>
                            <span>数量</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="home_center">
            <div class="title">
                <span></span>
                <span>标题一</span>
            </div>

            <div class="home_center_content" id="home_center_content"></div>
        </div>

        <div class="home_third">
            <div class="title">
                <span></span>
                <span>标题一</span>
            </div>

            <div class="home_third_content" id="home_third_content"></div>
        </div>
    </div>
</template>

<script>
let echarts = require('echarts');
export default {
    data(){
        return{

        }
    },
    methods:{
        // 返回登录页
        go_login(){
            this.$fn.go_login(this);
        },
        // 画图
        draw(){
            let myChart = echarts.init(document.getElementById('home_center_content'));
            let myChart1 = echarts.init(document.getElementById('home_third_content'));

            let option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }]
            };
            let option1 = {
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };

            myChart.setOption(option);
            myChart1.setOption(option1);

            window.onresize = function(){
                myChart.resize();
                myChart1.resize();
            }
        }
    },
    mounted(){
        // 进入页面校验是否已登录
        // this.$fn.check_login(this);
        this.draw();
    }
}
</script>

<style lang="less" scoped>
.home{
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #eaeaea;
    box-sizing: border-box;
    padding: 10px;
    .home_top{
        width: 100%;
        height: 200px;
        background: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 10px;
        .home_top_content{
            width: 100%;
            height: calc(100% - 50px);
            display: flex;
            justify-content: space-between;
            .home_top_content_item{
                width: calc((100% - 20px)/4);
                height: 100%;
                display: flex;
                border-radius: 5px;
                .home_top_content_item_left{
                    width: 40%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 50px;
                    color: #fff;
                }
                .home_top_content_item_right{
                    width: 60%;
                    height: 100%;
                    display: flex;
                    justify-content: space-around;
                    color: #fff;
                    .home_top_content_item_right_text{
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
            .home_top_content_item:nth-of-type(1){
                background: rgba(139, 194, 84, 0.788);
            }
            .home_top_content_item:nth-of-type(2){
                background: rgba(0, 187, 25, 0.788);
            }
            .home_top_content_item:nth-of-type(3){
                background: rgba(233, 121, 17, 0.788);
            }
            .home_top_content_item:nth-of-type(4){
                background: rgba(22, 90, 218, 0.788);
            }
        }
    }

    .home_center,.home_third{
        width: 100%;
        height: 400px;
        background: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 20px;
        .home_center_content,.home_third_content{
            width: 100%;
            height: calc(100% - 50px);
        }
    }
}

/deep/.title{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    span:nth-of-type(1){
        display: inline-block;
        border-right: 3px solid #ccc;
        width: 2px;
        height: 60%;
        margin-right: 10px;
    }
    span:nth-of-type(2){
        // display: inline-block;
        font-size: 18px;
        font-weight: 600;
    }
}
</style>
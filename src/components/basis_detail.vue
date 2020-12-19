<template>
    <!-- 二级详情页面基础页面框架 -->
    <div class="detail">
        <!-- 顶部按钮栏 -->
        <div class="detail_box_title">
            <div class="detail_box_title_left">
                <slot name="detail_icon" />
            </div>

            <div  class="detail_box_title_center">
                <slot name="detail_title" />
            </div>

            <div class="detail_box_title_right">
                <slot name="detail_btn"/>
            </div>
        </div>

        <!-- 详细信息栏 -->
        <div class="detail_box_content">
            <div class="detail_content_form">
                <slot name="detail_content_form"/>
            </div>

            <div class="detail_content_table_big_box">
                <slot name="detail_content" />
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.detail{
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 10px;
    background: #eaeaea;
    .detail_box_title{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 1px solid #eaeaea;
        background: #fff;
        border-radius: 5px;
        .detail_box_title_left{
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 20px;     
            cursor: pointer;           
        }

        .detail_box_title_center{
            font-size: 14px;
        }

        .detail_box_title_right{
            margin-right: 20px;
        }
    }

    .detail_box_content{
        width: 100%;
        overflow: hidden;
        .detail_content_form{
            width: 100%;
            height: auto;
            margin-top: 10px;
            margin-bottom: 10px;
            background: #fff;
            box-sizing: border-box;
            padding: 10px 0;
            border-radius: 5px;
        }

        .detail_content_table_big_box{
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 10px;
            background: #fff;
            border-radius: 5px;
            margin-bottom: 10px;
        }
    }
}
</style>
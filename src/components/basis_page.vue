<template>
    <!-- 一级列表页面页面基础布局框架 -->
    <div class="basis_page">
        <!-- 上层筛选条件及按钮 -->
        <div class="basis_page_search">
            <div class="basis_page_form">
                <slot name="form" />
            </div>
            <div class="basis_page_search_btn">
                <slot name="search_btn" />
            </div>
        </div>
        <!-- 下层筛选结果，以列表形式展示 -->
        <div class="basis_page_table">
            <slot name="table" />
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.basis_page{
    width: 100%;
    height: 100%;
    background: #eaeaea;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    .basis_page_search{
        width: 100%;
        height: auto;
        min-height: 50px;
        background: #fff;
        padding-top: 10px;
        display: flex;
        margin-bottom:10px;
        border-radius: 5px;
        .basis_page_form{
            flex: 1;
            height: 100%;
        }
        .basis_page_search_btn{
            min-width: 150px;
            height: 100%;
            display: flex;
            align-items: flex-end;
            box-sizing: border-box;
            padding: 10px;
        }
    }
    .basis_page_table{
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        background: #fff;
    }
}

/deep/.el-form-item{
    margin-bottom: 0;
}
</style>
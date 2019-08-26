<template>
    <div>
        <div class="ibox float-e-margins">
            <div class="ibox-title">
                <el-tabs type="border-card">
                    <el-tab-pane label="用户管理"><slot></slot></el-tab-pane>
                    <el-tab-pane label="配置管理"><slot></slot></el-tab-pane>
                    <el-tab-pane label="角色管理"><slot></slot></el-tab-pane>
                    <el-tab-pane label="定时任务补偿"><slot></slot></el-tab-pane>
                </el-tabs>
            </div>
            <!--<div class="ibox-content">-->
                <!--<slot></slot>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
            },
        },

        data() {
            return {}
        }
    }
</script>
<style lang="less">
    .ibox{
        margin-top: 28px !important;
        margin-bottom: 0px !important;
    }
    .ibox-title{
        border-style: none !important;
    }
</style>

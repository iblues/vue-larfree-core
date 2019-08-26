<template>
    <div class="content-tabs" :style="{paddingLeft: paddingleft}">

        <el-tabs v-model="myTabsIndex"
                 type="border-card"
                 :closable="canColse"
                 @tab-remove="removeTab"
                 @tab-click="clickTab"
                 style="padding-left: 5px;"
        >
            <el-tab-pane
                    v-for="(item, index) in tabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>

        <!--<div class="btn-group roll-nav roll-right" >-->
            <!--<button class="dropdown" data-toggle="dropdown">关闭操作<span class="caret"></span>-->
            <!--</button>-->
            <!--<ul role="menu" class="dropdown-menu dropdown-menu-right">-->
                <!--<li class="J_tabShowActive"><a>定位当前选项卡</a>-->
                <!--</li>-->
                <!--<li class="divider"></li>-->
                <!--<li class="J_tabCloseAll"><a>关闭全部选项卡</a>-->
                <!--</li>-->
                <!--<li class="J_tabCloseOther"><a>关闭其他选项卡</a>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->

        <!--<a href="/manager/logout" class="roll-nav roll-right J_tabExit"><i class="fa fa fa-sign-out"></i> 退出</a>-->

    </div>
</template>
<script>
    export default {
        props: ['tabs', 'tabsIndex', 'isCollapse'],
        data() {
            return {
                paddingleft: '220px',
                myTabsIndex: '',
//                tabs: [{
//                    title: '主页',
//                    name: '1',
//                    content:'',
//                    url: 'Tab 1 content'
//                }],
            }
        },
        mounted: function () {
            this.myTabsIndex = this.tabsIndex;
        },
        computed: {
            canColse: function () {
                if (this.tabs.length > 1)
                    return true;
                else
                    return false;
            },
        },
        watch: {
            tabsIndex: function () {
                this.myTabsIndex = this.tabsIndex;
            },
            myTabsIndex: function (newQuery) {
                this.$emit('update:tabsIndex', newQuery);
            },
            isCollapse: function (newvalue) {
                if (!newvalue) {
                    this.paddingleft = '220px';
                } else {
                    this.paddingleft = '70px';
                }
            }
        },
        methods: {
//            addTab(targetName) {
//                let newTabName = ++this.tabIndex + '';
//                this.tabs.push({
//                    title: 'New Tab',
//                    name: newTabName,
//                    content: 'New Tab content'
//                });
//                this.editableTabsValue = newTabName;
//            },
            removeTab(targetName) {
                let tabs = this.tabs;
                let activeName = this.myTabsIndex;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                let tabsIndex = activeName;
                tabs = tabs.filter(tab => tab.name !== targetName);
                this.$emit('update:tabs', tabs)
                this.$emit('update:tabsIndex', tabsIndex);
                this.$emit('removeTab', tabsIndex);
            },
            //点击 就准备跳转到对应的路由
            clickTab(tab, event) {
                this.$emit('clickTab', this.myTabsIndex);
            },
        }
    }
</script>
<style lang="less">
    @import "../../assets/common/css/color.less";
    .content-tabs{
        padding-left: 220px;
        border-bottom: none !important;
    }
    .content-tabs .el-tabs__content {
        display: none;
    }

    .el-tabs--border-card > .el-tabs__header {
        background: #fff;
        border-top: none;
    }

    .el-tabs--border-card {
        border: none;
        box-shadow: none;
        /*border-bottom: 2px solid #293846;*/

    }

    /*.el-tabs__item {*/
        /*height: 42px;*/
    /*}*/

    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        background: @navbar-active-bgcolor;
        color: #fff;
        border-radius: 20px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
    }

</style>

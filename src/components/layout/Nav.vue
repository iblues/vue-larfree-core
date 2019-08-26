<template>
    <div class="navbar">
        <nav role="navigation " class="navbar-default navbar-static-side">
            <div class="nav-close">
                <i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse" v-bar style="height:100%">
                <el-menu
                    default-active="1"
                    @open="handleOpen"
                    @close="handleClose"
                    menu-trigger="true"
                    @select="toTab"
                    :collapse="isCollapse"
                    background-color="#393D49"
                    text-color="#EEEEEE"
                    active-text-color="#fff"
                    :unique-opened='uniqueOpened'>
                    <!--<li v-if="!isCollapse" class="nav-header">-->
                    <!--<div class="dropdown profile-element">-->
                    <!--<span><img alt="image" src="/admin/img/profile_small.jpg" class="img-circle"/></span>-->
                    <!--<a data-toggle="dropdown" href="#" class="dropdown-toggle"><span class="clear"><span-->
                    <!--class="block m-t-xs"><strong class="font-bold">Beaut-zihan</strong></span> <span-->
                    <!--class="text-muted text-xs block">超级管理员<b class="caret"></b></span></span></a>-->
                    <!--<ul class="dropdown-menu fadeInRight m-t-xs">-->
                    <!--<li><a href="form_avatar.html" class="J_menuItem">修改头像</a></li>-->
                    <!--<li class="divider"></li>-->
                    <!--<li><a href="/manager/logout">安全退出</a></li>-->
                    <!--</ul>-->
                    <!--</div>-->
                    <!--</li>-->
                    <li v-if="isCollapse" class="nav-heade">
                        <img src="../../assets/img/logo2.png" alt="">
                    </li>
                    <li v-if="!isCollapse" class="nav-heade">
                        <img src="../../assets/img/logo@2x.png" alt="">
                    </li>
                    <template v-for="nav in navData">
                        <el-menu-item v-if="!nav.child" test="1" :index="nav | toJson" :key="nav.id">
                            <!--<i class="el-icon-icon-shouyex" style="color: #fff"></i>-->
                            <i :class="nav.class | iconFilter" style="color: #fff"></i>
                            <span slot="title"> {{nav.name}}</span>
                        </el-menu-item>
                        <el-submenu :index="nav | toJson" v-if="nav.child" :key="nav.id">
                            <template slot="title">
                                <i :class="nav.class | iconFilter" style="color: #fff"></i>
                                <span> {{nav.name}}</span>
                            </template>
                            <template v-for="nav2 in nav.child">
                                <el-menu-item v-if="!nav2.child" :index="nav2 | toJson" :key="nav2.id">
                                    <span slot="title"> {{nav2.name}}</span>
                                </el-menu-item>
                                <el-submenu class="level3menu" v-if="nav2.child" :index="nav2 | toJson" :key="nav2.id">
                                    <template slot="title"> {{nav2.name}}</template>
                                    <el-menu-item v-for="nav3 in nav2.child" :index="nav3 | toJson" :key="nav3.id">
                                        <span slot="title"> {{nav3.name}}</span>
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                        </el-submenu>
                    </template>
                </el-menu>

            </div>
        </nav>
    </div>
</template>
<script>
    import '../../assets/common/css/color.less'
    export default {
        props: ['isCollapse'],
        data() {
            return {
                navData: {},
                uniqueOpened: true,
            }
        },
        created: function () {
            this.getData();
        },
        watch: {
            isCollapse: function (newValue, oldValue) {
                if (newValue)
                    document.getElementsByTagName('body')[0].classList.add("mini-navbar");
                else
                    document.getElementsByTagName('body')[0].classList.remove("mini-navbar");
            }
        },
        filters: {
            toJson: function (tab) {
                return JSON.stringify(tab);
            },
            iconFilter(className) {
                return `${className} iconfont ${className && className.replace('el-icon-icon-', 'icon')}`;
            }
        },
        methods: {
            getData() {
                this.$http.get('auth/nav/tree')
                    .then((response) => {
                        this.loading = false;
                        this.$debug.log(this.navData);
                        this.navData = response.data.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            toTab(key, keyPath) {
                let nav = JSON.parse(key);
                this.$emit('toTab', {url: nav.url, name: nav.name});
            },

            findTab(url) {
                let target = [];
                this.navData.forEach((tab, index) => {
                    if (tab.url === url) {
                        target = tab;
                    }
                });
                return target;
            },
            handleOpen(key, keyPath) {

                this.$emit('open');
            },
            handleClose(key, keyPath) {

                this.$emit('close');
            }
        }
    }
</script>
<style>
    @media (max-width: 768px){
        body.fixed-sidebar .navbar-static-side{
            display: block !important;
        }
        .sidebar-collapse{
            height: 100% !important;
        }
    }
    /*@media (max-width: 760px){*/
        /*#page-wrapper{*/
            /*padding-left: 220px;*/
        /*}*/
    /*}*/

</style>
<style lang="less">
    .level3menu .el-submenu__title {
        background-color: #333333 !important;
    }
</style>
<style lang="less" scoped>
    @import "../../assets/common/css/color.less";
    .navbar{
        background-color: @navbar-bgcolor;
        .el-submenu .el-menu-item{
            background-color: #333333 !important;
        }
        .el-submenu .el-menu-item.is-active{
            background-color:@navbar-active-bgcolor !important;
        }
        .el-menu {
            border: none !important;
        }

        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
        .nav-heade{
            padding: 0px;
            display: flex;
            height: 50px;
            justify-content: center;
            align-items: center;
            background-color: @navbar-bgcolor !important;
            width:100%;
        }
        .navbar-static-side{
            background-color: rgb(57, 61, 73);
        }
    }

</style>

<template>
    <div class="topnavbar" :style="{paddingLeft: paddingleft}">
        <div class="navbar"  style="margin-bottom: 0;background-color: #fff">
            <div class="navbar-header">
                <a class="navbar-minimalize minimalize-styl-2 btn" v-if="!collapse" @click="collapseTab">
                    <i class="el-icon iconfont iconshouqi" style="font-size: 24px"></i>
                </a>
                <a class="navbar-minimalize minimalize-styl-2 btn " v-if="collapse" @click="collapseTab">
                    <i class="el-icon iconfont iconzhankai" style="font-size: 24px"></i>
                </a>
                <div class="selectarea" style="padding-top: 4px">
                    <el-select v-model="arealist" placeholder="请选择">
                        <el-option
                                v-for="item in cityList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="icon">
                <span style="position: relative">
                    <i class="el-icon iconfont icon40one"></i>
                    <div class="dot"></div>
                </span>
                <el-dropdown>
                      <span class="el-dropdown-link">
                        {{userInfo && userInfo.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><div>个人中心</div></el-dropdown-item>
                            <el-dropdown-item><div @click="dropOut">退出登录</div></el-dropdown-item>
                        </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['value'],
        data() {
            return {
                userInfo: '',
                arealist: '',
                collapse:false,
                paddingleft: '220px',
                cityApi: 'system/site',
                cityList: [] // 城市列表
            }
        },

        //        mounted: function () {
        //            this.collapse = this.isCollapse;
        //        },
        watch: {
            isCollapse: function () {
                // console.log(newValue);
               // this.$emit('update',newValue);
            },
            collapse: function (newvalue) {
                if (!newvalue) {
                    this.paddingleft = '220px';
                } else {
                    this.paddingleft = '70px';
                }
            },
            arealist: function (newvalue) {
                this.cityList.forEach(item => {
                    if (item.id === newvalue) {
                        localStorage.setItem('lnglat', JSON.stringify([item.center_lon, item.center_lat]));
                    }
                });
                localStorage.setItem('cityId', newvalue);
                localStorage.setItem('routeUrl', window.location.hash.slice(1));
                setTimeout(()=>{
                    this.$router.push({path: '/empty/route'});
                },500);

            }
        },
        mounted() {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.getCityList();
        },
        methods: {
            getCityList() {
                this.$http.get(this.cityApi)
                    .then((response) => {
                        this.cityList = response.data.data;
                        if (localStorage.getItem('cityId')) {
                            this.arealist = Number(localStorage.getItem('cityId'));
                        } else {
                            this.arealist = response.data.data[0].id;
                        }

                    })
                    .catch((error) => {
                        if(error.response.data.msg){
                            this.$message.error(error.response.data.msg);
                        }else{
                            this.$message.error('请求错误：'+error.response.status);
                        }
                    });
            },
            dropOut() {
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                localStorage.clear();
                this.$router.replace({path: '/login/index'});
            },
            collapseTab() {
                if (!this.value) {
                    this.collapse = true;
                    this.$emit('input', true);
                } else {
                    this.collapse = false;
                    this.$emit('input', false);
                }
            }
        }
    }
</script>
<style lang="less">
    .el-tabs__nav{
        margin-bottom: 3px !important;
    }
    .topnavbar{
        .el-input{
            width:100px;
        }
        .el-input--suffix .el-input__inner{
            border: none ;
        }

    }
</style>
<style lang="less" scoped>
    @media screen and (max-width: 768px) {
        .topnavbar{
            padding-left: 0px !important;
            width: 100%;
            min-width: 1000px;
        }
    }
    .topnavbar{
        /*padding-left: 220px;*/
        .navbar{
            width: 100%;
            height: 50px;
            background-color: #fff;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .minimalize-styl-2{
            margin: 8px 0  0 0;
        }
        .icon {
            display: flex;
            align-items: center;
            i{
                color: #000;
            }
            i:nth-child(1){
                font-size: 24px;
                padding-right: 26px;
            }
            i:nth-child(2){
                font-size: 24px;
                padding-right: 10px;
            }
            .dot{
                position:absolute;
                top: 0px;
                left: 15px;
                width: 8px;
                height: 8px;
                background-color: red;
                border-radius: 50%
            }
            .el-dropdown-link{
                line-height: 50px;
                i{
                    font-size: 16px;
                }
            }
        }
    }

</style>

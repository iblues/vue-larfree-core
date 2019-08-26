<!--
@wyq  radio切换组件
如
<radio-model v-model='' :dataList='datalist'></radio-model>

datalist: [
        {name: '', label: ''}，  // name 显示的名字  label：要传出的值
        {name: '', label: ''}，
        {name: '', label: ''}
    ]
-->


<template>

    <div class="model-radio">
        <el-radio-group v-model="myValue" >
          <el-radio-button  :label="item.label" v-for="(item, index) in dataList" :key="index" v-if="item.status">{{item.name}}</el-radio-button>
        </el-radio-group>
    </div>
</template>
<script>
    export default {
        props: {
            // modelIndex: {
            //     type: String,
            //     default: '0'
            // },
            dataList: {
                type: Array,
                default: () => {
                    return [
                        {name: '调度模板', label: '0',status: true},
                        {name: '市场模板', label: '1',status: true},
                        {name: '标准模板', label: '2',status: true}
                    ]
                }
            },
            value: {
                type: String,
                default: ''
            },
        },
        watch: {
            myValue: function (newValue) {
                this.$emit('input', this.myValue);
            },
            value: function (newValue) {
                this.myValue = newValue;
            }
        },
        data() {
            return {
                // modelindex: '',
                myValue: ''
            }
        },
        created() {
            this.myValue = this.value;
        },
        methods: {
            // handleChange(value) {
            //     this.$emit('input', value);
            // }
        }
    }
</script>
<style scoped>
    .model-radio{
        /*margin-top: 20px;*/
        margin-left: 20px;
    }
    @media screen and (max-width: 1400px) {
        .model-radio{
            margin-left: 10px;
        }
    }
</style>

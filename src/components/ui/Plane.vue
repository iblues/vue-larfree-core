<template>
    <div>
        <div class="ibox float-e-margins">
            <div class="ibox-title" v-if="title">
                <h5>{{title}}</h5>
                <div class="ibox-tools">
                    <a class="collapse-link">
                        <i class="fa fa-chevron-up"></i>
                    </a>
                    <a class="close-link">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
            </div>
            <div class="ibox-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String | Number,
                default: '',
            }
        },

        data() {
            return {}
        }
    }
</script>
<style scoped>
    .ibox {
        /*min-height: 700px;*/
        /*height: 1000px;*/
        padding: 10px;
        background-color: #f5f5f5;
    }
</style>

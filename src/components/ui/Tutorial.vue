<template>
    <div class="ibox-content">

        <h4>
            <slot name="header"></slot>
        </h4>
        <hr/>
        <slot></slot>
        <hr/>
        <slot name="code"></slot>
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
        },
        created() {
            console.log(this.$slots);
        }
    }
</script>
<style scoped>
    pre {
        background: #fff;
        padding: 0;
    }
</style>
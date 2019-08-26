<template>
  <div>
    <div v-if="action == 'table' ">
      <el-input :value="Value" placeholder="请输入内容" />
    </div>
    <div v-if="action == 'edit' ">
      <el-date-picker
        :value="Value"
        type="date"
        value-format="yyyy-mm-dd"
        placeholder="选择日期时间"
        v-on="$listeners"
      />
    </div>

  </div>
</template>
<script>
export default {
  props: {
    data: Object,
    schema: Object,
    action: {
      type: String,
      default: 'edit'
    },
    value: [String, Number, Array, Date, Object]
  },
  data() {
    return {
      myValue: this.value
    }
  }

}
</script>
<style>
</style>

<template>
  <div>
    <el-radio-group v-model="tab">
      <el-radio-button label="电脑" />
      <el-radio-button label="平板" />
      <el-radio-button label="手机" />
    </el-radio-group>
    <div>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: '电脑'
    }
  }
}
</script>
<style>
</style>

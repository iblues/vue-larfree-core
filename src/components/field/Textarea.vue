<template>
  <span>
    <template v-if="action == 'edit' ">
      <el-input :value="value" type="textarea" placeholder="请输入内容" v-on="$listeners" />
    </template>
    <template v-if="action == 'search' ">
      <el-input :value="value" :placeholder="fieldName" v-on="$listeners" />
    </template>
    <template v-if="action == 'table'">
      {{ value }}
    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  extends: base,
  props: {},
  data() {
    return {
      searchModel: 'like'
    }
  }
}
</script>
<style>
</style>

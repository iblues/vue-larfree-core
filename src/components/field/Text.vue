<!--
@blues
<lar-field-input v-model="input" :action="action"></lar-field-input>
-->
<template>
  <span>
    <template v-if="action == 'edit' || action == 'search' ">
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
    name: 'LarFieldText',
    extends: base,
    props: {
    },
    data() {
      return {
        searchModel: 'like'
      }
    }
  }
</script>
<style>
</style>

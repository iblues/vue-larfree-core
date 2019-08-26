<!--
@blues
<lar-field-button v-model="input" :action="action"></lar-field-button>
-->
<template>
  <span>
    <template v-if="action == 'edit' || action == 'search' ">
      <!--<el-input v-on="$listeners" :value="value" placeholder="请输入内容"></el-input>-->
      <el-button size="mini" round v-on="$listeners">{{ value }}</el-button>
    </template>
    <template v-if="action == 'table'">
      <!--{{value}}-->
      <el-button size="mini" round @click="toSeeUserDetail">{{ value }}</el-button>
    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldButton',
  extends: base,
  props: {},
  data() {
    return {
      searchModel: 'like'
    }
  },
  methods: {
    toSeeUserDetail() {
    }
  }
}
</script>
<style>
</style>

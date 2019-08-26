<template>
  <div>
    <template v-if="action == 'table' " style="width: 90px;">
      <!--{{value}}-->
      <!--<div v-if="value">-->
      <!--<i class="el-icon-date"></i><span>{{value.substring(2, 10)}}</span>-->
      <!--</div>-->
      <div v-if="value">
        <i class="el-icon-time" /><span>{{ value }}</span>
      </div>
    </template>
    <template v-if="action == 'edit' ">
      <el-time-picker
        :value="value"
        type="time"
        value-format="HH:mm:ss"
        placeholder="选择时间"
        v-on="$listeners"
      />
    </template>
    <template v-if="action == 'search'">
      <el-time-picker
        style="width:100%"
        :value="value"
        type="daterange"
        value-format="HH:mm:ss"
        :start-placeholder="fieldName + '开始'"
        :end-placeholder="fieldName + '结束'"
        v-on="$listeners"
      />
    </template>
  </div>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldTime',
  extends: base,
  props: {},
  data() {
    return {
      searchModel: 'range'
    }
  }
}
</script>
<style>
</style>

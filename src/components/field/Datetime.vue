<template>
  <div>
    <template v-if="action == 'table' " style="width: 75px;">
      <div v-if="value">
        <i class="el-icon-date" /><span>{{ value.substring(2, 10) }}</span>
      </div>
      <div v-if="value">
        <i class="el-icon-time" /><span>{{ value.substring(11) }}</span>
      </div>
    </template>
    <template v-if="action == 'edit' ">
      <el-date-picker
        :value="value"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间"
        v-on="$listeners"
      />
    </template>
    <template v-if="action == 'search'">
      <el-date-picker
        style="width:100%;"
        :value="value"
        type="datetimerange"
        :default-time="['00:00:00']"
        value-format="yyyy-MM-dd HH:MM:ss"
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

<template>
  <span>
    <template v-if="action == 'edit' || action == 'search' ">
      <el-input
        :value="value"
        placeholder="请输入图片地址"
        v-on="$listeners"
      />
    </template>
    <template v-if="action == 'table'">
      <img v-viewer :src="value" width="40" style="border-radius: 10px;">
    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldImgurl',
  extends: base,
  props: {},
  data() {
    return {
      searchModel: false
    }
  }
}
</script>
<style>
</style>

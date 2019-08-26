<template>
  <div>
    {{ action }}
    <template v-if="action == 'table' ">
      文件
    </template>
    <template v-if="action == 'edit' ">
      文件
    </template>
  </div>
</template>
<script>
import base from './base.js'

export default {}
</script>
<style scoped>
    img {
        width: 50px;
    }
</style>

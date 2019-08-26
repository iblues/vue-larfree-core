<template>
  <span v-html="value" />
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldDiv',
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

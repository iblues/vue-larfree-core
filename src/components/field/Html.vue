<template>
  <span v-html="show" />
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldHtml',
  extends: base,
  props: {
    fieldHtml: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchModel: null
    }
  },
  computed: {
    show: function() {
      return this.$larfree.replaceParm(this.fieldHtml, this.data)
    }
  }
}
</script>
<style>
</style>

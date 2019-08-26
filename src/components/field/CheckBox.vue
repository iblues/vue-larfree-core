<template>
  <span>
    <template v-if="action == 'edit'">
      <el-switch
        v-model="myValue"
        @click.native="quickChange"
        v-on="$listeners"
      />
    </template>
    <template v-if="action == 'table'">
      <el-switch
        v-model="myValue"
        @change="quickChange"
      />
    </template>
    <template v-if="action == 'search'">
      <el-select v-model="myValue" style="width:100%" :placeholder="fieldName" @change="quickChangeOption">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          v-on="$listeners"
        />
      </el-select>
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
      options: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      searchModel: 'like'
    }
  },
  watch: {
    value: function(newQuery) {
      if (this.action !== 'search') {
        this.myValue = Boolean(newQuery)
      }
    }
  },
  created() {
    if (this.action !== 'search') {
      this.myValue = Boolean(this.value)
    } else {
      this.options.unshift({
        value: 'all',
        label: '全部' + this.fieldName
      })
    }
  },
  methods: {
    quickChangeOption(val) {
      // if (val == 'all') {
      //     this.myValue = null;
      // }
      // this.$emit('checkboxChange', this.myValue);
    },
    quickChange: function() {
      this.$emit('quick-change', !this.value)
    }
  }
}
</script>
<style>
</style>

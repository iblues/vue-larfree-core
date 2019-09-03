<template>
  <span>
    <template v-if="action == 'edit'">
      <el-input
        :value="value"
        type="number"
        placeholder="请输入数字"
        v-on="$listeners"
      />
    </template>
    <template v-if="action == 'search' ">

      <span class="lar-number_range el-input__inner">
        <el-input
          v-model="min"
          :placeholder="fieldName + '最小值'"
        />
        -
        <el-input
          v-model="max"
          :placeholder="fieldName + '最大值'"
        />
      </span>

    </template>
    <template v-if="action == 'table'">
      {{ value }}
    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldNumber',
  extends: base,
  props: {},
  data() {
    return {
      max: null,
      min: null,
      searchModel: 'range'
    }
  },
  computed: {
    rangeValue: function() {
      if (this.action === 'search') {
        return [this.min, this.max]
      } else {
        return this.myValue
      }
    }
  },
  watch: {
    value: function(newValue) {
      if (typeof newValue === 'object') {
        this.min = newValue[0]
        this.max = newValue[1]
      } else {
        this.min = ''
        this.max = ''
      }
    },
    rangeValue: function() {
      this.$emit('input', this.rangeValue)
    }
  }

}
</script>
<style>

    .lar-number_range {
        border: 1px solid #dcdfe6;
        height: 36px;
        display: inline-block;
        overflow: hidden;
        margin-bottom: -4px;
    }

    .lar-number_range .el-input {
        width: 45%;
    }

    .lar-number_range .el-input__inner{
      position: relative;
      top:-2px;
    }

    .lar-number_range input {
        position: relative;
        top: 0px;
        height: 30px !important;
        text-align: center;
        padding: 0px 5px;
        border-radius: 0px;
        display: inline;
        border: none;
    }
</style>

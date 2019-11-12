<template>
  <span>
    <template v-if="action == 'table' ">
      <div v-html="show" />
    </template>
    <template v-if="action == 'edit' || action == 'search'">
      <el-select
        style="width:100%"
        :value="value"
        filterable
        class="SimpleSelect"
        reserve-keyword
        :loading="loading"
        :placeholder="fieldName"
        v-on="$listeners"
      >
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
  </span>
</template>
<script>
import base from '../base.js'

export default {
  name: 'LarFieldSelectSimpleSelect',
  extends: base,
  props: {
    fieldOption: {// 如果不远程连表的话,这个代表备选数据
      type: [Array, Object],
      default: function() {
        return {}
      }
    },
    fieldKey: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: 'edit'
    }
  },
  data() {
    return {
      loading: false,
      searchModel: 'equal',
      option: []
    }
  },
  computed: {
    show() {
      // 如果配置中有option.直接用
      return this.fieldOption[this.value]
    }
  },
  watch: {
    data: function() {
      this.initOption()
    }
  },
  mounted() {
    this.$emit('searchModel', this.searchModel)
    this.setOption('all', '全部')
    // 查看模式 ,不需要初始化了.编辑模式才需要option
    if (this.action !== 'table') {
      this.initOption()
    }
  },
  methods: {
    initOption() {
      // 只有table模式不需要option
      if (this.action === 'table') {
        return false
      }
      // 如果配置的option有数据,就解析结构
      if (this.fieldOption) {
        for (const i in this.fieldOption) {
          this.setOption(i, this.fieldOption[i])
        }
      }
    },

    // 添加设置option结构
    setOption(key, value, schema) {
      // 如果是数字 就改成数字
      if (!isNaN(key)) { key = key * 1 }

      // 先检查是否重复了
      let pass = true
      this.option.forEach((option) => {
        if (option.value === key) {
          pass = false
        }
      })
      if (!pass) return
      // 如果schema存在,那就需要读取多个字段的内容
      if (schema) {
        let tmpValue = ''
        schema.forEach((v, k) => {
          if (k > 0 && v && value[v]) {
            tmpValue += value[v] + ' '
          }
        })
        value = tmpValue
      }
      this.option.push({ value: key, label: value })
    }

  }
}
</script>
<style scoped>
    img {
        width: 50px;
    }

    .el-select {
        width: 220px;
    }
</style>

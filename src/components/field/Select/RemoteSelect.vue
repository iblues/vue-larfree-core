<template>
  <span>
    <template v-if="action == 'table' ">
      <div v-html="show" />
    </template>
    <template v-if="action == 'edit' || action == 'search' ">
      <el-select
        style="width:100%"
        :value="value"
        filterable
        class="RemoteSelect"
        :multiple="multiple"
        reserve-keyword
        :loading="loading"
        :remote="remote"
        :remote-method="remoteMethod"
        :placeholder="fieldName"
        v-on="$listeners"
      >
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />

        <el-option-group
          v-if="fieldLink.model"
          label="请输入关键词获取更多"
        />
      </el-select>

    </template>
  </span>
</template>
<script>
import base from '../base.js'
import axios from 'axios'
export default {
  name: 'LarFieldSelectRemoteSelect',
  extends: base,
  props: {
    fieldLink: {// 连表的相关结构
      type: Object,
      default: function() {
        return {}
      }
    },
    fieldName: {// 连表的相关结构
      type: String,
      default: ''
    },
    fieldMulti: {
      type: [Boolean, String, Number], // 是否多选
      default: false
    },
    fieldOption: {// 如果不远程连表的话,这个代表备选数据
      type: Array,
      default: function() {
        return []
      }
    },
    fieldKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      remote: false,
      loading: false,
      multiple: false,
      searchModel: 'equal',
      option: []// 远程调用存储数据的地方
    }
  },
  computed: {
    show() {
      // 链表,单选
      let optionName = this.fieldLink.as
      if (!optionName) { optionName = this.fieldKey + '_link' }
      if (this.data[optionName]) {
        const value = this.data[optionName]
        if (this.fieldLink.select) { return value[this.fieldLink.select[1]] } else { return value }
      } else {
        return ''
      }
    }
  },
  watch: {
    data: function(newValue) {
      if (newValue) {
        this.initOption()
      }
    }
  },
  created() {
    this.remote = !!this.fieldLink
    this.multiple = !!this.fieldMulti
  },
  mounted() {
    this.$emit('searchModel', this.searchModel)
    this.setOption('all', '请输入搜索关键词')
    // 查看模式 ,不需要初始化了.编辑模式才需要option

    // 默认进来的时候先初始化一个列表
    if (this.fieldLink && !this.fieldLink.uninit && this.action !== 'table') {
      this.remoteMethod()
    }
  },
  methods: {
    initOption() {
      // 只有编辑模式不需要option
      if (this.action !== 'edit') {
        return false
      }
      // 读取link中的数据先填充并选中
      let optionName = this.fieldLink.as
      if (!optionName) { optionName = this.fieldKey + '_link' }

      // console.log(optionName);
      // this.$debug.log($)
      if (this.data[optionName]) {
        const value = this.data[optionName]
        this.setOption(value[this.fieldLink.select[0]], value, this.fieldLink.select)
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
      if (!pass) return// 重复了

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
    },
    clearOption() {
      this.option = []
      this.setOption('all', '全部')
    },

    // 远程读取数据,供给下拉
    remoteMethod(query) {
      //                if (query !== '') {
      this.loading = true
      let api = this.fieldLink.url
      if (!api) {
        console.log('remoteMethod:路径错误')
      }
      if (query) {
        // 有搜索条件的时候,api拼接
        const field = this.fieldLink.select.slice(0)
        const name = field.splice(1).join('|') + '$'
        const keyword = query
        query = {}
        query[name] = '%' + keyword + '%'
        api = this.$larfree.httpQuery(query, api)
        this.clearOption()
      }
      if (!api) {
        console.log(api, '请求为空')
        return ''
      }

      this.$http.get(api)
        .then((response) => {
          // localStorage.setItem(api, JSON.stringify(response.data))
          if (!response.data) {
            this.loading = false
            return false
          }
          response.data.map((value) => {
            this.setOption(value[this.fieldLink.select[0]], value, this.fieldLink.select)
          })
          this.loading = false
          // this.debug.log(this.option);
        })
        .catch((error) => {
          console.log(error, 'remoteMethod')
        })
      //                }
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

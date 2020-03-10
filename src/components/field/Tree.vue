<!--
@blues
可能有个bug 就是主键不是Id的时候
-->
<template>
  <span>
    <template v-if="action == 'edit' || action == 'search' ">
      <!--<el-input :value="value" :placeholder="fieldName" v-on="$listeners" />-->
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
      />

      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-tree
        ref="tree"
        :data="tree"
        show-checkbox
        node-key="id"
        :default-checked-keys="selected"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @check-change="change()"
      >
        <span slot-scope="{ node ,data }" class="custom-tree-node">
          <span v-html="html(data,node)" />
        </span>
      </el-tree>

    </template>
    <template v-if="action == 'table'">
      {{ value }}
    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldTree',
  extends: base,
  props: {},
  data() {
    return {
      // searchModel: 'like',
      checkAll: false, // 全选
      filterText: '',
      selected: [],
      tree: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1'
        }]
      }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    value(newValue) {
      // 当他返回的是对象的时候. 处理成数组
      if (typeof newValue[0] === 'object') {
        const tmpValue = []
        this.value.forEach(value => {
          this.value.forEach((v, k) => {
            tmpValue.push(v[this.fieldComponentParam.key])
          })
        })
        this.selected = tmpValue
      }
      if (newValue === '') {
        this.selected = {}
      }
    }
  },

  created: function() {
    this.defaultProps = {
      children: 'children',
      label: this.fieldComponentParam.value
    }
    this.$http.get(this.fieldComponentParam.api).then((res) => {
      this.tree = res.data
    })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data[this.fieldComponentParam.value].indexOf(value) !== -1
    },
    change: function(e) {
      // console.log(e)
      // console.log(this.$refs.tree.getCheckedKeys())
      this.myValue = this.$refs.tree.getCheckedKeys()
      // this.$emit('update', this.$refs.tree.getCheckedKeys())
    },
    html: function(data) {
      return '<b>' + data[this.fieldComponentParam.value] + '</b>'
    },

    //  全选/反选
    handleCheckAllChange() {
      if (this.checkAll) {
        console.log(this.tree)
        this.$refs.tree.setCheckedNodes(this.tree)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    }
  }
}
</script>
<style>
</style>

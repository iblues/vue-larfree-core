<template>
  <span>
    <!--{{value}}-->
    <component
      :is="currentView"
      v-if="currentView"
      :value="value"
      :data="data"
      :field-link="fieldLink"
      :field-option="fieldOption"
      :field-name="fieldName"
      :field-key="fieldKey"
      :field-component-param="fieldComponentParam"
      :action="action"
      v-on="$listeners"
    />
  </span>
</template>
<script>
//    Vue.component('lar-field-select-remote-multi-select', function (resolve) {
//        require(['./Select/RemoteMultiSelect'], resolve)
//    });
//    Vue.component('lar-field-select-remote-select', function (resolve) {
//        require(['./Select/RemoteSelect'], resolve)
//    });
//    Vue.component('lar-field-select-simple-select', function (resolve) {
//        require(['./Select/SimpleSelect'], resolve)
//    });

import RemoteMultiSelect from './Select/RemoteMultiSelect'
import RemoteSelect from './Select/RemoteSelect'
import SimpleSelect from './Select/SimpleSelect'

import base from './base.js'

export default {
  name: 'LarFieldSelect',
  components: { RemoteMultiSelect, RemoteSelect, SimpleSelect },
  extends: base,
  props: {
    fieldLink: {
      type: Object,
      default: function() {
        return {}
      }
    }, // 有可能是空
    fieldMulti: {
      type: Boolean,
      default: false
    }, // 是否多选
    fieldOption: {// 如果不远程连表的话,这个代表备选数据
      type: [Object, Array],
      default: function() {
        return []
      }
    },
  },
  data() {
    return {
      searchModel: '',
      remote: false,
      loading: false,
      multiple: false,
      option: [], // 远程调用存储数据的地方
      currentView: ''
    }
  },
  created() {
    // 根据传入的情况 实例化哪一个

    this.remote = JSON.stringify(this.fieldLink) !== '{}'
    this.multiple = !!this.fieldMulti
    this.myValue = this.value
    if (!this.remote && !this.multiple) {
      this.currentView = 'lar-field-select-simple-select'// 最简单的
    }
    if (this.remote && !this.multiple) {
      this.currentView = 'lar-field-select-remote-select'// 连表单选
    }
    if (this.remote && this.multiple) {
      this.currentView = 'lar-field-select-remote-multi-select'// 连表多选
      this.searchModel = 'link'
    }
  },
  methods: {

  }

}
</script>

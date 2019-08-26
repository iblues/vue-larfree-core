<!--
@blues
<lar-field-input v-model="input" :action="action"></lar-field-input>
-->
<template>
  <div>
    <template v-if="action == 'edit' || action == 'search' ">
      <lar-field-select
        v-model="myValue"
        :action="action"
        :field-link="fieldLink"
        :data="data"
        :field-name="fieldName"
        :field-key="fieldKey"
      />
    </template>
    <template v-if="action == 'table'">
      <span class="user-name" @click="$router.push({path: '/dialog/show/common.user/' + value})">{{ data.user?data.user.name:'' }}</span>
    </template>
  </div>
</template>
<script>
import base from './base.js'

export default {
  extends: base,
  props: {
    fieldLink: {
      default: function() {
        return {}
      }
    }, //
    fieldName: {
      type: String,
      default: ''
    }// 有可能是空
  },

  data() {
    return {
      searchModel: 'equal'
    }
  }
}
</script>
<style scoped>
    .user-name:hover{
        cursor: pointer;
        color: #5FB878 ;
    }
</style>

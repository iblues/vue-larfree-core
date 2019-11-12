<!--
@blues
<lar-field-input v-model="input" :action="action"></lar-field-input>
-->
<template>
  <span>
    <template v-if="action == 'edit' || action == 'search' ">
      <el-input :value="value" :placeholder="fieldName" v-on="$listeners" />
    </template>
    <template v-if="action == 'table'">
      <div style="text-align: center">
        点赞:{{ data['likes_count'] }}  &nbsp;
        评论:{{ data['reviews_count'] }}
      </div>
      <div style="text-align: center">
        分享:{{ data['sharing_count'] }} &nbsp;
        播放:{{ data['playings_count'] }}
      </div>
      <div style="text-align: center;cursor: pointer">
        <el-popover
          placement="top-start"
          title="标题"
          width="200"
          trigger="click"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          @show="show"
        >
          <div v-loading="loading"><img width="160" :src="qr"></div>
          <el-button slot="reference" type="text" style="padding: 5px 10px">扫码预览</el-button>
        </el-popover>

      </div>

    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldTaperecord',
  extends: base,
  props: {},
  data() {
    return {
      loading: false,
      searchModel: 'like',
      qr: null
    }
  },
  methods: {
    show() {
      if (!this.qr) {
        this.loading = true
        this.$http.get('tape/record/' + this.data['id']).then((res) => {
          this.qr = res.data.preview_qr
        }).catch(() => {

        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
<style>
</style>

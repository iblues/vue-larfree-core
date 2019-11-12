<template>
  <span class="lar-field-image">
    <template v-if="action == 'table'">
      <div v-for="(item,key) in show" :key="key">
        <div>附件{{ key+1 }} : <a :href="item.url" target="download">{{ item.key }} 点击下载</a></div>
      </div>
    </template>
    <template v-if="action == 'edit'">
      <div v-for="(item,key) in show" :key="key">
        <div>附件{{ key+1 }} : <a :href="item.url" target="download">{{ item.key }}  {{ item.url }} 点击下载</a></div>
      </div>
      <el-upload
        class="upload-demo"
        :action="host"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :multiple="multiple"
        :on-success="handelSuccess"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传不超过8mg的文件</div>
      </el-upload>
    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldFile',
  extends: base,
  props: {
    fieldMulti: {
      type: [Number, String, Boolean],
      default: false
    }, // 是否多选
    value: {
      type: [String, Array],
      default: ''
    } // 单选应该是字符串,多选是数组
  },
  data() {
    return {
      tmpUrl: {},
      UploadingList: [], // 上传中的
      dialogImageUrl: '',
      dialogVisible: false,
      appendToBody: true,
      index: null,
      host: process.env.VUE_APP_BASE_API + '/upload/files'
    }
  },
  computed: {
    multiple: function() {
      return !!this.fieldMulti
    },
    linkKey: function() {
      return this.fieldKey + '_link'
    },
    show: function() {
      const list = []
      if (this.fieldMulti) {
        this.value.forEach((item, key) => {
          // tmpUrl有就用. 没有就从link找
          if (!this.tmpUrl[item]) {
            this.data[this.linkKey].forEach((url) => {
              // large 只要包含了item的数据 说明是同一个
              if (url.indexOf(item) > -1) {
                list.push({ key: item, url: url })
              }
            })
          } else {
            list.push({ key: item, url: this.tmpUrl[item] })
          }
        })
      } else {
        // 单个的比较简单,  tmp有就用tmp的 么有就找link˚
        if (this.tmpUrl[this.value]) {
          list.push({ key: this.value, url: this.tmpUrl[this.value] })
        } else {
          list.push({ key: this.value, url: this.data[this.linkKey] })
        }
      }
      return list
    }
  },
  methods: {
    validate(file) {
      // 验证
    },
    handlePreview(file) {
      console.log(file)
    },
    handelSuccess(file, fileList) {
      let value = this.value
      if (!value) value = []
      // 写入变量. 方便显示读取
      this.tmpUrl[file.data.name] = file.data.url
      if (file.status) {
        if (this.fieldMulti) {
          value.push(file.data.name)
          this.$emit('input', value)
        } else {
          value = file.data.name
          this.$emit('input', value)
        }
      }
    },
    // err, file, fileList 3个参数
    handleError() {
      this.$message.error('上传错误')
    },
    handleChange(file, fileList) {
      //                this.emit()
    },
    handleRemove(file, key) {
      if (this.fieldMulti) {
        const value = this.value
        value.splice(key, 1)
        this.$emit('input', value)
      } else {
        this.$emit('input', '')
      }
    }
  }
}
</script>
<style scoped>
    .el-upload-list--picture-card .el-upload-list__item {
        margin: 0 8px 0px 0;
    }

    .el-upload__tip {
        line-height: 100%;
    }

    input[type="file"] {
        display: none;
    }

    .el-upload-list__item {
        background-repeat: no-repeat !important;
        background-size: 100% !important;
        background-clip: content-box !important;
        background-position: center !important;
    }

    .el-upload-list--picture-card .el-upload-list__item {
        width: 180px;
        height: 180px;
    }
</style>
<style>
    .lar-field-image .el-upload-dragger {
        width: 180px !important;
    }
</style>

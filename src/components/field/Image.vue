<template>
  <span class="lar-field-image">
    <template v-if="action == 'table' && images" v-viewer>
      <viewer :images="images">
        <el-badge
          :value="images.length"
          :hidden="images.length < 2"
          :max="99"
          class="item"
        >
          <img
            v-for="(src, key) in images"
            v-show="key == 0"
            :key="src"
            style="max-width:50px;max-height:50px"
            :src="src"
          >
        </el-badge>
      </viewer>
    </template>
    <template v-if="action == 'edit'">
      <ul class="el-upload-list el-upload-list--picture-card">
        <li
          v-for="(img, key) in list"
          :key="img"
          :style="{ background: 'url(' + img['url'] + ')' }"
          class="el-upload-list__item"
        >
          <img alt="" class="el-upload-list__item-thumbnail">
          <a class="el-upload-list__item-name">
            <i class="el-icon-document" />
          </a>
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(img)"
            ><i class="el-icon-zoom-in" /></span>
            <span
              class="el-upload-list__item-delete"
              @click="handelRemove(img, key)"
            ><i class="el-icon-delete" /></span>
          </span>
        </li>
      </ul>

      <el-upload
        style="display: inline;"
        class="upload-demo"
        drag
        :show-file-list="show"
        :on-success="handelSuccess"
        :action="host"
        :multiple="multiple"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text" style="line-height: 20px;">
          将图片拖到此处<br>或<em>点击上传</em>
        </div>
      </el-upload>

      <el-dialog
        :append-to-body="appendToBody"
        :visible.sync="dialogVisible"
        top="5vh"
      >
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldImage',
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
      tmpThumb: [],
      UploadingList: [], // 上传中的
      dialogImageUrl: '',
      dialogVisible: false,
      appendToBody: true,
      index: null,
      show: true,
      host: this.$store.state.upload.imageHost
    }
  },
  computed: {
    multiple: function() {
      return !!this.fieldMulti
    },
    list: function() {
      if (!this.value) return []

      const list = []
      if (this.fieldMulti) {
        this.value.forEach((item, key) => {
          var thumb = this.tmpThumb[item]
          if (!thumb) {
            thumb = this.data[this.bigImgKey][key]
          }
          list.push({ name: item, url: thumb })
        })
      } else {
        var thumb = this.tmpThumb[this.value]
        if (!thumb) {
          thumb = this.data[this.bigImgKey]
        }
        list.push({ name: this.value, url: thumb })
      }
      return list
    },
    bigImgKey: function() {
      return this.fieldKey + '_big'
    },
    images: function() {
      if (this.fieldMulti) {
        return this.data[this.bigImgKey] || this.data[this.fieldKey]
      } else {
        return [this.data[this.bigImgKey] || this.data[this.fieldKey]]
      }
    }
  },
  methods: {
    validate(file) {
      // 验证
    },
    handelSuccess(file, fileList) {
      let value = this.value
      if (!value) value = []
      if (file.status) {
        if (this.fieldMulti) {
          this.tmpThumb[file.data.name] = file.data.big_url
          value.push(file.data.name)
          this.$emit('input', value)
        } else {
          this.tmpThumb[file.data.name] = file.data.big_url
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
    // 预览
    handlePictureCardPreview(img) {
      this.dialogImageUrl = img.url
      this.dialogVisible = true
    },
    handelRemove(img, key) {
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

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
        <draggable v-if="fieldMulti" v-model="list" @change="draggableChange">
          <transition-group>
            <li
              v-for="(img, key) in list"
              :key="key"
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
                  @click="handleRemove(img, key)"
                ><i class="el-icon-delete" /></span>
              </span>
            </li>
          </transition-group>
        </draggable>
        <template v-else>
          <li
            v-for="(img, key) in list"
            :key="key"
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
                @click="handleRemove(img, key)"
              ><i class="el-icon-delete" /></span>
            </span>
          </li>
        </template>
      </ul>

      <!--裁剪模式, 不支持多图-->
      <template v-if="fieldComponentParam.type === 'cropper'">
        <span v-if="fieldMulti">多图模式不支持裁剪</span>
        <semple-cropper
                :width="fieldComponentParam.width"
                :height="fieldComponentParam.height"
                :fixed="fieldComponentParam.fixed"
                @success="handelSuccess"
        />
      </template>

      <!--普通模式-->
      <template v-else>
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

      </template>

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
import draggable from 'vuedraggable'
import SempleCropper from './Cropper/SempleCropper'

export default {
  name: 'LarFieldImage',
  components: {
    SempleCropper,
    draggable
  },
  extends: base,
  props: {
    fieldMulti: {
      type: [Number, String, Boolean],
      default: false
    }, // 是否多选
    fieldComponentParam: {
      type: [Object],
      default: function() {
        return {}
      }
    },
    value: {
      type: [String, Array],
      default: ''
    } // 单选应该是字符串,多选是数组
  },
  data() {
    return {
      tmpThumb: [], // 把当前上传的缩略图存在临时变量中.
      UploadingList: [], // 上传中的
      dialogImageUrl: '', // 预览的图片
      dialogVisible: false,
      appendToBody: true,
      index: null,
      show: true,
      list: [], // 显示用的数组
      host: process.env.VUE_APP_BASE_API + '/upload/images'
    }
  },
  computed: {
    multiple: function() {
      return !!this.fieldMulti
    },

    linkKey: function() {
      return this.fieldKey + '_link'
    },
    images: function() {
      if (this.fieldMulti) {
        return this.data[this.linkKey]['large']
      } else {
        return [this.data[this.linkKey]['large']]
      }
    }
  },
  watch: {
    value: function() {
      console.log('变化')
      this.getList()
    }
  },
  methods: {
    draggableChange() {
      const input = []
      this.list.forEach((item, key) => {
        input.push(item.name)
        // large.push(item.url)
      })
      this.$emit('input', input)
    },
    validate(file) {
      // 验证
    },
    /**
     * 返回临时缩略图的列表
     * @returns {Array}
     */
    getList() {
      if (!this.value) return []
      let list = []
      if (this.fieldMulti) {
        // 多个的 得循环查找. 先找tmpThumb有没有
        this.value.forEach((item, key) => {
          let thumb = this.tmpThumb[item]
          if (!thumb) {
            this.data[this.linkKey]['large'].forEach((url) => {
              // large 只要包含了item的数据 说明是同一个
              if (url.indexOf(item) > 0) {
                thumb = url
                return false
              }
            })
          }
          list.push({ name: item, url: thumb })
        })
      } else {
        // 单个的比较简单
        let thumb = this.tmpThumb[this.value]// 临时存储的.
        if (!thumb) {
          thumb = this.data[this.linkKey]['large']
        }
        list = [{ name: this.value, url: thumb }]
      }
      this.list = list
      // return list
    },
    handelSuccess(file, r, fileList) {
      console.log(fileList, 'fileList')
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
    handleRemove(img, key) {
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

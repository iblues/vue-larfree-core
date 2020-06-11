<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <span>
    <template v-if="action == 'table'">
      <span v-html="value" />
    </template>
    <template v-if="action == 'edit'">

      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-radio-group v-model="tab">
            <el-radio-button
              label="pc"
            > PC
            </el-radio-button>
            <el-radio-button
              label="pad"
            >
              平板
            </el-radio-button>
            <el-radio-button
              label="phone"
            >
             手机
            </el-radio-button>
          </el-radio-group>

        </el-col>
        <el-col class="right" style="text-align: right" :span="12">

          <edtior-upload-image @uploaded="imageUpload" />
          <edtior-upload-file @uploaded="imageFile" />

        </el-col>
      </el-row>

      <div :class="tab">
        <div v-if="tab=='pc'">
          <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="pcEditorOption"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          />
        </div>
        <lar-ui-ipad v-if="tab=='pad'">
          <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          />
        </lar-ui-ipad>
        <lar-ui-iphone v-if="tab=='phone'">
          <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          />
        </lar-ui-iphone>
      </div>

    </template>
  </span>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  //        [{'header': 1}, {'header': 2}],               // custom button values
  //        [{'list': 'ordered'}, {'list': 'bullet'}],
  //        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  //        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  //        [{'direction': 'rtl'}],                         // text direction
  //        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults
  //        [{'font': []}],
  [{ 'align': [] }],
  ['link'],
  ['clean']
]

import EdtiorUploadFile from './Editor/UploadFile.vue'
import EdtiorUploadImage from './Editor/UploadImage.vue'
import LarUiIpad from '../ui/Ipad.vue'
import LarUiIphone from '../ui/Iphone.vue'

import base from './base.js'

export default {
  name: 'LarFieldEditor',
  components: {
    quillEditor,
    EdtiorUploadFile,
    EdtiorUploadImage,
    LarUiIpad,
    LarUiIphone
  },
  extends: base,
  data() {
    return {
      theme: '1',
      widthClass: 'pc',
      tab: 'pc',
      content: this.value,
      pcEditorOption: {
        theme: 'snow', // bubble
        modules: {
          toolbar: {
            container: toolbarOptions // 工具栏
          }
        }
        // some quill options
      },
      editorOption: {
        theme: 'bubble', // bubble
        modules: {
          toolbar: {
            container: toolbarOptions // 工具栏
          }
        }
        // some quill options
      }
    }
  },
  watch: {
    content: function(newValue) {
      this.$emit('input', newValue)
    },
    value: function() {
      this.content = this.value
    }
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur(quill) {
      //                console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      //                console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      //                console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      this.content = html
    },
    // 图片上传回调
    imageUpload(res) {
      this.content = this.content + '<img src="' + res.big_url + '"/>'
    },
    imageFile(res) {
      this.content = this.content + `<b><a target="_blank" href='${res.url}' title="${res.fileName}">附件:${res.fileName}</a></b><hr />`
    }

  }
}
</script>
<style>
    .ql-toolbar {
        line-height: 100% !important;
    }

    .ql-editor {
        min-height: 150px !important;
        max-height: 90vh;
    }

    .iphone .ql-editor {
        height: 667px;
    }

    .ipad .ql-editor {
        height: 795px;
    }

</style>
<style scoped>

    /**
     * 你们谁想做宽度切换动画的,自己弄.. 我们没时间
     */
    input[type="file"] {
        display: none;
    }

    .quill-editor {
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        background: #fff;
    }

</style>

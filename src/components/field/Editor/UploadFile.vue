<template>
  <span>
    <el-button type="primary" size="medium" round @click="dialogVisible = true">附件<i
      class="el-icon-upload el-icon--right"
    /></el-button>
    <el-dialog
      style="text-align: left"
      title="上传附件"
      :visible.sync="dialogVisible"
      append-to-body
      width="50%"
    >

      <div style="text-align: center">
        <el-upload
          :before-upload="validate"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-change="handleChange"
          :action="host"
          class="upload-demo"
          drag
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>

    </el-dialog>

  </span>

</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      host: this.$store.state.upload.fileHost
    }
  },
  methods: {
    validate(file) {
      // 验证
    },
    handleSuccess(res, file) {
      if (res.status == 1) {
        res.data.fileName = file.name
        this.$emit('uploaded', res.data)
      } else {
        this.$message.error('上传错误 ' + res.data.msg)
      }
      //                this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleError(err, file, fileList) {
      this.$message.error('上传错误 ' + res.data.msg)
    },
    handleChange() {
    }
  }
}
</script>


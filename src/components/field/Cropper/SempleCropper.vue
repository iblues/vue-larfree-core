<template>
  <div class="footerBtn">
    <el-button @click="dialogVisible=true" icon="el-icon-upload">上传图片</el-button>

    <!-- 弹出层-裁剪 -->
    <el-dialog
      title="图片裁剪"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :append-to-body="append"
    >
      <span>
        <el-row>
          <input
            id="uploads"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            class="el-button"
            style="margin-bottom:15px"
            @change="uploadImg($event,1)"
          >
        </el-row>
        <el-row>
          <el-col :span="24">
            <!-- 裁剪 -->
            <vueCropper
              ref="cropper"
              v-loading="loading"
              style="width:100%;height:500px"
              original="false"
              :fixed="fixed"
              full="true"
              :img="attach.customaryUrl"
              :auto-crop="options.autoCrop"
              :fixed-box="options.fixedBox"
              :can-move-box="options.canMoveBox"
              :auto-crop-width="width"
              :auto-crop-height="height"
              :center-box="options.centerBox"
              @realTime="realTime"
            />
          </el-col>
          <!--<el-col :span="8">-->
          <!--<h2 align="center">头像预览</h2>-->
          <!--<div class="show-preview">-->
          <!--<div :style="previews.div" class="preview">-->
          <!--<img :src="previews.url" :style="previews.img">-->
          <!--</div>-->
          <!--</div>-->
          <!--</el-col>-->
        </el-row>
        <el-row class="footerBtn" align="center">
          <el-button
            type="primary"
            size="small"
            round=""
            @click="cut('blob')"
          >确认</el-button>
          <el-button type="primary" size="small" round="" @click="handleClose">取消</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
// 数据库里需要存两份图片地址，一张为原图地址，一张为裁剪后的头像地址
export default {
  components: { VueCropper },
  props: {
    width: {
      'type': Number,
      'default': 200
    },
    height: {
      'type': Number,
      'default': 200
    },
    fixed: {
      'type': Boolean,
      'default': true
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      append:true,
      options: {
        autoCrop: true, // 默认生成截图框
        fixedBox: false, // 固定截图框大小
        canMoveBox: true, // 截图框不能拖动
        centerBox: false // 截图框被限制在图片里面
      },
      previews: {}, // 实时预览图数据
      attach: { // 后端附件表
        id: '',
        userId: '',
        customaryUrl: '', // 原图片路径
        laterUrl: '', // 裁剪后图片路径  /static/logo.png
        attachType: 'photo'// 附件类型
      },
      fileName: '', // 本机文件地址
      uploadImgRelaPath: '', // 上传后图片地址,
      host: process.env.VUE_APP_BASE_API + '/upload/images'
    }
  },
  methods: {
    // 控制弹出层关闭
    handleClose() {
      this.dialogVisible = false
    },
    // 实时预览
    realTime(data) {
      this.previews = data
    },
    // 选择本地图片
    uploadImg(e, num) {
      const file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      console.log(e.target.result)
      // fileReader 接口，用于异步读取文件数据
      const reader = new FileReader()
      reader.readAsDataURL(file) // 重要 以dataURL形式读取文件
      reader.onload = e => {
        // data = window.URL.createObjectURL(new Blob([e.target.result])) 转化为blob格式

        const data = e.target.result

        this.attach.customaryUrl = data
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
      }
    },
    // 确认截图,上传
    cut(type) {
      const formData = new FormData()
      this.$refs.cropper.getCropBlob(res => {
        // res是裁剪后图片的bolb对象
        formData.append('file', res, this.userId)

        this.loading = true
        this.$http.post(this.host, formData,
          { contentType: false, processData: false, headers: { 'Content-Type': 'multipart/form-data' }}
        ).then(res => {
          this.$emit('success', res)
          this.loading = false
          this.dialogVisible = false
          console.log(res)
        }).catch(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped>
  /* 弹性布局 水平居中 */
  .show-preview{
    display: flex;
    justify-content: center;
  }

  .preview{
    border-radius: 50%;
    overflow: hidden;
    border:1px solid #cccccc;
    background: #cccccc;
  }
  .footerBtn{
    display: flex;
    /*justify-content: center;*/
    margin-top: 15px;
  }

</style>

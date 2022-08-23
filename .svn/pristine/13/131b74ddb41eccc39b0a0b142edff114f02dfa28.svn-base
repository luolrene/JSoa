<template>
  <div class="operate-container">
    <el-upload class="avatar-uploader" :action="uploadAction" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    datas: Number,
    default: null
  },
  data() {
    return {
      uploadAction:
        process.env.BASE_API + process.env.JS_Server + '/Knowledge/file/upload',
      headers: { token: this.$store.getters.userInfo.token },
      imageUrl: null,
      FileId: ''
    }
  },
  methods: {
    upload(data, that, layerid) {
      this.uploadData.targetId = data
      this.uploadData.type = this.fileType
      if (this.uploadList.length > 0) {
        this.$refs.uploader.submit()
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        that.$layer.close(that.layerid)
        that.$parent.getListData()
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.FileId = Number(res.result.id)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传图片大小不能超过 4MB!')
      }
      return isJPG && isLt4M
    }
  },
  created() { },
  mounted() {
    if (this.datas) {
      this.imageUrl =
        process.env.BASE_API +
        process.env.JS_Server +
        '/Knowledge/file/download?id=' +
        this.datas
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader /deep/ .el-upload {
  border: 2px dotted #8c939d;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

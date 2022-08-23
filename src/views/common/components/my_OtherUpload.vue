<template>
  <div class="operate-container">
    <el-upload class="upload-demo" ref="myExUpload" :action="uploadAction" :headers="headers" :data="uploadData" :file-list="uploadList" :format="format" :accept="accept" :auto-upload="autoUpload" :on-change="checkFile" :before-remove="removeCheck" :on-success="uploadSuccess" :multiple="multiple" drag>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" style="color: red;" class="el-upload__tip">
        <i class="el-icon-warning" style="color:red;margin-right:5px"></i>
        请使用模板文件上传
      </div>
    </el-upload>
    <div style="width: 100%;height: 1px;border-bottom: 1px dashed black;margin-top: 8px;"></div>
    <fileList :fileList="fileList" @delFile="delFile" :delType="delType"></fileList>
  </div>
</template>

<script>
import fileList from '../fileList.vue'
import { getKnowledgeFileDelFile } from '../../../api/file.js'
export default {
  components: {
    fileList
  },
  props: {
    format: {
      type: Array,
      default: function () {
        return ['xlsx', 'xls']
      }
    },
    accept: {
      type: String,
      default: '.xlsx,.xls'
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 20
    },
    fileList: {
      type: Array,
      default: function () {
        return []
      }
    },
    fileType: {
      type: String,
      default: '1'
    },
    delType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      code: null,
      message: '',
      uploadAction:
        process.env.BASE_API + process.env.JS_Server + '/Excel/AssetsDetails/upload',
      uploadData: {},
      headers: { token: this.$store.getters.userInfo.token },
      uploadList: []
    }
  },
  methods: {
    upload(data, that, layerid) {
      this.uploadData.targetId = data
      this.uploadData.type = this.fileType
      if (this.uploadList.length > 0) {
        this.$refs.myExUpload.submit()
      }
    },
    // 上传文件成功的钩子
    uploadSuccess(response, file, fileList) {
      let that = this
      this.message = response.message
      this.code = response.code
      if (this.code === 0) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        that.$layer.close(that.layerid)
        that.$parent.getListData()
      } else {
        this.$message({
          type: 'warning',
          message: this.message
        })
        that.$layer.close(that.layerid)
        that.$parent.getListData()
      }
    },
    // 文件状态改变时
    checkFile(file, fileList) {
      if (this.beforeAvatarUpload(file, fileList)) {
        this.uploadList = fileList
        // return new Promise(resolve => {
        //   this.uploadList.push(file)
        // })
      }
    },
    beforeAvatarUpload(file, fileList) {
      var FileExt = file.name.replace(/.+\./, '')
      // const isLt5M = file.size / 1024 / 1024 <= 5
      if (this.format.indexOf(FileExt.toLowerCase()) === -1) {
        fileList.splice(fileList.indexOf(file), 1)
        this.$message.warning('请上传正确格式的文件！')
        return false
      }
      // if (!isLt5M) {
      //   fileList.splice(fileList.indexOf(file), 1)
      //   this.$message.warning('上传单个文件大小不能超过5MB!')
      //   return false
      // }
      if (this.fileList.length + this.uploadList.length >= this.limit) {
        fileList.splice(fileList.indexOf(file), 1)
        this.$message.warning('上传数量超限!')
        return false
      }
      return true
    },
    // 删除
    removeCheck(id) {
      console.log(id)
    },
    // 删除-已上传文件
    delFile(item) {
      this.$confirm('此操作将删除已提交过的附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          getKnowledgeFileDelFile({ fileId: item.id }).then(res => {
            let obj = this.fileList.findIndex(xdd => xdd.id === item.id)
            console.log(obj)
            this.fileList.splice(obj, 1)
            console.log(this.fileList)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted() { },
  created() { }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <el-scrollbar class="page-component__scroll" :native="false">
    <div v-if="eleList" id="box">
      <el-form :size="eleList.config.size" :label-position="eleList.config.labelPosition" :label-width="eleList.config.labelWidth + 'px'" :disabled='show'>
        <!-- 循环展示拖拽的组件 -->
        <div style="padding:10px;width:500px" v-for="(item, index) in eleList.list" :key="index" class="formitem-style">
          <el-form-item :label="item.name+':'" :required="item.options.required">
            <dialogformitems :eleItem="item" :eleConfig="eleList.config"></dialogformitems>
          </el-form-item>
        </div>
        <div class="upload">
          <myUpload ref='myUpload' :fileList='fileList'></myUpload>
        </div>
      </el-form>
      <div class="operate-button">
        <el-button class="cancel-btn" @click='$layer.close(layerid)'>关闭</el-button>
        <el-button type="primary" @click="onSubmit" :loading="btnLoading" native-type="submit" v-if="!show">保存</el-button>
        <slot name="button"></slot>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import dialogformitems from './newForm/dialogFormItems'
import dialogForm from './newForm/dialogForm'
import { getApplyAdd } from '@/api/work/myApplication.js'
export default {
  components: {
    dialogformitems: dialogformitems,
    dialogForm: dialogForm
  },
  props: {
    params: Object,
    show: Boolean,
    datas: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      fromValiData: {},
      eleList: null,
      formsVal: {}
    }
  },
  methods: {
    // 获取表单里面的数值
    onSubmit() {
      // this.btnLoading = true
      this.getFormVal()
        .then(data => {
          this.jsonmsg = JSON.stringify(data, null, 1)
          this.fromValiData = this.datas
          this.fromValiData.dataBlock = this.jsonmsg
        }).then(() => {
          getApplyAdd(this.fromValiData)
            .then(res => {
              this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
              this.$parent.getListData()
              this.$layer.close(this.layerid)
              this.$share.message()
              this.btnLoading = false
            })
            .catch(err => {
              this.$message.error(err.message)
              this.loading = false
            })
        })
    },
    // 获取到页面数据
    // setFormVal(data) {
    //   this.eleList = data
    // },
    // 表单验证方法
    valueCheck() {
      const promises = []
      for (const key of this.eleList.list) {
        if (key.options.required) {
          if (key.options.defaultValue instanceof Array) {
            if (key.options.defaultValue.length === 0) {
              if (key.options.requiredMsg) {
                promises.push(Promise.reject(key.options.requiredMsg))
              } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                promises.push(Promise.reject(key.name + '必填'))
              }
            }
          } else {
            if (!key.options.defaultValue) {
              if (key.options.requiredMsg) {
                promises.push(Promise.reject(key.options.requiredMsg))
              } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                promises.push(Promise.reject(`${key.name}必填`))
              }
            }
          }
        } else {
          promises.push(Promise.resolve())
        }
      }
      return promises
    },
    getFormVal() {
      return new Promise((resolve, reject) => {
        Promise.all(this.valueCheck())
          .then(res => {
            // 读取数据前先清空表单数据
            this.formsVal = {}
            // 循环读取表单数据
            for (const key of this.eleList.list) {
              Object.assign(this.formsVal, {
                [key.model]: key.options.defaultValue
              })
            }
            resolve(this.formsVal)
          })
          .catch(err => {
            this.$message.error(err)
          })
      })
    }
  },
  created() {
    if (this.params.dataBlock) {
      this.eleList = JSON.parse(this.params.dataBlock)
    }
  }
}
</script>

<style scoped>
#box /deep/ .el-form-item--small.el-form-item {
  margin-bottom: 0;
}
#box /deep/ .el-form-item {
  margin-bottom: 0;
}
.upload {
  margin-left: 100px;
}
</style>

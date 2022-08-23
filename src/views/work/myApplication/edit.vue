<template>
  <div class="operate-container">
    <fromItem ref="refsV" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label="申请类型:">
        <el-cascader ref="myCascader" v-model="processId" :options="processData" @change="changeProcess" style="width:100%"></el-cascader>
      </el-form-item>
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import edit from '../../integrated/customForm/edit.vue'
import dimissionEdit from './custom/dimission_edit.vue' // 离职申请
import officialEdit from './custom/official_edit.vue' // 转正申请
import borrowMoeny from '../../finance/borrowMoeny/edit.vue' // 借款申请
import { getApplyAdd } from '@/api/work/myApplication.js'
import { getCustomerFormGetDataByProcessId } from '@/api/integrated/form.js'
import { getOaProcessGetChildrenTwo } from '@/api/integrated/flow.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      handleData: function (data) {
        let newData = data.map(item => {
          let option = {
            value: item.id,
            label: item.name
          }
          if (item.children && item.children !== []) {
            option.children = this.handleData(item.children)
          }
          return option
        })
        return newData
      },
      fromItemList: [],
      processData: [],
      fileList: [],
      btnLoading: false,
      processId: '',
      processName: '',
      typeName: '',
      fromValiData: {
        userName: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupId: this.$store.getters.userInfo.groupId
      },
      rules: {
        processId: [
          { required: true, message: '请选择申请类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getApplyAdd(this.fromValiData)
        .then(res => {
          this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    getType() {
      getOaProcessGetChildrenTwo({ processType: '1' }).then(res => {
        let datas = this.handleData(res.result)
        this.processData = datas
      })
    },
    changeProcess(item) {
      this.$nextTick(() => {
        let casename = this.$refs['myCascader'].presentText.split(
          this.$refs['myCascader'].separator
        )
        this.typeName = casename[1]
        this.fromValiData.processName = casename[1]
      })

      // 获取选中的id
      this.fromValiData.processId = item[item.length - 1]
      // 获取选中的第一级名字，后面的后端返
      let newv = this.processData.filter(xdd => {
        return item[0] === xdd.value
      })
      // 查询是否有自定义表单
      this.fromValiData.processName = newv[0].name
      let obj = {}
      obj.id = this.fromValiData.processId
      getCustomerFormGetDataByProcessId(obj)
        .then(res => {
          // 有自定表单
          if (res.result != null) {
            this.fileListData = res.result
            this.fromValiData.codeBlock = JSON.stringify(this.fileListData)
          } else {
            this.fromValiData.codeBlock = null
          }
        })
        .then(() => {
          // 弹出定制表单
          if (this.fromValiData.codeBlock) {
            this.$layer.iframe({
              content: {
                content: edit, // 传递的组件对象
                parent: this, // 当前的vue对象
                data: {
                  params: this.fileListData
                } // props
              },
              area: this.$layer_Size.Normal,
              title: '填写表单',
              maxmin: true,
              shadeClose: false
            })
          } else if (this.typeName === '离职申请') {
            this.$layer.iframe({
              content: {
                content: dimissionEdit, // 传递的组件对象
                parent: this, // 当前的vue对象
                data: {} // props
              },
              area: this.$layer_Size.Normal,
              title: '离职申请',
              maxmin: true,
              shadeClose: false
            })
          } else if (this.typeName === '转正申请') {
            this.$layer.iframe({
              content: {
                content: officialEdit, // 传递的组件对象
                parent: this, // 当前的vue对象
                data: {} // props
              },
              area: this.$layer_Size.Normal,
              title: '离职申请',
              maxmin: true,
              shadeClose: false
            })
          } else if (this.typeName === '借款申请') {
            this.$layer.iframe({
              content: {
                content: borrowMoeny, // 传递的组件对象
                parent: this, // 当前的vue对象
                data: {} // props
              },
              area: this.$layer_Size.Normal,
              title: '借款申请',
              maxmin: true,
              shadeClose: false
            })
          }
        })
    },
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
                promises.push(Promise.reject(`${key.name}必填`))
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
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {
    this.getType()
  }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div class='operate-container'>
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :labelWidth="130" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { getCustomerFormAdd } from '@/api/integrated/form.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        formName: [
          { required: true, message: '请填写表单名字', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '表单名字',
          prop: 'formName',
          value: '',
          type: 'input',
          isRqd: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getCustomerFormAdd(this.fromValiData)
        .then(res => {
          this.$parent.dialogVisible = false
          this.$parent.$parent.getListData()
          this.$parent.clearWidetConfit()
          this.$parent.$layer.close()
          this.$layer.close(this.layerid)
          this.$share.message()
          this.btnLoading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {},
  created() {
    this.fromValiData.dataBlock = JSON.stringify(this.params)
  }
}
</script>

<style>
</style>

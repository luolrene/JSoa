<template>
    <div class="operate-container">
        <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="90">
        </fromItem>
    </div>
</template>

<script>
import { getTaskDelay } from '@/api/public/task.js'
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
        reasonForDelay: [
          { required: true, message: '请填写延期原因', trigger: 'blur' }
        ],
        extensionTime: [
          { required: true, message: '请选择延期时间', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '延期原因',
          prop: 'reasonForDelay',
          value: '',
          type: 'textarea',
          isRqd: true
        },
        {
          label: '延期时间',
          prop: 'extensionTime',
          value: '',
          type: 'date',
          isRqd: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getTaskDelay(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {
    this.fromValiData = this.params
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>

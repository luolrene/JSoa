<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="60">
    </fromItem>
  </div>
</template>

<script>
import { getTaskCommentAdd } from '@/api/public/task.js'

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
        content: [{ required: true, message: '请填写备注', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '备注',
          prop: 'content',
          value: '',
          type: 'textarea',
          isRqd: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getTaskCommentAdd(this.fromValiData)
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
    if (this.params.grade === 1) {
      this.fromValiData.fatherId = this.params.id
    } else {
      this.fromValiData.fatherId = this.params.fatherId
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>

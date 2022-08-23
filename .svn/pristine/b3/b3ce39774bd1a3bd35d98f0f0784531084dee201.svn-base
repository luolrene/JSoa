<template>
    <div class="operate-container">
        <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="100">
        </fromItem>
    </div>
</template>

<script>
import { getFinanceLoanDelayApply } from '@/api/finance/borrow.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      fromValiData: {},
      rules: {
        writeOffRemarks: [
          { required: true, message: '请填写未冲账原因', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '延期原因',
          prop: 'writeOffRemarks',
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
      getFinanceLoanDelayApply(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>

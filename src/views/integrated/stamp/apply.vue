<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
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
        // name: [{ required: true, message: '请填写行业名称', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '申请部门',
          prop: 'group',
          value: '',
          type: 'select'
        },
        {
          label: '申请人',
          prop: 'name',
          value: '',
          type: 'select',
          data: []
        },
        {
          label: '联系电话',
          prop: 'phone',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '负责人',
          prop: 'principal',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '用印时间',
          prop: 'exp',
          value: '',
          type: 'date',
          isRqd: false
        },
        {
          label: '预计归还时间',
          prop: 'exp',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '用印事由',
          prop: 'exp',
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
      // getKnowledgePointsAdd(this.fromValiData).then(res => {
      //   this.$layer.close(this.layerid)
      //   this.$parent.getListData()
      //   this.$share.message()
      //   this.btnLoading = false
      // })
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

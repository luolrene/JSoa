<template>
  <div class='operate-container'>
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :labelWidth="60" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { getMemoAdd } from '@/api/home/home.js'
export default {
  props: {
    data: null,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        memoTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        memoContent: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '时间', prop: 'memoTime', value: '', type: 'date', isRqd: true },
        { label: '内容', prop: 'memoContent', value: '', type: 'textarea', isRqd: true }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getMemoAdd(this.fromValiData).then(res => {
        this.$share.message('添加成功', 'success')
        this.$parent.getListData()

        this.$layer.close(this.layerid)
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted() { },
  created() { }
}
</script>

<style>
</style>

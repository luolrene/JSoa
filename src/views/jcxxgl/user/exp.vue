<template>
  <div class='operate-container'>
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :labelWidth="50" :btnLoading="btnLoading">
    </fromItem>
  </div>
</template>

<script>
import { getUserAddOrModify } from '../../../api/jcxxgl/user.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      fromItemList: [
        {
          label: '备注',
          prop: 'remark',
          value: '',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      // this.fromValiData.nativePlace = String(this.fromValiData.nativePlace)
      // this.fromValiData.registeredResidence = String(
      //   this.fromValiData.registeredResidence
      // )
      // this.fromValiData.administrativeRank = String(
      //   this.fromValiData.administrativeRank
      // )
      // this.fromValiData.groupId =String (this.fromValiData.groupId)
      // this.fromValiData.onTheJobStatus=String(this.fromValiData.onTheJobStatus)
      getUserAddOrModify(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
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

<style>
</style>

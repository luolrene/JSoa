<!-- 盘点 -->
<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { getAssetsInventoryAdd } from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        assetsName: ''
      },
      rules: {},
      fromItemList: [
        {
          label: '资产名字',
          prop: 'assetsName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '资产类型',
          prop: 'assetsType',
          value: '',
          type: 'select',
          data: [{ name: '固定资产', id: '1' }, { name: '易耗物品', id: '2' }],
          disabled: true
        },
        {
          label: '操作结果',
          prop: 'operationResult',
          value: '',
          type: 'textarea',
          data: []
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getAssetsInventoryAdd(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      })
    }
  },
  mounted() {
    if (this.params.assetsIds) {
      this.fromValiData = this.params
    } else {
      this.fromValiData.assetsName = this.params.name
      this.fromValiData.assetsId = this.params.id
      this.fromValiData.assetsType = this.params.assetsType
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>

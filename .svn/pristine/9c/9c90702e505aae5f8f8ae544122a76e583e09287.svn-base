<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { getOaProcessGetChildrenSuper } from '@/api/integrated/flow.js'
import { getAssetsApplySetUp } from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      // 转换对象中的键名
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
      // 删除空的children
      handelOption(options) {
        options.forEach(item => {
          if (item.children.length === 0) {
            delete item.children
          } else {
            this.handelOption(item.children)
          }
        })
      },
      btnLoading: false,
      fromValiData: {},
      rules: {
        telephone: [
          { required: true, message: '请填写联系电话', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '流程名称',
          prop: 'dicType',
          value: '',
          type: 'cascader_radio',
          isRqd: true,
          data: []
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      this.fromValiData.dicType = this.fromValiData.dicType[this.fromValiData.dicType.length - 1]
      getAssetsApplySetUp(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      })
    },
    getOaData() {
      getOaProcessGetChildrenSuper({}).then(res => {
        this.processData = res.result
        let datas = this.handleData(this.processData)
        this.handelOption(datas)
        this.fromItemList.forEach(item => {
          if (item.prop === 'dicType') {
            item.data = datas
          }
        })
      })
    }
  },
  mounted() {
    this.getOaData()
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber, NumberIndex } from '@/utils/public.js'
import {
  getAssetsSupplierQueryPageData,
  getAssetsConsumableAdd,
  getAssetsConsumableModify,
  getAssetsTypeGetChildren
} from '@/api/integrated/fixedAssets.js'
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
            id: item.id,
            name: item.name
          }
          if (item.children && item.children !== []) {
            option.children = this.handleData(item.children)
          }
          return option
        })
        return newData
      },
      handelOption(options) {
        options.forEach(item => {
          if (item.children.length === 0) {
            delete item.children
          } else {
            this.handelOption(item.children)
          }
        })
      },
      typeData: [],
      btnLoading: false,
      fromValiData: {
        typeId: ''
      },
      rules: {
        name: [{ required: true, message: '请填写资产名称', trigger: 'blur' }],
        typeId: [{ required: true, message: '请选择资产类别', trigger: 'blur' }],
        warehousingTime: [{ required: true, message: '请选择购入时间', trigger: 'blur' }],
        amountOfMoney: [{ required: true, message: '请填写金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        quantity: [{ required: true, message: '请填写数量', trigger: 'blur' }, { validator: NumberIndex, trigger: 'change' }]
      },
      fromItemList: [
        {
          label: '物品名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '资产类别',
          prop: 'typeId',
          value: '',
          type: 'cascader',
          data: [],
          isRqd: true
        },
        {
          label: '供应商',
          prop: 'supplierId',
          value: '',
          type: 'select',
          data: []
        },
        {
          label: '购入日期',
          prop: 'warehousingTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '物品金额',
          prop: 'amountOfMoney',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '数量',
          prop: 'quantity',
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
      this.fromValiData.typeIdAll = this.fromValiData.typeId.toString()
      let typeId = this.fromValiData.typeId
      if (typeId.length > 1) {
        this.fromValiData.typeId = typeId[typeId.length - 1]
      } else {
        this.fromValiData.typeId = typeId[0]
      }
      if (this.params) {
        getAssetsConsumableModify(this.fromValiData)
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
      } else {
        getAssetsConsumableAdd(this.fromValiData)
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
    getTypeData() {
      getAssetsTypeGetChildren({}).then(res => {
        this.typeData = res.result
        let datas = this.handleData(this.typeData)
        this.handelOption(datas)
        this.fromItemList.forEach(item => {
          if (item.prop === 'typeId') {
            item.data = datas
          }
        })
      })
    },
    getSupplierData() {
      let obj = {}
      obj.pageSize = 999
      obj.pageNow = 1
      getAssetsSupplierQueryPageData(obj).then(res => {
        this.fromItemList.forEach(item => {
          if (item.prop === 'supplierId') {
            item.data = res.result.pageList
          }
        })
      })
    }
  },
  mounted() {
    this.getTypeData()
    this.getSupplierData()
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.typeId = this.params.typeIdAll.split(',').map(Number)
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>

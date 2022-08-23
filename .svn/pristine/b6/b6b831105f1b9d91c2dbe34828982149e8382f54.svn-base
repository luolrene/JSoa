<template>
  <div class="operate-container">
    <fromItem :obj="this" ref="myFromItem" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import person from './input_person.vue'
import { getDictionariesGetById, getDictionariesUpdateType } from '@/api/finance/borrow.js'
export default {
  inject: ['reload'],
  props: {
    id: Number,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      userData: [],
      fromValiData: {
        dicType: '',
        dicCode: ''
      },
      rules: {
        dicType: [{ required: true, message: '请选择操作人员', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '操作用户', prop: 'dicType', value: '', type: 'inputChoice', click: 'getUserData', isRqd: true },
        { label: '备注', prop: 'dicName', value: '', type: 'textarea' }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getDictionariesUpdateType(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.reload()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    },
    // 设置
    getUserData() {
      this.$layer.iframe({
        content: {
          content: person, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            type: 'principal',
            userData: this.userData
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择操作用户',
        maxmin: true,
        shadeClose: false
      })
    },
    getListData() {
      getDictionariesGetById({ id: this.id }).then(res => {
        this.fromValiData = res.result
        if (this.fromValiData.dicType) {
          let dicCode = this.fromValiData.dicCode.split(',')
          let dicType = this.fromValiData.dicType.split(',')
          let data = dicCode.map((item, index) => {
            return {
              id: item,
              name: dicType[index]
            }
          })
          this.userData = data
          this.$parent.userDatas = data
        }
      })
    }
  },
  mounted() {
    this.fromValiData.id = this.id
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>

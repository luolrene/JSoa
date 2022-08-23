<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {
  getPositionRankAdd,
  getPositionRankModify,
  getDictionariesGetByCode
} from '../../../api/jcxxgl/rank.js'
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
        name: [{ required: true, message: '请填写职务名称', trigger: 'blur' }],
        groupName: [
          { required: true, message: '请选择部门名称', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '职级类型',
          prop: 'positionType',
          value: '',
          type: 'select',
          isRqd: true,
          data: []
        },
        {
          label: '职级名称',
          prop: 'positionName',
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
      if (this.params) {
        this.btnLoading = true
        getPositionRankModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        this.btnLoading = true
        getPositionRankAdd(this.fromValiData)
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
    getByCode() {
      getDictionariesGetByCode({ dicCode: 'ZJLX' }).then(res => {
        let byCode = res.result.map(item => {
          return {
            id: item.dicName,
            name: item.dicName
          }
        })
        this.fromItemList.forEach(item => {
          if (item.prop === 'positionType') {
            item.data = byCode
          }
        })
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
    this.getByCode()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>

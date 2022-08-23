<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber, NumberIndex1 } from '@/utils/public.js'
import {
  getReimbursementTravelAdd,
  getReimbursementTravelModify
} from '@/api/finance/expense.js'
export default {
  props: {
    params: Object,
    dataList: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        accountType: '1',
        travelOilCost: 0,
        travelRoadToll: 0,
        travelParkingRate: 0,
        travelShortDistance: 0,
        travelHotelDays: 0,
        travelHotelMoney: 0,
        travelItemOfExpenditure: 0,
        travelMeals: 0
      },
      bankCode: [],
      rules: {
        travelStartTime: [{ required: true, message: '请选择出差开始时间', trigger: 'blur' }],
        travelEndTime: [{ required: true, message: '请选择出差结束时间', trigger: 'blur' }],
        travelPlace: [{ required: true, message: '请填写出发地点', trigger: 'blur' }],
        travelDestination: [{ required: true, message: '请填写目的地', trigger: 'blur' }],
        travelOilCost: [{ required: true, message: '请填写油费', trigger: 'blur' }, { validator: TwoNumber, trigger: 'blur' }],
        travelRoadToll: [{ required: true, message: '请填写过路费', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        travelParkingRate: [{ required: true, message: '请填写停车费', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        travelShortDistance: [{ required: true, message: '请填写短途交通费', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        travelHotelDays: [{ required: true, message: '请填写住宿天数', trigger: 'blur' }, { validator: NumberIndex1, trigger: 'change' }],
        travelHotelMoney: [{ required: true, message: '请填写住宿金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        travelItemOfExpenditure: [{ required: true, message: '请填写其他支出', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        travelMeals: [{ required: true, message: '请填写餐费', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }]
      },
      fromItemList: [
        { label: '出差开始时间', prop: 'travelStartTime', value: '', type: 'date', isRqd: true },
        { label: '出差结束时间', prop: 'travelEndTime', value: '', type: 'date', isRqd: true },
        { label: '出发地点', prop: 'travelPlace', value: '', type: 'input', isRqd: true },
        { label: '目的地', prop: 'travelDestination', value: '', type: 'input', isRqd: true },
        { label: '油费', prop: 'travelOilCost', value: '', type: 'input', isRqd: true },
        { label: '过路费', prop: 'travelRoadToll', value: '', type: 'input', isRqd: true },
        { label: '停车费', prop: 'travelParkingRate', value: '', type: 'input', isRqd: true },
        { label: '交通费', prop: 'travelShortDistance', value: '', type: 'input', isRqd: true },
        { label: '住宿天数', prop: 'travelHotelDays', value: '', type: 'input', isRqd: true },
        { label: '住宿金额', prop: 'travelHotelMoney', value: '', type: 'input', isRqd: true },
        { label: '其他支出', prop: 'travelItemOfExpenditure', value: '', type: 'input', isRqd: true },
        { label: '餐费', prop: 'travelMeals', value: '', type: 'input', isRqd: true }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.params) {
        getReimbursementTravelModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$parent.$parent.$parent.$parent.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        getReimbursementTravelAdd(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$parent.$parent.$parent.$parent.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      }
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    } else if (this.dataList) {
      this.fromValiData.fatherId = this.dataList.id
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>

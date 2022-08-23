<template>
  <div class="operate-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="title">报销详情</div>
        <div style="height:540px;">
          <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :disabled="true" :type="'1'" submitName='确定' :labelWidth="110">
          </fromItem>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="title">报销明细</div>
        <tableItem :obj="this" v-if="type==='2'" :tableData="tableData" :tableHeader="tableHeader" :isSelection="false" :isPage="false" style='margin-top:15px;'>
        </tableItem>
        <tableItem :obj="this" v-if="type==='1'" :tableData="tableData1" :tableHeader="tableHeader1" :isSelection="false" :isPage="false" style='margin-top:15px;'>
        </tableItem>
        <div v-if="fromValiData.reverseEntry===1">
          <div class="title">未核销借款明细</div>
          <tableItem :obj="this" :tableData="tableData2" :tableHeader="tableHeader2" :isSelection="false" :isPage="false" style='margin-top:15px;'>
          </tableItem>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import detail from '../../../finance/borrowMoeny/detail.vue'
import { getFinanceLoanQueryPageData } from '@/api/finance/borrow.js'
import { getReimbursementGetDataById, getReimbursementCostGetDataByFatherId, getReimbursementTravelGetDataByFatherId } from '@/api/finance/expense.js'

export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      fileList: [],
      type: null,
      btnLoading: false,
      fromValiData: {
        pageSize: 99,
        pageNow: 1
      },
      rules: {
        accountType: [{ required: true, message: '请选择报销类型', trigger: 'blur' }],
        accountMoney: [{ required: true, message: '请填写报销金额', trigger: 'blur' }],
        accountExplain: [{ required: true, message: '请填写报销说明', trigger: 'blur' }],
        expenseNeedTime: [{ required: true, message: '请选择报销需求时间', trigger: 'blur' }],
        detailedSumMoney: [{ required: true, message: '请选择报销金额', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '借款人', prop: 'userName', value: '', type: 'input' },
        { label: '部门', prop: 'groupName', value: '', type: 'input' },
        { label: '报销类型', prop: 'accountType', value: '', type: 'select', data: [{ name: '费用报销', id: '1' }, { name: '出差报销', id: '2' }], isRqd: true },
        { label: '同行人', prop: 'counterpartsUser', value: '', type: 'inputChoice', click: 'getUserDatas', isShow: true },
        { label: '出差事由', prop: 'travelReason', value: '', type: 'textarea', isRqd: true, isShow: true },
        { label: '报销需求时间', prop: 'accountTime', value: '', type: 'datetimes', disabledDate: true },
        { label: '关联客户', prop: 'customerName', value: '', type: 'select', filterable: true, click: 'getCustData', data: [] },
        { label: '关联项目', prop: 'contractName', value: '', type: 'select', filterable: true, click: 'getContData', data: [] },
        { label: '关联采购', prop: 'purchaseNumber', value: '', type: 'select', data: [], isRqd: false, isShow: true },
        {
          label: '是否冲账',
          prop: 'reverseEntry',
          value: '',
          type: 'select',
          data: [
            { name: '是', id: 1 },
            { name: '否', id: 2 }
          ],
          isRqd: true
        },
        { label: '关联借款', prop: 'loanName', value: '', type: 'input', isRqd: true, isShow: true },
        { label: '关联付款', prop: 'paymentName', value: '', type: 'input', isShow: true },
        {
          label: '报销方式',
          prop: 'accountMode',
          value: '',
          type: 'select',
          data: [
            { name: '挂账', id: '1' },
            { name: '现金支付', id: '3' },
            { name: '银行支付', id: '4' }
          ],
          isRqd: true
        },
        { label: '开户人', prop: 'bankUser', value: '', type: 'select', filterable: true, create: true, click: 'getUserData', data: [], isShow: true, isRqd: true },
        { label: '开户银行', prop: 'bank', value: '', type: 'input', isShow: true, isRqd: true },
        { label: '开户支行', prop: 'bankSubBranch', value: '', type: 'input', isShow: true, isRqd: true },
        { label: '银行账号', prop: 'bankAccount', value: '', type: 'input', isShow: true, isRqd: true },
        { label: '备注', prop: 'exp', value: '', type: 'textarea' }
      ],
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableHeader: [
        { prop: 'travelStartTime', label: '出差开始时间', width: 120 },
        { prop: 'travelEndTime', label: '出差结束时间', width: 120 },
        { prop: 'travelPlace', label: '出发地点', width: 120 },
        { prop: 'travelDestination', label: '目的地', width: 120 },
        { label: '油费', prop: 'travelOilCost', width: 120 },
        { label: '过路费', prop: 'travelRoadToll', width: 120 },
        { label: '停车费', prop: 'travelParkingRate', width: 120 },
        { label: '长途交通费', prop: 'travelLongDistance', width: 120 },
        { label: '短途交通费', prop: 'travelShortDistance', width: 120 },
        { label: '住宿天数', prop: 'travelHotelDays', width: 120 },
        { label: '住宿金额', prop: 'travelHotelMoney', width: 120 },
        { label: '项目支出', prop: 'travelItemOfExpenditure', width: 120 },
        { label: '餐费', prop: 'travelMeals', width: 120 },
        { label: '合计', prop: 'travelSum', width: 120 }
      ],
      tableHeader1: [
        { label: '费用类型', prop: 'costTypeName', width: 100 },
        { label: '报销金额', prop: 'costMoney', width: 100 },
        { label: '报销原因', prop: 'costReason', width: 100 },
        { label: '关联招待', prop: 'receptionNumber', width: 100 },
        { label: '关联采购', prop: 'purchaseNumber', width: 100 },
        { label: '备注', prop: 'remarks', width: 160 }
      ],
      tableHeader2: [
        { prop: 'typeName', label: '借款类型', width: 100, type: 'view' },
        { prop: 'loanNumber', label: '借款编号', width: 100 },
        { prop: 'borrowingBalance', label: '借款金额', width: 100 },
        { prop: 'notCancelMoney', label: '未核销金额', width: 80 },
        { prop: 'delayStateName', label: '是否延期', width: 80 },
        { prop: 'createTime', label: '借款申请时间', width: 100 }
      ]
    }
  },
  methods: {
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
    },
    getFormData() {
      this.fromValiData.id = this.params.applyId
      getReimbursementGetDataById(this.fromValiData).then(res => {
        this.fromValiData = res.result
        if (res.result.loanName) {
          res.result.loanName = res.result.loanName.split(',')
        }
        if (res.result.paymentName) {
          res.result.paymentName = res.result.paymentName.split(',')
        }
        if (this.fromValiData.accountMode === '4') {
          this.fromItemList.forEach(xdd => {
            if (['bankUser', 'bank', 'bankAccount'].includes(xdd.prop)) {
              xdd.isShow = false
            }
          })
        }
        if (this.fromValiData.reverseEntry === 1) {
          this.fromItemList.forEach(xdd => {
            if (['loanName', 'paymentName'].includes(xdd.prop)) {
              xdd.isShow = false
            }
          })
        }
        this.type = res.result.accountType
        if (this.type === '2') {
          getReimbursementTravelGetDataByFatherId({
            fatherId: res.result.id
          }).then(res => {
            this.tableData = res.result
          })
        } else {
          getReimbursementCostGetDataByFatherId({ fatherId: res.result.id }).then(
            res => {
              res.result.forEach(xdd => {
                switch (xdd.costType) {
                  case 1:
                    xdd.costTypeName = '日常报销'
                    break
                  case 2:
                    xdd.costTypeName = '差旅报销'
                    break
                  case 3:
                    xdd.costTypeName = '招待报销'
                    break
                  case 4:
                    xdd.costTypeName = '采购报销'
                }
              })
              this.tableData1 = res.result
            }
          )
        }
      })
    },
    getListData() {
      this.fromValiData.userId = this.$store.getters.userInfo.id
      this.fromValiData.state = 4
      getFinanceLoanQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.delayState) {
            case 1:
              xdd.delayStateName = '未延期'
              break
            case 2:
              xdd.delayStateName = '已延期'
              break
            case 3:
              xdd.delayStateName = '延期审核中'
          }
          switch (xdd.type) {
            case '1':
              xdd.typeName = '日常费用'
              break
            case '2':
              xdd.typeName = '保证金'
              break
            case '3':
              xdd.typeName = '专家费'
              break
            case '4':
              xdd.typeName = '总经办'
              break
            case '5':
              xdd.typeName = '差旅费'
              break
            case '6':
              xdd.typeName = '备用金'
              break
            case '7':
              xdd.typeName = '采购'
              break
            case '8':
              xdd.typeName = '招投标'
              break
            case '9':
              xdd.typeName = '其他'
          }
        })
        this.tableData2 = res.result.pageList
      })
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '借款详情',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.getListData()
    this.getFormData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.title {
  margin: 10px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
</style>

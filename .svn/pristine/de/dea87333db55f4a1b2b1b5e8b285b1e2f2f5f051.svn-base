<template>
  <div style="width:calc(100% - 40px);height:100%;position: relative;" class="first">
    <i class="el-icon-view icon" @click="handelInfo" v-if="!assetList && params.customFormType===2 &&fileList.length === 0 ||eleList "></i>
    <i class="el-icon-view icon1" @click="handelInfo1" v-else-if="assetList && params.customFormType===1&&fileList.length === 0 "></i>
    <i class="el-icon-view icon" @click="handelInfo2" v-else></i>
    <i class="el-icon-document down" @click="handelDown" v-if="['付款申请','采购申请','报销申请','借款申请','招待申请'].includes(params.processName)||params.codeBlock||[3, 4, 16, 17, 18].includes(this.params.customFormType)"><span style="font-size:12px;">导出表格</span></i>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="title">申请详细</div>
        <div style="height:208px">
          <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" type="preview">
          </fromItem>
        </div>
        <!-- 固资申请 -->
        <div style="height:200px" v-if="assetList">
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 100%;">
            <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList1" :fromValiData="fromValiData1" type="preview">
            </fromItem>
          </el-scrollbar>
        </div>
        <div class="title">申请附件：</div>
        <div class="modular">
          <div class="content">
            <div style="text-align: center;" v-if="fileList.length === 0">无</div>
            <fileList :fileList="fileList" style="padding:0;" v-else></fileList>
          </div>
        </div>
        <div class="title" v-if="params.customFormType===10">采购附件：</div>
        <div class="modular" v-if="params.customFormType===10">
          <div class="content">
            <div style="text-align: center;" v-if="fileList1.length === 0">无</div>
            <fileList :fileList="fileList1" style="padding:0;" v-else></fileList>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="box">
          <div class="title">审核流程</div>
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 300px;">
            <div class="block" style="padding-right: 40px;margin:20px 0 0 130px;">
              <el-steps direction="vertical" :active="this.params.fatherCurrentStep" space='50px'>
                <el-step v-for="(item, id) in flowData" :key="id" :title="item.currentUserName"></el-step>
              </el-steps>
            </div>
          </el-scrollbar>
        </div>
        <div class="box">
          <div class="title">审核意见</div>
          <div class="info">
            <el-scrollbar class="page-component__scroll" :native="false" style="height: 140px;">
              <div v-for="(item,index) in logList" :key="index" class="border" :color="item.optinColor">
                <div v-if="item.state==='1'"></div>
                <div v-else>
                  <span>{{item.currentUserName}}</span>
                  <span style="margin-left:20px">{{item.currentUserTime}}</span>
                  <span id='text' :style="{color:item.color}">{{item.stateName}}</span>
                  <div style="white-space:normal">意见：{{item.currentOpinion}}</div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import info from '../myApprove/info.vue'
import service from '../myApprove/service.vue'
import fileList from '../../common/fileList.vue'
import dialogformitems from '../../integrated/customForm/newForm/dialogFormItems'
import dimissionEdit from './custom/dimission_edit.vue' // 离职申请
import officialEdit from './custom/official_edit.vue' // 转正申请
import transferEdit from './custom/transfer_edit1.vue' // 调岗申请
import taskDetails from './custom/task_details.vue' // 任务申请
import borrowMoeny from './custom/borrow_moeny.vue' // 借款申请
import purchaseEdit from './custom/purchase_edit.vue' // 采购申请
import expenseEdit from './custom/expense_edit.vue' // 报销申请
import causeEdit from './custom/cause_edit.vue' // 借款延期审核
import paymentEdit from './custom/payment_edit.vue' // 付款审核
import refundEdit from './custom/refund_edit.vue' // 借款付款申请
import businessEdit from './custom/business_edit.vue' // 招待申请
import leaveEdit from '../myApplication/custom/leave_edit.vue' // 请假申请
import reissueEdit from '../myApplication/custom/reissue_edit.vue' // 补卡申请
import customForm from './custom/custom_form.vue' // 自定义表单
import { getKnowledgePointsGetFile } from '@/api/file.js'
import { getAssetsDetailsGetDataByApplyId } from '@/api/work/myApprove.js'
import { getToExamineStructure } from '@/api/work/myApplication.js'
import { getFinanceLoanGetDataById } from '@/api/finance/borrow.js'
import { getEntertainGetDataByApplyId } from '@/api/finance/business.js'
import { getPurchaseGetDataById } from '@/api/finance/purchase.js'
import { getReimbursementGetDataById } from '@/api/finance/expense.js'
import { getPaymentFinanceGetDataById } from '@/api/finance/payment.js'
export default {
  components: {
    fileList,
    dialogformitems
  },
  props: {
    params: Object,
    layerid: '',
    type: Number
  },
  data() {
    return {
      fileList: [],
      fileList1: [],
      assetList: null,
      eleList: null,
      btnLoading: false,
      typeId: null,
      flowData: [],
      logList: [],
      dataBlock: [],
      fromValiData: {},
      fromValiData1: {},
      fromItemList: [
        { label: '申请人', prop: 'applyUserName', value: '', type: 'input', disabled: true },
        { label: '流程类型', prop: 'processName', value: '', type: 'input', disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', disabled: true },
        { label: '创建时间', prop: 'createTime', value: '', type: 'date', disabled: true }
      ],
      fromItemList1: [
        {
          label: '申请类型',
          prop: 'applyType',
          value: '',
          type: 'select',
          data: [
            { name: '归还', id: 1 },
            { name: '维修', id: 2 },
            { name: '报废', id: 3 },
            { name: '报废评估', id: 4 }
          ],
          disabled: true
        },
        { label: '申请备注', prop: 'applyRemarks', value: '', type: 'textarea', isShow: true, isRqd: false, disabled: true },
        { label: '资产金额', prop: 'scrapMoney', value: '', type: 'input', isShow: true, disabled: true },
        { label: '报废原因', prop: 'scrapReason', value: '', type: 'textarea', isShow: true, isRqd: false, disabled: true },
        { label: '报废评估', prop: 'assessmentType', value: '', type: 'select', data: [{ name: '有价值', id: '2' }, { name: '无价值', id: '3' }], isShow: true, isRqd: false, disabled: true },
        { label: '评估备注', prop: 'assessmentRemarks', value: '', type: 'textarea', isShow: true, isRqd: false, disabled: true }
      ]
    }
  },
  methods: {
    // 下载
    handelDown() {
      if (this.params.processName === '借款申请') {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/FinanceLoanById/download?' + 'id=' + this.typeId)
      } else if (this.params.processName === '付款申请') {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/PaymentFinanceById/download?' + 'id=' + this.typeId)
      } else if (this.params.processName === '报销申请') {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/ReimbursementById/download?' + 'id=' + this.typeId)
      } else if (this.params.processName === '采购申请') {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/PurchaseById/download?' + 'id=' + this.typeId)
      } else if (this.params.processName === '招待申请') {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/EntertainById/download?' + 'id=' + this.typeId)
      } else if (this.params.codeBlock) {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/ApplyById/download?' + 'id=' + this.params.applyId)
      } else if ([3, 4, 16, 17, 18].includes(this.params.customFormType)) {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/Customized/download?' + 'applyId=' + this.params.applyId + '&customFormType=' + this.params.customFormType)
      }
    },
    handelInfo() {
      if (this.eleList) {
        // 自定义表单
        this.$layer.iframe({
          content: {
            content: customForm, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.eleList
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '申请信息',
          maxmin: true,
          shadeClose: false
        })
      } else {
        // 当为资产的时候显示基本信息--新增
        this.$layer.iframe({
          content: {
            content: info, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params,
              way: 1
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '资产基本信息',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    // 当为资产的时候显示基本信息--改变状态
    handelInfo1() {
      // 资产状态为维修
      if (this.fromValiData1.applyType === 2) {
        this.$layer.iframe({
          content: {
            content: service, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params,
              way: 2
            } // props
          },
          area: this.$layer_Size.Max,
          title: '资产基本信息',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$layer.iframe({
          content: {
            content: info, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params,
              way: 2
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '资产基本信息',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    // 查看离职申请和转正申请
    handelInfo2() {
      // 3为转正 4为离职 16为调岗
      if (this.params.customFormType === 3) {
        this.$layer.iframe({
          content: {
            content: officialEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '转正申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 4) {
        this.$layer.iframe({
          content: {
            content: dimissionEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '离职申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 16) {
        this.$layer.iframe({
          content: {
            content: transferEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '调岗申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 17) {
        this.$layer.iframe({
          content: {
            content: leaveEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '请假申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 18) {
        this.$layer.iframe({
          content: {
            content: reissueEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '补卡申请',
          maxmin: true,
          shadeClose: false
        })
      } else if ([5, 6, 7, 8].includes(this.params.customFormType)) {
        this.$layer.iframe({
          content: {
            content: taskDetails, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '任务申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 9) {
        this.$layer.iframe({
          content: {
            content: borrowMoeny, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params,
              way: 1
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '借款申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 10) {
        this.$layer.iframe({
          content: {
            content: purchaseEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params,
              type: 1
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '采购申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 11) {
        this.$layer.iframe({
          content: {
            content: expenseEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params,
              type: 1
            } // props
          },
          area: this.$layer_Size.Maxs,
          title: '报销申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 12) {
        this.$layer.iframe({
          content: {
            content: causeEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params,
              way: 1
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '借款延期申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 13) {
        this.$layer.iframe({
          content: {
            content: paymentEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params,
              way: 1
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '付款申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 14) {
        this.$layer.iframe({
          content: {
            content: refundEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '借款还款申请',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.params.customFormType === 15) {
        this.$layer.iframe({
          content: {
            content: businessEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '招待申请',
          maxmin: true,
          shadeClose: false
        })
      }
    }
  },
  mounted() { },
  created() {
    // 9借款 10采购 11报销 13付款 15招待
    let typeData = this.params.applyId
    switch (this.params.customFormType) {
      case 9:
        getFinanceLoanGetDataById({ id: typeData }).then(res => {
          this.typeId = res.result.id
        })
        break
      case 10:
        getPurchaseGetDataById({ id: typeData }).then(res => {
          this.typeId = res.result.id
        })
        break
      case 11:
        getReimbursementGetDataById({ id: typeData }).then(res => {
          this.typeId = res.result.id
        })
        break
      case 13:
        getPaymentFinanceGetDataById({ id: typeData }).then(res => {
          this.typeId = res.result.id
        })
        break
      case 15:
        getEntertainGetDataByApplyId({ id: typeData }).then(res => {
          this.typeId = res.result.id
        })
    }
    if (this.params) {
      this.fromValiData = this.params
      if (this.params.customFormType === 1) {
        this.assetList = true
        let obj = {}
        obj.id = this.params.id
        obj.type = this.type
        getAssetsDetailsGetDataByApplyId(obj).then(res => {
          this.fromValiData1 = Object.assign({ ...this.fromValiData, ...res.result })
          // 1归还 2维修 3报废申请
          if (res.result.applyType === 1) {
            this.fromItemList1.forEach(item => {
              if (item.prop === 'applyRemarks') {
                item.isShow = false
                item.isRqd = true
              }
            })
          } else if (res.result.applyType === 2) {
            this.fromItemList1.forEach(item => {
              if (item.prop === 'applyRemarks') {
                item.isShow = false
                item.isRqd = true
              }
            })
          } else if (res.result.applyType === 3) {
            this.fromItemList1.forEach(item => {
              if (item.prop === 'scrapMoney') {
                item.isShow = false
              }
              if (item.prop === 'scrapReason') {
                item.isRqd = true
                item.isShow = false
              }
            })
          }
        })
      }
      if (!this.params.fatherState) {
        // 申请
        if (this.params.state === '2') {
          this.params.fatherCurrentStep = this.params.currentStep
        } else {
          this.params.fatherCurrentStep = this.params.fatherCurrentStep - 1
        }
      } else {
        if (this.params.fatherState === '2') {
          this.params.fatherCurrentStep = this.params.fatherCurrentStep
        } else {
          this.params.fatherCurrentStep = this.params.fatherCurrentStep - 1
        }
      }
      if (this.params.customFormType === 10) {
        getKnowledgePointsGetFile({
          onlyCode: this.params.onlyCode2
        }).then(res => {
          this.fileList1 = res.result
        })
      }
      getKnowledgePointsGetFile({
        onlyCode: this.params.onlyCode
      }).then(res => {
        this.fileList = res.result
      })
      let obj = {}
      obj.maximumStep = this.params.maximumStep
      obj.applyId = this.params.applyId
      getToExamineStructure(obj).then(res => {
        res.result.forEach(xdd => {
          switch (xdd.state) {
            case '1':
              xdd.stateName = '待审核'
              break
            case '2':
              xdd.stateName = '通过'
              xdd.color = '#0bbd87'
              break
            case '3':
              xdd.stateName = '退回'
              xdd.color = '#ff0033'
              break
            case '4':
              xdd.stateName = '移交'
              xdd.color = '#fdb654'
          }
        })
        this.logList = [].concat(...res.result)
        this.logList.forEach(xdd => {
          switch (xdd.state) {
            case '1':
              xdd.stateName = '待审核'
              break
            case '2':
              xdd.stateName = '通过'
              xdd.color = '#0bbd87'
              break
            case '3':
              xdd.stateName = '退回'
              xdd.color = '#ff0033'
              break
            case '4':
              xdd.stateName = '移交'
              xdd.color = '#fdb654'
          }
        })
        this.logList = this.logList.filter(item => {
          return item.state !== '1'
        })
        // 去除重复的值
        let map = new Map()
        for (let item of this.logList) {
          if (!map.has(item.currentUserId)) {
            map.set(item.currentUserId, item)
          }
        }
        let arr = [...map.values()]
        this.logList = arr
        res.result.map(item => {
          if (item.length > 1) {
            let info = { currentUserName: '', currentUserId: '' }
            item.forEach(xdd => {
              info.currentUserName += xdd.currentUserName + ','
            })
            info.currentUserName = info.currentUserName.slice(0, info.currentUserName.length - 1)
            info.currentUserName = String(Array.from(new Set(info.currentUserName.split(','))))
            this.flowData.push(info)
          } else {
            this.flowData.push(item[0])
          }
        })
      })
      if (this.params.codeBlock !== null) {
        this.fromValiData = this.params
        this.fromValiData1 = this.params
        let arr = this.params.codeBlock
        let eleList = JSON.parse(arr)
        let dataBlock = JSON.parse(this.params.dataBlock)
        // 数据
        // json
        this.eleList = JSON.parse(eleList.dataBlock)
        this.dataBlock = Object.values(dataBlock)
        this.eleList.list.forEach((item, index) => {
          item.options.defaultValue = this.dataBlock[index]
        })
      }
    }
  }
}
</script>

<style scoped>
.title {
  margin: 10px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.icon {
  position: relative;
  top: 21%;
  left: 42%;
  z-index: 2;
}
.icon:hover {
  color: #66b1ff;
  cursor: pointer;
  z-index: 2;
}
.icon1 {
  position: relative;
  top: 21%;
  left: 42%;
  z-index: 2;
}
.icon1:hover {
  color: #66b1ff;
  cursor: pointer;
  z-index: 2;
}
.info {
  display: flex;
  margin: 0 auto;
  margin-top: 15px;
  padding: 15px 20px;
  width: 300px;
  height: 140px;
  border-radius: 10px;
  color: #333333;
  text-align: left;
  font-size: 14px;
  flex-direction: column;
}
.info .border {
  display: flex;
  margin-bottom: 5px;
  padding-bottom: 2px;
}
.info .list {
  display: flex;
  margin: 5px 10px 5px 5px;
  width: 35px;
  height: 35px;
  border: 1px solid #bcbcbc;
  border-radius: 50%;
}
.down {
  position: absolute;
  top: 5%;
  left: 33%;
  font-size: 18px;
  color: #66b1ff;
  cursor: pointer;
  z-index: 2;
}
</style>

<template>
  <div style="width:calc(100% - 40px);height:100%" class="first">
    <i class="el-icon-view icon" @click="handelInfo" v-if="!assetList &&fileList.length === 0&&params.customFormType===2"></i>
    <i class="el-icon-view icon1" @click="handelInfo1" v-else-if="assetList &&fileList.length === 0&&params.customFormType===1"></i>
    <i class="el-icon-view icon" @click="handelInfo2" v-else-if="!eleList"></i>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="title ">申请详细</div>
        <div style="height:208px" v-if="!assetList">
          <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" type="preview">
          </fromItem>
        </div>
        <!-- 固资申请 -->
        <div style="height:400px" v-if="assetList">
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 100%;">
            <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList1" :fromValiData="fromValiData1" type="preview">
            </fromItem>
          </el-scrollbar>
        </div>
        <!-- 自定义表格的 -->
        <div style="height:300px" v-if="eleList !==null">
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 100%;">
            <el-form :size="eleList.config.size" :label-position="eleList.config.labelPosition" :label-width="eleList.config.labelWidth + 'px'" disabled>
              <div style="width:100%" v-for="(item, index) in eleList.list" :key="index" class="formitem-style">
                <el-form-item :label="item.name+':'" :required="item.options.required">
                  <dialogformitems :eleItem="item" :eleConfig="eleList.config"></dialogformitems>
                </el-form-item>
              </div>
            </el-form>
          </el-scrollbar>
        </div>
        <div class="title">申请附件：</div>
        <div class="modular">
          <div>
            <div style="text-align: center;" v-if="fileList.length === 0">无</div>
            <fileList :fileList="fileList" v-else></fileList>
          </div>
        </div>
        <div class="title" v-if="params.customFormType===10">采购附件：</div>
        <div class="modular" v-if="params.customFormType===10">
          <div>
            <div style="text-align: center;" v-if="fileList1.length === 0">无</div>
            <fileList :fileList="fileList1" style="padding:0;" v-else></fileList>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="title">审核流程</div>
        <div class="box_style">
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 100%;">
            <div class="block" style="padding-right: 40px;margin:20px 0 0 50px;">
              <el-steps direction="vertical" :active="this.params.fatherCurrentStep-1" space='50px'>
                <el-step v-for="(item, id) in flowData" :key="id" :title="item.currentUserName"></el-step>
              </el-steps>
            </div>
          </el-scrollbar>
        </div>

        <div class="title">审核意见</div>
        <div class="info box_style">
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 100%;">
            <div v-for="(item,index) in logList" :key="index" class="border" :color="item.optinColor">
              <div v-if="item.state==='1'"></div>
              <div v-else>
                <span>{{item.currentUserName}}</span>
                <span style="margin-left:20px">{{item.currentUserTime}}</span>
                <span id='text' :style="{color:item.color}">{{item.stateName}}</span>
                <div style="width:500px;white-space:normal">意见：{{item.currentOpinion}}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="title">审核意见</div>
        <fromItem id="father" ref="mySecondFromItem" :obj="this" :layerid="layerid" :fromItemList="secondFromItemList" :fromValiData="secondFromValiData" :rules="rules" :labelWidth="100" scrollbarHeight="280px">
        </fromItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import info from './info.vue'
import service from './service.vue'
import fileList from '../../common/fileList.vue'
import dialogformitems from '../../integrated/customForm/newForm/dialogFormItems'
import dimissionEdit from '../myApplication/custom/dimission_edit' // 离职申请
import officialEdit from '../myApplication/custom/official_edit.vue' // 转正申请
import transferEdit from '../myApplication/custom/transfer_edit1.vue' // 调岗申请
import taskDetails from '../myApplication/custom/task_details.vue' // 任务申请
import borrowMoeny from '../myApplication/custom/borrow_moeny.vue' // 借款申请
import purchaseEdit from '../myApplication/custom/purchase_edit.vue' // 采购申请
import expenseEdit from '../myApplication/custom/expense_edit.vue' // 报销申请
import causeEdit from '../myApplication/custom/cause_edit.vue' // 借款延期审核
import paymentEdit from '../myApplication/custom/payment_edit.vue' // 付款审核
import refundEdit from '../myApplication/custom/refund_edit.vue' // 借款付款申请
import businessEdit from '../myApplication/custom/business_edit.vue' // 招待申请
import leaveEdit from '../myApplication/custom/leave_edit.vue' // 请假申请
import reissueEdit from '../myApplication/custom/reissue_edit.vue' // 补卡申请

import customForm from '../myApplication/custom/custom_form.vue' // 自定义表单
import { getKnowledgePointsGetFile } from '@/api/file.js'
import {
  getToExamineStepModify,
  getAssetsDetailsGetDataByApplyId
} from '@/api/work/myApprove.js'
import { getToExamineStructure } from '@/api/work/myApplication.js'
export default {
  components: {
    fileList,
    dialogformitems
  },
  inject: ['reload'],
  props: {
    layerid: '',
    params: Object,
    home: Boolean,
    type: Number,
    new: Number
  },
  data() {
    return {
      fileList: [],
      fileList1: [],
      eleList: null,
      assetList: null,
      dataBlock: null,
      btnLoading: false,
      flowData: [],
      logList: [],
      fromValiData: {},
      fromValiData1: {},
      fromItemList: [
        { label: '申请人', prop: 'applyUserName', value: '', type: 'input', disabled: true },
        { label: '流程类型', prop: 'processName', value: '', type: 'input', disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', disabled: true },
        { label: '创建时间', prop: 'createTime', value: '', type: 'date', disabled: true }
      ],
      fromItemList1: [
        { label: '申请人', prop: 'applyUserName', value: '', type: 'input', disabled: true },
        { label: '流程类型', prop: 'processName', value: '', type: 'input', disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', disabled: true },
        { label: '创建时间', prop: 'createTime', value: '', type: 'date', disabled: true },
        { label: '资产名称', prop: 'detailsName', value: '', type: 'input', disabled: true },
        { label: '申请类型', prop: 'applyType', value: '', type: 'select', data: [{ name: '归还', id: 1 }, { name: '维修', id: 2 }, { name: '报废', id: 3 }, { name: '报废评估', id: 4 }], disabled: true },
        { label: '申请备注', prop: 'applyRemarks', value: '', type: 'textarea', isShow: true, isRqd: false, disabled: true },
        { label: '资产金额', prop: 'scrapMoney', value: '', type: 'input', isShow: true, disabled: true },
        { label: '报废原因', prop: 'scrapReason', value: '', type: 'textarea', isShow: true, isRqd: false, disabled: true },
        { label: '报废评估', prop: 'assessmentType', value: '', type: 'select', data: [{ name: '有价值', id: '2' }, { name: '无价值', id: '3' }], isShow: true, isRqd: false, disabled: true },
        { label: '评估备注', prop: 'assessmentRemarks', value: '', type: 'textarea', isShow: true, isRqd: false, disabled: true }
      ],
      rules: {
        state: [{ required: true, message: '请选择审核意见', trigger: 'blur' }],
        currentOpinion: [{ required: true, message: '请填写审核备注', trigger: 'blur' }]
      },
      secondFromValiData: {},
      secondFromItemList: [
        {
          label: '审核意见',
          prop: 'state',
          value: '',
          type: 'radio',
          data: [{ label: 2, name: '同意' }, { label: 3, name: '拒绝' }]
        },
        {
          label: '审核备注',
          prop: 'currentOpinion',
          value: '',
          type: 'textarea',
          isRqd: false
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      getToExamineStepModify(this.secondFromValiData)
        .then(res => {
          if (this.home) {
            this.$parent.getApprovalData()
          } else if (this.new === 1) {
            this.$parent.handelCheck()
          } else {
            this.$parent.getListData()
          }
          this.$share.message()
          this.$layer.close(this.layerid)
          this.btnLoading = false
          this.reload()
        })
        .catch(() => {
          this.btnLoading = false
        })
    },
    // 当为资产的时候显示基本信息--新增
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
      // 3为转正 4为离职
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
              way: 2
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
              type: this.type
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
              type: 2
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
              way: 2
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
              way: 2
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
          title: '借款还款申请',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    // 获取附件2
    getFileData1() {
      getKnowledgePointsGetFile({
        onlyCode: this.secondFromValiData.onlyCode2
      }).then(res => {
        this.fileList1 = res.result
      })
    }
  },
  mounted() { },
  created() {
    if (this.params) {
      this.fromValiData = this.params
      this.secondFromValiData = this.params
      if (this.params.customFormType === 1) {
        this.assetList = true
        let obj = {}
        obj.id = this.params.id
        obj.type = this.type
        getAssetsDetailsGetDataByApplyId(obj).then(res => {
          this.fromValiData1 = Object.assign({
            ...this.fromValiData,
            ...res.result
          })
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
      if (this.params.fatherState === '2') {
        this.params.fatherCurrentStep = this.params.fatherCurrentStep + 1
      } else {
        this.params.fatherCurrentStep = this.params.fatherCurrentStep
      }
      if (this.params.customFormType === 10) {
        this.getFileData1()
      }
      if (this.params.codeBlock !== null) {
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
      getKnowledgePointsGetFile({ onlyCode: this.secondFromValiData.onlyCode })
        .then(res => {
          this.fileList = res.result
        })
        .then(() => {
          let obj = {}
          obj.maximumStep = this.params.maximumStep
          obj.applyId = this.params.applyId
          getToExamineStructure(obj).then(res => {
            res.result.forEach(xdd => {
              if (xdd.currentOpinion) {
                xdd.currentOpinion = xdd.currentOpinion
              } else {
                xdd.currentOpinion = ''
              }
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
        })
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
.frist {
  position: relative;
}
.icon {
  position: relative;
  top: 122px;
  left: 25%;
  z-index: 2;
}
.icon:hover {
  color: #66b1ff;
  cursor: pointer;
  z-index: 2;
}
.icon1 {
  position: relative;
  top: 280px;
  left: 25%;
  z-index: 2;
}
.icon1:hover {
  color: #66b1ff;
  cursor: pointer;
  z-index: 2;
}
.info {
  text-align: left;
  border-radius: 10px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  color: #333333;
  font-size: 14px;
}
.info .border {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 2px;
}
.info .list {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #bcbcbc;
  display: flex;
  margin: 5px 10px 5px 5px;
}
.box_style {
  margin: 0 auto;
  width: 600px;
  min-height: 300px;
}
</style>

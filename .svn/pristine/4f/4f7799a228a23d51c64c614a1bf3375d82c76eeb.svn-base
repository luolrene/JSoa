<template>
  <div style="width:calc(100% - 40px);height:100%">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="title">申请详细</div>
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
        <div style="height:200px" v-if="eleList">
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
          <div class="content">
            <div style="text-align: center;" v-if="fileList.length === 0">无</div>
            <fileList :fileList="fileList" style="padding-bottom: 12px" v-else></fileList>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="title">审核流程</div>
        <div style="height:200px">
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 200px;">
            <div class="block" style="padding-right: 40px;margin:20px 0 0 130px;">
              <el-steps direction="vertical" :active="this.params.fatherCurrentStep" space='50px'>
                <el-step v-for="(item, id) in flowData" :key="id" :title="item.currentUserName"></el-step>
              </el-steps>
            </div>
          </el-scrollbar>
        </div>
        <div class="title">审核意见</div>
        <div class="info">
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 200px;">
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
      </el-col>

    </el-row>
  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
import dialogformitems from '../../integrated/customForm/newForm/dialogFormItems'
import { getKnowledgePointsGetFile } from '@/api/file.js'
import { getAssetsDetailsApplicationDetails } from '@/api/integrated/fixedAssets.js'// 查询对应任务
import { getAssetsDetailsGetDataByApplyId } from '../../../api/work/myApprove.js'
import { getToExamineStructure } from '../../../api/work/myApplication.js'
export default {
  components: {
    dialogformitems,
    fileList
  },
  props: {
    dataList: Object,
    layerid: ''
  },
  data() {
    return {
      fileList: [],
      assetList: null,
      eleList: null,
      params: {
        fatherCurrentStep: 0
      },
      btnLoading: false,
      flowData: [],
      logList: [],
      dataBlock: [],
      fromValiData: {},
      fromValiData1: {},
      fromItemList: [
        {
          label: '申请人',
          prop: 'applyUserName',
          value: '',
          type: 'input',

          disabled: true
        },
        {
          label: '流程类型',
          prop: 'processName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '部门',
          prop: 'groupName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '创建时间',
          prop: 'createTime',
          value: '',
          type: 'date',
          disabled: true
        }
      ],
      fromItemList1: [
        {
          label: '申请人',
          prop: 'applyUserName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '流程类型',
          prop: 'processName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '部门',
          prop: 'groupName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '创建时间',
          prop: 'createTime',
          value: '',
          type: 'date',
          disabled: true
        },
        {
          label: '资产名称',
          prop: 'detailsName',
          value: '',
          type: 'input',
          disabled: true
        },
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
        {
          label: '申请备注',
          prop: 'applyRemarks',
          value: '',
          type: 'textarea',
          isShow: true,
          disabled: true
        },
        {
          label: '资产金额',
          prop: 'scrapMoney',
          value: '',
          type: 'input',
          isShow: true,
          disabled: true
        },
        {
          label: '报废原因',
          prop: 'scrapReason',
          value: '',
          type: 'textarea',
          isShow: true,
          disabled: true
        },
        {
          label: '报废评估',
          prop: 'assessmentType',
          value: '',
          type: 'select',
          data: [{ name: '有价值', id: '2' }, { name: '无价值', id: '3' }],
          isShow: true,
          disabled: true
        },
        {
          label: '评估备注',
          prop: 'assessmentRemarks',
          value: '',
          type: 'textarea',
          isShow: true,
          disabled: true
        }
      ]
    }
  },
  methods: {},
  mounted() { },
  created() {
    if (this.dataList) {
      getAssetsDetailsApplicationDetails(this.dataList)
        .then(res => {
          this.params = res.result
        })
        .then(() => {
          this.fromValiData = this.params
          if (this.params.customFormType === 1) {
            this.assetList = true
            let obj = {}
            obj.id = this.params.id
            obj.type = 1
            getAssetsDetailsGetDataByApplyId(obj).then(res => {
              this.fromValiData1 = Object.assign({
                ...this.fromValiData,
                ...res.result
              })
              // 归还
              if (res.result.applyType === 1) {
                this.fromItemList1.forEach(item => {
                  if (item.prop === 'applyRemarks') {
                    item.isShow = false
                    item.isRqd = true
                  }
                })
              }
              // 维修
              if (res.result.applyType === 2) {
                this.fromItemList1.forEach(item => {
                  if (item.prop === 'applyRemarks') {
                    item.isShow = false
                    item.isRqd = true
                  }
                })
              }
              // 报废申请
              if (res.result.applyType === 3) {
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
          getKnowledgePointsGetFile(this.fromValiData).then(res => {
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
                info.currentUserName = info.currentUserName.slice(
                  0,
                  info.currentUserName.length - 1
                )
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
.info {
  display: flex;
  margin: 0 auto;
  margin-top: 15px;
  padding: 15px 20px;
  width: 300px;
  height: 200px;
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
</style>

<template>
  <div class="operate-container">
    <div class="type" v-if="!radio">
      <span style="font-size:14px;color: #606266;margin-left: 15px;">操作类型:</span>
      <el-radio-group v-model="radio" v-for="(item,index) in infoData" :key="index">
        <el-radio :label='item.id'>{{item.name}}</el-radio>
      </el-radio-group>
    </div>
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '@/utils/public.js'
import {
  getAssetsTypeGetChildren,
  getAssetsSupplierQueryPageData,
  getAssetsDetailsApply,
  getAssetsDetailsModify
} from '@/api/integrated/fixedAssets.js'
import { getUserQueryPageData } from '@/api/jcxxgl/user.js'
import { getGroupQueryAllGroupsTree } from '@/api/jcxxgl/group.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      userId: this.$store.getters.userInfo.id,
      radio: null,
      infoData: [],
      fileList: [],
      typeData: [], // 资产类型
      fromValiData: {
      },
      rules: {},
      fromItemList: [
      ],
      // 编辑
      editData: [
        {
          label: '资产类别',
          prop: 'typeId',
          value: '',
          type: 'cascader',
          data: [],
          isRqd: true,
          disabled: true
        },
        {
          label: '资产名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
        },
        {
          label: '标准型号',
          prop: 'standardModel',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '资产编号',
          prop: 'assetNumber',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
        },
        {
          label: '状态',
          prop: 'state',
          value: '',
          type: 'select',
          data: [
            { name: '闲置', id: '1' },
            { name: '使用', id: '2' },
            { name: '维修', id: '3' },
            { name: '报废', id: '4' }
          ],
          isRqd: true,
          disabled: true
        },
        {
          label: '来源',
          prop: 'source',
          value: '',
          type: 'select',
          data: [
            { name: '购入', id: '1' },
            { name: '捐赠', id: '2' },
            { name: '租赁', id: '3' },
            { name: '其他', id: '4' }
          ],
          disabled: true
        },
        {
          label: '供应商',
          prop: 'supplierId',
          value: '',
          type: 'select',
          data: [],
          isShow: true,
          disabled: true
        },
        {
          label: '入库日期',
          prop: 'warehousingTime',
          value: '',
          type: 'date',
          disabled: true
        },
        {
          label: '物品金额',
          prop: 'amountOfMoney',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
        },
        {
          label: '使用部门',
          prop: 'groupId',
          value: '',
          type: 'cascader',
          data: [],
          isRqd: true,
          disabled: true
        },
        {
          label: '物品所在地',
          prop: 'location',
          value: '',
          type: 'input',
          disabled: true
        }
      ],
      editRules: {
        typeId: [{ required: true, message: '请选择资产类别', trigger: 'blur' }],
        name: [{ required: true, message: '请填写资产名称', trigger: 'blur' }],
        standardModel: [{ required: true, message: '请填写标准型号', trigger: 'blur' }],
        assetNumber: [{ required: true, message: '请填写资产编号', trigger: 'blur' }],
        source: [{ required: true, message: '请选择来源', trigger: 'blur' }],
        warehousingTime: [{ required: true, message: '请选择入库时间', trigger: 'blur' }],
        amountOfMoney: [{ required: true, message: '请填写金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        state: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        groupId: [{ required: true, message: '请选择所属部门', trigger: 'blur' }],
        company: [{ required: true, message: '请选择单位', trigger: 'blur' }]
      },
      // 调拨
      scrapData: [
        {
          label: '使用部门',
          prop: 'groupId',
          value: '',
          type: 'cascader',
          data: [],
          isRqd: true,
          isShow: true,
          disabled: true
        },
        {
          label: '申请备注',
          prop: 'applyRemarks',
          value: '',
          type: 'textarea',
          isShow: true,
          isRqd: false
        },
        {
          label: '资产金额',
          prop: 'scrapMoney',
          value: '',
          type: 'input',
          disabled: true,
          isShow: true
        },
        {
          label: '报废原因',
          prop: 'scrapReason',
          value: '',
          type: 'textarea',
          isShow: true,
          isRqd: false
        },
        {
          label: '报废评估',
          prop: 'assessmentType',
          value: '',
          type: 'select',
          data: [{ name: '有价值', id: '2' }, { name: '无价值', id: '3' }],
          isShow: true,
          isRqd: false
        },
        {
          label: '评估备注',
          prop: 'assessmentRemarks',
          value: '',
          type: 'textarea',
          isShow: true,
          isRqd: false
        }
      ],
      scrapRules: {
        groupId: [{ required: true, message: '请选择使用部门', trigger: 'blur' }],
        applyRemarks: [{ required: true, message: '请填写申请备注', trigger: 'blur' }],
        scrapReason: [{ required: true, message: '请填写报废原因', trigger: 'blur' }],
        assessmentType: [{ required: true, message: '请选择报废评估', trigger: 'blur' }],
        assessmentRemarks: [{ required: true, message: '请填写评估', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'radio': {
      handler: function (newV) {
        // 1编辑 2调拨 3维修 4报废
        if (newV === 1) {
          if (this.fromItemList.length > 1) {
            this.fileList = []
          }
          this.editData.forEach(item => {
            this.fromItemList.push(item)
          })
          this.rules = this.editRules
          this.fromValiData.typeId = this.params.typeIdAll.split(',').map(Number)
          if (this.params.groupIdAll) {
            this.fromValiData.groupIdAll = this.params.groupIdAll.split(',')
            this.fromValiData.groupId = this.fromValiData.groupIdAll
          }
          // 判断是否使用部门
          if (this.params.assetsUserIdAll) {
            if (this.params.assetsUserIdAll.split(',').includes(this.userId)) {
              this.fromItemList.forEach(item => {
                if (['state'].includes(item.prop)) {
                  item.disabled = false
                }
              })
            }
          }
          // 判断是否管理部门
          if (this.params.operationUserIdAll) {
            if (this.params.operationUserIdAll.split(',').includes(this.userId)) {
              this.fromItemList.forEach(item => {
                item.disabled = false
              })
            }
          }
          this.getTypeData() // 获取资产类型
          this.getSupplierData() // 获取供应商
          this.getGroupIdData()
          this.getUserId()
        } else if (newV === 2 || newV === 3 || newV === 4) {
          if (this.fromItemList.length > 1) {
            this.fileList = []
          }
          this.scrapData.forEach(item => {
            this.fromItemList.push(item)
          })
          this.rules = this.scrapRules
          this.fromValiData.detailsId = this.params.id
          this.fromValiData.detailsName = this.params.name
          this.getGroupIdData()
        }
        if (newV === 2) {
          this.fromValiData.applyType = '1'
          this.fromItemList.forEach(item => {
            if (item.prop === 'groupId') {
              item.disabled = false
            }
          })
        }
        if (newV === 3) {
          this.fromValiData.applyType = '2'
          this.fromItemList.forEach(item => {
            if (item.prop === 'applyRemarks') {
              item.isShow = false
            }
          })
        }
        if (newV === 4) {
          this.fromValiData.applyType = '3'
          this.fromValiData.scrapMoney = this.params.amountOfMoney
          if (this.params) {
            this.fromItemList.forEach(item => {
              if (item.prop === 'scrapMoney') {
                item.isShow = false
              }
              if (item.prop === 'scrapReason') {
                item.isShow = false
              }
            })
          }
        }
      }
    },
    'fromValiData.source': {
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'supplierId') {
            if (newV === '1') {
              item.isShow = false
              item.isRqd = true
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      // 编辑
      if (this.radio === 1 || this.radio === 2) {
        if (this.fromValiData.groupId) {
          this.fromValiData.groupIdAll = this.fromValiData.groupId.toString()
          let groupId = this.fromValiData.groupId
          if (groupId.length > 1) {
            this.fromValiData.groupId = groupId[groupId.length - 1]
          } else {
            this.fromValiData.groupId = groupId[0]
          }
        }
        this.fromValiData.typeIdAll = this.fromValiData.typeId.toString()
        let typeId = this.fromValiData.typeId
        if (typeId.length > 1) {
          this.fromValiData.typeId = typeId[typeId.length - 1]
        } else {
          this.fromValiData.typeId = typeId[0]
        }
        getAssetsDetailsModify(this.fromValiData)
          .then(res => {
            this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else if (this.radio === 3 || this.radio === 4) {
        getAssetsDetailsApply(this.fromValiData)
          .then(res => {
            this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
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
    // 获取资产类型
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
    // 获取供应商
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
    },
    getGroupIdData() {
      let obj = {}
      obj.father = '0'
      getGroupQueryAllGroupsTree(obj).then(res => {
        this.groupData = res.result
        this.handelOption(this.groupData)
        this.fromItemList.forEach(item => {
          if (item.prop === 'groupId') {
            item.data = this.groupData
          }
        })
      })
    },
    getUserIdData() {
      this.fromValiData.userId = ''
      let obj = {}
      obj.pageSize = 999
      obj.pageNow = 1
      obj.groupId = this.fromValiData.groupId.toString()
      getUserQueryPageData(obj).then(res => {
        this.fromItemList.forEach(item => {
          if (item.prop === 'userId') {
            item.data = res.result.pageList
          }
        })
      })
    },
    getUserId() {
      let obj = {}
      obj.pageSize = 999
      obj.pageNow = 1
      obj.groupId = this.fromValiData.groupId.toString()
      getUserQueryPageData(obj).then(res => {
        this.fromItemList.forEach(item => {
          if (item.prop === 'userId') {
            item.data = res.result.pageList
          }
        })
      })
    },
    // 去重
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
    handelOption(options) {
      options.forEach(item => {
        if (item.children.length === 0) {
          delete item.children
        } else {
          this.handelOption(item.children)
        }
      })
    }
  },
  mounted() {
    this.fromValiData = this.params
    let datas = []
    // 使用部门 assetsUserIdAll  管理部门operationUserIdAll
    this.editData.forEach(xdd => {
      if (this.params.assetsUserIdAll) {
        if (this.params.assetsUserIdAll.split(',').includes(this.userId) && !this.params.operationUserIdAll.split(',').includes(this.userId)) {
          datas.push(this.params.assetsUserIdAll.split(','))
        }
      }
    })
    if (this.params.operationUserIdAll) {
      datas.push(this.params.operationUserIdAll.split(','))
    }
    let convert = datas.flat()
    if (convert.includes(this.userId)) {
      this.infoData = [
        { id: 1, name: '编辑' },
        { id: 2, name: '调拨' },
        { id: 3, name: '维修' },
        { id: 4, name: '报废' }
      ]
    } else {
      this.infoData = [
        { id: 2, name: '调拨' },
        { id: 3, name: '维修' },
        { id: 4, name: '报废' }
      ]
    }
    if (convert.includes(this.userId) && this.params.state === '2' && this.params.auditStatus === 1) {
      this.infoData = [
        { id: 1, name: '编辑' },
        { id: 2, name: '调拨' },
        { id: 3, name: '维修' },
        { id: 4, name: '报废' }
      ]
    } else {
      this.infoData = [
        { id: 1, name: '编辑' },
        { id: 3, name: '维修' },
        { id: 4, name: '报废' }
      ]
    }
    if (convert.includes(this.userId) && this.params.state !== '3' && this.params.auditStatus === 1) {
      this.infoData = [
        { id: 1, name: '编辑' },
        { id: 2, name: '调拨' },
        { id: 3, name: '维修' },
        { id: 4, name: '报废' }
      ]
    } else {
      this.infoData = [
        { id: 1, name: '编辑' },
        { id: 2, name: '调拨' },
        { id: 4, name: '报废' }
      ]
    }
    if (convert.includes(this.userId) && this.params.state !== '4' && this.params.auditStatus === 1) {
      this.infoData = [
        { id: 1, name: '编辑' },
        { id: 2, name: '调拨' },
        { id: 3, name: '维修' },
        { id: 4, name: '报废' }
      ]
    } else {
      this.infoData = [
        { id: 1, name: '编辑' },
        { id: 2, name: '调拨' },
        { id: 3, name: '维修' }
      ]
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
.type {
  margin-bottom: 12px;
}
.el-radio-group {
  margin-left: 15px;
}
</style>

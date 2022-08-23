<template>
  <div class="operate-container">
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
  getAssetsDetailsAdd,
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
      },
      fileList: [],
      typeData: [],
      groupData: [],
      btnLoading: false,
      fromValiData: {
        userId: '',
        state: '1'
      },
      rules: {
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
      fromItemList: [
        { label: '资产类别', prop: 'typeId', value: '', type: 'cascader', data: [], isRqd: true },
        { label: '资产名称', prop: 'name', value: '', type: 'input', isRqd: true },
        { label: '标准型号', prop: 'standardModel', value: '', type: 'input' },
        { label: '资产编号', prop: 'assetNumber', value: '', type: 'input', isRqd: true },
        { label: '状态', prop: 'state', value: '', type: 'select', data: [{ name: '闲置', id: '1' }, { name: '使用', id: '2' }, { name: '维修', id: '3' }, { name: '报废', id: '4' }], isRqd: true },
        { label: '来源', prop: 'source', value: '', type: 'select', data: [{ name: '购入', id: '1' }, { name: '捐赠', id: '2' }, { name: '租赁', id: '3' }, { name: '其他', id: '4' }] },
        { label: '供应商', prop: 'supplierId', value: '', type: 'select', data: [], isShow: true },
        { label: '入库日期', prop: 'warehousingTime', value: '', type: 'date' },
        { label: '物品金额', prop: 'amountOfMoney', value: '', type: 'input', isRqd: true },
        { label: '使用部门', prop: 'groupId', value: '', type: 'cascader', data: [], isRqd: true },
        { label: '物品所在地', prop: 'location', value: '', type: 'input' }
      ]
    }
  },
  watch: {
    'fromValiData.source': {
      deep: true,
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
      if (this.params) {
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
      } else {
        getAssetsDetailsAdd(this.fromValiData)
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
    getTypeData() {
      getAssetsTypeGetChildren({
        groupIdAll: this.$store.getters.userInfo.groupId
      }).then(res => {
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
    this.getGroupIdData()
    this.getSupplierData()
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.typeId = this.params.typeIdAll.split(',').map(Number)
      if (this.params.groupIdAll) {
        this.fromValiData.groupIdAll = this.params.groupIdAll.split(',')
        this.fromValiData.groupId = this.fromValiData.groupIdAll
      }
      this.getUserId()
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>

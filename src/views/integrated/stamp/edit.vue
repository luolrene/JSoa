<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label='上传图片:' slot='upload'>
        <uploadImg ref="myUpload" :datas='imgUrl'></uploadImg>
        <div class="text">
          <span>说明:</span>
          <span>1.如已开通电子印章，请列明电子章类型及印章管理员</span>
          <span>2.封存印章也请统计在内并备注封存</span>
        </div>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import group from '../fixedAssets/property/groupData.vue'
import input from '../fixedAssets/property/input_person.vue'
import { getOfficialSealAdd, getOfficialSealModify } from '@/api/integrated/stamp'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      imgUrl: null,
      fromValiData: {
        groupNameAll: '',
        operationUserNameAll: '',
        imgUrl: null
      },
      rules: {
        company: [{ required: true, message: '请选择公司信息', trigger: 'blur' }],
        type: [{ required: true, message: '请选择印章类型', trigger: 'blur' }],
        seal: [{ required: true, message: '请填写印章名称', trigger: 'blur' }],
        filing: [{ required: true, message: '请选择是否备案', trigger: 'blur' }],
        groupNameAll: [{ required: true, message: '请选择保管部门', trigger: 'blur' }],
        operationUserNameAll: [{ required: true, message: '请选择保管人', trigger: 'blur' }],
        address: [{ required: true, message: '请填写保管地点', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '公司信息',
          prop: 'company',
          value: '',
          type: 'select',
          filterable: true,
          create: true,
          isRqd: true,
          data: [
            { name: '重庆市九升检测技术有限公司', id: '重庆市九升检测技术有限公司' },
            { name: '重庆吉东科技有限公司', id: '重庆吉东科技有限公司' },
            { name: '重庆两山生态环境科技有限公司', id: '重庆两山生态环境科技有限公司' },
            { name: '重庆九升科技集团有限公司', id: '重庆九升科技集团有限公司' },
            { name: '重庆市九升检测技术有限公司广安分公司', id: '重庆市九升检测技术有限公司广安分公司' }
          ]
        },
        {
          label: '印章类型',
          prop: 'type',
          value: '',
          type: 'select',
          filterable: true,
          create: true,
          isRqd: true,
          data: [
            { name: '公章', id: '公章' },
            { name: '法人章', id: '法人章' },
            { name: 'CMA章', id: 'CMA章' },
            { name: 'CATL章', id: 'CATL章' },
            { name: '财务专用章', id: '财务专用章' },
            { name: '发票专用章', id: '发票专用章' },
            { name: '合同专用章', id: '合同专用章' },
            { name: '报价专用章', id: '报价专用章' },
            { name: '检验检测专用章', id: '检验检测专用章' }
          ]
        },
        { label: '印章名称', prop: 'seal', value: '', type: 'input', isRqd: true },
        { label: '备案', prop: 'filing', value: '', type: 'select', isRqd: true, data: [{ name: '是', id: '1' }, { name: '否', id: '0' }] },
        { label: '保管部门', prop: 'groupNameAll', value: '', type: 'inputChoice', click: 'getGroupData', isRqd: true },
        { label: '保管人', prop: 'operationUserNameAll', value: '', type: 'inputChoice', click: 'getUserData', isRqd: true },
        { label: '保管地点', prop: 'address', value: '', type: 'input', isRqd: true },
        { label: '备注', prop: 'exp', value: '', type: 'textarea' }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.$refs.myUpload.FileId) {
        this.fromValiData.imgUrl = this.$refs.myUpload.FileId
      }
      if (this.params) {
        getOfficialSealModify(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        }).catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
      } else {
        getOfficialSealAdd(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        }).catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
      }
    },
    getData(ids) {
      this.ids = ids.id.split(',')
    },
    getGroupData() {
      this.$layer.iframe({
        content: {
          content: group, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            groupData: this.groupData
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择部门',
        maxmin: true,
        shadeClose: false
      })
    },
    getUserData() {
      if (this.fromValiData.groupIdAll) {
        this.$layer.iframe({
          content: {
            content: input, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              layerid: '',
              groupIdAll: this.fromValiData.groupIdAll,
              groupData: this.groupData,
              userData: this.userData
            } // props
          },
          area: this.$layer_Size.Max,
          title: '选择负责人',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择管理部门'
        })
      }
    }
  },
  mounted() {

  },
  created() {
    // 判断是否为编辑
    if (this.params) {
      this.fromValiData = this.params
      this.ids = this.params.groupIdAll.split(',')
      this.fromValiData.imgUrl = Number(this.params.imgUrl)
      this.imgUrl = Number(this.params.imgUrl)
    }
  }
}
</script>

<style scoped lang="scss">
.text {
  margin: 0;
  text-align: center;
  font-size: 12px;
  color: rgb(255, 0, 0);
  span {
    display: inline-block;
  }
}
</style>

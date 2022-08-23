 <template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :label-width="100">
    </fromItem>
  </div>
</template>

<script>
import { getOaProcessAdd, getOaProcessModify } from '@/api/integrated/flow.js'
import { getCustomerFormQueryPageData } from '@/api/integrated/form.js'
export default {
  props: {
    params: Object,
    fatherId: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        processType: ''
      },
      fromData: {
        pageSize: 999,
        pageNow: 1
      },
      rules: {
        name: [{ required: true, message: '请填写流程名称', trigger: 'blur' }],
        processType: [{ required: true, message: '请选择流程类型', trigger: 'blur' }],
        state: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '上级流程',
          prop: 'fatherName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '流程名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '是否启用',
          prop: 'state',
          value: '',
          type: 'select',
          data: [{ name: '启用', id: '1' }, { name: '停用', id: '2' }],
          isRqd: true
        },
        {
          label: '流程类型',
          prop: 'processType',
          value: '',
          type: 'select',
          data: [{ name: '公用', id: '1' }, { name: '定制', id: '2' }],
          isRqd: true
        },
        {
          label: '自定义表单',
          prop: 'customerFormId',
          value: '',
          type: 'select',
          data: [],
          clearable: true,
          isRqd: true
        },
        {
          label: '条件',
          prop: 'condition',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '备注',
          prop: 'remarks',
          value: '',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.params) {
        getOaProcessModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getTreeData()
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        getOaProcessAdd(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getTreeData()
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
    getFormData() {
      getCustomerFormQueryPageData(this.fromData).then(res => {
        let formData = res.result.pageList.map(item => {
          return {
            id: item.id,
            name: item.formName
          }
        })
        this.fromItemList.forEach(item => {
          if (item.prop === 'customerFormId') {
            item.data = formData
          }
        })
      })
    }
  },
  mounted() {
    this.getFormData()
    if (this.params) {
      this.fromValiData = this.params
      if (
        this.fromValiData.fatherId !== 0 &&
        this.fromValiData.fatherId !== null
      ) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'condition') {
            // item.isRqd = true
            item.isShow = false
          }
        })
      }
    }
    if (this.fatherId) {
      this.fromValiData.fatherId = this.fatherId.fatherId
      this.fromValiData.fatherName = this.fatherId.fatherName
      this.fromValiData.processType = this.fatherId.processType
      if (this.fatherId.fatherId !== 0 && this.fatherId.fatherId !== null) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'condition') {
            item.isRqd = true
            item.isShow = false
          }
          if (item.prop === 'processType') {
            item.isShow = true
          }
        })
      }
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
